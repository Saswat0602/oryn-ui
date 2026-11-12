"use client"

import React, { useState, createContext, useContext, useEffect, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Settings,
  LogOut,
  PanelLeft,
} from "../../icons"
import { cn } from "../../lib/utils"

// Context for shadcn-style Sidebar orchestration
export interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
  state: "expanded" | "collapsed"
  isMobile: boolean
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext)
  if (!context) {
    // Graceful fallback for standalone usage without Provider
    return {
      open: true,
      setOpen: () => {},
      toggleSidebar: () => {},
      state: "expanded",
      isMobile: false,
    }
  }
  return context
}

export interface SidebarProviderProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children: React.ReactNode
}

export const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ defaultOpen = true, open: controlledOpen, onOpenChange, className, children, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(value)
        }
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange]
    )

    const toggleSidebar = useCallback(() => {
      setOpen(!open)
    }, [open, setOpen])

    // Keyboard shortcut (Cmd+B / Ctrl+B)
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault()
          toggleSidebar()
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    const contextValue: SidebarContextValue = {
      open,
      setOpen,
      toggleSidebar,
      state: open ? "expanded" : "collapsed",
      isMobile,
    }

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("flex min-h-screen w-full relative", className)}
          data-state={contextValue.state}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

export interface SidebarItem {
  id?: string
  label: string
  icon?: any
  active?: boolean
  badge?: string | number
  badgeColor?: string
  shortcut?: string
  disabled?: boolean
  onClick?: () => void
}

export interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  title?: string
  subtitle?: string
  items?: SidebarItem[]
  sections?: SidebarSection[]

  // Brand / Header
  logo?: React.ReactNode
  logoSize?: string
  showAvatar?: boolean
  avatarUrl?: string
  userName?: string
  userRole?: string

  // Sizing & Theme
  width?: string
  collapsedWidth?: string
  theme?: "default" | "card" | "transparent"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  side?: "left" | "right"

  // Interactive
  defaultCollapsed?: boolean
  collapsed?: boolean
  showToggleButton?: boolean
  position?: "left" | "right"
  onToggle?: (collapsed: boolean) => void

  // Search & Footer
  showSearch?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  showFooter?: boolean
  footerContent?: React.ReactNode

  // Callbacks
  onItemClick?: (item: SidebarItem, index: number, sectionIndex?: number) => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      title = "Dashboard",
      subtitle = "",
      items = [],
      sections = [],

      logo = null,
      logoSize = "w-6 h-6",
      showAvatar = false,
      avatarUrl = "",
      userName = "Jane Doe",
      userRole = "Workspace Admin",

      width = "w-64",
      collapsedWidth = "w-16",
      theme = "default",
      variant = "sidebar",
      collapsible = "icon",
      side = "left",

      defaultCollapsed = false,
      collapsed: controlledCollapsed,
      showToggleButton = true,
      position = "left",
      onToggle,

      showSearch = false,
      searchPlaceholder = "Quick search...",
      onSearch = () => {},
      showFooter = true,
      footerContent = null,

      onItemClick = () => {},

      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
    const [searchQuery, setSearchQuery] = useState("")

    const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

    const handleToggle = () => {
      const next = !isCollapsed
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(next)
      }
      onToggle?.(next)
    }

    const handleItemClick = (item: SidebarItem, index: number, sectionIndex?: number) => {
      if (item.disabled) return
      item.onClick?.()
      onItemClick(item, index, sectionIndex)
    }

    const filteredItems = items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // If declarative children are passed, render clean shell
    if (children) {
      return (
        <aside
          ref={ref}
          aria-label={props["aria-label"] || "Sidebar navigation"}
          className={cn(
            "flex flex-col h-full border-r border-border/80 bg-card text-card-foreground select-none transition-all duration-200",
            isCollapsed ? collapsedWidth : width,
            position === "right" && "border-r-0 border-l border-border/80 ml-auto",
            className
          )}
          {...props}
        >
          {children}
        </aside>
      )
    }

    const renderItemsList = (itemsToRender: SidebarItem[], sectionIndex?: number) => {
      return itemsToRender.map((item, index) => {
        const Icon = item.icon
        const isActive = item.active

        return (
          <li key={item.id || `${sectionIndex}-${index}`}>
            <button
              type="button"
              onClick={() => handleItemClick(item, index, sectionIndex)}
              disabled={item.disabled}
              className={cn(
                "group relative w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer select-none",
                isActive
                  ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                isCollapsed && "justify-center px-0",
                item.disabled && "opacity-40 pointer-events-none cursor-not-allowed"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
              )}

              {!isCollapsed && (
                <>
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-1.5 py-0.2 text-[10px] font-mono rounded-full bg-muted text-muted-foreground border border-border/50">
                      {item.badge}
                    </span>
                  )}
                  {item.shortcut && (
                    <span className="ml-auto text-[10px] font-mono text-muted-foreground/60 border border-border/60 rounded px-1 py-0.2 bg-muted/30">
                      {item.shortcut}
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 hidden group-hover:flex group-focus-visible:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border bg-popover text-popover-foreground text-xs shadow-lg z-50 whitespace-nowrap pointer-events-none duration-150 animate-in fade-in-0 zoom-in-95",
                    position === "right" ? "right-full mr-2" : "left-full ml-2"
                  )}
                >
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] font-mono rounded-full bg-muted text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          </li>
        )
      })
    }

    return (
      <aside
        ref={ref}
        id={props.id || "sidebar-navigation"}
        aria-label={props["aria-label"] || "Sidebar navigation"}
        className={cn(
          "flex flex-col h-full border-r border-border/80 bg-card text-card-foreground select-none transition-all duration-200",
          isCollapsed ? collapsedWidth : width,
          position === "right" && "border-r-0 border-l border-border/80 ml-auto",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-border/60">
          <div className={cn("flex items-center gap-2.5 overflow-hidden", isCollapsed && "justify-center w-full")}>
            {logo && <div className={cn(logoSize, "shrink-0 flex items-center justify-center")}>{logo}</div>}
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-xs text-foreground tracking-tight truncate leading-tight">
                  {title}
                </span>
                {subtitle && (
                  <span className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                    {subtitle}
                  </span>
                )}
              </div>
            )}
          </div>

          {showToggleButton && !isCollapsed && (
            <button
              type="button"
              onClick={handleToggle}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Collapse sidebar"
              aria-expanded={!isCollapsed}
              aria-controls="sidebar-navigation"
            >
              {position === "right" ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Search */}
        {showSearch && !isCollapsed && (
          <div className="px-3 pt-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  onSearch(e.target.value)
                }}
                className="w-full h-8 pl-8 pr-3 rounded-lg border border-border/80 bg-muted/40 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:bg-background transition-all"
              />
            </div>
          </div>
        )}

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {sections.length > 0 ? (
            sections.map((section, sectionIdx) => (
              <div key={section.title || sectionIdx} className="space-y-1">
                {!isCollapsed && section.title && (
                  <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    {section.title}
                  </div>
                )}
                <ul className="space-y-0.5 list-none p-0 m-0">
                  {renderItemsList(section.items, sectionIdx)}
                </ul>
              </div>
            ))
          ) : (
            <ul className="space-y-0.5 list-none p-0 m-0">
              {renderItemsList(showSearch ? filteredItems : items)}
            </ul>
          )}
        </div>

        {/* Collapsed state Expand Toggle */}
        {showToggleButton && isCollapsed && (
          <div className="p-2 border-t border-border/60 flex items-center justify-center">
            <button
              type="button"
              onClick={handleToggle}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Expand sidebar"
              aria-expanded={false}
              aria-controls="sidebar-navigation"
            >
              {position === "right" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Footer */}
        {showFooter && (
          <div className="mt-auto p-2 border-t border-border/60">
            {footerContent ? (
              footerContent
            ) : showAvatar ? (
              <div
                className={cn(
                  "flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-accent/60 transition-colors cursor-pointer",
                  isCollapsed && "justify-center p-1"
                )}
              >
                <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground border border-border/80 flex items-center justify-center font-semibold text-xs shrink-0 overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-medium text-foreground truncate leading-none">
                      {userName}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                      {userRole}
                    </span>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}
      </aside>
    )
  }
)

Sidebar.displayName = "Sidebar"

// Composable Compound Subcomponents
export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1 p-3.5 border-b border-border/60", className)} {...props} />
  )
)
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto px-2 py-3 space-y-4", className)} {...props} />
  )
)
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-auto p-2 border-t border-border/60", className)} {...props} />
  )
)
SidebarFooter.displayName = "SidebarFooter"

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-1", className)} {...props} />
  )
)
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70", className)} {...props} />
  )
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("space-y-0.5 list-none p-0 m-0", className)} {...props} />
  )
)
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("relative", className)} {...props} />
  )
)
SidebarMenuItem.displayName = "SidebarMenuItem"

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean; asChild?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left select-none",
      isActive
        ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
      className
    )}
    {...props}
  />
))
SidebarMenuButton.displayName = "SidebarMenuButton"

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, children, ...props }, ref) => {
  const { open, toggleSidebar } = useSidebar()
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e)
        toggleSidebar()
      }}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label="Toggle Sidebar"
      aria-expanded={open}
      aria-controls="sidebar-navigation"
      {...props}
    >
      {children || <PanelLeft className="h-4 w-4" />}
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      ref={ref}
      type="button"
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar Rail"
      tabIndex={-1}
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex cursor-w-resize",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      "relative flex min-h-screen flex-1 flex-col bg-background transition-all duration-200 ease-in-out",
      className
    )}
    {...props}
  />
))
SidebarInset.displayName = "SidebarInset"

export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ml-auto flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-[10px] font-medium tabular-nums bg-muted text-muted-foreground",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-border/60 px-2.5 py-0.5 list-none",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

export const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
))
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

export const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-xs font-normal text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors cursor-pointer text-left",
      isActive && "bg-accent font-medium text-foreground",
      className
    )}
    {...props}
  />
))
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

// Attach compound subcomponents to Sidebar
;(Sidebar as any).Provider = SidebarProvider
;(Sidebar as any).Header = SidebarHeader
;(Sidebar as any).Content = SidebarContent
;(Sidebar as any).Footer = SidebarFooter
;(Sidebar as any).Group = SidebarGroup
;(Sidebar as any).GroupLabel = SidebarGroupLabel
;(Sidebar as any).Menu = SidebarMenu
;(Sidebar as any).MenuItem = SidebarMenuItem
;(Sidebar as any).MenuButton = SidebarMenuButton
;(Sidebar as any).Trigger = SidebarTrigger
;(Sidebar as any).Rail = SidebarRail
;(Sidebar as any).Inset = SidebarInset
;(Sidebar as any).MenuBadge = SidebarMenuBadge
;(Sidebar as any).MenuSub = SidebarMenuSub
;(Sidebar as any).MenuSubItem = SidebarMenuSubItem
;(Sidebar as any).MenuSubButton = SidebarMenuSubButton

export default Sidebar
export { Sidebar }
