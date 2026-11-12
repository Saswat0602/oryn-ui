"use client"

import * as React from "react"
import { Clock } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../lib/use-controllable-state"

export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string
  defaultValue?: string
  name?: string
  onChange?: (time: string) => void
  format?: "12h" | "24h"
  step?: number
  disabled?: boolean
  error?: boolean
  size?: "sm" | "default" | "lg"
}

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "12:00 PM",
      name,
      onChange,
      format = "12h",
      step = 1,
      disabled = false,
      error = false,
      size = "default",
      ...props
    },
    ref
  ) => {
    const [time, setTime] = useControllableState<string>({
      prop: controlledValue,
      defaultProp: defaultValue,
      onChange,
    })

    // Parse time into hours, minutes, period
    const parsed = React.useMemo(() => {
      const is12 = format === "12h"
      let h = 12
      let m = 0
      let period = "PM"

      if (time) {
        const parts = time.trim().split(/[:\s]+/)
        if (parts[0]) h = parseInt(parts[0], 10) || (is12 ? 12 : 0)
        if (parts[1]) m = parseInt(parts[1], 10) || 0
        if (parts[2]) {
          period = parts[2].toUpperCase() === "AM" ? "AM" : "PM"
        }
      }
      return { h, m, period }
    }, [time, format])

    const pad = (n: number) => n.toString().padStart(2, "0")

    const updateTime = (nextH: number, nextM: number, nextPeriod?: string) => {
      const is12 = format === "12h"
      let formatted: string

      if (is12) {
        let validH = nextH
        if (validH > 12) validH = 12
        if (validH < 1) validH = 1
        let validM = nextM
        if (validM > 59) validM = 59
        if (validM < 0) validM = 0
        const p = nextPeriod ?? parsed.period
        formatted = `${pad(validH)}:${pad(validM)} ${p}`
      } else {
        let validH = nextH
        if (validH > 23) validH = 23
        if (validH < 0) validH = 0
        let validM = nextM
        if (validM > 59) validM = 59
        if (validM < 0) validM = 0
        formatted = `${pad(validH)}:${pad(validM)}`
      }

      setTime(formatted)
    }

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10)
      if (!isNaN(val)) updateTime(val, parsed.m)
    }

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10)
      if (!isNaN(val)) updateTime(parsed.h, val)
    }

    const handleKeyDownHour = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return
      if (e.key === "ArrowUp") {
        e.preventDefault()
        const maxH = format === "12h" ? 12 : 23
        const next = parsed.h >= maxH ? (format === "12h" ? 1 : 0) : parsed.h + 1
        updateTime(next, parsed.m)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        const minH = format === "12h" ? 1 : 0
        const maxH = format === "12h" ? 12 : 23
        const next = parsed.h <= minH ? maxH : parsed.h - 1
        updateTime(next, parsed.m)
      }
    }

    const handleKeyDownMinute = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return
      if (e.key === "ArrowUp") {
        e.preventDefault()
        const next = (parsed.m + step) % 60
        updateTime(parsed.h, next)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        const next = parsed.m - step < 0 ? 60 - step : parsed.m - step
        updateTime(parsed.h, next)
      }
    }

    const togglePeriod = () => {
      if (disabled || format !== "12h") return
      const next = parsed.period === "AM" ? "PM" : "AM"
      updateTime(parsed.h, parsed.m, next)
    }

    const sizeClasses = {
      sm: "h-8 text-xs px-2",
      default: "h-9 text-sm px-3",
      lg: "h-10 text-base px-3.5",
    }[size]

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Time picker"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border bg-background font-mono shadow-2xs select-none",
          error
            ? "border-destructive focus-within:border-destructive focus-within:ring-1 focus-within:ring-destructive/30"
            : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
          disabled && "cursor-not-allowed opacity-50 bg-muted",
          sizeClasses,
          className
        )}
        {...props}
      >
        {name && <input type="hidden" name={name} value={time ?? ""} />}
        <Clock className="h-4 w-4 text-muted-foreground shrink-0 mr-1" />

        <input
          type="text"
          inputMode="numeric"
          role="spinbutton"
          aria-label="Hours"
          aria-valuenow={parsed.h}
          aria-valuemin={format === "12h" ? 1 : 0}
          aria-valuemax={format === "12h" ? 12 : 23}
          value={pad(parsed.h)}
          disabled={disabled}
          onChange={handleHourChange}
          onKeyDown={handleKeyDownHour}
          className="w-7 bg-transparent text-center outline-none focus:bg-accent focus:text-accent-foreground rounded font-semibold text-foreground"
        />

        <span className="text-muted-foreground font-semibold">:</span>

        <input
          type="text"
          inputMode="numeric"
          role="spinbutton"
          aria-label="Minutes"
          aria-valuenow={parsed.m}
          aria-valuemin={0}
          aria-valuemax={59}
          value={pad(parsed.m)}
          disabled={disabled}
          onChange={handleMinuteChange}
          onKeyDown={handleKeyDownMinute}
          className="w-7 bg-transparent text-center outline-none focus:bg-accent focus:text-accent-foreground rounded font-semibold text-foreground"
        />

        {format === "12h" && (
          <button
            type="button"
            disabled={disabled}
            onClick={togglePeriod}
            aria-label="Toggle AM/PM"
            className="ml-1 rounded px-1.5 py-0.5 text-xs font-semibold uppercase text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            {parsed.period}
          </button>
        )}
      </div>
    )
  }
)

TimePicker.displayName = "TimePicker"
