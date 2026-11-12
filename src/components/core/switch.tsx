"use client"

import React from 'react'
import { cn } from '../../lib/utils'
import { useControllableState } from '../../lib/use-controllable-state'

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  name?: string
  value?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  onChange?: (e: any) => void
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      size = 'md',
      id,
      name,
      value,
      disabled = false,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      onChange,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const switchId = id || generatedId

    const [checked, setChecked] = useControllableState<boolean>({
      prop: controlledChecked,
      defaultProp: defaultChecked,
      onChange: (state) => {
        onCheckedChange?.(state)
        if (onChange) {
          onChange({
            target: { checked: state, value: String(state) },
            currentTarget: { checked: state },
            preventDefault: () => {},
            stopPropagation: () => {},
          })
        }
      },
    })

    const toggle = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return
      setChecked(!checked)
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

    const rootSizes = {
      sm: 'h-4 w-7',
      md: 'h-5 w-9',
      lg: 'h-6 w-11',
    }

    const thumbSizes = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }

    const translateClasses = {
      sm: checked ? 'translate-x-3' : 'translate-x-0.5',
      md: checked ? 'translate-x-4' : 'translate-x-0.5',
      lg: checked ? 'translate-x-5' : 'translate-x-0.5',
    }

    const switchNode = (
      <>
        {name && (
          <input
            type="checkbox"
            name={name}
            value={value ?? "on"}
            checked={checked}
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
          role="switch"
          ref={ref}
          id={switchId}
          aria-checked={checked}
          aria-disabled={disabled}
          disabled={disabled}
          data-state={checked ? 'checked' : 'unchecked'}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 select-none',
            checked
              ? 'bg-primary'
              : 'bg-input',
            rootSizes[size],
            className
          )}
          {...props}
        >
          <span
            data-state={checked ? 'checked' : 'unchecked'}
            className={cn(
              'pointer-events-none block rounded-full bg-background shadow-md ring-0 transition-transform duration-200 ease-in-out',
              thumbSizes[size],
              translateClasses[size]
            )}
          />
        </button>
      </>
    )

    if (!label && !description) {
      return switchNode
    }

    return (
      <div className="flex items-center space-x-3">
        {switchNode}
        <div className="grid gap-1 leading-none select-none">
          {label && (
            <label
              htmlFor={switchId}
              onClick={() => {
                if (!disabled) {
                  setChecked(!checked)
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
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Switch.displayName = 'Switch'

export default Switch
