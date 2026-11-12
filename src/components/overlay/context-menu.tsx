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

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, coords, setCoords }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  disabled?: boolean
}

export const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ asChild = false, disabled = false, onContextMenu, children, ...props }, ref) => {
    const { setOpen, setCoords } = useContextMenuContext()
    const Comp = asChild ? Slot : "div"

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      onContextMenu?.(e)
      if (!e.defaultPrevented && !disabled) {
        e.preventDefault()
        setCoords({ x: e.clientX, y: e.clientY })
        setOpen(true)
      }
    }

    return (
      <Comp
        ref={ref as any}
        onContextMenu={handleContextMenu}
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
  return <>{children}</>
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
    const { open, setOpen, coords } = useContextMenuContext()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    useClickOutside(contentRef, () => {
      setOpen(false)
    }, open)

    React.useEffect(() => {
      if (!open) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, setOpen])

    if (!open) return null

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
            top: `${coords.y}px`,
            left: `${coords.x}px`,
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
  ({ className, inset, disabled = false, asChild = false, onSelect, onClick, ...props }, ref) => {
    const { setOpen } = useContextMenuContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        setOpen(false)
      }
    }

    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
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
ContextMenuItem.displayName = "ContextMenuItem"

export interface ContextMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked = false, disabled = false, onCheckedChange, onClick, ...props }, ref) => {
    const { setOpen } = useContextMenuContext()

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
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

export interface ContextMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  checked?: boolean
  disabled?: boolean
  onSelect?: () => void
}

export const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, children, checked = false, disabled = false, onSelect, onClick, ...props }, ref) => {
    const { setOpen } = useContextMenuContext()

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
export interface ContextMenuSubProps {
  children?: React.ReactNode
}

export const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children }) => {
  return <div className="relative">{children}</div>
}

export interface ContextMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const ContextMenuSubTrigger = React.forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
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
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger"

export interface ContextMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ContextMenuSubContent = React.forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
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
