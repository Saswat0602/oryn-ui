"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "../../icons"
import { cn } from "../../lib/utils"
import { Badge } from "../media/badge"
import { useControllableState } from "../../hooks/use-controllable-state"
import { Portal } from "../../primitives/portal"

export interface MultiSelectOption {
  label: string
  value: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface MultiSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  maxSelected?: number
  searchable?: boolean
  clearable?: boolean
  disabled?: boolean
  error?: boolean
  size?: "sm" | "default" | "lg"
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      className,
      options = [],
      value: controlledValue,
      defaultValue = [],
      onChange,
      placeholder = "Select options...",
      maxSelected,
      searchable = true,
      clearable = true,
      disabled = false,
      error = false,
      size = "default",
      ...props
    },
    ref
  ) => {
    const [selected = [], setSelected] = useControllableState<string[]>({
      prop: controlledValue,
      defaultProp: defaultValue,
      onChange,
    })

    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1)
    const [announcement, setAnnouncement] = React.useState<string>("")
    const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)
    const rawId = React.useId()
    const listboxId = `ms-listbox-${rawId}`
    const containerRef = React.useRef<HTMLDivElement>(null)
    const popupRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const optionsContainerRef = React.useRef<HTMLDivElement>(null)

    const updateTriggerRect = React.useCallback(() => {
      if (containerRef.current) {
        setTriggerRect(containerRef.current.getBoundingClientRect())
      }
    }, [])

    React.useEffect(() => {
      if (!open) return
      updateTriggerRect()
      const handleScrollOrResize = () => updateTriggerRect()
      window.addEventListener("scroll", handleScrollOrResize, true)
      window.addEventListener("resize", handleScrollOrResize)
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true)
        window.removeEventListener("resize", handleScrollOrResize)
      }
    }, [open, updateTriggerRect])

    React.useEffect(() => {
      if (!open) return
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node
        if (
          containerRef.current?.contains(target) ||
          popupRef.current?.contains(target)
        ) {
          return
        }
        setOpen(false)
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    const filteredOptions = React.useMemo(() => {
      if (!search.trim()) return options
      const term = search.toLowerCase().trim()
      return options.filter((opt) => opt.label.toLowerCase().includes(term))
    }, [options, search])

    React.useEffect(() => {
      setFocusedIndex(filteredOptions.length > 0 ? 0 : -1)
    }, [filteredOptions, open])

    const isSelected = (val: string) => (selected ?? []).includes(val)

    const toggleOption = (val: string) => {
      if (disabled) return
      const opt = options.find((o) => o.value === val)
      const label = opt ? opt.label : val
      const current = selected ?? []
      if (current.includes(val)) {
        const next = current.filter((v) => v !== val)
        setSelected(next)
        setAnnouncement(`${label} removed, ${next.length} selected`)
      } else {
        if (maxSelected && current.length >= maxSelected) return
        const next = [...current, val]
        setSelected(next)
        setAnnouncement(`${label} added, ${next.length} selected`)
      }
    }

    const removeOption = (e: React.MouseEvent | React.KeyboardEvent, val: string) => {
      e.stopPropagation()
      if (disabled) return
      const opt = options.find((o) => o.value === val)
      const label = opt ? opt.label : val
      const current = selected ?? []
      const next = current.filter((v) => v !== val)
      setSelected(next)
      setAnnouncement(`${label} removed, ${next.length} selected`)
    }

    const clearAll = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (disabled) return
      setSelected([])
      setAnnouncement("All options cleared")
    }

    const scrollFocusedIntoView = (index: number) => {
      if (!optionsContainerRef.current) return
      const optionElements = optionsContainerRef.current.querySelectorAll<HTMLElement>('[role="option"]')
      const target = optionElements[index]
      if (target && typeof target.scrollIntoView === "function") {
        target.scrollIntoView({ block: "nearest" })
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      if (e.key === "Escape") {
        if (open) {
          e.preventDefault()
          setOpen(false)
        }
      } else if (e.key === "Backspace" && search === "" && (selected ?? []).length > 0) {
        const current = selected ?? []
        const lastVal = current[current.length - 1]
        const opt = options.find((o) => o.value === lastVal)
        const label = opt ? opt.label : lastVal
        const next = current.slice(0, -1)
        setSelected(next)
        setAnnouncement(`${label} removed, ${next.length} selected`)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (!open) {
          updateTriggerRect()
          setOpen(true)
          setFocusedIndex(0)
        } else if (filteredOptions.length > 0) {
          setFocusedIndex((prev) => {
            const nextIdx = (prev + 1) % filteredOptions.length
            scrollFocusedIntoView(nextIdx)
            return nextIdx
          })
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (open && filteredOptions.length > 0) {
          setFocusedIndex((prev) => {
            const prevIdx = prev <= 0 ? filteredOptions.length - 1 : prev - 1
            scrollFocusedIntoView(prevIdx)
            return prevIdx
          })
        }
      } else if ((e.key === "Enter" || (e.key === " " && search === "")) && open) {
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          e.preventDefault()
          const opt = filteredOptions[focusedIndex]
          if (opt && !opt.disabled) {
            toggleOption(opt.value)
          }
        }
      }
    }

    const sizeClasses = {
      sm: "min-h-[32px] text-xs px-2 py-1",
      default: "min-h-[36px] text-sm px-3 py-1.5",
      lg: "min-h-[42px] text-base px-3.5 py-2",
    }[size]

    const shouldFlip = triggerRect
      ? typeof window !== "undefined" && triggerRect.bottom + 260 > window.innerHeight && triggerRect.top > 260
      : false

    const popupStyle: React.CSSProperties = triggerRect
      ? {
          position: "fixed",
          top: shouldFlip ? `${triggerRect.top - 4}px` : `${triggerRect.bottom + 4}px`,
          transform: shouldFlip ? "translateY(-100%)" : undefined,
          left: `${triggerRect.left}px`,
          width: `${triggerRect.width}px`,
          zIndex: 70,
        }
      : {}

    const activeDescendantId =
      open && focusedIndex >= 0 && focusedIndex < filteredOptions.length
        ? `${listboxId}-opt-${focusedIndex}`
        : undefined

    return (
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        className={cn("relative w-full", className)}
        {...props}
      >
        {/* Screen Reader Live Region */}
        <div role="status" aria-live="polite" className="sr-only">
          {announcement}
        </div>

        <div
          ref={ref}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={activeDescendantId}
          aria-label={props["aria-label"] || placeholder || "Select options"}
          tabIndex={disabled ? -1 : 0}
          onClick={() => {
            if (!disabled) {
              updateTriggerRect()
              setOpen((prev) => !prev)
              if (!open) {
                setTimeout(() => searchInputRef.current?.focus(), 50)
              }
            }
          }}
          className={cn(
            "flex w-full flex-wrap items-center gap-1.5 rounded-lg border bg-background ring-offset-background transition-all shadow-2xs cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            error
              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"
              : "border-input focus-visible:border-ring",
            disabled && "cursor-not-allowed opacity-50 bg-muted",
            sizeClasses
          )}
        >
          {(selected ?? []).length === 0 ? (
            <span aria-hidden="true" className="text-muted-foreground">{placeholder}</span>
          ) : (
            (selected ?? []).map((val) => {
              const opt = options.find((o) => o.value === val)
              const label = opt ? opt.label : val
              return (
                <Badge
                  key={val}
                  variant="secondary"
                  className="flex items-center gap-1 font-normal py-0.5 px-2 text-xs"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => removeOption(e, val)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        removeOption(e, val)
                      }
                    }}
                    aria-label={`Remove ${label}`}
                    className="ml-0.5 rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })
          )}

          <div className="ml-auto flex items-center gap-1 text-muted-foreground">
            {clearable && (selected ?? []).length > 0 && !disabled && (
              <button
                type="button"
                onClick={clearAll}
                aria-label="Clear all options"
                className="p-1 rounded text-muted-foreground hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-150", open && "rotate-180")}
            />
          </div>
        </div>

        {open && triggerRect && (
          <Portal>
            <div
              ref={popupRef}
              style={popupStyle}
              className="fixed z-[70] max-h-60 overflow-hidden flex flex-col rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-2xl animate-in fade-in-0 zoom-in-95"
            >
              {searchable && (
                <div className="p-1 border-b border-border mb-1">
                  <input
                    ref={searchInputRef}
                    type="text"
                    aria-label="Search options"
                    aria-controls={listboxId}
                    aria-activedescendant={activeDescendantId}
                    placeholder="Search options..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-transparent px-2 py-1 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                  />
                </div>
              )}

              <div
                ref={optionsContainerRef}
                id={listboxId}
                role="listbox"
                aria-label={props["aria-label"] || "Options"}
                aria-multiselectable="true"
                className="overflow-auto max-h-48"
              >
                {filteredOptions.length === 0 ? (
                  <div className="py-4 text-center text-xs text-muted-foreground">No options found.</div>
                ) : (
                  filteredOptions.map((opt, idx) => {
                    const checked = isSelected(opt.value)
                    const isFocused = idx === focusedIndex
                    return (
                      <div
                        key={opt.value}
                        id={`${listboxId}-opt-${idx}`}
                        role="option"
                        tabIndex={-1}
                        aria-selected={checked}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!opt.disabled) toggleOption(opt.value)
                        }}
                        onMouseEnter={() => setFocusedIndex(idx)}
                        className={cn(
                          "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors cursor-pointer select-none",
                          checked
                            ? "bg-accent text-accent-foreground font-medium"
                            : "hover:bg-accent hover:text-accent-foreground text-foreground",
                          isFocused && !checked && "bg-muted text-foreground",
                          opt.disabled && "cursor-not-allowed opacity-50"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {opt.icon && <span className="text-muted-foreground">{opt.icon}</span>}
                          {opt.label}
                        </span>
                        {checked && <Check className="h-3.5 w-3.5 text-primary" />}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </Portal>
        )}
      </div>
    )
  }
)

MultiSelect.displayName = "MultiSelect"

export default MultiSelect
