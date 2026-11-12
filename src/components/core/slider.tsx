"use client"

import React, { forwardRef, useRef, useState, useCallback } from 'react'
import { cn } from '../../lib/utils'

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: number | number[] | [number, number]
  defaultValue?: number | number[] | [number, number]
  name?: string
  min?: number
  max?: number
  step?: number
  variant?: 'default' | 'filled' | 'outlined' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
  range?: boolean
  disabled?: boolean
  showValue?: boolean
  showMarks?: boolean
  marks?: Array<{ value: number; label?: string }>
  fullWidth?: boolean
  onChange?: (value: number | number[] | [number, number]) => void
  onValueChange?: (value: number | number[] | [number, number]) => void
  'aria-label'?: string
  'aria-labelledby'?: string
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function roundToStep(value: number, step: number, min: number): number {
  const steps = Math.round((value - min) / step)
  return Number((min + steps * step).toFixed(4))
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      name,
      min = 0,
      max = 100,
      step = 1,
      variant = 'default',
      size = 'md',
      orientation = 'horizontal',
      range = false,
      disabled = false,
      showValue = false,
      showMarks = false,
      marks = [],
      fullWidth = false,
      onChange,
      onValueChange,
      className,
      ...props
    },
    ref
  ) => {
    const toArray = (val?: number | number[] | [number, number]): number[] => {
      if (val === undefined) return [0]
      return Array.isArray(val) ? val : [val]
    }

    const [uncontrolledValues, setUncontrolledValues] = useState<number[]>(
      () => toArray(defaultValue)
    )

    const isControlled = controlledValue !== undefined
    const values = isControlled ? toArray(controlledValue) : uncontrolledValues

    const trackRef = useRef<HTMLDivElement>(null)
    const activeThumbIndexRef = useRef<number>(0)

    const updateValueAtIndex = useCallback(
      (index: number, rawVal: number) => {
        const clamped = clamp(roundToStep(rawVal, step, min), min, max)
        const nextValues = [...values]
        nextValues[index] = clamped

        // If range, sort or ensure thumb 0 <= thumb 1
        if (range && nextValues.length > 1) {
          if (index === 0 && nextValues[0] > nextValues[1]) {
            nextValues[0] = nextValues[1]
          } else if (index === 1 && nextValues[1] < nextValues[0]) {
            nextValues[1] = nextValues[0]
          }
        }

        if (!isControlled) {
          setUncontrolledValues(nextValues)
        }

        const isMulti = range || nextValues.length > 1
        const result = isMulti ? nextValues : nextValues[0]
        onValueChange?.(result)
        onChange?.(result)
      },
      [isControlled, max, min, onChange, onValueChange, range, step, values]
    )

    const getValueFromPointer = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!trackRef.current) return min
        const rect = trackRef.current.getBoundingClientRect()
        const ratio =
          orientation === 'horizontal'
            ? (e.clientX - rect.left) / rect.width
            : 1 - (e.clientY - rect.top) / rect.height
        return min + ratio * (max - min)
      },
      [max, min, orientation]
    )

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      e.currentTarget.setPointerCapture(e.pointerId)

      const clickedValue = getValueFromPointer(e)

      // Find closest thumb
      let closestIdx = 0
      let minDist = Math.abs(values[0] - clickedValue)
      for (let i = 1; i < values.length; i++) {
        const dist = Math.abs(values[i] - clickedValue)
        if (dist < minDist) {
          minDist = dist
          closestIdx = i
        }
      }

      activeThumbIndexRef.current = closestIdx
      updateValueAtIndex(closestIdx, clickedValue)
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return
      const pointerValue = getValueFromPointer(e)
      updateValueAtIndex(activeThumbIndexRef.current, pointerValue)
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (disabled) return
      let delta = 0
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step
      else if (e.key === 'Home') delta = min - values[index]
      else if (e.key === 'End') delta = max - values[index]

      if (delta !== 0) {
        e.preventDefault()
        updateValueAtIndex(index, values[index] + delta)
      }
    }

    const trackSizes: Record<'sm' | 'md' | 'lg', string> = {
      sm: 'h-1',
      md: 'h-1.5',
      lg: 'h-2.5',
    }

    const thumbSizes: Record<'sm' | 'md' | 'lg', string> = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }

    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100
    }

    // Range calculation
    const rangeLeft = values.length > 1 ? getPercentage(values[0]) : 0
    const rangeWidth =
      values.length > 1
        ? getPercentage(values[1]) - getPercentage(values[0])
        : getPercentage(values[0])

    return (
      <div
        ref={ref}
        className={cn('relative flex flex-col gap-1.5 select-none', fullWidth && 'w-full', className)}
        {...props}
      >
        {name && (
          <input
            type="hidden"
            name={name}
            value={values.join(',')}
          />
        )}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          className={cn(
            'relative flex touch-none items-center cursor-pointer select-none',
            orientation === 'horizontal' ? 'w-full py-1.5' : 'h-full min-h-[160px] flex-col px-1.5 justify-center',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {/* Track background */}
          <div
            className={cn(
              'relative grow overflow-hidden rounded-full bg-secondary',
              orientation === 'horizontal'
                ? trackSizes[size as 'sm' | 'md' | 'lg' || 'md']
                : 'w-1.5 h-full'
            )}
          >
            {/* Active Range */}
            <div
              className="absolute bg-primary rounded-full"
              style={
                orientation === 'vertical'
                  ? {
                      bottom: `${rangeLeft}%`,
                      height: `${rangeWidth}%`,
                      width: '100%',
                    }
                  : {
                      left: `${rangeLeft}%`,
                      width: `${rangeWidth}%`,
                      height: '100%',
                    }
              }
            />
          </div>

          {/* Thumbs */}
          {values.map((val, idx) => {
            const percent = getPercentage(val)
            return (
              <div
                key={idx}
                role="slider"
                aria-label={
                  props['aria-label'] ||
                  (values.length > 1 ? (idx === 0 ? 'Minimum' : 'Maximum') : 'Value')
                }
                aria-labelledby={props['aria-labelledby']}
                aria-orientation={orientation}
                tabIndex={disabled ? -1 : 0}
                aria-valuenow={val}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-disabled={disabled}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                style={
                  orientation === 'vertical'
                    ? {
                        bottom: `${percent}%`,
                        left: '50%',
                        transform: 'translate(-50%, 50%)',
                      }
                    : {
                        left: `${percent}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }
                }
                className={cn(
                  'absolute block rounded-full border-2 border-primary bg-background shadow-md touch-none motion-safe:transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'cursor-grab active:cursor-grabbing',
                  disabled && 'pointer-events-none',
                  thumbSizes[size as 'sm' | 'md' | 'lg' || 'md']
                )}
              />
            )
          })}
        </div>

        {showMarks && marks.length > 0 && (
          <div className="relative w-full flex justify-between px-1 text-[11px] text-muted-foreground">
            {marks.map((m: { value: number; label?: string }) => (
              <span key={m.value}>{m.label || m.value}</span>
            ))}
          </div>
        )}
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export default Slider
