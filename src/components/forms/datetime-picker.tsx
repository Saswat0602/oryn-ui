"use client"

import React, { useEffect, useRef, useState, useCallback, useId } from 'react'
import { ChevronLeft, ChevronRight, Clock, Calendar, X } from '../../icons'
import { Portal } from '../../primitives/portal'
import { cn } from '../../lib/utils'

export type DateTimeMode = 'date' | 'time' | 'both'
export type TimeFormat = '12' | '24'

export interface DateTimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'> {
  mode?: DateTimeMode
  timeFormat?: TimeFormat
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (value: Date) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

export const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      mode = 'both',
      timeFormat = '12',
      value = null,
      defaultValue = null,
      onChange,
      placeholder = 'Select date & time',
      disabled = false,
      className = '',
      ariaLabel,
      ...props
    },
    forwardedRef
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialDate = value ? new Date(value) : defaultValue ? new Date(defaultValue) : new Date()
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
    const [viewDate, setViewDate] = useState<Date>(initialDate)
    const [focusedDate, setFocusedDate] = useState<Date>(initialDate)
    const [showYearModal, setShowYearModal] = useState(false)
    const [showMonthModal, setShowMonthModal] = useState(false)
    const [activeTab, setActiveTab] = useState<DateTimeMode>(mode === 'both' ? 'date' : mode)
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)

    const containerRef = useRef<HTMLDivElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const popupRef = useRef<HTMLDivElement | null>(null)
    const dayButtonsRef = useRef<Map<string, HTMLButtonElement>>(new Map())

    const generatedId = useId()
    const dialogId = `datetime-dialog-${generatedId}`
    const dateTabId = `datetime-tab-date-${generatedId}`
    const timeTabId = `datetime-tab-time-${generatedId}`
    const datePanelId = `datetime-panel-date-${generatedId}`
    const timePanelId = `datetime-panel-time-${generatedId}`

    const updateTriggerRect = useCallback(() => {
      if (containerRef.current) {
        setTriggerRect(containerRef.current.getBoundingClientRect())
      }
    }, [])

    useEffect(() => {
      if (!isOpen) return
      updateTriggerRect()
      const handleScrollOrResize = () => updateTriggerRect()
      window.addEventListener('scroll', handleScrollOrResize, { passive: true, capture: true })
      window.addEventListener('resize', handleScrollOrResize)
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true)
        window.removeEventListener('resize', handleScrollOrResize)
      }
    }, [isOpen, updateTriggerRect])

    // Update viewDate and selectedDate when external value changes
    useEffect(() => {
      if (value) {
        const newDate = new Date(value)
        setSelectedDate(newDate)
        setViewDate(newDate)
        setFocusedDate(newDate)
      }
    }, [value])

    // Escape listener to close dialog
    useEffect(() => {
      if (!isOpen) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          if (showYearModal) {
            setShowYearModal(false)
          } else if (showMonthModal) {
            setShowMonthModal(false)
          } else {
            setIsOpen(false)
            triggerRef.current?.focus()
          }
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, showYearModal, showMonthModal])

    // Click outside listener
    useEffect(() => {
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
        setShowYearModal(false)
        setShowMonthModal(false)
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const weekDays = [
      { short: 'Su', full: 'Sunday' },
      { short: 'Mo', full: 'Monday' },
      { short: 'Tu', full: 'Tuesday' },
      { short: 'We', full: 'Wednesday' },
      { short: 'Th', full: 'Thursday' },
      { short: 'Fr', full: 'Friday' },
      { short: 'Sa', full: 'Saturday' }
    ]

    const formatDisplayValue = () => {
      if (!value) return placeholder

      const date = new Date(value)
      let result = ''

      if (mode === 'date' || mode === 'both') {
        result += date.toLocaleDateString()
      }

      if (mode === 'time' || mode === 'both') {
        if (result) result += ' '
        const timeOptions: Intl.DateTimeFormatOptions = {
          hour12: timeFormat === '12',
          hour: 'numeric',
          minute: '2-digit'
        }
        result += date.toLocaleTimeString([], timeOptions)
      }

      return result
    }

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const generateCalendarDays = () => {
      const daysInMonth = getDaysInMonth(viewDate)
      const firstDay = getFirstDayOfMonth(viewDate)
      const days: {
        day: number
        isCurrentMonth: boolean
        isPrevMonth?: boolean
        isNextMonth?: boolean
        date: Date
      }[] = []

      const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0)
      const prevMonthDays = prevMonth.getDate()

      for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
          day: prevMonthDays - i,
          isCurrentMonth: false,
          isPrevMonth: true,
          date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonthDays - i)
        })
      }

      for (let day = 1; day <= daysInMonth; day++) {
        days.push({
          day,
          isCurrentMonth: true,
          date: new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
        })
      }

      const remainingDays = 42 - days.length
      for (let day = 1; day <= remainingDays; day++) {
        days.push({
          day,
          isCurrentMonth: false,
          isNextMonth: true,
          date: new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, day)
        })
      }

      return days
    }

    const handleDateSelect = (date: Date) => {
      const newDate = new Date(selectedDate)
      newDate.setFullYear(date.getFullYear())
      newDate.setMonth(date.getMonth())
      newDate.setDate(date.getDate())

      setSelectedDate(newDate)
      setFocusedDate(newDate)
      setViewDate(newDate)
      onChange?.(newDate)

      if (mode === 'date') {
        setIsOpen(false)
        triggerRef.current?.focus()
      } else if (mode === 'both') {
        setActiveTab('time')
      }
    }

    const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', valueStr: string) => {
      const newDate = new Date(selectedDate)

      if (type === 'hour') {
        if (timeFormat === '12') {
          const currentHours = newDate.getHours()
          const isPM = currentHours >= 12
          let newHours = parseInt(valueStr)

          if (newHours === 12) {
            newHours = isPM ? 12 : 0
          } else {
            newHours = isPM ? newHours + 12 : newHours
          }

          newDate.setHours(newHours)
        } else {
          newDate.setHours(parseInt(valueStr))
        }
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(valueStr))
      } else if (type === 'ampm') {
        const currentHours = newDate.getHours()
        if (valueStr === 'AM' && currentHours >= 12) {
          newDate.setHours(currentHours - 12)
        } else if (valueStr === 'PM' && currentHours < 12) {
          newDate.setHours(currentHours + 12)
        }
      }

      setSelectedDate(newDate)
      onChange?.(newDate)
    }

    const navigateMonth = (direction: number) => {
      const newDate = new Date(viewDate)
      newDate.setMonth(newDate.getMonth() + direction)
      setViewDate(newDate)
    }

    const navigateYear = (direction: number) => {
      const newDate = new Date(viewDate)
      newDate.setFullYear(newDate.getFullYear() + direction)
      setViewDate(newDate)
    }

    const generateYears = () => {
      const currentYear = viewDate.getFullYear()
      const years: number[] = []
      for (let i = currentYear - 50; i <= currentYear + 50; i++) {
        years.push(i)
      }
      return years
    }

    const isToday = (date: Date) => {
      const today = new Date()
      return date.toDateString() === today.toDateString()
    }

    const isSelected = (date: Date) => {
      return selectedDate && date.toDateString() === selectedDate.toDateString()
    }

    const isSameDay = (d1: Date, d2: Date) => {
      return d1.toDateString() === d2.toDateString()
    }

    const getHourDisplay = () => {
      if (timeFormat === '12') {
        const hour = selectedDate.getHours()
        return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      }
      return selectedDate.getHours()
    }

    const getAMPM = () => {
      return selectedDate.getHours() >= 12 ? 'PM' : 'AM'
    }

    const handleGridKeyDown = (e: React.KeyboardEvent, currentDate: Date) => {
      const nextDate = new Date(currentDate)
      let handled = true

      switch (e.key) {
        case 'ArrowLeft':
          nextDate.setDate(nextDate.getDate() - 1)
          break
        case 'ArrowRight':
          nextDate.setDate(nextDate.getDate() + 1)
          break
        case 'ArrowUp':
          nextDate.setDate(nextDate.getDate() - 7)
          break
        case 'ArrowDown':
          nextDate.setDate(nextDate.getDate() + 7)
          break
        case 'Home':
          nextDate.setDate(1)
          break
        case 'End':
          nextDate.setDate(getDaysInMonth(nextDate))
          break
        case 'PageUp':
          nextDate.setMonth(nextDate.getMonth() - 1)
          break
        case 'PageDown':
          nextDate.setMonth(nextDate.getMonth() + 1)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          handleDateSelect(currentDate)
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

    const renderDatePicker = () => (
      <div id={datePanelId} role="tabpanel" aria-labelledby={mode === 'both' ? dateTabId : undefined} className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
            aria-label="Previous month"
            className="p-1.5 hover:bg-accent rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft size={18} className="text-muted-foreground" aria-hidden="true" />
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowMonthModal(true)}
              aria-label={`Select month, currently ${months[viewDate.getMonth()]}`}
              className="font-semibold text-foreground hover:bg-accent px-3 py-1.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {months[viewDate.getMonth()]}
            </button>
            <button
              type="button"
              onClick={() => setShowYearModal(true)}
              aria-label={`Select year, currently ${viewDate.getFullYear()}`}
              className="font-semibold text-foreground hover:bg-accent px-3 py-1.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {viewDate.getFullYear()}
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigateMonth(1)}
            aria-label="Next month"
            className="p-1.5 hover:bg-accent rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight size={18} className="text-muted-foreground" aria-hidden="true" />
          </button>
        </div>

        <div role="row" className="grid grid-cols-7 gap-0 mb-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {weekDays.map(day => (
            <div
              key={day.short}
              role="columnheader"
              aria-label={day.full}
              className="h-8 text-center text-xs font-semibold text-muted-foreground flex items-center justify-center"
            >
              <abbr title={day.full} className="no-underline">{day.short}</abbr>
            </div>
          ))}
        </div>

        <div role="grid" aria-label="Calendar dates" className="grid grid-cols-7 gap-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {generateCalendarDays().map((dayObj, index) => {
            const dateLabel = dayObj.date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
            const selected = isSelected(dayObj.date)
            const today = isToday(dayObj.date)
            const isFocused = isSameDay(dayObj.date, focusedDate)

            return (
              <div key={index} role="gridcell" className="flex items-center justify-center">
                <button
                  ref={(el) => {
                    const key = dayObj.date.toDateString()
                    if (el) dayButtonsRef.current.set(key, el)
                    else dayButtonsRef.current.delete(key)
                  }}
                  type="button"
                  tabIndex={isFocused ? 0 : -1}
                  aria-label={dateLabel}
                  aria-selected={selected}
                  aria-current={today ? 'date' : undefined}
                  onClick={() => {
                    if (dayObj.isPrevMonth) {
                      navigateMonth(-1)
                    } else if (dayObj.isNextMonth) {
                      navigateMonth(1)
                    }
                    handleDateSelect(dayObj.date)
                  }}
                  onKeyDown={(e) => handleGridKeyDown(e, dayObj.date)}
                  className={cn(
                    'h-8 w-8 text-sm rounded-md transition-all duration-200 hover:bg-accent flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    !dayObj.isCurrentMonth ? 'text-muted-foreground/40 hover:text-muted-foreground' : 'text-foreground hover:bg-accent',
                    selected ? 'bg-primary text-primary-foreground hover:bg-primary/90' : '',
                    today && !selected ? 'bg-accent text-accent-foreground font-bold' : ''
                  )}
                >
                  {dayObj.day}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )

    const renderTimePicker = () => (
      <div id={timePanelId} role="tabpanel" aria-labelledby={mode === 'both' ? timeTabId : undefined} className="p-4">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-foreground mb-2" aria-live="polite">
            {String(getHourDisplay()).padStart(2, '0')}:{String(selectedDate.getMinutes()).padStart(2, '0')}
            {timeFormat === '12' && (
              <span className="ml-2 text-xl text-muted-foreground">{getAMPM()}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <div className="flex flex-col items-center">
            <label htmlFor={`hour-select-${generatedId}`} className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Hour</label>
            <select
              id={`hour-select-${generatedId}`}
              value={getHourDisplay()}
              onChange={(e) => handleTimeChange('hour', e.target.value)}
              className="w-14 h-10 text-sm border border-input rounded-md focus-visible:ring-2 focus-visible:ring-ring text-center font-medium bg-background text-foreground"
            >
              {Array.from({ length: timeFormat === '12' ? 12 : 24 }, (_, i) => {
                const hour = timeFormat === '12' ? i + 1 : i
                return (
                  <option key={hour} value={hour}>
                    {String(hour).padStart(2, '0')}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="text-2xl font-bold text-muted-foreground mt-6" aria-hidden="true">:</div>

          <div className="flex flex-col items-center">
            <label htmlFor={`minute-select-${generatedId}`} className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Minute</label>
            <select
              id={`minute-select-${generatedId}`}
              value={selectedDate.getMinutes()}
              onChange={(e) => handleTimeChange('minute', e.target.value)}
              className="w-14 h-10 text-sm border border-input rounded-md focus-visible:ring-2 focus-visible:ring-ring text-center font-medium bg-background text-foreground"
            >
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {String(i).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          {timeFormat === '12' && (
            <div className="flex flex-col items-center">
              <label htmlFor={`ampm-select-${generatedId}`} className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Period</label>
              <select
                id={`ampm-select-${generatedId}`}
                value={getAMPM()}
                onChange={(e) => handleTimeChange('ampm', e.target.value)}
                className="w-16 h-10 text-sm border border-input rounded-md focus-visible:ring-2 focus-visible:ring-ring text-center font-medium bg-background text-foreground"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          )}
        </div>
      </div>
    )

    const renderYearModal = () => (
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-xs p-4 flex flex-col z-20 animate-in fade-in-0"
        role="dialog"
        aria-modal="true"
        aria-label="Choose Year"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
          <h3 className="font-semibold text-foreground">Select Year</h3>
          <button
            type="button"
            onClick={() => setShowYearModal(false)}
            aria-label="Close year selector"
            className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-2">
          {generateYears().map(year => (
            <button
              key={year}
              type="button"
              onClick={() => {
                navigateYear(year - viewDate.getFullYear())
                setShowYearModal(false)
              }}
              className={cn(
                'p-2 text-sm rounded-md transition-colors font-medium',
                year === viewDate.getFullYear()
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'hover:bg-accent text-foreground'
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    )

    const renderMonthModal = () => (
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-xs p-4 flex flex-col z-20 animate-in fade-in-0"
        role="dialog"
        aria-modal="true"
        aria-label="Choose Month"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
          <h3 className="font-semibold text-foreground">Select Month</h3>
          <button
            type="button"
            onClick={() => setShowMonthModal(false)}
            aria-label="Close month selector"
            className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-2">
          {months.map((month, idx) => (
            <button
              key={month}
              type="button"
              onClick={() => {
                const newDate = new Date(viewDate)
                newDate.setMonth(idx)
                setViewDate(newDate)
                setShowMonthModal(false)
              }}
              className={cn(
                'p-2 text-sm rounded-md transition-colors font-medium flex items-center justify-center',
                idx === viewDate.getMonth()
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'hover:bg-accent text-foreground'
              )}
            >
              {month.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>
    )

    const shouldFlip = triggerRect
      ? typeof window !== 'undefined' && triggerRect.bottom + 420 > window.innerHeight && triggerRect.top > 420
      : false

    const popupStyle: React.CSSProperties = triggerRect
      ? {
          position: 'fixed',
          top: shouldFlip ? `${triggerRect.top - 6}px` : `${triggerRect.bottom + 6}px`,
          transform: shouldFlip ? 'translateY(-100%)' : undefined,
          left: `${Math.max(16, Math.min(triggerRect.left, typeof window !== 'undefined' ? window.innerWidth - 340 : triggerRect.left))}px`,
          zIndex: 70
        }
      : {
          zIndex: 70
        }

    return (
      <div 
        ref={(node) => {
          containerRef.current = node
          if (typeof forwardedRef === 'function') forwardedRef(node)
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }} 
        className={cn('relative', className)}
        {...props}
      >
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            if (!disabled) {
              updateTriggerRect()
              setIsOpen(!isOpen)
            }
          }}
          onKeyDown={(e) => {
            if (disabled) return
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
              e.preventDefault()
              updateTriggerRect()
              setIsOpen(true)
            }
          }}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={isOpen ? dialogId : undefined}
          aria-label={ariaLabel || `Date and time picker, currently selected ${formatDisplayValue()}`}
          className={cn(
            'w-full p-3 text-left border border-input rounded-lg bg-background text-foreground transition-all duration-200 flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            disabled ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'hover:border-ring focus:ring-1 focus:ring-ring focus:border-ring',
            isOpen ? 'border-ring ring-1 ring-ring' : ''
          )}
        >
          <span suppressHydrationWarning className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {formatDisplayValue()}
          </span>
          <div className="flex items-center space-x-1 text-muted-foreground" aria-hidden="true">
            {(mode === 'date' || mode === 'both') && <Calendar size={16} />}
            {(mode === 'time' || mode === 'both') && <Clock size={16} />}
          </div>
        </button>

        {isOpen && triggerRect && (
          <Portal>
            <div 
              ref={popupRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label="Date and time picker"
              style={popupStyle}
              className="fixed bg-popover text-popover-foreground rounded-xl shadow-2xl border border-border min-w-[320px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] overflow-y-auto animate-in fade-in-0 zoom-in-95"
            >
            {mode === 'both' && (
              <div role="tablist" aria-label="Date and time selector" className="flex border-b border-border">
                <button
                  id={dateTabId}
                  role="tab"
                  type="button"
                  aria-selected={activeTab === 'date'}
                  aria-controls={datePanelId}
                  onClick={() => setActiveTab('date')}
                  className={cn(
                    'flex-1 p-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    activeTab === 'date' ? 'text-foreground border-b-2 border-primary bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Calendar size={16} aria-hidden="true" />
                  <span>Date</span>
                </button>
                <button
                  id={timeTabId}
                  role="tab"
                  type="button"
                  aria-selected={activeTab === 'time'}
                  aria-controls={timePanelId}
                  onClick={() => setActiveTab('time')}
                  className={cn(
                    'flex-1 p-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    activeTab === 'time' ? 'text-foreground border-b-2 border-primary bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Clock size={16} aria-hidden="true" />
                  <span>Time</span>
                </button>
              </div>
            )}

            <div className="relative">
              {(mode === 'date' || (mode === 'both' && activeTab === 'date')) && renderDatePicker()}
              {(mode === 'time' || (mode === 'both' && activeTab === 'time')) && renderTimePicker()}

              {showYearModal && renderYearModal()}
              {showMonthModal && renderMonthModal()}
            </div>

            <div className="flex justify-end space-x-2 p-3 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setShowYearModal(false)
                  setShowMonthModal(false)
                  triggerRef.current?.focus()
                }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setShowYearModal(false)
                  setShowMonthModal(false)
                  triggerRef.current?.focus()
                }}
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Done
              </button>
            </div>
          </div>
          </Portal>
        )}
      </div>
    )
  }
)
DateTimePicker.displayName = 'DateTimePicker'
