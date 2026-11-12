"use client"

import * as React from "react"
import { Check, ChevronRight, Circle } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"
import { useClickOutside } from "../../lib/use-click-outside"
import { useControllableState } from "../../lib/use-controllable-state"

interface DropdownMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  triggerRect: DOMRect | null
  updateTriggerRect: () => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("DropdownMenu compound components must be used within a DropdownMenu")
  }
  return context
}

export interface DropdownMenuProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [open, setOpen] = useControllableState<boolean>({
    prop: controlledOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  const triggerRef = React.useRef<HTMLElement | null>(null)
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

  const updateTriggerRect = React.useCallback(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect())
    }
  }, [])

  return (
    <DropdownMenuContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        triggerRect,
        updateTriggerRect,
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  )
}

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef, updateTriggerRect } = useDropdownMenuContext()
    const Comp = asChild ? Slot : "button"

    const setMergedRef = React.useCallback(
      (node: HTMLElement | null) => {
        triggerRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node as any)
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<any>).current = node
        }
      },
      [forwardedRef, triggerRef]
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        updateTriggerRect()
        setOpen(!open)
      }
    }

    return (
      <Comp
        ref={setMergedRef as any}
        type={asChild ? undefined : "button"}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

export interface DropdownMenuPortalProps {
  children: React.ReactNode
}

export const DropdownMenuPortal: React.FC<DropdownMenuPortalProps> = ({ children }) => {
  return <>{children}</>
}

export interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenuGroup = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("p-1", className)} {...props} />
  )
)
DropdownMenuGroup.displayName = "DropdownMenuGroup"

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number
  align?: "start" | "center" | "end"
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, sideOffset = 4, align = "start", children, style, ...props }, ref) => {
    const { open, setOpen, triggerRef, triggerRect } = useDropdownMenuContext()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    useClickOutside(contentRef, (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target as Node)) {
        return
      }
      setOpen(false)
    }, open)

    React.useEffect(() => {
      if (!open) return

      // Auto-focus first active menuitem when opening
      const timer = setTimeout(() => {
        if (contentRef.current) {
          const firstItem = contentRef.current.querySelector<HTMLElement>(
            '[role^="menuitem"]:not([aria-disabled="true"]):not([data-disabled])'
          )
          firstItem?.focus()
        }
      }, 10)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
          triggerRef.current?.focus()
        } else if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
          if (!contentRef.current) return
          const items = Array.from(
            contentRef.current.querySelectorAll<HTMLElement>(
              '[role^="menuitem"]:not([aria-disabled="true"]):not([data-disabled])'
            )
          )
          if (!items.length) return
          const activeIndex = items.indexOf(document.activeElement as HTMLElement)
          let nextIndex = 0

          if (e.key === "ArrowDown") {
            e.preventDefault()
            nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % items.length
          } else if (e.key === "ArrowUp") {
            e.preventDefault()
            nextIndex = activeIndex === -1 ? items.length - 1 : (activeIndex - 1 + items.length) % items.length
          } else if (e.key === "Home") {
            e.preventDefault()
            nextIndex = 0
          } else if (e.key === "End") {
            e.preventDefault()
            nextIndex = items.length - 1
          }

          items[nextIndex]?.focus()
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        clearTimeout(timer)
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [open, setOpen, triggerRef])

    if (!open) return null

    const left =
      triggerRect
        ? align === "end"
          ? triggerRect.right
          : align === "center"
          ? triggerRect.left + triggerRect.width / 2
          : triggerRect.left
        : 0

    const transform =
      align === "end"
        ? "translateX(-100%)"
        : align === "center"
        ? "translateX(-50%)"
        : undefined

    const positioningStyle: React.CSSProperties = triggerRect
      ? {
          position: "fixed",
          top: `${triggerRect.bottom + sideOffset}px`,
          left: `${left}px`,
          transform,
        }
      : {}

    return (
      <Portal>
        <div
          ref={(node) => {
            contentRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="menu"
          aria-orientation="vertical"
          style={{ ...positioningStyle, ...style }}
          className={cn(
            "fixed z-[70] min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl duration-150 animate-in fade-in-0 zoom-in-95",
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
DropdownMenuContent.displayName = "DropdownMenuContent"

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disabled?: boolean
  onSelect?: () => void
  asChild?: boolean
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, disabled = false, asChild = false, onSelect, onClick, ...props }, ref) => {
    const { setOpen, triggerRef } = useDropdownMenuContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        setOpen(false)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onClick?.(e as any)
      if (disabled || e.defaultPrevented) return
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onSelect?.()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? undefined : -1}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          inset && "pl-8",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

export interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ className, children, checked = false, disabled = false, onCheckedChange, onClick, ...props }, ref) => {
    const { setOpen } = useDropdownMenuContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onCheckedChange?.(!checked)
        setOpen(false)
      }
    }

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {checked && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
        {children}
      </div>
    )
  }
)
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

export interface DropdownMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  checked?: boolean
  disabled?: boolean
  onSelect?: () => void
}

export const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ className, children, checked = false, disabled = false, onSelect, onClick, ...props }, ref) => {
    const { setOpen } = useDropdownMenuContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        setOpen(false)
      }
    }

    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {checked && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <Circle className="h-2 w-2 fill-current" />
          </span>
        )}
        {children}
      </div>
    )
  }
)
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-2.5 py-1.5 text-xs font-semibold text-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
)
DropdownMenuLabel.displayName = "DropdownMenuLabel"

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
)
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const DropdownMenuShortcut: React.FC<DropdownMenuShortcutProps> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-[10px] tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

// Submenus
export interface DropdownMenuSubProps {
  children?: React.ReactNode
}

export const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({ children }) => {
  return <div className="relative">{children}</div>
}

export interface DropdownMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-lg px-2.5 py-1.5 text-xs outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-3.5 w-3.5" />
    </div>
  )
)
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

export interface DropdownMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-[70] min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl duration-150 animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  )
)
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

export interface DropdownMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

export const DropdownMenuRadioGroup = React.forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("p-1", className)} {...props} />
  )
)
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup"

export default DropdownMenu
