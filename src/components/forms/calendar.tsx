"use client"

import * as React from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../primitives/portal"

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date
  defaultValue?: Date
  selectedDate?: Date
  onChange?: (date: Date) => void
  onDateSelect?: (date: Date) => void
  placeholder?: string
  disabled?: boolean
  variant?: "default" | "filled" | "outlined" | "minimal"
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  format?: string
  minDate?: Date
  maxDate?: Date
  showToday?: boolean
  showWeekNumbers?: boolean
  firstDayOfWeek?: 0 | 1 // 0 = Sunday, 1 = Monday
  locale?: string
  design?: "classic" | "modern" | "minimal" | "card" | "grid"
  animation?: "fade" | "slide" | "scale" | "bounce" | "none"
  color?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  borderRadius?: string | number
  shadow?: "none" | "sm" | "md" | "lg" | "xl"
  fullWidth?: boolean
  closeOnSelect?: boolean
  showHeader?: boolean
  showFooter?: boolean
  showMonthNavigation?: boolean
  showYearNavigation?: boolean
  highlightWeekends?: boolean
  highlightHolidays?: boolean
  // Enterprise features
  analyticsId?: string
  analyticsEvent?: string
  analyticsData?: Record<string, any>
  ariaLabel?: string
  ariaDescribedBy?: string
  role?: string
  dataTestId?: string
  onAnalytics?: (event: string, data?: Record<string, any>) => void
  tooltip?: string
  loading?: boolean
  error?: string
  success?: boolean
  validation?: {
    required?: boolean
    custom?: (date: Date) => boolean | string
  }
  shortcuts?: Array<{
    label: string
    value: Date
    onClick: () => void
  }>
  customDays?: Array<{
    date: Date
    label?: string
    className?: string
    disabled?: boolean
    tooltip?: string
  }>
  onDateHover?: (date: Date) => void
  onDateFocus?: (date: Date) => void
  keyboardNavigation?: boolean
  autoFocus?: boolean
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ 
    className, 
    value,
    defaultValue,
    selectedDate: selectedDateProp,
    onChange,
    onDateSelect,
    placeholder = "Select date",
    disabled = false,
    variant = "default",
    size = "md",
    showIcon = true,
    format = "MM/dd/yyyy",
    minDate,
    maxDate,
    showToday = true,
    showWeekNumbers = false,
    firstDayOfWeek = 0,
    locale = "en-US",
    design = "classic",
    animation = "fade",
    color,
    backgroundColor,
    borderColor,
    textColor,
    borderRadius,
    shadow = "lg",
    fullWidth = true,
    closeOnSelect = true,
    showHeader = true,
    showFooter = false,
    showMonthNavigation = true,
    showYearNavigation = false,
    highlightWeekends = false,
    highlightHolidays = false,
    analyticsId: _analyticsId,
    analyticsEvent: _analyticsEvent,
    analyticsData: _analyticsData,
    ariaLabel,
    ariaDescribedBy,
    role,
    dataTestId,
    onAnalytics: _onAnalytics,
    tooltip: _tooltip,
    loading: _loading,
    error: _error,
    success: _success,
    validation: _validation,
    shortcuts: _shortcuts,
    customDays: _customDays,
    onDateHover: _onDateHover,
    onDateFocus: _onDateFocus,
    keyboardNavigation: _keyboardNavigation = true,
    autoFocus: _autoFocus,
    style,
    ...props 
  }, ref) => {
    
    const isControlled = value !== undefined || selectedDateProp !== undefined
    const activeControlledDate = value ?? selectedDateProp
    const [uncontrolledDate, setUncontrolledDate] = React.useState<Date | null>(defaultValue ?? null)
    const effectiveDate = isControlled ? (activeControlledDate ?? null) : uncontrolledDate

    const [isOpen, setIsOpen] = React.useState(false)
    const [currentDate, setCurrentDate] = React.useState<Date>(() => effectiveDate || new Date())
    const [focusedDay, setFocusedDay] = React.useState<number>(() => (effectiveDate ? effectiveDate.getDate() : 1))
    const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)
    
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const popupRef = React.useRef<HTMLDivElement>(null)
    const dayButtonsRef = React.useRef<Map<number, HTMLButtonElement>>(new Map())

    const generatedId = React.useId()
    const dialogId = `calendar-dialog-${generatedId}`
    const titleId = `calendar-title-${generatedId}`

    React.useImperativeHandle(ref, () => containerRef.current!)

    const updateTriggerRect = React.useCallback(() => {
      if (containerRef.current) {
        setTriggerRect(containerRef.current.getBoundingClientRect())
      }
    }, [])

    React.useEffect(() => {
      if (!isOpen) return
      updateTriggerRect()
      const handleScrollOrResize = () => updateTriggerRect()
      window.addEventListener("scroll", handleScrollOrResize, { passive: true, capture: true })
      window.addEventListener("resize", handleScrollOrResize)
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true)
        window.removeEventListener("resize", handleScrollOrResize)
      }
    }, [isOpen, updateTriggerRect])

    // Sync viewed currentDate if effectiveDate changes
    React.useEffect(() => {
      if (effectiveDate) {
        setCurrentDate(effectiveDate)
        setFocusedDay(effectiveDate.getDate())
      }
    }, [effectiveDate])

    // Focus day button on open or focusedDay change
    React.useEffect(() => {
      if (isOpen) {
        const btn = dayButtonsRef.current.get(focusedDay)
        btn?.focus()
      }
    }, [isOpen, focusedDay, currentDate])

    // Handle escape key to close dialog
    React.useEffect(() => {
      if (!isOpen) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setIsOpen(false)
          inputRef.current?.focus()
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen])

    // Handle click outside
    React.useEffect(() => {
      if (!isOpen) return
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node
        if (
          containerRef.current?.contains(target) ||
          popupRef.current?.contains(target)
        ) {
          return
        }
        setIsOpen(false)
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])
    
    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base"
    }
    
    // Shadow classes
    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl"
    }
    
    // Animation classes
    const animationClasses = {
      fade: "transition-opacity duration-300",
      slide: "transition-all duration-300 transform",
      scale: "transition-all duration-300 transform",
      bounce: "transition-all duration-300 transform",
      none: ""
    }
    
    // Variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case "filled":
          return {
            backgroundColor: backgroundColor || color || "var(--muted, #f4f4f5)",
            border: `1px solid ${borderColor || "var(--border, #e4e4e7)"}`,
            borderRadius: borderRadius || "8px"
          }
        case "outlined":
          return {
            backgroundColor: backgroundColor || color || "var(--card, #ffffff)",
            border: `2px solid ${borderColor || "var(--border, #e4e4e7)"}`,
            borderRadius: borderRadius || "8px"
          }
        default:
          return {
            backgroundColor: backgroundColor || color || "var(--card, #ffffff)",
            border: `1px solid ${borderColor || "var(--border, #e4e4e7)"}`,
            borderRadius: borderRadius || "8px"
          }
      }
    }
    
    // Custom styles
    const customStyles: React.CSSProperties = {
      color: textColor || "var(--foreground, #09090b)",
      ...getVariantStyles(),
      ...style
    }
    
    // Format date
    const formatDate = (date: Date | null): string => {
      if (!date) return ""
      
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const year = date.getFullYear()
      
      return format
        .replace("MM", month)
        .replace("dd", day)
        .replace("yyyy", String(year))
    }
    
    // Calendar utility functions
    const getDaysInMonth = (date: Date): number => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }
    
    const getFirstDayOfMonth = (date: Date): number => {
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
      if (firstDayOfWeek === 1) {
        firstDay = firstDay === 0 ? 6 : firstDay - 1
      }
      return firstDay
    }
    
    const navigateMonth = (direction: "prev" | "next") => {
      setCurrentDate(prev => {
        const newDate = new Date(prev)
        newDate.setDate(1)
        if (direction === "prev") {
          newDate.setMonth(newDate.getMonth() - 1)
        } else {
          newDate.setMonth(newDate.getMonth() + 1)
        }
        return newDate
      })
    }
    
    const handleDateSelect = (day: number) => {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      
      // Check min/max date constraints
      if (minDate && newDate < minDate) return
      if (maxDate && newDate > maxDate) return
      
      if (!isControlled) {
        setUncontrolledDate(newDate)
      }
      if (closeOnSelect) {
        setIsOpen(false)
        inputRef.current?.focus()
      }
      if (onChange) {
        onChange(newDate)
      }
      if (onDateSelect) {
        onDateSelect(newDate)
      }
    }
    
    const isToday = (day: number): boolean => {
      const today = new Date()
      return (
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()
      )
    }
    
    const isSelected = (day: number): boolean => {
      if (!effectiveDate) return false
      return (
        day === effectiveDate.getDate() &&
        currentDate.getMonth() === effectiveDate.getMonth() &&
        currentDate.getFullYear() === effectiveDate.getFullYear()
      )
    }
    
    const isCurrentMonth = (day: number): boolean => {
      return day > 0 && day <= getDaysInMonth(currentDate)
    }
    
    const isDisabled = (day: number): boolean => {
      if (!isCurrentMonth(day)) return true
      
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      
      return false
    }
    
    const isWeekend = (day: number): boolean => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayOfWeek = date.getDay()
      return dayOfWeek === 0 || dayOfWeek === 6
    }

    const handleGridKeyDown = (e: React.KeyboardEvent, day: number) => {
      const daysInMonth = getDaysInMonth(currentDate)
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          if (day > 1) {
            setFocusedDay(day - 1)
          } else {
            const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
            navigateMonth("prev")
            setFocusedDay(prevMonthDays)
          }
          break
        case "ArrowRight":
          e.preventDefault()
          if (day < daysInMonth) {
            setFocusedDay(day + 1)
          } else {
            navigateMonth("next")
            setFocusedDay(1)
          }
          break
        case "ArrowUp":
          e.preventDefault()
          if (day > 7) {
            setFocusedDay(day - 7)
          } else {
            navigateMonth("prev")
            const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
            setFocusedDay(Math.max(1, prevMonthDays - (7 - day)))
          }
          break
        case "ArrowDown":
          e.preventDefault()
          if (day + 7 <= daysInMonth) {
            setFocusedDay(day + 7)
          } else {
            navigateMonth("next")
            setFocusedDay(Math.min(daysInMonth, (day + 7) - daysInMonth))
          }
          break
        case "Home":
          e.preventDefault()
          setFocusedDay(1)
          break
        case "End":
          e.preventDefault()
          setFocusedDay(daysInMonth)
          break
        case "PageUp":
          e.preventDefault()
          navigateMonth("prev")
          break
        case "PageDown":
          e.preventDefault()
          navigateMonth("next")
          break
        case "Enter":
        case " ":
          e.preventDefault()
          if (!isDisabled(day)) {
            handleDateSelect(day)
          }
          break
      }
    }
    
    // Render calendar days based on design
    const renderCalendarDays = () => {
      const daysInMonth = getDaysInMonth(currentDate)
      const firstDay = getFirstDayOfMonth(currentDate)
      const days = []
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} role="gridcell" aria-hidden="true" className="h-8" />)
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const disabled = isDisabled(day)
        const weekend = highlightWeekends && isWeekend(day)
        const selected = isSelected(day)
        const today = isToday(day)
        const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        const fullAriaDate = dateObj.toLocaleDateString(locale, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        
        let dayClasses = "h-8 w-8 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
        
        // Design-specific styling
        switch (design) {
          case "modern":
            dayClasses += " rounded-lg hover:scale-105"
            break
          case "minimal":
            dayClasses += " rounded-none border-b border-border"
            break
          case "card":
            dayClasses += " rounded-md shadow-sm hover:shadow-md"
            break
          case "grid":
            dayClasses += " rounded-none border border-border"
            break
          default:
            dayClasses += " rounded-full"
        }
        
        // State-based styling
        if (selected) {
          dayClasses += " bg-primary text-primary-foreground focus-visible:ring-ring shadow-xs"
        } else if (today) {
          dayClasses += " bg-accent text-accent-foreground font-semibold"
        } else if (weekend) {
          dayClasses += " text-muted-foreground font-medium"
        } else if (!disabled) {
          dayClasses += " hover:bg-accent hover:text-accent-foreground"
        }
        
        if (disabled) {
          dayClasses += " text-muted-foreground cursor-not-allowed opacity-50"
        } else {
          dayClasses += " cursor-pointer"
        }
        
        days.push(
          <div key={day} role="gridcell" className="flex items-center justify-center">
            <button
              ref={(el) => {
                if (el) dayButtonsRef.current.set(day, el)
                else dayButtonsRef.current.delete(day)
              }}
              type="button"
              tabIndex={day === focusedDay ? 0 : -1}
              onClick={() => !disabled && handleDateSelect(day)}
              onKeyDown={(e) => handleGridKeyDown(e, day)}
              disabled={disabled}
              aria-label={fullAriaDate}
              aria-selected={selected}
              aria-current={today ? "date" : undefined}
              className={dayClasses}
            >
              {day}
            </button>
          </div>
        )
      }
      
      return days
    }
    
    // Month and day names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    
    const dayHeaders = firstDayOfWeek === 1 
      ? [
          { key: "mon", short: "Mo", full: "Monday" },
          { key: "tue", short: "Tu", full: "Tuesday" },
          { key: "wed", short: "We", full: "Wednesday" },
          { key: "thu", short: "Th", full: "Thursday" },
          { key: "fri", short: "Fr", full: "Friday" },
          { key: "sat", short: "Sa", full: "Saturday" },
          { key: "sun", short: "Su", full: "Sunday" },
        ]
      : [
          { key: "sun", short: "Su", full: "Sunday" },
          { key: "mon", short: "Mo", full: "Monday" },
          { key: "tue", short: "Tu", full: "Tuesday" },
          { key: "wed", short: "We", full: "Wednesday" },
          { key: "thu", short: "Th", full: "Thursday" },
          { key: "fri", short: "Fr", full: "Friday" },
          { key: "sat", short: "Sa", full: "Saturday" },
        ]
    
    const shouldFlip = triggerRect
      ? typeof window !== "undefined" && triggerRect.bottom + 360 > window.innerHeight && triggerRect.top > 360
      : false

    const popupStyle: React.CSSProperties = triggerRect
      ? {
          position: "fixed",
          top: shouldFlip ? `${triggerRect.top - 6}px` : `${triggerRect.bottom + 6}px`,
          transform: shouldFlip ? "translateY(-100%)" : undefined,
          left: `${Math.max(16, Math.min(triggerRect.left, typeof window !== "undefined" ? window.innerWidth - 320 : triggerRect.left))}px`,
          zIndex: 70,
          backgroundColor: backgroundColor || color || "var(--popover, var(--card, #ffffff))",
          borderColor: borderColor || "var(--border, #e4e4e7)",
          color: textColor || "var(--popover-foreground, var(--foreground, #09090b))"
        }
      : {
          backgroundColor: backgroundColor || color || "var(--popover, var(--card, #ffffff))",
          borderColor: borderColor || "var(--border, #e4e4e7)",
          color: textColor || "var(--popover-foreground, var(--foreground, #09090b))"
        }

    return (
      <div
        ref={containerRef}
        className={cn("relative", fullWidth && "w-full", className)}
        role={role || 'group'}
        aria-label={ariaLabel || (props as any)['aria-label'] || 'Calendar'}
        aria-describedby={ariaDescribedBy}
        data-testid={dataTestId || (props as any)['data-testid']}
        style={customStyles}
        {...props}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={isOpen ? dialogId : undefined}
            aria-label={ariaLabel || (props as any)['aria-label'] || 'Choose date'}
            value={formatDate(effectiveDate)}
            placeholder={placeholder}
            readOnly
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                updateTriggerRect()
                setIsOpen(!isOpen)
              }
            }}
            onKeyDown={(e) => {
              if (disabled) return
              if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                e.preventDefault()
                updateTriggerRect()
                setIsOpen(true)
              } else if (e.key === "Escape" && isOpen) {
                e.preventDefault()
                setIsOpen(false)
              }
            }}
            className={cn(
              "w-full border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-ring",
              sizeClasses[size],
              disabled && "opacity-50 cursor-not-allowed",
              !disabled && "cursor-pointer"
            )}
            style={{
              backgroundColor: backgroundColor || color || "var(--card, #ffffff)",
              borderColor: borderColor || "var(--border, #e4e4e7)",
              color: textColor || "var(--foreground, #09090b)"
            }}
          />
          {showIcon && (
            <span 
              aria-hidden="true"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
            >
              <CalendarIcon size={16} />
            </span>
          )}
        </div>

        {isOpen && triggerRect && (
          <Portal>
            <div 
              ref={popupRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel || "Choose date"}
              aria-labelledby={titleId}
              style={popupStyle}
              className={cn(
                "fixed z-[70] rounded-xl shadow-2xl border transition-all duration-200 min-w-[280px] max-w-[calc(100vw-32px)] overflow-y-auto animate-in fade-in-0 zoom-in-95",
                shadowClasses[shadow],
                animationClasses[animation],
                design === "minimal" ? "p-2" : "p-4",
                design === "card" ? "p-6" : "",
                design === "grid" ? "p-3" : ""
              )}
            >
            {/* Calendar Header */}
            {showHeader && (
              <div className={cn(
                "flex items-center justify-between mb-4",
                design === "minimal" ? "mb-2" : "",
                design === "card" ? "mb-6" : ""
              )}>
                {showMonthNavigation && (
                  <button
                    type="button"
                    onClick={() => navigateMonth("prev")}
                    aria-label="Previous month"
                    className={cn(
                      "p-1.5 rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      design === "minimal" ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </button>
                )}
                
                <div className="text-center">
                  <h3 id={titleId} className={cn(
                    "font-semibold text-foreground",
                    design === "modern" ? "text-lg" : "text-sm",
                    design === "card" ? "text-xl" : ""
                  )}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  
                  {showYearNavigation && (
                    <div className="flex items-center justify-center mt-1 space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentDate)
                          newDate.setFullYear(newDate.getFullYear() - 1)
                          setCurrentDate(newDate)
                        }}
                        aria-label="Previous year"
                        className="p-1 text-xs text-muted-foreground hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <ChevronLeft size={12} aria-hidden="true" />
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {currentDate.getFullYear()}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentDate)
                          newDate.setFullYear(newDate.getFullYear() + 1)
                          setCurrentDate(newDate)
                        }}
                        aria-label="Next year"
                        className="p-1 text-xs text-muted-foreground hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <ChevronRight size={12} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
                
                {showMonthNavigation && (
                  <button
                    type="button"
                    onClick={() => navigateMonth("next")}
                    aria-label="Next month"
                    className={cn(
                      "p-1.5 rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      design === "minimal" ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            )}

            {/* Day Names */}
            <div role="row" className="grid grid-cols-7 gap-1 mb-2">
              {dayHeaders.map((dh) => (
                <div
                  key={dh.key}
                  role="columnheader"
                  aria-label={dh.full}
                  className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
                >
                  <abbr title={dh.full} className="no-underline">{dh.short}</abbr>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div role="grid" aria-labelledby={titleId} className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
            
            {/* Footer */}
            {showFooter && (
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground text-xs">
                    {effectiveDate ? formatDate(effectiveDate) : "No date selected"}
                  </span>
                  {showToday && (
                    <button
                      type="button"
                      onClick={() => {
                        const today = new Date()
                        if (!isControlled) {
                          setUncontrolledDate(today)
                        }
                        setCurrentDate(today)
                        setFocusedDay(today.getDate())
                        onChange?.(today)
                        onDateSelect?.(today)
                      }}
                      className="text-primary hover:underline font-medium text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                    >
                      Today
                    </button>
                  )}
                </div>
              </div>
            )}
            </div>
          </Portal>
        )}
      </div>
    )
  }
)

Calendar.displayName = "Calendar"

export { Calendar }
