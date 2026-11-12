"use client"

import * as React from "react"
import { cn, createVariants } from "../../lib/utils"
import { Slot } from "../../lib/slot"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  /**
   * Indicates an asynchronous action is in progress, showing a spinner and disabling interaction.
   */
  loading?: boolean
  /**
   * @deprecated Use `loading` instead.
   */
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  asChild?: boolean
}

const buttonVariants = createVariants({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] cursor-pointer",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground text-foreground shadow-2xs hover:shadow-xs",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-2xs",
      ghost:
        "hover:bg-accent hover:text-accent-foreground text-foreground",
      link:
        "text-primary underline-offset-4 hover:underline p-0 h-auto font-normal shadow-none active:scale-100",
    },
    size: {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-lg px-6 text-sm sm:text-base",
      icon: "h-9 w-9 p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    loading,
    isLoading,
    disabled,
    leftIcon,
    rightIcon,
    fullWidth,
    asChild = false,
    children,
    type,
    ...props
  }, ref) => {
    const isBusy = Boolean(loading || isLoading)
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          isBusy && "pointer-events-none opacity-80",
          className
        )}
        ref={ref}
        type={asChild ? undefined : (type || "button")}
        aria-busy={isBusy ? "true" : undefined}
        data-loading={isBusy ? "" : undefined}
        disabled={disabled || isBusy}
        {...props}
      >
        {isBusy && (
          <svg
            className="h-4 w-4 motion-safe:animate-spin shrink-0"
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
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isBusy && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isBusy && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }