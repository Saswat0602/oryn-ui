"use client"

import React from 'react'
import { Check, Minus } from '../../icons'
import { cn } from '../../lib/utils'
import { useControllableState } from '../../lib/use-controllable-state'

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'checked' | 'defaultChecked' | 'onChange'> {
  label?: string
  description?: string
  error?: boolean
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
  name?: string
  value?: string
  checked?: CheckedState
  defaultChecked?: CheckedState
  onCheckedChange?: (checked: CheckedState) => void
  onChange?: (e: any) => void
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      indeterminate,
      size = 'md',
      id,
      name,
      value,
      checked: controlledChecked,
      defaultChecked = false,
      disabled = false,
      onChange,
      onCheckedChange,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const checkboxId = id || generatedId

    const [checked, setChecked] = useControllableState<CheckedState>({
      prop: indeterminate ? 'indeterminate' : controlledChecked,
      defaultProp: indeterminate ? 'indeterminate' : defaultChecked,
      onChange: (nextState) => {
        onCheckedChange?.(nextState)
        if (onChange) {
          onChange({
            target: { checked: nextState === true, value: String(nextState) },
            currentTarget: { checked: nextState === true },
            preventDefault: () => {},
            stopPropagation: () => {},
          })
        }
      },
    })

    const isChecked = checked === true
    const isIndeterminate = checked === 'indeterminate' || indeterminate

    const toggle = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return
      const nextState = isIndeterminate ? true : !isChecked
      setChecked(nextState)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        toggle(e)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e)
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        toggle(e)
      }
    }

    const sizeClasses = {
      sm: 'h-3.5 w-3.5 rounded',
      md: 'h-4 w-4 rounded-md',
      lg: 'h-5 w-5 rounded-md',
    }

    const iconSizes = {
      sm: 'h-2.5 w-2.5 stroke-[3]',
      md: 'h-3.5 w-3.5 stroke-[3]',
      lg: 'h-4 w-4 stroke-[3]',
    }

    const checkboxNode = (
      <>
        {name && (
          <input
            type="checkbox"
            name={name}
            value={value ?? "on"}
            checked={isChecked}
            style={{
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              margin: 0,
              width: 0,
              height: 0,
            }}
            tabIndex={-1}
            aria-hidden="true"
            readOnly
          />
        )}
        <button
          type="button"
          role="checkbox"
          ref={ref}
          id={checkboxId}
          aria-checked={isIndeterminate ? 'mixed' : isChecked}
          aria-disabled={disabled}
          disabled={disabled}
          data-state={isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            'peer shrink-0 flex items-center justify-center border border-input bg-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 select-none cursor-pointer',
            (isChecked || isIndeterminate) && 'bg-primary border-primary text-primary-foreground',
            (error || props["aria-invalid"] === true || props["aria-invalid"] === "true") && 'border-destructive',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {isIndeterminate ? (
            <Minus className={iconSizes[size]} />
          ) : isChecked ? (
            <Check className={iconSizes[size]} />
          ) : null}
        </button>
      </>
    )

    if (!label && !description) {
      return checkboxNode
    }

    return (
      <div className="flex items-start space-x-2.5">
        <div className="flex items-center h-5">{checkboxNode}</div>
        <div className="grid gap-1 leading-none select-none">
          {label && (
            <label
              htmlFor={checkboxId}
              onClick={() => {
                if (!disabled) {
                  const nextState = isIndeterminate ? true : !isChecked
                  setChecked(nextState)
                }
              }}
              className={cn(
                'text-sm font-medium leading-none cursor-pointer text-foreground',
                disabled && 'cursor-not-allowed opacity-70'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              className={cn(
                'text-xs text-muted-foreground',
                error && 'text-red-500 dark:text-red-400'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export default Checkbox