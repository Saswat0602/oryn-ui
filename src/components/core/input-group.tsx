"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg"
}

const InputGroupContext = React.createContext<{ size?: "sm" | "default" | "lg" }>({ size: "default" })

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, size = "default", children, role = "group", ...props }, ref) => {
    return (
      <InputGroupContext.Provider value={{ size }}>
        <div
          ref={ref}
          role={role}
          data-size={size}
          className={cn(
            "flex w-full items-stretch rounded-lg",
            "[&>*:focus-within]:z-10 [&>*:focus-visible]:z-10",
            "[&>*:not(:first-child)]:-ml-px",
            "[&>*:first-child]:rounded-r-none",
            "[&>*:last-child]:rounded-l-none",
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </InputGroupContext.Provider>
    )
  }
)

InputGroup.displayName = "InputGroup"

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: "left" | "right"
  size?: "sm" | "default" | "lg"
}

export const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, children, size, placement, ...props }, ref) => {
    const context = React.useContext(InputGroupContext)
    const effectiveSize = size || context.size || "default"
    const sizeClasses = {
      sm: "px-2.5 text-xs",
      default: "px-3 text-sm",
      lg: "px-3.5 text-base",
    }[effectiveSize]

    return (
      <div
        ref={ref}
        data-placement={placement}
        data-size={effectiveSize}
        className={cn(
          "inline-flex items-center text-muted-foreground bg-muted border border-input whitespace-nowrap select-none",
          sizeClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

InputGroupAddon.displayName = "InputGroupAddon"

