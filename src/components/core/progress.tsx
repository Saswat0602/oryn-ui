"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | null
  max?: number
  variant?: "default" | "success" | "warning" | "destructive"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  label?: string
  indeterminate?: boolean
  indicatorClassName?: string
  barRef?: React.Ref<HTMLDivElement>
}

export const ProgressTrack = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    />
  )
)
ProgressTrack.displayName = "ProgressTrack"

export const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number; variant?: string; indeterminate?: boolean }
>(({ className, style, value = 0, variant = "default", indeterminate = false, ...props }, ref) => {
  const variantClasses: Record<string, string> = {
    default: "bg-primary",
    success: "bg-emerald-600 dark:bg-emerald-500",
    warning: "bg-amber-600 dark:bg-amber-500",
    destructive: "bg-destructive",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "h-full motion-safe:transition-all duration-500 ease-out",
        indeterminate
          ? "w-full motion-safe:animate-pulse bg-gradient-to-r from-transparent via-primary to-transparent"
          : (variantClasses[variant] || variantClasses.default),
        className
      )}
      style={indeterminate ? undefined : { width: `${value}%`, ...style }}
      {...props}
    />
  )
})
ProgressIndicator.displayName = "ProgressIndicator"

const ProgressRoot = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      showLabel = false,
      label,
      indeterminate = false,
      indicatorClassName,
      barRef,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = indeterminate || value === null || value === undefined
    const percentage = isIndeterminate ? 0 : Math.min(Math.max(((value || 0) / max) * 100, 0), 100)

    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    }

    const hasLabel = showLabel || Boolean(label)

    const barElement = (
      <div
        ref={hasLabel ? (barRef as React.Ref<HTMLDivElement>) : ref}
        className={cn(
          "relative overflow-hidden rounded-full bg-secondary w-full",
          sizeClasses[size],
          !hasLabel && className
        )}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : (value ?? 0)}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={isIndeterminate ? "Loading..." : `${Math.round(percentage)}%`}
        aria-label={label || "Progress bar"}
        {...(hasLabel ? {} : props)}
      >
        <ProgressIndicator
          value={percentage}
          variant={variant}
          indeterminate={isIndeterminate}
          className={indicatorClassName}
        />
      </div>
    )

    if (!hasLabel) {
      return barElement
    }

    return (
      <div ref={ref} className={cn("w-full space-y-2", className)} {...props}>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">{label || "Progress"}</span>
          <span className="text-muted-foreground font-mono text-xs">
            {isIndeterminate ? "Loading..." : `${Math.round(percentage)}%`}
          </span>
        </div>
        {barElement}
      </div>
    )
  }
)

ProgressRoot.displayName = "Progress"

export type ProgressComponent = typeof ProgressRoot & {
  Track: typeof ProgressTrack
  Indicator: typeof ProgressIndicator
}

export const Progress = ProgressRoot as ProgressComponent
Progress.Track = ProgressTrack
Progress.Indicator = ProgressIndicator

export default Progress
