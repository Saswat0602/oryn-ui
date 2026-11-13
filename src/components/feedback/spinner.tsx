"use client"

import * as React from "react"
import { cn, createVariants } from "../../lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "default" | "primary" | "secondary" | "muted" | "white"
  label?: string
  strokeWidth?: number
}

const spinnerVariants = createVariants({
  base: "inline-flex items-center justify-center motion-safe:animate-spin motion-reduce:animate-none text-current",
  variants: {
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-foreground",
      muted: "text-muted-foreground",
      white: "text-white",
    },
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      variant,
      size = "md",
      label = "Loading...",
      strokeWidth = 3,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        <svg
          className={cn(spinnerVariants({ variant, size }))}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </div>
    )
  }
)

Spinner.displayName = "Spinner"

