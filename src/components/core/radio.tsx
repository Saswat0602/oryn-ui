"use client"

import * as React from "react"
import { cn, createVariants } from "../../lib/utils"

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  description?: string
  error?: boolean
  size?: "sm" | "md" | "lg"
}

const radioVariants = createVariants({
  base: "peer aspect-square h-4 w-4 rounded-full border border-input text-primary shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 accent-primary cursor-pointer transition-all",
  variants: {
    size: {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      label,
      description,
      error,
      size = "md",
      id,
      checked,
      defaultChecked,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const radioId = id || generatedId

    return (
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center h-5">
          <input
            type="radio"
            ref={ref}
            id={radioId}
            checked={checked}
            defaultChecked={defaultChecked}
            className={cn(
              radioVariants({ size }),
              error && "border-destructive",
              className
            )}
            {...props}
          />
          {/* Selected indicator rendered via peer-checked for both controlled & uncontrolled support */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center peer-checked:flex">
            <div
              className={cn(
                "rounded-full bg-primary",
                size === "sm" && "h-1.5 w-1.5",
                size === "md" && "h-2 w-2",
                size === "lg" && "h-2.5 w-2.5"
              )}
            />
          </div>
        </div>

        {(label || description) && (
          <div className="grid gap-1.5 leading-none pt-0.5">
            {label && (
              <label
                htmlFor={radioId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-foreground"
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  "text-xs text-muted-foreground leading-normal",
                  error && "text-destructive"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Radio.displayName = "Radio"

export { Radio }
