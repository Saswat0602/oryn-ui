"use client"

import * as React from "react"
import { ChevronDown } from "../../icons"
import { cn } from "../../lib/utils"
import { Slot } from "../../lib/slot"
import { Portal } from "../../lib/portal"
import { useId } from "../../hooks/use-id"
import { useClickOutside } from "../../hooks/use-click-outside"
import { useControllableState } from "../../hooks/use-controllable-state"

interface NavigationMenuContextValue {
  value: string | null
  setValue: (value: string | null) => void
  onItemMouseEnter: (value: string) => void
  onItemMouseLeave: () => void
  closeMenu: () => void
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | null>(null)

function useNavigationMenuContext() {
  const context = React.useContext(NavigationMenuContext)
  if (!context) {
    throw new Error("NavigationMenu compound components must be used within a NavigationMenu")
  }
  return context
}

interface NavigationMenuItemContextValue {
  value: string
  isOpen: boolean
  triggerId: string
  contentId: string
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>
  contentRef: React.MutableRefObject<HTMLDivElement | null>
  triggerRect: DOMRect | null
  updateTriggerRect: () => void
  toggle: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const NavigationMenuItemContext = React.createContext<NavigationMenuItemContextValue | null>(null)

function useNavigationMenuItemContext() {
  const context = React.useContext(NavigationMenuItemContext)
  if (!context) {
    throw new Error("NavigationMenuTrigger and NavigationMenuContent must be used within a NavigationMenuItem")
  }
  return context
}

export const navigationMenuTriggerStyle = () =>
  cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer select-none",
    "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    "focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
  )

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  delayDuration?: number
}

export const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      delayDuration = 200,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useControllableState<string | null>({
      prop: controlledValue,
      defaultProp: defaultValue ?? null,
      onChange: (next) => onValueChange?.(next ?? ""),
    })

    const navRef = React.useRef<HTMLElement | null>(null)
    const timeoutRef = React.useRef<any>(null)

    const clearTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    const onItemMouseEnter = (itemValue: string) => {
      clearTimer()
      setValue(itemValue)
    }

    const onItemMouseLeave = () => {
      clearTimer()
      timeoutRef.current = setTimeout(() => {
        setValue(null)
      }, delayDuration)
    }

    const closeMenu = () => {
      clearTimer()
      setValue(null)
    }

    useClickOutside(navRef, closeMenu, value !== null)

    React.useEffect(() => {
      if (value === null) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          closeMenu()
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [value])

    React.useEffect(() => {
      return () => clearTimer()
    }, [])

    return (
      <NavigationMenuContext.Provider
        value={{
          value,
          setValue,
          onItemMouseEnter,
          onItemMouseLeave,
          closeMenu,
        }}
      >
        <nav
          ref={(node) => {
            navRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
          }}
          className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
          {...props}
        >
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    )
  }
)
NavigationMenu.displayName = "NavigationMenu"

export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const NavigationMenuList = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
        {...props}
      >
        {children}
      </ul>
    )
  }
)
NavigationMenuList.displayName = "NavigationMenuList"

export interface NavigationMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value?: string
}

export const NavigationMenuItem = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ value: explicitValue, className, children, ...props }, ref) => {
    const generatedId = useId()
    const value = explicitValue ?? generatedId
    const { value: activeValue, onItemMouseEnter, onItemMouseLeave, setValue } = useNavigationMenuContext()
    const isOpen = activeValue === value
    const triggerId = `${value}-trigger`
    const contentId = `${value}-content`
    const triggerRef = React.useRef<HTMLButtonElement | null>(null)
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

    const updateTriggerRect = React.useCallback(() => {
      if (triggerRef.current) {
        setTriggerRect(triggerRef.current.getBoundingClientRect())
      }
    }, [])

    React.useEffect(() => {
      if (isOpen) {
        updateTriggerRect()
      }
    }, [isOpen, updateTriggerRect])

    const toggle = () => {
      updateTriggerRect()
      setValue(isOpen ? null : value)
    }

    const onMouseEnter = () => {
      updateTriggerRect()
      onItemMouseEnter(value)
    }
    const onMouseLeave = () => onItemMouseLeave()

    return (
      <NavigationMenuItemContext.Provider
        value={{
          value,
          isOpen,
          triggerId,
          contentId,
          triggerRef,
          contentRef,
          triggerRect,
          updateTriggerRect,
          toggle,
          onMouseEnter,
          onMouseLeave,
        }}
      >
        <li
          ref={ref}
          className={cn("relative", className)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          {...props}
        >
          {children}
        </li>
      </NavigationMenuItemContext.Provider>
    )
  }
)
NavigationMenuItem.displayName = "NavigationMenuItem"

export interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  showChevron?: boolean
}

export const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ asChild = false, showChevron = true, className, children, onClick, onKeyDown, ...props }, forwardedRef) => {
    const { isOpen, triggerId, contentId, toggle, triggerRef, contentRef, updateTriggerRect } = useNavigationMenuItemContext()
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        updateTriggerRect()
        toggle()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented) return
      if (e.key === "Tab" && !e.shiftKey && isOpen && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length > 0) {
          e.preventDefault()
          focusable[0].focus()
        }
      }
    }

    return (
      <Comp
        ref={(node: HTMLButtonElement | null) => {
          triggerRef.current = node
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
        }}
        id={triggerId}
        type={asChild ? undefined : "button"}
        aria-expanded={isOpen}
        aria-controls={contentId}
        data-state={isOpen ? "open" : "closed"}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          navigationMenuTriggerStyle(),
          isOpen && "bg-accent text-accent-foreground",
          className
        )}
        {...props}
      >
        {children}
        {!asChild && showChevron && (
          <ChevronDown
            className={cn(
              "relative top-[1px] ml-1.5 h-3.5 w-3.5 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        )}
      </Comp>
    )
  }
)
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  usePortal?: boolean
  sideOffset?: number
}

export const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  (
    {
      className,
      align = "start",
      usePortal = false,
      sideOffset = 6,
      children,
      style,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const { isOpen, contentId, triggerId, triggerRef, contentRef, triggerRect, toggle, onMouseEnter, onMouseLeave } =
      useNavigationMenuItemContext()

    if (!isOpen) return null

    const rect = triggerRect || (typeof window !== "undefined" && triggerRef.current ? triggerRef.current.getBoundingClientRect() : null)

    const alignmentClasses =
      align === "end"
        ? "right-0"
        : align === "center"
        ? "left-1/2 -translate-x-1/2"
        : "left-0"

    const handleContentKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented) return
      if (e.key === "Tab" && e.shiftKey && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length > 0 && document.activeElement === focusable[0]) {
          e.preventDefault()
          triggerRef.current?.focus()
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        toggle()
        triggerRef.current?.focus()
      }
    }

    const contentElement = (
      <div
        ref={(node) => {
          contentRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        data-state={isOpen ? "open" : "closed"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={handleContentKeyDown}
        style={
          usePortal && rect
            ? {
                position: "fixed",
                top: rect.bottom + sideOffset,
                left:
                  align === "end"
                    ? rect.right
                    : align === "center"
                    ? rect.left + rect.width / 2
                    : rect.left,
                transform:
                  align === "end"
                    ? "translateX(-100%)"
                    : align === "center"
                    ? "translateX(-50%)"
                    : undefined,
                zIndex: 70,
                ...style,
              }
            : {
                marginTop: sideOffset,
                ...style,
              }
        }
        className={cn(
          usePortal ? "" : cn("absolute top-full", alignmentClasses),
          "w-max max-w-md rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-xl duration-150 animate-in fade-in-0 zoom-in-95",
          "before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )

    if (usePortal && typeof document !== "undefined") {
      return <Portal>{contentElement}</Portal>
    }

    return contentElement
  }
)
NavigationMenuContent.displayName = "NavigationMenuContent"

export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  active?: boolean
}

export const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ asChild = false, active = false, className, href, children, ...props }, ref) => {
    const Comp = asChild ? Slot : (href ? "a" : "button")

    return (
      <Comp
        ref={ref as any}
        href={href}
        data-active={active ? "true" : undefined}
        className={cn(
          "block select-none rounded-lg p-2.5 text-xs font-medium leading-none text-muted-foreground no-underline outline-none transition-colors cursor-pointer",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground",
          active && "bg-accent text-accent-foreground font-semibold",
          className
        )}
        {...(props as any)}
      >
        {children}
      </Comp>
    )
  }
)
NavigationMenuLink.displayName = "NavigationMenuLink"

export interface NavigationMenuViewportProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavigationMenuViewport = React.forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute left-0 top-full flex justify-center",
          className
        )}
        {...props}
      />
    )
  }
)
NavigationMenuViewport.displayName = "NavigationMenuViewport"

export interface NavigationMenuIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavigationMenuIndicator = React.forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden transition-all duration-200",
          className
        )}
        {...props}
      />
    )
  }
)
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

// Attach compound subcomponents to NavigationMenu
export interface CompoundedNavigationMenu
  extends React.ForwardRefExoticComponent<NavigationMenuProps & React.RefAttributes<HTMLElement>> {
  List: typeof NavigationMenuList
  Item: typeof NavigationMenuItem
  Trigger: typeof NavigationMenuTrigger
  Content: typeof NavigationMenuContent
  Link: typeof NavigationMenuLink
  Viewport: typeof NavigationMenuViewport
  Indicator: typeof NavigationMenuIndicator
}

const CompoundedNavMenu = NavigationMenu as CompoundedNavigationMenu
CompoundedNavMenu.List = NavigationMenuList
CompoundedNavMenu.Item = NavigationMenuItem
CompoundedNavMenu.Trigger = NavigationMenuTrigger
CompoundedNavMenu.Content = NavigationMenuContent
CompoundedNavMenu.Link = NavigationMenuLink
CompoundedNavMenu.Viewport = NavigationMenuViewport
CompoundedNavMenu.Indicator = NavigationMenuIndicator

export default CompoundedNavMenu
