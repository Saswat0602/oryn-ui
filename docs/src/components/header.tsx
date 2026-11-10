"use client"

import Link from "next/link"
import { MainNav } from "./main-nav"
import { ThemeToggle } from "./ThemeToggle"
import { StyleSwitcher } from "./StyleSwitcher"
import { Menu, X, Search, ExternalLink, Github } from "lucide-react"
import { useState, useEffect } from "react"
import { ComponentSearch } from "./ComponentSearch"
import { DocsSidebar } from "./DocsSidebar"
import { siteConfig } from "@/lib/site-config"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Desktop Nav & Mobile Menu Trigger */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* Mobile Hamburger Menu (< lg) on far left like shadcn */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Open documentation navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:scale-105">
                O
              </div>
              <span className="font-bold text-base tracking-tight text-foreground">
                {siteConfig.fullName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center pl-2">
              <MainNav />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-md bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-medium border border-border/40 cursor-pointer"
              title="Search components (⌘K)"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search docs...</span>
              <kbd className="pointer-events-none hidden sm:inline-flex h-4 select-none items-center gap-0.5 rounded border border-border/60 bg-muted px-1 font-mono text-[9px] font-medium">
                <span>⌘</span>K
              </kbd>
            </button>

            {/* npm Link (Desktop) */}
            <a 
              href={siteConfig.links.npm} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
              title={`View on npm (${siteConfig.packageName})`}
            >
              <span className="font-bold text-red-500 text-xs tracking-tighter">npm</span>
              <span className="hidden xl:inline text-[11px] text-muted-foreground/80">{siteConfig.version}</span>
            </a>

            {/* GitHub Link */}
            <a 
              href={siteConfig.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className="p-1.5 sm:p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="View source on GitHub"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            
            <div className="hidden sm:block w-px h-4 bg-border/60 mx-0.5" />
            <StyleSwitcher />
            <div className="hidden sm:block w-px h-4 bg-border/60 mx-0.5" />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Slide-over Sheet Drawer (shadcn-style) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-card border-r border-border shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/20">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2.5"
                >
                  <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-sm">
                    O
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm tracking-tight text-foreground">{siteConfig.fullName}</span>
                    <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono font-semibold">{siteConfig.version}</span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Style & Theme Selectors for Mobile */}
              <div className="p-3 border-b border-border/40 bg-muted/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Style &amp; Theme</span>
                  <ThemeToggle />
                </div>
                <StyleSwitcher variant="full" />
              </div>

              {/* Scrollable Navigation Tree */}
              <div className="flex-1 overflow-y-auto no-scrollbar scrollbar-none">
                <DocsSidebar onItemClick={() => setIsMobileMenuOpen(false)} />
              </div>

              {/* Drawer Footer with Links */}
              <div className="p-3 border-t border-border/40 bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
                <a 
                  href={siteConfig.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
                <a 
                  href={siteConfig.links.npm} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 hover:text-foreground transition-colors"
                >
                  <span className="font-bold text-red-500 text-xs">npm</span>
                  <span>{siteConfig.version}</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Search Modal */}
      {isSearchOpen && (
        <ComponentSearch onClose={() => setIsSearchOpen(false)} />
      )}
    </header>
  )
}
