"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Navbar, NavbarProps } from "./navbar"
import { Sidebar, SidebarProps } from "./sidebar"

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  navbar?: NavbarProps
  sidebar?: SidebarProps
  children: React.ReactNode
  sidebarCollapsed?: boolean
  onSidebarCollapsedChange?: (collapsed: boolean) => void
  showNavbar?: boolean
  showSidebar?: boolean
  navbarHeight?: number
  sidebarWidth?: number
  sidebarCollapsedWidth?: number
  contentPadding?: string
  contentMaxWidth?: string
  fullHeight?: boolean
  fixedNavbar?: boolean
  fixedSidebar?: boolean
  overlaySidebar?: boolean
  mobileBreakpoint?: number
  mainId?: string
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ 
    className, 
    navbar,
    sidebar,
    children,
    sidebarCollapsed = false,
    onSidebarCollapsedChange,
    showNavbar = true,
    showSidebar = true,
    navbarHeight = 64,
    sidebarWidth = 280,
    sidebarCollapsedWidth = 80,
    contentPadding = "p-6",
    contentMaxWidth = "max-w-7xl",
    fullHeight = true,
    fixedNavbar = true,
    fixedSidebar = true,
    overlaySidebar = false,
    mobileBreakpoint = 768,
    mainId = "main-content",
    style,
    ...props 
  }, ref) => {
    
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(sidebarCollapsed)
    const [isMobile, setIsMobile] = React.useState(false)
    
    // Handle responsive behavior
    React.useEffect(() => {
      if (typeof window === "undefined" || !window.matchMedia) return
      const mql = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`)
      const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
        setIsMobile(e.matches)
      }
      setIsMobile(mql.matches)
      if (mql.addEventListener) {
        mql.addEventListener('change', onChange)
        return () => mql.removeEventListener('change', onChange)
      } else {
        mql.addListener(onChange)
        return () => mql.removeListener(onChange)
      }
    }, [mobileBreakpoint])
    
    // Handle sidebar collapse
    const handleSidebarCollapsedChange = (collapsed: boolean) => {
      setIsSidebarCollapsed(collapsed)
      onSidebarCollapsedChange?.(collapsed)
    }
    
    // Calculate layout dimensions
    const currentSidebarWidth = isSidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth
    const navbarOffset = showNavbar && fixedNavbar ? navbarHeight : 0
    const sidebarOffset = showSidebar && fixedSidebar && !overlaySidebar && !isMobile ? currentSidebarWidth : 0
    
    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen bg-background text-foreground",
          fullHeight && "h-screen",
          className
        )}
        style={style}
        {...props}
      >
        <a
          href={`#${mainId}`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>

        {/* Navbar */}
        {showNavbar && (
          <Navbar
            {...navbar}
            position={fixedNavbar ? "fixed" : "static"}
            style={{
              ...navbar?.style,
              height: navbarHeight,
              zIndex: 60
            }}
          />
        )}
        
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar
            {...sidebar}
            defaultCollapsed={isSidebarCollapsed}
            onToggle={handleSidebarCollapsedChange}
            style={{
              ...sidebar?.style,
              width: sidebarWidth,
              top: navbarOffset,
              height: `calc(100vh - ${navbarOffset}px)`,
              zIndex: 50
            }}
          />
        )}
        
        {/* Main Content */}
        <main
          id={mainId}
          className={cn(
            "transition-all duration-300 ease-in-out",
            contentPadding,
            contentMaxWidth && "mx-auto"
          )}
          style={{
            marginTop: navbarOffset,
            marginLeft: sidebarOffset,
            minHeight: `calc(100vh - ${navbarOffset}px)`,
            width: sidebarOffset > 0 ? `calc(100% - ${sidebarOffset}px)` : "100%"
          }}
        >
          {children}
        </main>
      </div>
    )
  }
)

Layout.displayName = "Layout"

export { Layout }
