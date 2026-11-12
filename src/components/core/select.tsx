"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { useClickOutside } from "../../lib/use-click-outside"
import { useControllableState } from "../../lib/use-controllable-state"

interface SelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value: string | undefined
  setValue: (value: string) => void
  selectedLabel: string | undefined
  setSelectedLabel: (label: string) => void
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>
  triggerRect: DOMRect | null
  updateTriggerRect: () => void
  disabled?: boolean
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

  const [selectedLabel, setSelectedLabel] = React.useState<string | undefined>(undefined)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

  const updateTriggerRect = React.useCallback(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect())
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

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        setValue,
        selectedLabel,
        setSelectedLabel,
        triggerRef,
        triggerRect,
        updateTriggerRect,
        disabled,
      }}
    >
      {name && (
        <input
          type="hidden"
          name={name}
          value={value ?? ""}
        />
      )}
      {children}
    </SelectContext.Provider>
  )
}

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("p-1", className)} {...props} />
  )
)
SelectGroup.displayName = "SelectGroup"

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
    const { open, setOpen, triggerRef, updateTriggerRect, disabled } = useSelectContext()

    const setMergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
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
      if ((e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && !open && !disabled) {
        e.preventDefault()
        updateTriggerRect()
        setOpen(true)
      } else if (e.key === "Escape" && open) {
        e.preventDefault()
        setOpen(false)
      }
    }

    return (
      <button
        ref={setMergedRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled || props.disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-xs shadow-2xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring aria-invalid:border-destructive aria-invalid:focus:ring-destructive/30 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className={cn("h-4 w-4 opacity-50 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned"
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => {
    const { open, setOpen, triggerRect, triggerRef } = useSelectContext()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    useClickOutside(contentRef, (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target as Node)) {
        return
      }
      setOpen(false)
    }, open)

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false)
          triggerRef.current?.focus()
        }
      }
      if (open) {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
      }
    }, [open, setOpen, triggerRef])

    if (!open) return null

    const shouldFlip = triggerRect
      ? typeof window !== "undefined" && triggerRect.bottom + 260 > window.innerHeight && triggerRect.top > 260
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
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="listbox"
          data-side={shouldFlip ? "top" : "bottom"}
          style={style}
          className={cn(
            "fixed z-[9999] max-h-80 overflow-y-auto rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl duration-150 animate-in fade-in-0 zoom-in-95 p-1",
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

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2.5 py-1.5 text-xs font-semibold text-foreground", className)}
      {...props}
    />
  )
)
SelectLabel.displayName = "SelectLabel"

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value: itemValue, disabled = false, onClick, ...props }, ref) => {
    const { value, setValue, setSelectedLabel, setOpen, triggerRef } = useSelectContext()
    const isSelected = value === itemValue

    React.useEffect(() => {
      if (isSelected && typeof children === "string") {
        setSelectedLabel(children)
      }
    }, [isSelected, children, setSelectedLabel])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        setValue(itemValue)
        if (typeof children === "string") {
          setSelectedLabel(children)
        }
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {isSelected && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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