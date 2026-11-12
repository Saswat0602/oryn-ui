"use client"

import * as React from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../lib/use-controllable-state"
import { Portal } from "../../primitives/portal"

export interface DateRange {
  from?: Date
  to?: Date
}

export interface DateRangePreset {
  label: string
  getRange: () => DateRange
}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  error?: boolean
  presets?: DateRangePreset[]
  formatDate?: (date: Date) => string
}

const DEFAULT_PRESETS: DateRangePreset[] = [
  {
    label: "Today",
    getRange: () => {
      const now = new Date()
      return { from: now, to: now }
    },
  },
  {
    label: "Last 7 Days",
    getRange: () => {
      const to = new Date()
      const from = new Date()
      from.setDate(to.getDate() - 6)
      return { from, to }
    },
  },
  {
    label: "Last 30 Days",
    getRange: () => {
      const to = new Date()
      const from = new Date()
      from.setDate(to.getDate() - 29)
      return { from, to }
    },
  },
  {
    label: "This Month",
    getRange: () => {
      const now = new Date()
      const from = new Date(now.getFullYear(), now.getMonth(), 1)
      const to = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      return { from, to }
    },
  },
]

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Pick a date range",
      minDate,
      maxDate,
      disabled = false,
      error = false,
      presets = DEFAULT_PRESETS,
      formatDate,
      ...props
    },
    ref
  ) => {
    const [range, setRange] = useControllableState<DateRange>({
      prop: controlledValue,
      defaultProp: defaultValue ?? {},
      onChange,
    })

    const [open, setOpen] = React.useState(false)
    const [viewDate, setViewDate] = React.useState<Date>(() => range?.from ?? new Date())
    const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const popupRef = React.useRef<HTMLDivElement>(null)

    const updateTriggerRect = React.useCallback(() => {
      if (containerRef.current) {
        setTriggerRect(containerRef.current.getBoundingClientRect())
      }
    }, [])

    React.useEffect(() => {
      if (!open) return
      updateTriggerRect()
      const handleScrollOrResize = () => updateTriggerRect()
      window.addEventListener("scroll", handleScrollOrResize, true)
      window.addEventListener("resize", handleScrollOrResize)
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true)
        window.removeEventListener("resize", handleScrollOrResize)
      }
    }, [open, updateTriggerRect])

    React.useEffect(() => {
      if (!open) return
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node
        if (
          containerRef.current?.contains(target) ||
          popupRef.current?.contains(target)
        ) {
          return
        }
        setOpen(false)
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    const defaultFormat = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

    const formatFn = formatDate ?? defaultFormat

    const formattedLabel = React.useMemo(() => {
      if (range?.from && range?.to) {
        return `${formatFn(range.from)} – ${formatFn(range.to)}`
      }
      if (range?.from) {
        return `${formatFn(range.from)} – ...`
      }
      return placeholder
    }, [range, formatFn, placeholder])

    const isSameDay = (d1?: Date, d2?: Date) => {
      if (!d1 || !d2) return false
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      )
    }

    const isBetween = (d: Date, start?: Date, end?: Date) => {
      if (!start || !end) return false
      const time = d.getTime()
      return time > start.getTime() && time < end.getTime()
    }

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
    const firstDayIndex = (year: number, month: number) => new Date(year, month, 1).getDay()

    const handleSelectDay = (day: number) => {
      const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)

      if (!range?.from || (range.from && range.to)) {
        // Start new range selection
        setRange({ from: selectedDate, to: undefined })
      } else {
        // Complete range selection
        if (selectedDate.getTime() < range.from.getTime()) {
          setRange({ from: selectedDate, to: range.from })
        } else {
          setRange({ from: range.from, to: selectedDate })
        }
        setOpen(false)
      }
    }

    const prevMonth = () => {
      setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
    }

    const nextMonth = () => {
      setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
    }

    const clearRange = (e: React.MouseEvent) => {
      e.stopPropagation()
      setRange({ from: undefined, to: undefined })
    }

    const monthName = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth())
    const startingBlankDays = firstDayIndex(viewDate.getFullYear(), viewDate.getMonth())

    const shouldFlip = triggerRect
      ? typeof window !== "undefined" && triggerRect.bottom + 360 > window.innerHeight && triggerRect.top > 360
      : false

    const popupStyle: React.CSSProperties = triggerRect
      ? {
          position: "fixed",
          top: shouldFlip ? `${triggerRect.top - 6}px` : `${triggerRect.bottom + 6}px`,
          transform: shouldFlip ? "translateY(-100%)" : undefined,
          left: `${Math.max(16, Math.min(triggerRect.left, typeof window !== "undefined" ? window.innerWidth - (presets?.length ? 440 : 290) : triggerRect.left))}px`,
          zIndex: 70,
        }
      : {}

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block w-full", className)}
        {...props}
      >
        <button
          ref={ref as any}
          type="button"
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              updateTriggerRect()
              setOpen((prev) => !prev)
            }
          }}
          aria-expanded={open}
          aria-haspopup="dialog"
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-lg border bg-background px-3 py-1.5 text-sm ring-offset-background transition-all shadow-2xs cursor-pointer select-none",
            error
              ? "border-destructive focus-visible:border-destructive focus-visible:ring-1 focus-visible:ring-destructive/30"
              : "border-input focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring",
            disabled && "cursor-not-allowed opacity-50 bg-muted",
            !range?.from && "text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-2 truncate">
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{formattedLabel}</span>
          </span>

          <span className="flex items-center gap-1">
            {range?.from && !disabled && (
              <span
                role="button"
                onClick={clearRange}
                aria-label="Clear date range"
                className="p-0.5 rounded text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
          </span>
        </button>

        {open && triggerRect && (
          <Portal>
            <div
              ref={popupRef}
              style={popupStyle}
              role="dialog"
              aria-label="Date range calendar"
              className="fixed z-[70] flex flex-col sm:flex-row gap-3 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-2xl max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] overflow-y-auto animate-in fade-in-0 zoom-in-95"
          >
            {presets && presets.length > 0 && (
              <div className="flex sm:flex-col gap-1 border-b sm:border-b-0 sm:border-r border-border pb-3 sm:pb-0 sm:pr-3">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setRange(preset.getRange())
                      setOpen(false)
                    }}
                    className="rounded-md px-2.5 py-1.5 text-left text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            <div className="w-64 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">{monthName}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={prevMonth}
                    aria-label="Previous month"
                    className="p-1 rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    aria-label="Next month"
                    className="p-1 rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
                {Array.from({ length: startingBlankDays }).map((_, i) => (
                  <div key={`blank-${i}`} />
                ))}
                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1
                  const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
                  const isStart = isSameDay(date, range?.from)
                  const isEnd = isSameDay(date, range?.to)
                  const inBetween = isBetween(date, range?.from, range?.to)
                  const isSelectable =
                    (!minDate || date >= minDate) && (!maxDate || date <= maxDate)

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      disabled={!isSelectable}
                      onClick={() => isSelectable && handleSelectDay(day)}
                      className={cn(
                        "h-8 w-8 text-xs font-medium transition-colors flex items-center justify-center cursor-pointer",
                        isStart && "rounded-l-md bg-primary text-primary-foreground font-semibold",
                        isEnd && "rounded-r-md bg-primary text-primary-foreground font-semibold",
                        isStart && isEnd && "rounded-md",
                        inBetween && "bg-accent text-accent-foreground",
                        !isStart && !isEnd && !inBetween && "rounded-md hover:bg-accent hover:text-accent-foreground text-foreground",
                        !isSelectable && "opacity-30 cursor-not-allowed pointer-events-none"
                      )}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>
            </div>
          </Portal>
        )}
      </div>
    )
  }
)

DateRangePicker.displayName = "DateRangePicker"
