"use client"

import React, { createContext, useContext, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { useControllableState } from '../../lib/use-controllable-state'

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const [pressed, setPressed] = useControllableState<boolean>({
      prop: controlledPressed,
      defaultProp: defaultPressed,
      onChange: onPressedChange,
    })

    const sizeClasses = {
      sm: 'h-8 px-2.5 text-xs',
      md: 'h-9 px-3 text-xs',
      lg: 'h-10 px-4 text-sm',
    }

    const variantClasses = {
      default:
        'bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground shadow-2xs',
      outline:
        'border border-input bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground shadow-2xs',
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented && !disabled) {
        setPressed(!pressed)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        disabled={disabled}
        data-state={pressed ? 'on' : 'off'}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Toggle.displayName = 'Toggle'

interface ToggleGroupContextValue {
  type: 'single' | 'multiple'
  value: any
  onItemToggle: (val: string) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
  disabled?: boolean
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)

export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  type?: 'single' | 'multiple'
  value?: any
  defaultValue?: any
  onValueChange?: (val: any) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
  disabled?: boolean
}

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      type = 'single',
      value: controlledValue,
      defaultValue,
      onValueChange,
      size = 'md',
      variant = 'default',
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const initialDefault = defaultValue !== undefined ? defaultValue : type === 'multiple' ? [] : ''

    const [value, setValue] = useControllableState<any>({
      prop: controlledValue,
      defaultProp: initialDefault,
      onChange: onValueChange,
    })

    const onItemToggle = (itemVal: string) => {
      if (type === 'multiple') {
        const arr = Array.isArray(value) ? [...value] : []
        const idx = arr.indexOf(itemVal)
        if (idx >= 0) arr.splice(idx, 1)
        else arr.push(itemVal)
        setValue(arr)
      } else {
        setValue(value === itemVal ? '' : itemVal)
      }
    }

    return (
      <ToggleGroupContext.Provider
        value={{
          type,
          value,
          onItemToggle,
          size,
          variant,
          disabled,
        }}
      >
        <div
          ref={ref}
          role="group"
          className={cn(
            'inline-flex items-center justify-center gap-1 rounded-lg border border-border p-1',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    )
  }
)
ToggleGroup.displayName = 'ToggleGroup'

export interface ToggleGroupItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, children, value: itemVal, variant, size, disabled, onClick, ...props }, ref) => {
    const ctx = useContext(ToggleGroupContext)
    const resolvedVariant = variant || ctx?.variant || 'default'
    const resolvedSize = size || ctx?.size || 'md'
    const isDisabled = disabled || ctx?.disabled

    const isPressed =
      ctx?.type === 'multiple'
        ? Array.isArray(ctx.value) && ctx.value.includes(itemVal)
        : ctx?.value === itemVal

    const sizeClasses = {
      sm: 'h-8 px-2.5 text-xs',
      md: 'h-9 px-3 text-xs',
      lg: 'h-10 px-4 text-sm',
    }

    const variantClasses = {
      default:
        'bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground shadow-2xs',
      outline:
        'border border-input bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground shadow-2xs',
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented && !isDisabled && ctx) {
        ctx.onItemToggle(itemVal)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        disabled={isDisabled}
        data-state={isPressed ? 'on' : 'off'}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
          sizeClasses[resolvedSize],
          variantClasses[resolvedVariant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ToggleGroupItem.displayName = 'ToggleGroupItem'

export default Toggle
