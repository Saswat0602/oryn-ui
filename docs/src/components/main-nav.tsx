"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { title: "Components", href: "/docs/components" },
  { title: "Charts", href: "/docs/components/chart" },
  { title: "Hooks", href: "/docs/hooks" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Getting Started", href: "/docs/getting-started" },
  { title: "Examples", href: "/docs/examples" },
  { title: "Theme Builder", href: "/theme-builder" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-1 lg:space-x-2">
      {navigation.map((item) => {
        const isActive =
          item.href === "/docs/components"
            ? pathname === "/docs/components" || (pathname.startsWith("/docs/components") && !pathname.startsWith("/docs/components/chart"))
            : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-muted text-foreground font-semibold" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
