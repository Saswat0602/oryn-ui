"use client"

import * as React from "react"
import { Check, ChevronRight, Circle } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"
import { useClickOutside } from "../../lib/use-click-outside"

interface MenubarContextValue {
  activeMenu: string | null
  setActiveMenu: (id: string | null) => void
}

const MenubarContext = React.createContext<MenubarContextValue | null>(null)

interface MenubarMenuContextValue {
  menuId: string
  isOpen: boolean
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>
  triggerRect: DOMRect | null
  updateTriggerRect: () => void
}

const MenubarMenuContext = React.createContext<MenubarMenuContextValue | null>(null)

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, children, ...props }, ref) => {
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
    const menubarRef = React.useRef<HTMLDivElement | null>(null)

    useClickOutside(menubarRef, () => {
      setActiveMenu(null)
    }, activeMenu !== null)

    return (
      <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
        <div
          ref={(node) => {
            menubarRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="menubar"
          className={cn(
            "flex h-9 items-center space-x-1 rounded-xl border border-border bg-background p-1 text-foreground shadow-2xs",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    )
  }
)
Menubar.displayName = "Menubar"

export interface MenubarMenuProps {
  children?: React.ReactNode
}

export const MenubarMenu: React.FC<MenubarMenuProps> = ({ children }) => {
  const generatedId = React.useId()
  const menubarCtx = React.useContext(MenubarContext)
  const isOpen = menubarCtx?.activeMenu === generatedId

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

  const updateTriggerRect = React.useCallback(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect())
    }
  }, [])

  return (
    <MenubarMenuContext.Provider
      value={{
        menuId: generatedId,
        isOpen,
        triggerRef,
        triggerRect,
        updateTriggerRect,
      }}
    >
      <div className="relative inline-block">{children}</div>
    </MenubarMenuContext.Provider>
  )
}

export interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ asChild = false, onClick, onMouseEnter, children, className, ...props }, forwardedRef) => {
    const menubarCtx = React.useContext(MenubarContext)
    const menuCtx = React.useContext(MenubarMenuContext)
    const Comp = asChild ? Slot : "button"

    const isOpen = menuCtx?.isOpen ?? false

    const setMergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        if (menuCtx) menuCtx.triggerRef.current = node
        if (typeof forwardedRef === "function") forwardedRef(node)
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
      },
      [forwardedRef, menuCtx]
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented && menuCtx && menubarCtx) {
        menuCtx.updateTriggerRect()
        menubarCtx.setActiveMenu(isOpen ? null : menuCtx.menuId)
      }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(e)
      if (menubarCtx?.activeMenu && menuCtx && menubarCtx.activeMenu !== menuCtx.menuId) {
        menuCtx.updateTriggerRect()
        menubarCtx.setActiveMenu(menuCtx.menuId)
      }
    }

    return (
      <Comp
        ref={setMergedRef as any}
        type={asChild ? undefined : "button"}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "flex cursor-pointer select-none items-center rounded-lg px-3 py-1 text-xs font-medium outline-none transition-colors",
          isOpen
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
MenubarTrigger.displayName = "MenubarTrigger"

export interface MenubarPortalProps {
  children: React.ReactNode
}

export const MenubarPortal: React.FC<MenubarPortalProps> = ({ children }) => {
  return <>{children}</>
}

export interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", sideOffset = 8, children, style, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext)
    const menuCtx = React.useContext(MenubarMenuContext)

    if (!menuCtx?.isOpen) return null

    const rect = menuCtx.triggerRect || (typeof window !== "undefined" && menuCtx.triggerRef.current ? menuCtx.triggerRef.current.getBoundingClientRect() : null)

    const positioningStyle: React.CSSProperties = rect
      ? {
          position: "fixed",
          top: `${rect.bottom + sideOffset}px`,
          left: align === "end" ? `${rect.right}px` : align === "center" ? `${rect.left + rect.width / 2}px` : `${rect.left}px`,
          transform: align === "end" ? "translateX(-100%)" : align === "center" ? "translateX(-50%)" : undefined,
          zIndex: 70,
        }
      : { zIndex: 70 }

    return (
      <Portal>
        <div
          ref={ref}
          role="menu"
          aria-orientation="vertical"
          style={{ ...positioningStyle, ...style }}
          className={cn(
            "fixed z-[70] min-w-[12rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl duration-150 animate-in fade-in-0 zoom-in-95",
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
MenubarContent.displayName = "MenubarContent"

export interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disabled?: boolean
  onSelect?: () => void
  asChild?: boolean
}

export const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  ({ className, inset, disabled = false, asChild = false, onSelect, onClick, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        menubarCtx?.setActiveMenu(null)
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
MenubarItem.displayName = "MenubarItem"

export interface MenubarCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const MenubarCheckboxItem = React.forwardRef<HTMLDivElement, MenubarCheckboxItemProps>(
  ({ className, children, checked = false, disabled = false, onCheckedChange, onClick, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onCheckedChange?.(!checked)
        menubarCtx?.setActiveMenu(null)
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

export interface MenubarRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  checked?: boolean
  disabled?: boolean
  onSelect?: () => void
}

export const MenubarRadioItem = React.forwardRef<HTMLDivElement, MenubarRadioItemProps>(
  ({ className, children, checked = false, disabled = false, onSelect, onClick, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        menubarCtx?.setActiveMenu(null)
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
MenubarRadioItem.displayName = "MenubarRadioItem"

export interface MenubarLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const MenubarLabel = React.forwardRef<HTMLDivElement, MenubarLabelProps>(
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
MenubarLabel.displayName = "MenubarLabel"

export interface MenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenubarSeparator = React.forwardRef<HTMLDivElement, MenubarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
)
MenubarSeparator.displayName = "MenubarSeparator"

export interface MenubarShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const MenubarShortcut: React.FC<MenubarShortcutProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn("ml-auto text-[10px] tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}
MenubarShortcut.displayName = "MenubarShortcut"

export interface MenubarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenubarGroup = React.forwardRef<HTMLDivElement, MenubarGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("p-1", className)} {...props} />
  )
)
MenubarGroup.displayName = "MenubarGroup"

export interface MenubarSubProps {
  children?: React.ReactNode
}

export const MenubarSub: React.FC<MenubarSubProps> = ({ children }) => {
  return <div className="relative">{children}</div>
}

export interface MenubarSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const MenubarSubTrigger = React.forwardRef<HTMLDivElement, MenubarSubTriggerProps>(
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
MenubarSubTrigger.displayName = "MenubarSubTrigger"

export interface MenubarSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenubarSubContent = React.forwardRef<HTMLDivElement, MenubarSubContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl duration-150 animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  )
)
MenubarSubContent.displayName = "MenubarSubContent"

export interface MenubarRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

export const MenubarRadioGroup = React.forwardRef<HTMLDivElement, MenubarRadioGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("p-1", className)} {...props} />
  )
)
MenubarRadioGroup.displayName = "MenubarRadioGroup"

// Attach compound subcomponents to Menubar
;(Menubar as any).Menu = MenubarMenu
;(Menubar as any).Trigger = MenubarTrigger
;(Menubar as any).Portal = MenubarPortal
;(Menubar as any).Content = MenubarContent
;(Menubar as any).Item = MenubarItem
;(Menubar as any).Separator = MenubarSeparator
;(Menubar as any).Label = MenubarLabel
;(Menubar as any).CheckboxItem = MenubarCheckboxItem
;(Menubar as any).RadioGroup = MenubarRadioGroup
;(Menubar as any).RadioItem = MenubarRadioItem
;(Menubar as any).Group = MenubarGroup
;(Menubar as any).Sub = MenubarSub
;(Menubar as any).SubTrigger = MenubarSubTrigger
;(Menubar as any).SubContent = MenubarSubContent
;(Menubar as any).Shortcut = MenubarShortcut

export default Menubar
