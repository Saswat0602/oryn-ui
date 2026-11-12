"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Clock, Calendar, X } from '../../icons'
import { Portal } from '../../primitives/portal'

export type DateTimeMode = 'date' | 'time' | 'both'
export type TimeFormat = '12' | '24'

export interface DateTimePickerProps {
  mode?: DateTimeMode
  timeFormat?: TimeFormat
  value?: Date | null
  onChange?: (value: Date) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      mode = 'both',
      timeFormat = '12',
      value = null,
      onChange,
      placeholder = 'Select date & time',
      disabled = false,
      className = '',
    },
    forwardedRef
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>(value ? new Date(value) : new Date())
    const [viewDate, setViewDate] = useState<Date>(new Date())
    const [showYearModal, setShowYearModal] = useState(false)
    const [showMonthModal, setShowMonthModal] = useState(false)
    const [activeTab, setActiveTab] = useState<DateTimeMode>(mode === 'both' ? 'date' : mode)
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)

    const containerRef = useRef<HTMLDivElement | null>(null)
    const popupRef = useRef<HTMLDivElement | null>(null)

    const updateTriggerRect = useCallback(() => {
      if (containerRef.current) {
        setTriggerRect(containerRef.current.getBoundingClientRect())
      }
    }, [])

    useEffect(() => {
      if (!isOpen) return
      updateTriggerRect()
      const handleScrollOrResize = () => updateTriggerRect()
      window.addEventListener('scroll', handleScrollOrResize, true)
      window.addEventListener('resize', handleScrollOrResize)
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true)
        window.removeEventListener('resize', handleScrollOrResize)
      }
    }, [isOpen, updateTriggerRect])

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
    }
  }, [value])

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  useEffect(() => {
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
  }, [])

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
    onChange?.(newDate)

    if (mode === 'date') {
      setIsOpen(false)
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

  const renderDatePicker = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-1.5 hover:bg-accent rounded-full transition-colors"
        >
          <ChevronLeft size={18} className="text-muted-foreground" />
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowMonthModal(true)}
            className="font-semibold text-foreground hover:bg-accent px-3 py-1.5 rounded transition-colors"
          >
            {months[viewDate.getMonth()]}
          </button>
          <button
            onClick={() => setShowYearModal(true)}
            className="font-semibold text-foreground hover:bg-accent px-3 py-1.5 rounded transition-colors"
          >
            {viewDate.getFullYear()}
          </button>
        </div>

        <button
          onClick={() => navigateMonth(1)}
          className="p-1.5 hover:bg-accent rounded-full transition-colors"
        >
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0 mb-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {weekDays.map(day => (
          <div key={day} className="h-8 text-center text-xs font-semibold text-muted-foreground flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {generateCalendarDays().map((dayObj, index) => (
          <button
            key={index}
            onClick={() => {
              if ((dayObj as any).isPrevMonth) {
                navigateMonth(-1)
              } else if ((dayObj as any).isNextMonth) {
                navigateMonth(1)
              }
              handleDateSelect(dayObj.date)
            }}
            className={cn(
              'h-8 w-8 text-sm rounded-md transition-all duration-200 hover:bg-accent flex items-center justify-center font-medium',
              !dayObj.isCurrentMonth ? 'text-muted-foreground/40 hover:text-muted-foreground' : 'text-foreground hover:bg-accent',
              isSelected(dayObj.date) ? 'bg-primary text-primary-foreground hover:bg-primary/90' : '',
              isToday(dayObj.date) && !isSelected(dayObj.date) ? 'bg-accent text-accent-foreground font-bold' : ''
            )}
          >
            {dayObj.day}
          </button>
        ))}
      </div>
    </div>
  )

  const renderTimePicker = () => (
    <div className="p-4">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-foreground mb-2">
          {String(getHourDisplay()).padStart(2, '0')}:{String(selectedDate.getMinutes()).padStart(2, '0')}
          {timeFormat === '12' && (
            <span className="ml-2 text-xl text-muted-foreground">{getAMPM()}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <div className="flex flex-col items-center">
          <label className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Hour</label>
          <select
            value={getHourDisplay()}
            onChange={(e) => handleTimeChange('hour', e.target.value)}
            className="w-14 h-10 text-sm border border-input rounded-md focus:ring-1 focus:ring-ring focus:border-ring text-center font-medium bg-background text-foreground"
          >
            {Array.from({ length: timeFormat === '12' ? 12 : 24 }, (_, i) => {
              const hour = timeFormat === '12' ? i + 1 : i
              return (
                <option key={i} value={hour}>
                  {String(hour).padStart(2, '0')}
                </option>
              )
            })}
          </select>
        </div>

        <div className="text-2xl font-bold text-muted-foreground mt-6">:</div>

        <div className="flex flex-col items-center">
          <label className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Minute</label>
          <select
            value={selectedDate.getMinutes()}
            onChange={(e) => handleTimeChange('minute', e.target.value)}
            className="w-14 h-10 text-sm border border-input rounded-md focus:ring-1 focus:ring-ring focus:border-ring text-center font-medium bg-background text-foreground"
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
            <label className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Period</label>
            <select
              value={getAMPM()}
              onChange={(e) => handleTimeChange('ampm', e.target.value)}
              className="w-16 h-10 text-sm border border-input rounded-md focus:ring-1 focus:ring-ring focus:border-ring text-center font-medium bg-background text-foreground"
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
    <div className="absolute inset-0 bg-popover text-popover-foreground rounded-lg shadow-lg border border-border z-50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Select Year</h3>
        <button
          onClick={() => setShowYearModal(false)}
          className="p-1 hover:bg-accent rounded-full text-foreground"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        <div className="grid grid-cols-4 gap-2">
          {generateYears().map(year => (
            <button
              key={year}
              onClick={() => {
                const newDate = new Date(viewDate)
                newDate.setFullYear(year)
                setViewDate(newDate)
                setShowYearModal(false)
              }}
              className={cn(
                'p-2 text-sm rounded-lg transition-colors cursor-pointer',
                year === viewDate.getFullYear() ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-accent text-foreground'
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMonthModal = () => (
    <div className="absolute inset-0 bg-popover text-popover-foreground rounded-lg shadow-lg border border-border z-50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Select Month</h3>
        <button
          onClick={() => setShowMonthModal(false)}
          className="p-1 hover:bg-accent rounded-full text-foreground"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => {
                const newDate = new Date(viewDate)
                newDate.setMonth(index)
                setViewDate(newDate)
                setShowMonthModal(false)
              }}
              className={cn(
                'p-2 text-sm rounded-lg transition-colors',
                index === viewDate.getMonth() ? 'bg-primary text-primary-foreground' : 'hover:bg-accent text-foreground'
              )}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

    const shouldFlip = triggerRect
      ? typeof window !== "undefined" && triggerRect.bottom + 420 > window.innerHeight && triggerRect.top > 420
      : false

    const popupStyle: React.CSSProperties = triggerRect
      ? {
          position: "fixed",
          top: shouldFlip ? `${triggerRect.top - 6}px` : `${triggerRect.bottom + 6}px`,
          transform: shouldFlip ? "translateY(-100%)" : undefined,
          left: `${Math.max(16, Math.min(triggerRect.left, typeof window !== "undefined" ? window.innerWidth - 340 : triggerRect.left))}px`,
          zIndex: 70,
        }
      : {}

    return (
    <div 
      ref={(node) => {
        containerRef.current = node
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      }} 
      className={cn('relative', className)}
    >
      <button
        type="button"
        onClick={() => {
          if (!disabled) {
            updateTriggerRect()
            setIsOpen(!isOpen)
          }
        }}
        disabled={disabled}
        className={cn(
          'w-full p-3 text-left border border-input rounded-lg bg-background text-foreground transition-all duration-200 flex items-center justify-between cursor-pointer',
          disabled ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'hover:border-ring focus:ring-1 focus:ring-ring focus:border-ring',
          isOpen ? 'border-ring ring-1 ring-ring' : ''
        )}
      >
        <span suppressHydrationWarning className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {formatDisplayValue()}
        </span>
        <div className="flex items-center space-x-1 text-muted-foreground">
          {(mode === 'date' || mode === 'both') && <Calendar size={16} />}
          {(mode === 'time' || mode === 'both') && <Clock size={16} />}
        </div>
      </button>

      {isOpen && triggerRect && (
        <Portal>
          <div 
            ref={popupRef}
            style={popupStyle}
            className="fixed bg-popover text-popover-foreground rounded-xl shadow-2xl border border-border min-w-[320px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] overflow-y-auto animate-in fade-in-0 zoom-in-95"
          >
          {mode === 'both' && (
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('date')}
                className={cn(
                  'flex-1 p-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2',
                  activeTab === 'date' ? 'text-foreground border-b-2 border-primary bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Calendar size={16} />
                <span>Date</span>
              </button>
              <button
                onClick={() => setActiveTab('time')}
                className={cn(
                  'flex-1 p-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2',
                  activeTab === 'time' ? 'text-foreground border-b-2 border-primary bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Clock size={16} />
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
              onClick={() => {
                setIsOpen(false)
                setShowYearModal(false)
                setShowMonthModal(false)
              }}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                setShowYearModal(false)
                setShowMonthModal(false)
              }}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
        </Portal>
      )}
    </div>
  )
})
DateTimePicker.displayName = 'DateTimePicker'