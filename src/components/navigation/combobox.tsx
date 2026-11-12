"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronsUpDown, Check, Search } from "../../icons"
import { Popover, PopoverTrigger, PopoverContent } from "../layout/popover"
import { useControllableState } from "../../lib/use-controllable-state"
import { VisuallyHiddenInput } from "../../primitives/visually-hidden-input"

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "onChange"> {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  searchable?: boolean
  name?: string
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options = [],
      value,
      defaultValue = "",
      onValueChange,
      placeholder = "Select an option...",
      className,
      disabled = false,
      searchable = true,
      name,
      "aria-label": ariaLabel,
      onKeyDown,
      ...props
    },
    forwardedRef
  ) => {
    const listboxId = React.useId()
    const triggerRef = React.useRef<HTMLButtonElement | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const listRef = React.useRef<HTMLDivElement | null>(null)

    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const [selectedValue, setSelectedValue] = useControllableState<string>({
      prop: value,
      defaultProp: defaultValue,
      onChange: onValueChange,
    })

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchValue) return options
      const query = searchValue.toLowerCase()
      return options.filter((option) =>
        option.label.toLowerCase().includes(query)
      )
    }, [options, searchable, searchValue])

    const selectedOption = React.useMemo(
      () => options.find((opt) => opt.value === selectedValue),
      [options, selectedValue]
    )

    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1)

    // Reset highlighted index when options or open state changes
    React.useEffect(() => {
      if (!open) {
        setHighlightedIndex(-1)
        setSearchValue("")
        return
      }

      const initialIndex = filteredOptions.findIndex(
        (opt) => opt.value === selectedValue && !opt.disabled
      )
      if (initialIndex !== -1) {
        setHighlightedIndex(initialIndex)
      } else {
        const firstActive = filteredOptions.findIndex((opt) => !opt.disabled)
        setHighlightedIndex(firstActive)
      }

      if (searchable) {
        requestAnimationFrame(() => {
          inputRef.current?.focus()
        })
      }
    }, [open, filteredOptions, selectedValue, searchable])

    // Scroll active option into view when navigating
    React.useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const activeItem = listRef.current.querySelector<HTMLElement>('[data-highlighted="true"]')
        if (typeof activeItem?.scrollIntoView === "function") {
          activeItem.scrollIntoView({ block: "nearest" })
        }
      }
    }, [highlightedIndex])

    const handleSelect = React.useCallback(
      (optionValue: string) => {
        setSelectedValue(optionValue)
        setSearchValue("")
        setOpen(false)
        triggerRef.current?.focus()
      },
      [setSelectedValue]
    )

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const nonDisabledIndices = filteredOptions
        .map((opt, i) => (opt.disabled ? -1 : i))
        .filter((i) => i !== -1)

      if (e.key === "ArrowDown") {
        e.preventDefault()
        if (!nonDisabledIndices.length) return
        const currentPos = nonDisabledIndices.indexOf(highlightedIndex)
        const nextPos = currentPos === -1 ? 0 : (currentPos + 1) % nonDisabledIndices.length
        setHighlightedIndex(nonDisabledIndices[nextPos])
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (!nonDisabledIndices.length) return
        const currentPos = nonDisabledIndices.indexOf(highlightedIndex)
        const nextPos =
          currentPos === -1
            ? nonDisabledIndices.length - 1
            : (currentPos - 1 + nonDisabledIndices.length) % nonDisabledIndices.length
        setHighlightedIndex(nonDisabledIndices[nextPos])
      } else if (e.key === "Home") {
        e.preventDefault()
        if (nonDisabledIndices.length) {
          setHighlightedIndex(nonDisabledIndices[0])
        }
      } else if (e.key === "End") {
        e.preventDefault()
        if (nonDisabledIndices.length) {
          setHighlightedIndex(nonDisabledIndices[nonDisabledIndices.length - 1])
        }
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (
          highlightedIndex >= 0 &&
          filteredOptions[highlightedIndex] &&
          !filteredOptions[highlightedIndex].disabled
        ) {
          handleSelect(filteredOptions[highlightedIndex].value)
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e)
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        if (!open) {
          e.preventDefault()
          setOpen(true)
        }
      }
    }

    const highlightedOption =
      highlightedIndex >= 0 ? filteredOptions[highlightedIndex] : undefined

    return (
      <>
        {name && <VisuallyHiddenInput name={name} value={selectedValue || ""} />}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild aria-haspopup="listbox">
            <button
              ref={(node) => {
                triggerRef.current = node
                if (typeof forwardedRef === "function") forwardedRef(node)
                else if (forwardedRef) forwardedRef.current = node
              }}
              type="button"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={open ? listboxId : undefined}
              aria-activedescendant={
                open && highlightedOption
                  ? `${listboxId}-option-${highlightedOption.value}`
                  : undefined
              }
              aria-label={ariaLabel || (selectedOption ? selectedOption.label : placeholder)}
              disabled={disabled}
              onKeyDown={handleTriggerKeyDown}
              className={cn(
                "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground transition-colors shadow-2xs cursor-pointer",
                "focus:outline-none focus:ring-1 focus:ring-ring",
                disabled && "cursor-not-allowed opacity-50",
                className
              )}
              {...props}
            >
              <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground ml-2 opacity-60" aria-hidden="true" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            sideOffset={4}
            className="w-64 min-w-[12rem] p-1 shadow-xl"
          >
            {searchable && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border mb-1">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  role="searchbox"
                  aria-label="Search options"
                  aria-autocomplete="list"
                  aria-controls={listboxId}
                  aria-activedescendant={
                    highlightedOption
                      ? `${listboxId}-option-${highlightedOption.value}`
                      : undefined
                  }
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search..."
                  className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                />
              </div>
            )}

            <div
              id={listboxId}
              ref={listRef}
              role="listbox"
              aria-label={placeholder}
              className="max-h-60 overflow-y-auto"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === selectedValue
                  const isHighlighted = index === highlightedIndex

                  return (
                    <div
                      key={option.value}
                      id={`${listboxId}-option-${option.value}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      data-highlighted={isHighlighted ? "true" : undefined}
                      className={cn(
                        "relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors",
                        isHighlighted
                          ? "bg-accent text-accent-foreground font-medium"
                          : isSelected
                          ? "bg-accent/60 text-accent-foreground font-medium"
                          : "hover:bg-accent hover:text-accent-foreground text-foreground",
                        option.disabled && "pointer-events-none opacity-40"
                      )}
                      onMouseEnter={() => {
                        if (!option.disabled) setHighlightedIndex(index)
                      }}
                      onClick={() => {
                        if (!option.disabled) handleSelect(option.value)
                      }}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-primary shrink-0 ml-2" aria-hidden="true" />
                      )}
                    </div>
                  )
                })
              ) : (
                <div
                  role="status"
                  aria-live="polite"
                  className="px-3 py-2 text-center text-xs text-muted-foreground"
                >
                  No matching options.
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </>
    )
  }
)
Combobox.displayName = "Combobox"

export default Combobox
