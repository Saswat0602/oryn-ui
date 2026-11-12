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
  menubarRef: React.RefObject<HTMLDivElement | null>
  switchMenu: (direction: "next" | "prev", openNewMenu?: boolean) => void
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

    const switchMenu = React.useCallback(
      (direction: "next" | "prev", openNewMenu = false) => {
        if (!menubarRef.current) return
        const triggers = Array.from(
          menubarRef.current.querySelectorAll<HTMLButtonElement>('button[data-menubar-trigger="true"]')
        )
        if (!triggers.length) return

        const activeIndex = triggers.findIndex(
          (t) => t.getAttribute("data-menu-id") === activeMenu || t === document.activeElement
        )
        let nextIndex = 0

        if (activeIndex !== -1) {
          nextIndex =
            direction === "next"
              ? (activeIndex + 1) % triggers.length
              : (activeIndex - 1 + triggers.length) % triggers.length
        } else {
          nextIndex = direction === "next" ? 0 : triggers.length - 1
        }

        const nextTrigger = triggers[nextIndex]
        if (nextTrigger) {
          nextTrigger.focus()
          if (openNewMenu) {
            const nextId = nextTrigger.getAttribute("data-menu-id")
            if (nextId) setActiveMenu(nextId)
          }
        }
      },
      [activeMenu]
    )

    useClickOutside(
      menubarRef,
      () => {
        setActiveMenu(null)
      },
      activeMenu !== null
    )

    const contextValue = React.useMemo(
      () => ({
        activeMenu,
        setActiveMenu,
        menubarRef,
        switchMenu,
      }),
      [activeMenu, switchMenu]
    )

    return (
      <MenubarContext.Provider value={contextValue}>
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
  ({ asChild = false, onClick, onMouseEnter, onKeyDown, children, className, ...props }, forwardedRef) => {
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e)
      if (e.key === "ArrowRight") {
        e.preventDefault()
        menubarCtx?.switchMenu("next", isOpen)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        menubarCtx?.switchMenu("prev", isOpen)
      } else if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (menuCtx && menubarCtx) {
          menuCtx.updateTriggerRect()
          menubarCtx.setActiveMenu(menuCtx.menuId)
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        menubarCtx?.setActiveMenu(null)
      }
    }

    return (
      <Comp
        ref={setMergedRef as any}
        type={asChild ? undefined : "button"}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-menubar-trigger="true"
        data-menu-id={menuCtx?.menuId}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex cursor-pointer select-none items-center rounded-lg px-3 py-1 text-xs font-medium outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ring",
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
  return <Portal>{children}</Portal>
}

export interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", sideOffset = 8, children, style, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext)
    const menuCtx = React.useContext(MenubarMenuContext)
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      if (!menuCtx?.isOpen) return

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
          menubarCtx?.setActiveMenu(null)
          menuCtx.triggerRef.current?.focus()
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
        } else if (e.key === "ArrowRight") {
          const active = document.activeElement as HTMLElement | null
          if (active && active.getAttribute("aria-haspopup") === "menu") {
            // Let submenu handle ArrowRight
            return
          }
          e.preventDefault()
          menubarCtx?.switchMenu("next", true)
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          menubarCtx?.switchMenu("prev", true)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => {
        clearTimeout(timer)
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [menuCtx?.isOpen, menubarCtx, menuCtx])

    if (!menuCtx?.isOpen) return null

    const rect =
      menuCtx.triggerRect ||
      (typeof window !== "undefined" && menuCtx.triggerRef.current
        ? menuCtx.triggerRef.current.getBoundingClientRect()
        : null)

    const maxLeft = (typeof window !== "undefined" ? window.innerWidth : 1024) - 220
    const clampedLeft = rect ? Math.max(8, Math.min(rect.left, maxLeft)) : 8

    const positioningStyle: React.CSSProperties = rect
      ? {
          position: "fixed",
          top: `${rect.bottom + sideOffset}px`,
          left: align === "end" ? `${rect.right}px` : align === "center" ? `${rect.left + rect.width / 2}px` : `${clampedLeft}px`,
          transform: align === "end" ? "translateX(-100%)" : align === "center" ? "translateX(-50%)" : undefined,
          zIndex: 70,
        }
      : { zIndex: 70 }

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
  ({ className, inset, disabled = false, asChild = false, onSelect, onClick, onKeyDown, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext)
    const menuCtx = React.useContext(MenubarMenuContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        menubarCtx?.setActiveMenu(null)
        menuCtx?.triggerRef.current?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      onKeyDown?.(e)
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onSelect?.()
        menubarCtx?.setActiveMenu(null)
        menuCtx?.triggerRef.current?.focus()
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
MenubarItem.displayName = "MenubarItem"

export interface MenubarCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const MenubarCheckboxItem = React.forwardRef<HTMLDivElement, MenubarCheckboxItemProps>(
  ({ className, children, checked = false, disabled = false, onCheckedChange, onClick, onKeyDown, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext)
    const menuCtx = React.useContext(MenubarMenuContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onCheckedChange?.(!checked)
        menubarCtx?.setActiveMenu(null)
        menuCtx?.triggerRef.current?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      onKeyDown?.(e)
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onCheckedChange?.(!checked)
        menubarCtx?.setActiveMenu(null)
        menuCtx?.triggerRef.current?.focus()
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

export interface MenubarRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  checked?: boolean
  disabled?: boolean
  onSelect?: () => void
}

export const MenubarRadioItem = React.forwardRef<HTMLDivElement, MenubarRadioItemProps>(
  ({ className, children, checked = false, disabled = false, onSelect, onClick, onKeyDown, ...props }, ref) => {
    const menubarCtx = React.useContext(MenubarContext)
    const menuCtx = React.useContext(MenubarMenuContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        onSelect?.()
        menubarCtx?.setActiveMenu(null)
        menuCtx?.triggerRef.current?.focus()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      onKeyDown?.(e)
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onSelect?.()
        menubarCtx?.setActiveMenu(null)
        menuCtx?.triggerRef.current?.focus()
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
      role="separator"
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

// Submenus
interface MenubarSubContextValue {
  subOpen: boolean
  setSubOpen: (open: boolean) => void
}

const MenubarSubContext = React.createContext<MenubarSubContextValue | null>(null)

export interface MenubarSubProps {
  children?: React.ReactNode
}

export const MenubarSub: React.FC<MenubarSubProps> = ({ children }) => {
  const [subOpen, setSubOpen] = React.useState(false)

  return (
    <MenubarSubContext.Provider value={{ subOpen, setSubOpen }}>
      <div
        className="relative"
        onMouseEnter={() => setSubOpen(true)}
        onMouseLeave={() => setSubOpen(false)}
      >
        {children}
      </div>
    </MenubarSubContext.Provider>
  )
}

export interface MenubarSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const MenubarSubTrigger = React.forwardRef<HTMLDivElement, MenubarSubTriggerProps>(
  ({ className, inset, children, onKeyDown, ...props }, ref) => {
    const subContext = React.useContext(MenubarSubContext)
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
MenubarSubTrigger.displayName = "MenubarSubTrigger"

export interface MenubarSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenubarSubContent = React.forwardRef<HTMLDivElement, MenubarSubContentProps>(
  ({ className, onKeyDown, ...props }, ref) => {
    const subContext = React.useContext(MenubarSubContext)
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
