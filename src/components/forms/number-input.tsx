"use client"

import * as React from "react"
import { ChevronUp, ChevronDown } from "../../icons"
import { cn } from "../../lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue"> {
  value?: number | ""
  defaultValue?: number | ""
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  precision?: number
  clampValueOnBlur?: boolean
  hideStepper?: boolean
  error?: boolean
  inputSize?: "sm" | "default" | "lg"
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onChange,
      min,
      max,
      step = 1,
      precision,
      clampValueOnBlur = true,
      hideStepper = false,
      error,
      disabled,
      readOnly,
      inputSize = "default",
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState<number | "">(defaultValue)
    const currentValue = isControlled ? controlledValue : uncontrolledValue

    const roundToPrecision = (val: number, prec?: number): number => {
      if (prec === undefined) return val
      const factor = Math.pow(10, prec)
      return Math.round(val * factor) / factor
    }

    const clamp = (val: number): number => {
      let clamped = val
      if (min !== undefined && clamped < min) clamped = min
      if (max !== undefined && clamped > max) clamped = max
      return roundToPrecision(clamped, precision)
    }

    const updateValue = (nextVal: number | undefined) => {
      if (!isControlled) {
        setUncontrolledValue(nextVal === undefined ? "" : nextVal)
      }
      onChange?.(nextVal)
    }

    const stepUp = () => {
      if (disabled || readOnly) return
      const base = currentValue === "" ? (min !== undefined ? min : 0) : Number(currentValue)
      const next = clamp(base + step)
      updateValue(next)
    }

    const stepDown = () => {
      if (disabled || readOnly) return
      const base = currentValue === "" ? (min !== undefined ? min : 0) : Number(currentValue)
      const next = clamp(base - step)
      updateValue(next)
    }

    // Auto-repeat on holding buttons
    const timeoutRef = React.useRef<any>(null)
    const intervalRef = React.useRef<any>(null)

    const stopHolding = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const startHolding = (action: () => void) => {
      action()
      stopHolding()
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(action, 60)
      }, 350)
    }

    React.useEffect(() => {
      return () => stopHolding()
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return
      if (e.key === "ArrowUp") {
        e.preventDefault()
        stepUp()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        stepDown()
      } else if (e.key === "Home" && min !== undefined) {
        e.preventDefault()
        updateValue(min)
      } else if (e.key === "End" && max !== undefined) {
        e.preventDefault()
        updateValue(max)
      }
      props.onKeyDown?.(e)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valStr = e.target.value
      if (valStr === "") {
        updateValue(undefined)
        return
      }
      const num = Number(valStr)
      if (!isNaN(num)) {
        updateValue(num)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (clampValueOnBlur && currentValue !== "") {
        const clamped = clamp(Number(currentValue))
        if (clamped !== currentValue) {
          updateValue(clamped)
        }
      }
      props.onBlur?.(e)
    }

    const sizeClasses = {
      sm: "h-8 text-xs px-2.5",
      default: "h-9 text-sm px-3",
      lg: "h-10 text-base px-3.5",
    }[inputSize]

    const isError = error || props["aria-invalid"] === true || props["aria-invalid"] === "true"

    return (
      <div className={cn("relative inline-flex w-full items-center", className)}>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          role="spinbutton"
          aria-valuenow={currentValue === "" ? undefined : Number(currentValue)}
          aria-valuemin={min}
          aria-valuemax={max}
          disabled={disabled}
          readOnly={readOnly}
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={cn(
            "w-full rounded-lg border bg-background font-mono ring-offset-background transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2",
            isError
              ? "border-destructive text-destructive focus-visible:border-destructive focus-visible:ring-1 focus-visible:ring-destructive/30"
              : "border-input focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring",
            disabled && "cursor-not-allowed opacity-50",
            !hideStepper && "pr-8",
            sizeClasses
          )}
          {...props}
        />
        {!hideStepper && !readOnly && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col items-center border-l border-border pl-1">
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled || (max !== undefined && Number(currentValue) >= max)}
              onPointerDown={() => startHolding(stepUp)}
              onPointerUp={stopHolding}
              onPointerLeave={stopHolding}
              aria-label="Increment value"
              className="flex h-3.5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronUp className="h-3 w-3" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled || (min !== undefined && Number(currentValue) <= min)}
              onPointerDown={() => startHolding(stepDown)}
              onPointerUp={stopHolding}
              onPointerLeave={stopHolding}
              aria-label="Decrement value"
              className="flex h-3.5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    )
  }
)

NumberInput.displayName = "NumberInput"

