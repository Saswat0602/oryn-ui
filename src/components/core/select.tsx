"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { useClickOutside } from "../../lib/use-click-outside"
import { useControllableState } from "../../hooks/use-controllable-state"

function safeEscapeId(val: string): string {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(val)
  }
  return encodeURIComponent(val).replace(/[%]/g, "_")
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface SelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value: string | undefined
  setValue: (value: string) => void
  selectedLabel: string | undefined
  setSelectedLabel: (label: string) => void
  registerOptionLabel: (val: string, label: string) => void
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>
  triggerRect: DOMRect | null
  updateTriggerRect: () => void
  disabled?: boolean
  contentId: string
  focusedValue: string | undefined
  setFocusedValue: (val: string | undefined) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select compound components must be used within a Select")
  }
  return context
}

export interface SelectProps {
  children?: React.ReactNode
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  options?: SelectOption[]
  placeholder?: string
  id?: string
}

export const Select: React.FC<SelectProps> = ({
  children,
  name,
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  options,
  placeholder = "Select an option",
  id,
}) => {
  const [value, setValue] = useControllableState<string | undefined>({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: (val) => val !== undefined && onValueChange?.(val),
  })

  const [open, setOpen] = useControllableState<boolean>({
    prop: controlledOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  const labelsMapRef = React.useRef<Map<string, string>>(new Map())
  const [selectedLabel, setSelectedLabel] = React.useState<string | undefined>(() => {
    if (defaultValue && options) {
      const match = options.find((o) => o.value === defaultValue)
      return match?.label
    }
    return undefined
  })

  const [focusedValue, setFocusedValue] = React.useState<string | undefined>(value)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)
  const rawId = React.useId()
  const contentId = `select-content-${rawId}`

  const registerOptionLabel = React.useCallback(
    (val: string, label: string) => {
      labelsMapRef.current.set(val, label)
      if (val === value) {
        setSelectedLabel((prev) => (prev !== label ? label : prev))
      }
    },
    [value]
  )

  React.useEffect(() => {
    if (value !== undefined) {
      const matched = labelsMapRef.current.get(value)
      if (matched) {
        setSelectedLabel(matched)
      } else if (options) {
        const opt = options.find((o) => o.value === value)
        if (opt) setSelectedLabel(opt.label)
      }
    } else {
      setSelectedLabel(undefined)
    }
  }, [value, options])

  const updateTriggerRect = React.useCallback(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect())
    }
  }, [])

  React.useEffect(() => {
    if (!open) return
    updateTriggerRect()
    setFocusedValue(value)
    const handleScrollOrResize = () => updateTriggerRect()
    window.addEventListener("scroll", handleScrollOrResize, true)
    window.addEventListener("resize", handleScrollOrResize)
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true)
      window.removeEventListener("resize", handleScrollOrResize)
    }
  }, [open, updateTriggerRect, value])

  const renderedContent =
    children ||
    (options && (
      <>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </>
    ))

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        setValue,
        selectedLabel,
        setSelectedLabel,
        registerOptionLabel,
        triggerRef,
        triggerRect,
        updateTriggerRect,
        disabled,
        contentId,
        focusedValue,
        setFocusedValue,
      }}
    >
      {name && <input type="hidden" name={name} value={value ?? ""} />}
      {renderedContent}
    </SelectContext.Provider>
  )
}

interface SelectGroupContextValue {
  labelId: string
}

const SelectGroupContext = React.createContext<SelectGroupContextValue | null>(null)

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, children, ...props }, ref) => {
    const rawId = React.useId()
    const labelId = `select-group-label-${rawId}`

    return (
      <SelectGroupContext.Provider value={{ labelId }}>
        <div
          ref={ref}
          role="group"
          aria-labelledby={labelId}
          className={cn("p-1", className)}
          {...props}
        >
          {children}
        </div>
      </SelectGroupContext.Provider>
    )
  }
)
SelectGroup.displayName = "SelectGroup"

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, id, ...props }, ref) => {
    const groupCtx = React.useContext(SelectGroupContext)
    return (
      <div
        ref={ref}
        id={id || groupCtx?.labelId}
        className={cn("px-2.5 py-1.5 text-xs font-semibold text-foreground", className)}
        {...props}
      />
    )
  }
)
SelectLabel.displayName = "SelectLabel"

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string
}

export const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    const { selectedLabel, value } = useSelectContext()
    const content = children || selectedLabel || value || placeholder

    return (
      <span
        ref={ref}
        className={cn(
          "line-clamp-1 block truncate",
          !selectedLabel && !value && placeholder && "text-muted-foreground",
          className
        )}
        {...props}
      >
        {content}
      </span>
    )
  }
)
SelectValue.displayName = "SelectValue"

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, onClick, onKeyDown, ...props }, forwardedRef) => {
    const {
      open,
      setOpen,
      triggerRef,
      updateTriggerRect,
      disabled,
      contentId,
      focusedValue,
    } = useSelectContext()

    const setMergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          ;(forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
        }
      },
      [forwardedRef, triggerRef]
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented && !disabled) {
        updateTriggerRect()
        setOpen(!open)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e)
      if (
        (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") &&
        !open &&
        !disabled
      ) {
        e.preventDefault()
        updateTriggerRect()
        setOpen(true)
      } else if (e.key === "Escape" && open) {
        e.preventDefault()
        setOpen(false)
      }
    }

    const activeDescendant =
      open && focusedValue ? `${contentId}-opt-${safeEscapeId(focusedValue)}` : undefined

    return (
      <button
        ref={setMergedRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? contentId : undefined}
        aria-activedescendant={activeDescendant}
        disabled={disabled || props.disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-2xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer select-none",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned"
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", onKeyDown, ...props }, ref) => {
    const {
      open,
      setOpen,
      triggerRect,
      triggerRef,
      contentId,
      focusedValue,
      setFocusedValue,
      setValue,
    } = useSelectContext()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    useClickOutside(
      contentRef,
      (e) => {
        if (triggerRef.current && triggerRef.current.contains(e.target as Node)) {
          return
        }
        setOpen(false)
      },
      open
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (!contentRef.current) return

      const options = Array.from(
        contentRef.current.querySelectorAll<HTMLDivElement>(
          '[role="option"]:not([data-disabled])'
        )
      )
      if (!options.length) return

      const currentIdx = options.findIndex(
        (el) => el.getAttribute("data-value") === focusedValue
      )

      if (e.key === "ArrowDown") {
        e.preventDefault()
        const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % options.length
        const nextVal = options[nextIdx]?.getAttribute("data-value") || undefined
        setFocusedValue(nextVal)
        options[nextIdx]?.scrollIntoView?.({ block: "nearest" })
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const prevIdx =
          currentIdx === -1
            ? options.length - 1
            : (currentIdx - 1 + options.length) % options.length
        const prevVal = options[prevIdx]?.getAttribute("data-value") || undefined
        setFocusedValue(prevVal)
        options[prevIdx]?.scrollIntoView?.({ block: "nearest" })
      } else if (e.key === "Home") {
        e.preventDefault()
        const firstVal = options[0]?.getAttribute("data-value") || undefined
        setFocusedValue(firstVal)
        options[0]?.scrollIntoView?.({ block: "nearest" })
      } else if (e.key === "End") {
        e.preventDefault()
        const lastVal = options[options.length - 1]?.getAttribute("data-value") || undefined
        setFocusedValue(lastVal)
        options[options.length - 1]?.scrollIntoView?.({ block: "nearest" })
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (focusedValue) {
          setValue(focusedValue)
          setOpen(false)
          triggerRef.current?.focus()
        }
      } else if (e.key === "Escape" || e.key === "Tab") {
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    React.useEffect(() => {
      if (open && contentRef.current) {
        contentRef.current.focus()
      }
    }, [open])

    if (!open) return null

    const shouldFlip = triggerRect
      ? typeof window !== "undefined" &&
        triggerRect.bottom + 260 > window.innerHeight &&
        triggerRect.top > 260
      : false

    const style: React.CSSProperties = triggerRect
      ? {
          position: "fixed",
          top: shouldFlip ? `${triggerRect.top - 4}px` : `${triggerRect.bottom + 4}px`,
          transform: shouldFlip ? "translateY(-100%)" : undefined,
          left: `${triggerRect.left}px`,
          minWidth: `${triggerRect.width}px`,
          maxWidth: "calc(100vw - 32px)",
          zIndex: 9999,
          ...props.style,
        }
      : {
          zIndex: 9999,
          ...props.style,
        }

    return (
      <Portal>
        <div
          ref={(node) => {
            contentRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref)
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          id={contentId}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          aria-activedescendant={
            focusedValue ? `${contentId}-opt-${safeEscapeId(focusedValue)}` : undefined
          }
          data-side={shouldFlip ? "top" : "bottom"}
          style={style}
          className={cn(
            "fixed z-[9999] max-h-80 overflow-y-auto rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl duration-150 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 p-1 focus:outline-none",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </Portal>
    )
  }
)
SelectContent.displayName = "SelectContent"

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value: itemValue, disabled = false, onClick, ...props }, ref) => {
    const {
      value,
      setValue,
      registerOptionLabel,
      setOpen,
      triggerRef,
      contentId,
      focusedValue,
      setFocusedValue,
    } = useSelectContext()
    const isSelected = value === itemValue
    const isFocused = focusedValue === itemValue

    React.useEffect(() => {
      if (typeof children === "string") {
        registerOptionLabel(itemValue, children)
      }
    }, [children, itemValue, registerOptionLabel])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        setValue(itemValue)
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    return (
      <div
        ref={ref}
        id={`${contentId}-opt-${safeEscapeId(itemValue)}`}
        role="option"
        tabIndex={-1}
        data-value={itemValue}
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        onMouseEnter={() => {
          if (!disabled) setFocusedValue(itemValue)
        }}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors",
          isSelected
            ? "bg-accent text-accent-foreground font-semibold"
            : isFocused
            ? "bg-muted text-foreground"
            : "hover:bg-accent hover:text-accent-foreground text-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {isSelected && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
        <span className="truncate">{children}</span>
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
)
SelectSeparator.displayName = "SelectSeparator"

export const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </div>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

export const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </div>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

export default Select
