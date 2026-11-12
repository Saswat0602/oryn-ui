"use client"

import * as React from "react"
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "../../icons"
import { cn } from "../../lib/utils"

export type BannerVariant = "default" | "info" | "success" | "warning" | "destructive"

export interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: BannerVariant
  icon?: any
  title?: React.ReactNode
  action?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  storageKey?: string
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = "default",
      icon,
      title,
      children,
      action,
      dismissible = false,
      onDismiss,
      storageKey,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(() => {
      if (!storageKey || typeof window === "undefined") return false
      try {
        return window.localStorage.getItem(`banner-dismissed-${storageKey}`) === "true"
      } catch {
        return false
      }
    })

    const handleDismiss = () => {
      setDismissed(true)
      if (storageKey && typeof window !== "undefined") {
        try {
          window.localStorage.setItem(`banner-dismissed-${storageKey}`, "true")
        } catch {
          // Ignore localStorage errors
        }
      }
      onDismiss?.()
    }

    if (dismissed) {
      return null
    }

    const variantStyles = {
      default:
        "bg-muted text-foreground border-border",
      info:
        "bg-muted text-foreground border-border",
      success:
        "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-100 dark:border-emerald-900/50",
      warning:
        "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-900/50",
      destructive:
        "bg-rose-50 text-rose-900 border-rose-200 dark:bg-rose-950/40 dark:text-rose-100 dark:border-rose-900/50",
    }[variant]

    const defaultIcons = {
      default: null,
      info: <Info className="h-4 w-4 text-foreground shrink-0" />,
      success: <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      warning: <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />,
      destructive: <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />,
    }

    const renderedIcon = icon !== undefined ? icon : defaultIcons[variant]

    return (
      <div
        ref={ref}
        role={variant === "destructive" ? "alert" : "status"}
        className={cn(
          "relative flex w-full items-center justify-between gap-3 border-b px-4 py-2.5 text-xs font-medium transition-all",
          variantStyles,
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {renderedIcon}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0">
            {title && <span className="font-semibold">{title}</span>}
            <div className="text-muted-foreground">{children}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {action && <div>{action}</div>}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="rounded p-1 text-current opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)

Banner.displayName = "Banner"
