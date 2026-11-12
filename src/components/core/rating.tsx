"use client"

import * as React from "react"
import { Star } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../hooks/use-controllable-state"

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number
  defaultValue?: number
  max?: number
  name?: string
  onChange?: (value: number) => void
  readOnly?: boolean
  disabled?: boolean
  clearable?: boolean
  size?: "xs" | "sm" | "md" | "lg"
  showValue?: boolean
  label?: string
  precision?: 0.5 | 1
  icon?: React.ReactNode
  emptyIcon?: React.ReactNode
  activeColor?: string
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      name,
      onChange,
      readOnly = false,
      disabled = false,
      clearable = true,
      size = "md",
      showValue = false,
      label,
      precision = 1,
      icon,
      emptyIcon,
      activeColor,
      ...props
    },
    ref
  ) => {
    const [value = 0, setValue] = useControllableState<number>({
      prop: controlledValue,
      defaultProp: defaultValue,
      onChange,
    })

    const [hoverValue, setHoverValue] = React.useState<number | null>(null)

    const sizeClasses = {
      xs: "w-3.5 h-3.5",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    }

    const isInteractive = !readOnly && !disabled

    const handleStarMouseMove = (
      e: React.MouseEvent<HTMLButtonElement>,
      index: number
    ) => {
      if (!isInteractive) return
      const rect = e.currentTarget.getBoundingClientRect()
      const isLeftHalf = e.clientX - rect.left < rect.width / 2

      if (precision === 0.5 && isLeftHalf) {
        setHoverValue(index - 0.5)
      } else {
        setHoverValue(index)
      }
    }

    const handleStarClick = (
      e: React.MouseEvent<HTMLButtonElement>,
      index: number
    ) => {
      if (!isInteractive) return
      const rect = e.currentTarget.getBoundingClientRect()
      const isLeftHalf = e.clientX - rect.left < rect.width / 2

      let nextValue = precision === 0.5 && isLeftHalf ? index - 0.5 : index
      if (clearable && nextValue === value) {
        nextValue = 0
      }
      setValue(nextValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive) return
      const step = precision

      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault()
        const next = Math.min(max, (value || 0) + step)
        setValue(next)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault()
        const next = Math.max(0, (value || 0) - step)
        setValue(next)
      } else if (e.key === "Home") {
        e.preventDefault()
        setValue(0)
      } else if (e.key === "End") {
        e.preventDefault()
        setValue(max)
      }
    }

    const activeDisplayValue = hoverValue !== null ? hoverValue : value

    const activeStarClass = activeColor || "text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400"

    const renderStar = (index: number) => {
      const isFull = activeDisplayValue >= index
      const isHalf = !isFull && activeDisplayValue >= index - 0.5
      const isCurrentSelection = Math.round(value) === index

      return (
        <button
          key={index}
          type="button"
          role="radio"
          aria-checked={isCurrentSelection}
          tabIndex={-1}
          disabled={!isInteractive}
          onClick={(e) => handleStarClick(e, index)}
          onMouseMove={(e) => handleStarMouseMove(e, index)}
          className={cn(
            "relative p-0.5 transition-transform duration-100 focus:outline-none select-none",
            isInteractive && "cursor-pointer motion-safe:hover:scale-110 motion-safe:active:scale-95",
            !isInteractive && "cursor-default"
          )}
          aria-label={label ? `${label}, ${index} of ${max}` : `Rate ${index} of ${max}`}
        >
          {/* Base / Empty star */}
          <span className="text-muted-foreground/30 fill-muted-foreground/20">
            {emptyIcon || <Star className={cn(sizeClasses[size], "fill-muted-foreground/20 text-muted-foreground/30")} />}
          </span>

          {/* Full or Half Star Overlay */}
          {isFull ? (
            <span className={cn("absolute inset-0.5", activeStarClass)}>
              {icon || <Star className={cn(sizeClasses[size], "fill-current text-current")} />}
            </span>
          ) : isHalf ? (
            <span className={cn("absolute inset-0.5 overflow-hidden w-1/2", activeStarClass)}>
              {icon || <Star className={cn(sizeClasses[size], "fill-current text-current")} />}
            </span>
          ) : null}
        </button>
      )
    }

    return (
      <div className="space-y-1.5 inline-block">
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs font-medium">
            {label && <span className="text-foreground">{label}</span>}
            {showValue && (
              <span className="text-muted-foreground font-mono">
                {activeDisplayValue.toFixed(precision === 0.5 ? 1 : 0)} / {max}
              </span>
            )}
          </div>
        )}

        <div
          ref={ref}
          role="radiogroup"
          aria-label={label || props["aria-label"] || "Rating"}
          aria-readonly={readOnly || undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? undefined : 0}
          onKeyDown={handleKeyDown}
          onMouseLeave={() => setHoverValue(null)}
          className={cn(
            "inline-flex items-center gap-0.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            disabled && "opacity-50 pointer-events-none",
            className
          )}
          {...props}
        >
          {name && <input type="hidden" name={name} value={value} />}
          {Array.from({ length: max }, (_, index) => renderStar(index + 1))}
        </div>
      </div>
    )
  }
)

Rating.displayName = "Rating"

export default Rating
