"use client"

import React, { createContext, useContext, forwardRef } from 'react'
import { Circle } from '../../icons'
import { cn } from '../../lib/utils'
import { useControllableState } from '../../lib/use-controllable-state'

interface RadioGroupContextValue {
  value?: string
  setValue: (value: string) => void
  name?: string
  disabled?: boolean
  firstValue?: string
  registerValue: (val: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroupContext() {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) {
    throw new Error('RadioGroupItem must be used within a RadioGroup')
  }
  return ctx
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled = false,
      name,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      children,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useControllableState<string | undefined>({
      prop: controlledValue,
      defaultProp: defaultValue,
      onChange: (val) => val !== undefined && onValueChange?.(val),
    })

    const [firstValue, setFirstValue] = React.useState<string | undefined>(undefined)

    const registerValue = React.useCallback((val: string) => {
      setFirstValue((prev) => prev ?? val)
    }, [])

    return (
      <RadioGroupContext.Provider
        value={{
          value,
          setValue,
          name,
          disabled,
          firstValue,
          registerValue,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-disabled={disabled}
          className={cn('grid gap-2.5', className)}
          {...props}
        >
          {name && <input type="hidden" name={name} value={value ?? ""} aria-hidden="true" />}
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string
  children?: React.ReactNode
}

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, children, id, value: itemValue, disabled: itemDisabled, onClick, onKeyDown, ...props }, ref) => {
    const generatedId = React.useId()
    const itemId = id || generatedId
    const { value, setValue, disabled: groupDisabled, firstValue, registerValue } = useRadioGroupContext()

    React.useEffect(() => {
      registerValue(itemValue)
    }, [registerValue, itemValue])

    const disabled = itemDisabled || groupDisabled
    const isChecked = value === itemValue
    const isFocusable = isChecked || (!value && firstValue === itemValue)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented && !disabled) {
        setValue(itemValue)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e)
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!disabled) {
          setValue(itemValue)
        }
      } else if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft'
      ) {
        e.preventDefault()
        const root = (e.currentTarget.closest('[role="radiogroup"]') || document) as HTMLElement
        const radios = Array.from(
          root.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([disabled]):not([aria-disabled="true"])')
        )
        if (!radios.length) return
        const currentIndex = radios.indexOf(e.currentTarget)
        let nextIndex = 0
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % radios.length
        } else {
          nextIndex = currentIndex === -1 ? radios.length - 1 : (currentIndex - 1 + radios.length) % radios.length
        }
        const nextRadio = radios[nextIndex]
        if (nextRadio) {
          nextRadio.focus()
          nextRadio.click()
        }
      }
    }

    const itemNode = (
      <button
        type="button"
        role="radio"
        ref={ref}
        id={itemId}
        disabled={disabled}
        aria-checked={isChecked}
        aria-disabled={disabled}
        data-state={isChecked ? 'checked' : 'unchecked'}
        tabIndex={isFocusable ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-input bg-background text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer',
          isChecked && 'border-primary',
          className
        )}
        {...props}
      >
        {isChecked && (
          <Circle className="h-2 w-2 fill-primary text-primary" aria-hidden="true" />
        )}
      </button>
    )

    if (!children) {
      return itemNode
    }

    return (
      <div className="flex items-center space-x-2.5">
        {itemNode}
        <label
          htmlFor={itemId}
          className={cn(
            'text-sm font-medium leading-none text-foreground cursor-pointer select-none',
            disabled && 'cursor-not-allowed opacity-70'
          )}
        >
          {children}
        </label>
      </div>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export default RadioGroup
