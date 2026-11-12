"use client"

import * as React from "react"
import { Check, ChevronRight, Circle } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"
import { useClickOutside } from "../../lib/use-click-outside"
import { useControllableState } from "../../lib/use-controllable-state"

interface ContextMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  coords: { x: number; y: number }
  setCoords: (coords: { x: number; y: number }) => void
  triggerElementRef: React.MutableRefObject<HTMLElement | null>
}

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(null)

function useContextMenuContext() {
  const context = React.useContext(ContextMenuContext)
  if (!context) {
    throw new Error("ContextMenu compound components must be used within a ContextMenu")
  }
  return context
}

export interface ContextMenuProps {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [open, setOpen] = useControllableState<boolean>({
    prop: controlledOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  const [coords, setCoords] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const triggerElementRef = React.useRef<HTMLElement | null>(null)

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, coords, setCoords, triggerElementRef }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  disabled?: boolean
}

export const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ asChild = false, disabled = false, onContextMenu, onKeyDown, children, ...props }, ref) => {
    const { setOpen, setCoords, triggerElementRef } = useContextMenuContext()
    const internalRef = React.useRef<HTMLDivElement | null>(null)

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      onContextMenu?.(e)
      if (!e.defaultPrevented && !disabled) {
        e.preventDefault()
        triggerElementRef.current = e.currentTarget
        setCoords({ x: e.clientX, y: e.clientY })
        setOpen(true)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (!e.defaultPrevented && !disabled) {
        if ((e.shiftKey && e.key === "F10") || e.key === "ContextMenu") {
          e.preventDefault()
          triggerElementRef.current = e.currentTarget
          const rect = e.currentTarget.getBoundingClientRect()
          setCoords({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
          setOpen(true)
        }
      }
    }

    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={(node: HTMLDivElement | null) => {
          internalRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
ContextMenuTrigger.displayName = "ContextMenuTrigger"

export interface ContextMenuPortalProps {
  children: React.ReactNode
}

export const ContextMenuPortal: React.FC<ContextMenuPortalProps> = ({ children }) => {
  return <Portal>{children}</Portal>
}

export interface ContextMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ContextMenuGroup = React.forwardRef<HTMLDivElement, ContextMenuGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("p-1", className)} {...props} />
  )
)
ContextMenuGroup.displayName = "ContextMenuGroup"

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, children, style, ...props }, ref) => {
    const { open, setOpen, coords, triggerElementRef } = useContextMenuContext()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    useClickOutside(contentRef, () => {
      setOpen(false)
    }, open)

    React.useEffect(() => {
      if (!open) return

      // Auto-focus first active menu item
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
          triggerElementRef.current?.focus()
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
    }, [open, setOpen, triggerElementRef])

    if (!open) return null

    // Viewport boundary collision clamping
    const clampedX = typeof window !== "undefined"
      ? Math.max(8, Math.min(coords.x, window.innerWidth - 220))
      : coords.x
    const clampedY = typeof window !== "undefined"
      ? Math.max(8, Math.min(coords.y, window.innerHeight - 280))
      : coords.y

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
          style={{
            position: "fixed",
            top: `${clampedY}px`,
            left: `${clampedX}px`,
            zIndex: 70,
            ...style,
          }}
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
ContextMenuContent.displayName = "ContextMenuContent"

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disabled?: boolean
  onSelect?: () => void
  asChild?: boolean
}

export const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, inset, disabled = false, asChild = false, onSelect, onClick, onKeyDown, ...props }, ref) => {
    const { setOpen, triggerElementRef } = useContextMenuContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        setOpen(false)
        triggerElementRef.current?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      onKeyDown?.(e)
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onSelect?.()
        setOpen(false)
        triggerElementRef.current?.focus()
      }
    }

    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled ? true : undefined}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring",
          inset && "pl-8",
          disabled && "pointer-events-none opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      />
    )
  }
)
ContextMenuItem.displayName = "ContextMenuItem"

export interface ContextMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked = false, disabled = false, onCheckedChange, onClick, onKeyDown, ...props }, ref) => {
    const { setOpen, triggerElementRef } = useContextMenuContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onCheckedChange?.(!checked)
        setOpen(false)
        triggerElementRef.current?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      onKeyDown?.(e)
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onCheckedChange?.(!checked)
        setOpen(false)
        triggerElementRef.current?.focus()
      }
    }

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled ? true : undefined}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring",
          disabled && "pointer-events-none opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {checked && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        )}
        {children}
      </div>
    )
  }
)
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

export interface ContextMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  checked?: boolean
  disabled?: boolean
  onSelect?: () => void
}

export const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, children, checked = false, disabled = false, onSelect, onClick, onKeyDown, ...props }, ref) => {
    const { setOpen, triggerElementRef } = useContextMenuContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        setOpen(false)
        triggerElementRef.current?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      onKeyDown?.(e)
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onSelect?.()
        setOpen(false)
        triggerElementRef.current?.focus()
      }
    }

    return (
      <div
        ref={ref}
        role="menuitemradio"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled ? true : undefined}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring",
          disabled && "pointer-events-none opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {checked && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
          </span>
        )}
        {children}
      </div>
    )
  }
)
ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

export interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const ContextMenuLabel = React.forwardRef<HTMLDivElement, ContextMenuLabelProps>(
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
ContextMenuLabel.displayName = "ContextMenuLabel"

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ContextMenuSeparator = React.forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
)
ContextMenuSeparator.displayName = "ContextMenuSeparator"

export interface ContextMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ContextMenuShortcut: React.FC<ContextMenuShortcutProps> = ({
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
ContextMenuShortcut.displayName = "ContextMenuShortcut"

// Submenus
interface ContextMenuSubContextValue {
  subOpen: boolean
  setSubOpen: (open: boolean) => void
}

const ContextMenuSubContext = React.createContext<ContextMenuSubContextValue | null>(null)

export interface ContextMenuSubProps {
  children?: React.ReactNode
}

export const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children }) => {
  const [subOpen, setSubOpen] = React.useState(false)

  return (
    <ContextMenuSubContext.Provider value={{ subOpen, setSubOpen }}>
      <div
        className="relative"
        onMouseEnter={() => setSubOpen(true)}
        onMouseLeave={() => setSubOpen(false)}
      >
        {children}
      </div>
    </ContextMenuSubContext.Provider>
  )
}

export interface ContextMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const ContextMenuSubTrigger = React.forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ className, inset, children, onKeyDown, ...props }, ref) => {
    const subContext = React.useContext(ContextMenuSubContext)
    const subOpen = subContext?.subOpen ?? false
    const setSubOpen = subContext?.setSubOpen

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (e.key === "ArrowRight") {
        e.preventDefault()
        setSubOpen?.(true)
      }
    }

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={subOpen}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex cursor-default select-none items-center rounded-lg px-2.5 py-1.5 text-xs outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring",
          inset && "pl-8",
          className
        )}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto h-3.5 w-3.5" aria-hidden="true" />
      </div>
    )
  }
)
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger"

export interface ContextMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ContextMenuSubContent = React.forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ className, onKeyDown, ...props }, ref) => {
    const subContext = React.useContext(ContextMenuSubContext)
    const subOpen = subContext?.subOpen ?? false
    const setSubOpen = subContext?.setSubOpen

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (e.key === "ArrowLeft" || e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
        setSubOpen?.(false)
      }
    }

    if (!subOpen) return null

    return (
      <div
        ref={ref}
        role="menu"
        aria-orientation="vertical"
        onKeyDown={handleKeyDown}
        className={cn(
          "absolute left-full top-0 z-[70] min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl duration-150 animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      />
    )
  }
)
ContextMenuSubContent.displayName = "ContextMenuSubContent"

export interface ContextMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

export const ContextMenuRadioGroup = React.forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("p-1", className)} {...props} />
  )
)
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup"

export default ContextMenu
