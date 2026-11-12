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
  ariaLabel?: string
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
      ariaLabel,
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
    const [focusedDate, setFocusedDate] = React.useState<Date>(() => range?.from ?? new Date())
    const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

    const containerRef = React.useRef<HTMLDivElement>(null)
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const popupRef = React.useRef<HTMLDivElement>(null)
    const dayButtonsRef = React.useRef<Map<string, HTMLButtonElement>>(new Map())

    const generatedId = React.useId()
    const dialogId = `daterange-dialog-${generatedId}`
    const titleId = `daterange-title-${generatedId}`

    React.useImperativeHandle(ref, () => containerRef.current!)

    const updateTriggerRect = React.useCallback(() => {
      if (containerRef.current) {
        setTriggerRect(containerRef.current.getBoundingClientRect())
      }
    }, [])

    React.useEffect(() => {
      if (!open) return
      updateTriggerRect()
      const handleScrollOrResize = () => updateTriggerRect()
      window.addEventListener("scroll", handleScrollOrResize, { passive: true, capture: true })
      window.addEventListener("resize", handleScrollOrResize)
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true)
        window.removeEventListener("resize", handleScrollOrResize)
      }
    }, [open, updateTriggerRect])

    React.useEffect(() => {
      if (!open) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
          triggerRef.current?.focus()
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open])

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

    // Update viewDate when range.from updates
    React.useEffect(() => {
      if (range?.from) {
        setViewDate(range.from)
        setFocusedDate(range.from)
      }
    }, [range?.from])

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
        triggerRef.current?.focus()
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

    const handleGridKeyDown = (e: React.KeyboardEvent, currentDate: Date, day: number) => {
      const nextDate = new Date(currentDate)
      let handled = true

      switch (e.key) {
        case "ArrowLeft":
          nextDate.setDate(nextDate.getDate() - 1)
          break
        case "ArrowRight":
          nextDate.setDate(nextDate.getDate() + 1)
          break
        case "ArrowUp":
          nextDate.setDate(nextDate.getDate() - 7)
          break
        case "ArrowDown":
          nextDate.setDate(nextDate.getDate() + 7)
          break
        case "Home":
          nextDate.setDate(1)
          break
        case "End":
          nextDate.setDate(daysInMonth(nextDate.getFullYear(), nextDate.getMonth()))
          break
        case "PageUp":
          nextDate.setMonth(nextDate.getMonth() - 1)
          break
        case "PageDown":
          nextDate.setMonth(nextDate.getMonth() + 1)
          break
        case "Enter":
        case " ":
          e.preventDefault()
          handleSelectDay(day)
          return
        default:
          handled = false
      }

      if (handled) {
        e.preventDefault()
        setFocusedDate(nextDate)
        if (nextDate.getMonth() !== viewDate.getMonth() || nextDate.getFullYear() !== viewDate.getFullYear()) {
          setViewDate(nextDate)
        }
        const key = nextDate.toDateString()
        dayButtonsRef.current.get(key)?.focus()
      }
    }

    const monthName = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth())
    const startingBlankDays = firstDayIndex(viewDate.getFullYear(), viewDate.getMonth())

    const weekDays = [
      { short: "Su", full: "Sunday" },
      { short: "Mo", full: "Monday" },
      { short: "Tu", full: "Tuesday" },
      { short: "We", full: "Wednesday" },
      { short: "Th", full: "Thursday" },
      { short: "Fr", full: "Friday" },
      { short: "Sa", full: "Saturday" },
    ]

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
      : {
          zIndex: 70,
        }

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block w-full", className)}
        {...props}
      >
        <div
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-lg border bg-background px-3 py-1.5 text-sm ring-offset-background transition-all shadow-2xs select-none",
            error
              ? "border-destructive focus-within:border-destructive focus-within:ring-1 focus-within:ring-destructive/30"
              : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
            disabled && "cursor-not-allowed opacity-50 bg-muted",
            !range?.from && "text-muted-foreground"
          )}
        >
          <button
            ref={triggerRef}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                updateTriggerRect()
                setOpen((prev) => !prev)
              }
            }}
            onKeyDown={(e) => {
              if (disabled) return
              if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                e.preventDefault()
                updateTriggerRect()
                setOpen(true)
              }
            }}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-controls={open ? dialogId : undefined}
            aria-label={ariaLabel || `Date range picker, selected range ${formattedLabel}`}
            className="flex flex-1 items-center gap-2 truncate cursor-pointer text-left focus:outline-none disabled:cursor-not-allowed"
          >
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="truncate">{formattedLabel}</span>
          </button>

          {range?.from && !disabled && (
            <button
              type="button"
              onClick={clearRange}
              aria-label="Clear date range"
              className="p-0.5 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ml-1 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {open && triggerRect && (
          <Portal>
            <div
              ref={popupRef}
              id={dialogId}
              style={popupStyle}
              role="dialog"
              aria-modal="true"
              aria-label="Date range calendar"
              aria-labelledby={titleId}
              className="fixed z-[70] flex flex-col sm:flex-row gap-3 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-2xl max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] overflow-y-auto animate-in fade-in-0 zoom-in-95"
            >
            {presets && presets.length > 0 && (
              <div className="flex sm:flex-col gap-1 border-b sm:border-b-0 sm:border-r border-border pb-3 sm:pb-0 sm:pr-3" role="group" aria-label="Quick preset date ranges">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setRange(preset.getRange())
                      setOpen(false)
                      triggerRef.current?.focus()
                    }}
                    className="rounded-md px-2.5 py-1.5 text-left text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            <div className="w-64 space-y-3">
              <div className="flex items-center justify-between">
                <span id={titleId} className="text-xs font-semibold">{monthName}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={prevMonth}
                    aria-label="Previous month"
                    className="p-1 rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    aria-label="Next month"
                    className="p-1 rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div role="row" className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
                {weekDays.map((wd) => (
                  <div key={wd.short} role="columnheader" aria-label={wd.full}>
                    <abbr title={wd.full} className="no-underline">{wd.short}</abbr>
                  </div>
                ))}
              </div>

              <div role="grid" aria-labelledby={titleId} className="grid grid-cols-7 gap-y-1 text-center text-xs">
                {Array.from({ length: startingBlankDays }).map((_, i) => (
                  <div key={`blank-${i}`} role="gridcell" aria-hidden="true" />
                ))}
                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1
                  const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
                  const isStart = isSameDay(date, range?.from)
                  const isEnd = isSameDay(date, range?.to)
                  const inBetween = isBetween(date, range?.from, range?.to)
                  const isSelectable =
                    (!minDate || date >= minDate) && (!maxDate || date <= maxDate)
                  const isFocused = isSameDay(date, focusedDate)

                  const dateLabel = date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })

                  return (
                    <div key={`day-${day}`} role="gridcell" className="flex items-center justify-center">
                      <button
                        ref={(el) => {
                          const key = date.toDateString()
                          if (el) dayButtonsRef.current.set(key, el)
                          else dayButtonsRef.current.delete(key)
                        }}
                        type="button"
                        tabIndex={isFocused ? 0 : -1}
                        disabled={!isSelectable}
                        onClick={() => isSelectable && handleSelectDay(day)}
                        onKeyDown={(e) => handleGridKeyDown(e, date, day)}
                        aria-label={dateLabel}
                        aria-selected={isStart || isEnd || inBetween}
                        aria-current={isStart ? "date" : undefined}
                        className={cn(
                          "h-8 w-8 text-xs font-medium transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
                    </div>
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
