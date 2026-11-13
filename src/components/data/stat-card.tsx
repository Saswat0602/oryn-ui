import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "../../icons"
import { cn } from "../../lib/utils"

export interface StatCardTrend {
  value: string | number
  direction?: "up" | "down" | "neutral"
  label?: string
}

export interface StatCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  trend?: StatCardTrend
  badge?: React.ReactNode
  variant?: "default" | "outline" | "subtle"
  size?: "sm" | "default" | "lg"
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      title,
      value,
      description,
      icon,
      trend,
      badge,
      variant = "default",
      size = "default",
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "bg-card text-card-foreground border-border shadow-2xs",
      outline: "bg-transparent border-border",
      subtle: "bg-muted/50 border-transparent",
    }[variant]

    const sizeClasses = {
      sm: "p-4 gap-2",
      default: "p-5 gap-3",
      lg: "p-6 gap-4",
    }[size]

    const valueSizeClasses = {
      sm: "text-xl font-bold tracking-tight",
      default: "text-2xl font-bold tracking-tight",
      lg: "text-3xl font-extrabold tracking-tight",
    }[size]

    return (
      <div
        ref={ref}
        role="region"
        aria-label={typeof title === "string" ? title : "Statistic"}
        className={cn(
          "flex flex-col rounded-xl border transition-all",
          variantClasses,
          sizeClasses,
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
          <div className="flex items-center gap-1.5">
            {badge && <div>{badge}</div>}
            {icon && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">
                {icon}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-2 pt-1">
          <div className={cn("text-card-foreground font-sans", valueSizeClasses)}>
            {value}
          </div>

          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold shrink-0 select-none",
                trend.direction === "up" &&
                  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
                trend.direction === "down" &&
                  "bg-destructive/10 text-destructive border border-destructive/20",
                (!trend.direction || trend.direction === "neutral") &&
                  "bg-muted text-muted-foreground border border-border/50"
              )}
            >
              {trend.direction === "up" && (
                <>
                  <TrendingUp className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="sr-only">Increased by </span>
                </>
              )}
              {trend.direction === "down" && (
                <>
                  <TrendingDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="sr-only">Decreased by </span>
                </>
              )}
              {(!trend.direction || trend.direction === "neutral") && (
                <Minus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>

        {(description || (trend && trend.label)) && (
          <p className="text-xs text-muted-foreground">
            {description ?? (trend && trend.label)}
          </p>
        )}
      </div>
    )
  }
)

StatCard.displayName = "StatCard"
