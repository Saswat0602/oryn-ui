"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronRight, MoreHorizontal, Home } from "../../icons"

// ==========================================
// Composable Compound Primitives (shadcn/ui Parity)
// ==========================================

export interface BreadcrumbRootProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
  separatorVariant?: "slash" | "chevron" | "arrow" | "dot" | "custom"
  separatorClassName?: string
}

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
)
BreadcrumbList.displayName = "BreadcrumbList"

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild = false, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn("transition-colors hover:text-foreground font-medium text-muted-foreground", className)}
        {...props}
      />
    )
  }
)
BreadcrumbLink.displayName = "BreadcrumbLink"

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-semibold text-foreground tracking-tight", className)}
      {...props}
    />
  )
)
BreadcrumbPage.displayName = "BreadcrumbPage"

export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<"li"> {
  variant?: "slash" | "chevron" | "arrow" | "dot" | "custom"
}

export const BreadcrumbSeparator = ({
  children,
  className,
  variant = "chevron",
  ...props
}: BreadcrumbSeparatorProps) => {
  const renderIcon = () => {
    if (children) return children
    switch (variant) {
      case "chevron":
        return <ChevronRight className="h-3.5 w-3.5" />
      case "slash":
        return <span className="opacity-60 select-none font-mono">/</span>
      case "arrow":
        return <span className="opacity-70 select-none">→</span>
      case "dot":
        return <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50 select-none" />
      default:
        return <ChevronRight className="h-3.5 w-3.5" />
    }
  }

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5 text-muted-foreground/60 inline-flex items-center select-none", className)}
      {...props}
    >
      {renderIcon()}
    </li>
  )
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-8 w-8 items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

// ==========================================
// Primary Composite Breadcrumbs (Array + Compound Support)
// ==========================================

export interface BreadcrumbItemData {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
}

export type BreadcrumbsItem = BreadcrumbItemData

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItemData[]
  separator?: React.ReactNode
  separatorVariant?: "slash" | "chevron" | "arrow" | "dot" | "custom"
  separatorClassName?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "minimal" | "outlined" | "modern" | "card" | "pill" | "steps"
  showHomeIcon?: boolean
  homeIcon?: React.ReactNode
  maxItems?: number
  fullWidth?: boolean
  children?: React.ReactNode
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      items,
      separator,
      separatorVariant = "chevron",
      separatorClassName,
      size = "md",
      variant = "default",
      showHomeIcon = false,
      homeIcon,
      maxItems,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    // If children are passed, use composable compound mode
    if (children) {
      return (
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(
            "flex items-center",
            fullWidth && "w-full",
            className
          )}
          {...props}
        >
          {children}
        </nav>
      )
    }

    const sizeClasses = {
      sm: "text-xs gap-1 sm:gap-1.5",
      md: "text-sm gap-1.5 sm:gap-2",
      lg: "text-base gap-2 sm:gap-3",
    }

    const processedItems = items || []

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          "flex items-center",
          variant === "outlined" && "p-2.5 rounded-xl border border-border/80 bg-card/60 shadow-xs",
          variant === "modern" && "p-3 rounded-2xl border border-border/60 bg-muted/30 backdrop-blur-xs",
          variant === "pill" && "px-4 py-2 rounded-full border border-border/70 bg-muted/40",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        <BreadcrumbList className={sizeClasses[size]}>
          {showHomeIcon && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" aria-label="Home">
                  {homeIcon || <Home className="h-3.5 w-3.5" />}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator
                variant={separatorVariant}
                className={separatorClassName}
              >
                {separator}
              </BreadcrumbSeparator>
            </>
          )}

          {processedItems.map((item, index) => {
            const isLast = index === processedItems.length - 1

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={cn(item.disabled && "opacity-50 pointer-events-none")}>
                      {item.icon && <span className="mr-1.5 inline-flex">{item.icon}</span>}
                      {item.label}
                    </BreadcrumbPage>
                  ) : item.href ? (
                    <BreadcrumbLink
                      href={item.href}
                      className={cn(item.disabled && "opacity-50 pointer-events-none")}
                    >
                      {item.icon && <span className="mr-1.5 inline-flex">{item.icon}</span>}
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <button
                      type="button"
                      onClick={item.onClick}
                      disabled={item.disabled}
                      className="transition-colors hover:text-foreground font-medium text-muted-foreground cursor-pointer disabled:opacity-50"
                    >
                      {item.icon && <span className="mr-1.5 inline-flex">{item.icon}</span>}
                      {item.label}
                    </button>
                  )}
                </BreadcrumbItem>

                {!isLast && (
                  <BreadcrumbSeparator
                    variant={separatorVariant}
                    className={separatorClassName}
                  >
                    {separator}
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </nav>
    )
  }
)
Breadcrumbs.displayName = "Breadcrumbs"

// Alias for shadcn/ui naming convention
export const Breadcrumb = Breadcrumbs

// Compound component attachments
export type BreadcrumbsComponent = typeof Breadcrumbs & {
  List: typeof BreadcrumbList
  Item: typeof BreadcrumbItem
  Link: typeof BreadcrumbLink
  Page: typeof BreadcrumbPage
  Separator: typeof BreadcrumbSeparator
  Ellipsis: typeof BreadcrumbEllipsis
}

;(Breadcrumbs as any).List = BreadcrumbList
;(Breadcrumbs as any).Item = BreadcrumbItem
;(Breadcrumbs as any).Link = BreadcrumbLink
;(Breadcrumbs as any).Page = BreadcrumbPage
;(Breadcrumbs as any).Separator = BreadcrumbSeparator
;(Breadcrumbs as any).Ellipsis = BreadcrumbEllipsis

;(Breadcrumb as any).List = BreadcrumbList
;(Breadcrumb as any).Item = BreadcrumbItem
;(Breadcrumb as any).Link = BreadcrumbLink
;(Breadcrumb as any).Page = BreadcrumbPage
;(Breadcrumb as any).Separator = BreadcrumbSeparator
;(Breadcrumb as any).Ellipsis = BreadcrumbEllipsis

export default Breadcrumbs
