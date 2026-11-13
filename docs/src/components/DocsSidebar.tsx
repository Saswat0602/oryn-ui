"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Search, BookOpen, Layers, Download, Sparkles, Palette, Sliders, X } from 'lucide-react'
import { getAllComponents } from '@/lib/component-registry'
import { ComponentCategory } from '@/types/component'

interface DocsSidebarProps {
  onItemClick?: () => void
}

const CATEGORY_ORDER: ComponentCategory[] = [
  'AI & Agents',
  'Core',
  'Form',
  'Layout',
  'Navigation',
  'Overlay',
  'Data Display',
  'Feedback',
  'Media'
]

const CATEGORY_DISPLAY_LABELS: Record<string, string> = {
  'AI & Agents': 'AI & Agentic UI',
  'Core': 'Core & Primitives',
  'Form': 'Forms & Inputs',
  'Layout': 'Layout & Disclosure',
  'Overlay': 'Overlays & Dialogs',
  'Navigation': 'Navigation',
  'Data Display': 'Data Display & Media',
  'Feedback': 'Feedback',
  'Media': 'Media & Typography',
}

export function DocsSidebar({ onItemClick }: DocsSidebarProps) {
  const pathname = usePathname()
  const [filterQuery, setFilterQuery] = useState('')

  const allComponents = getAllComponents()
  
  const filteredComponents = filterQuery.trim()
    ? allComponents.filter(c => 
        c.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : allComponents

  const categories = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = filteredComponents.filter(c => c.category === cat)
    if (items.length > 0) {
      acc[cat] = items
    }
    return acc
  }, {} as Record<string, typeof allComponents>)

  return (
    <aside className="w-full h-full flex flex-col text-sm">
      {/* Search within sidebar */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter components..."
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border/50 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50 transition-colors"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              aria-label="Clear component search filter"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Nav List with scroll */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-thin"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border) transparent',
        }}
      >
        {/* Getting Started Links */}
        {!filterQuery && (
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider px-2 py-1">
              Overview
            </h4>
            <div className="space-y-0.5">
              {[
                { title: "Introduction", href: "/docs/getting-started", icon: BookOpen },
                { title: "Installation", href: "/docs/installation", icon: Download },
                { title: "All Components", href: "/docs/components", icon: Layers },
                { title: "Headless Hooks", href: "/docs/hooks", icon: Sliders },
                { title: "Examples", href: "/docs/examples", icon: Sparkles },
                { title: "Theme Builder", href: "/theme-builder", icon: Palette },
              ].map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onItemClick}
                    className={cn(
                      "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <link.icon className="h-3.5 w-3.5 opacity-70" />
                    <span>{link.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Categorized Components */}
        <div className="space-y-5">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className="space-y-1">
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wider">
                  {CATEGORY_DISPLAY_LABELS[category] || category}
                </span>
                <span className="text-[10px] text-muted-foreground/60 font-mono">
                  {items.length}
                </span>
              </div>
              <div className="space-y-0.5">
                {items.map((component) => {
                  const href = `/docs/components/${component.slug}`
                  const isActive = pathname === href

                  return (
                    <Link
                      key={component.slug}
                      href={href}
                      onClick={onItemClick}
                      className={cn(
                        "group flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary -ml-[2px]"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      )}
                    >
                      <span className="truncate">{component.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredComponents.length === 0 && (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No components match &quot;{filterQuery}&quot;
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
