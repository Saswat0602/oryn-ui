"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonGroupContextValue {
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
  attached?: boolean
  segmented?: boolean
  value?: any
  onItemSelect?: (val: any) => void
  isItemActive?: (val: any) => boolean
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(null)

export function useButtonGroupContext() {
  return React.useContext(ButtonGroupContext)
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  attached?: boolean
  segmented?: boolean
  fullWidth?: boolean
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  disabled?: boolean
  type?: "single" | "multiple"
  value?: any
  defaultValue?: any
  onValueChange?: (value: any) => void
  children?: React.ReactNode
}

export interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: any
  isActive?: boolean
  children?: React.ReactNode
}

export const ButtonGroupItem = React.forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  (
    {
      value,
      isActive: isActiveProp,
      className,
      disabled: itemDisabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const context = useButtonGroupContext()

    const active =
      isActiveProp !== undefined
        ? isActiveProp
        : context?.isItemActive
        ? context.isItemActive(value)
        : false

    const disabled = itemDisabled || context?.disabled
    const size = context?.size || "default"
    const isSegmented = context?.segmented

    const sizeClasses = {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-lg px-6 text-sm",
      icon: "h-9 w-9 p-0",
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      onClick?.(e)
      if (context?.onItemSelect && value !== undefined) {
        context.onItemSelect(value)
      }
    }

    if (isSegmented) {
      return (
        <button
          ref={ref}
          type="button"
          role="radio"
          aria-checked={active}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            sizeClasses[size],
            active
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50",
            disabled && "pointer-events-none opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </button>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        role="button"
        aria-pressed={active}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors select-none cursor-pointer border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:z-10 hover:z-10 active:z-10",
          sizeClasses[size],
          active
            ? "bg-accent text-accent-foreground font-semibold border-primary/40 z-10"
            : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ButtonGroupItem.displayName = "ButtonGroupItem"

interface CompoundedButtonGroup extends React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof ButtonGroupItem
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      attached = true,
      segmented = false,
      fullWidth = false,
      size,
      variant,
      disabled = false,
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<any>(
      defaultValue !== undefined
        ? defaultValue
        : type === "multiple"
        ? []
        : undefined
    )

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue

    const handleItemSelect = React.useCallback(
      (itemVal: any) => {
        if (type === "multiple") {
          const list: any[] = Array.isArray(currentValue) ? [...currentValue] : []
          const index = list.indexOf(itemVal)
          if (index > -1) {
            list.splice(index, 1)
          } else {
            list.push(itemVal)
          }
          if (controlledValue === undefined) {
            setInternalValue(list)
          }
          onValueChange?.(list)
        } else {
          const nextVal = currentValue === itemVal ? undefined : itemVal
          if (controlledValue === undefined) {
            setInternalValue(nextVal)
          }
          onValueChange?.(nextVal)
        }
      },
      [type, currentValue, controlledValue, onValueChange]
    )

    const isItemActive = React.useCallback(
      (itemVal: any) => {
        if (type === "multiple") {
          return Array.isArray(currentValue) && currentValue.includes(itemVal)
        }
        return currentValue === itemVal
      },
      [type, currentValue]
    )

    const isVertical = orientation === "vertical"

    return (
      <ButtonGroupContext.Provider
        value={{
          size,
          variant,
          disabled,
          orientation,
          attached,
          segmented,
          value: currentValue,
          onItemSelect: handleItemSelect,
          isItemActive,
        }}
      >
        <div
          ref={ref}
          role={segmented ? "radiogroup" : "group"}
          aria-orientation={segmented ? orientation : undefined}
          className={cn(
            "inline-flex",
            isVertical ? "flex-col" : "flex-row",
            fullWidth && "w-full [&>*]:flex-1",
            segmented
              ? "p-1 bg-muted rounded-lg border border-border/50 gap-1 items-center"
              : attached
              ? cn(
                  "[&>*:focus-visible]:z-10 [&>*:hover]:z-10 [&>*:active]:z-10",
                  isVertical
                    ? "[&>*:not(:first-child)]:-mt-px [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none"
                    : "[&>*:not(:first-child)]:-ml-px [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none"
                )
              : isVertical
              ? "space-y-2"
              : "space-x-2",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    )
  }
) as unknown as CompoundedButtonGroup

ButtonGroup.displayName = "ButtonGroup"
ButtonGroup.Item = ButtonGroupItem
