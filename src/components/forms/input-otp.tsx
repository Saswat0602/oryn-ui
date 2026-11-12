"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface InputOTPContextValue {
  value: string
  length: number
  activeIndex: number
  disabled?: boolean
  mask?: boolean
  type?: "number" | "text"
  inputRef: React.RefObject<HTMLInputElement | null>
}

const InputOTPContext = React.createContext<InputOTPContextValue | null>(null)

function useInputOTPContext() {
  const context = React.useContext(InputOTPContext)
  if (!context) {
    throw new Error("InputOTP compound components must be used within an InputOTP")
  }
  return context
}

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  length?: number
  maxLength?: number
  disabled?: boolean
  mask?: boolean
  placeholder?: string
  type?: "number" | "text"
  autoFocus?: boolean
  name?: string
  children?: React.ReactNode
}

export interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  char?: string
  hasFakeCaret?: boolean
  isActive?: boolean
  children?: React.ReactNode
}

export interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center -space-x-px", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputOTPGroup.displayName = "InputOTPGroup"

export const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-hidden="true"
        className={cn("px-2 text-muted-foreground select-none", className)}
        {...props}
      >
        {children || <span className="text-sm font-semibold">—</span>}
      </div>
    )
  }
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  (
    {
      index,
      char: charProp,
      hasFakeCaret: hasFakeCaretProp,
      isActive: isActiveProp,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(InputOTPContext)

    let char = charProp
    let isActive = isActiveProp
    let hasFakeCaret = hasFakeCaretProp

    if (context && typeof index === "number") {
      const rawChar = context.value[index] || ""
      char = context.mask && rawChar ? "•" : rawChar
      isActive = context.activeIndex === index
      hasFakeCaret = isActive && !rawChar
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "relative flex h-10 w-10 items-center justify-center border border-input bg-background text-sm font-medium transition-all first:rounded-l-md last:rounded-r-md",
          isActive && "z-10 ring-2 ring-ring ring-offset-background border-primary",
          context?.disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {char ? (
          <span className="text-foreground text-base font-semibold">{char}</span>
        ) : null}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center animate-caret-blink">
            <div className="h-4 w-px bg-foreground duration-150" />
          </div>
        )}
        {children}
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

interface CompoundedInputOTP extends React.ForwardRefExoticComponent<InputOTPProps & React.RefAttributes<HTMLDivElement>> {
  Group: typeof InputOTPGroup
  Slot: typeof InputOTPSlot
  Separator: typeof InputOTPSeparator
}

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      length: lengthProp,
      maxLength: maxLengthProp,
      disabled = false,
      mask = false,
      placeholder,
      type = "text",
      autoFocus = false,
      id,
      name,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const totalLength = maxLengthProp ?? lengthProp ?? 6
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [isFocused, setIsFocused] = React.useState(false)

    const activeIndex = Math.min(value.length, totalLength - 1)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let nextValue = e.target.value
      if (type === "number") {
        nextValue = nextValue.replace(/\D/g, "")
      }
      nextValue = nextValue.slice(0, totalLength)
      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }
      onChange?.(nextValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return
      if (e.key === "Backspace" && !value.length) {
        e.preventDefault()
      }
    }

    const handleContainerClick = () => {
      if (disabled) return
      inputRef.current?.focus()
    }

    const {
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      "aria-invalid": ariaInvalid,
      ...divProps
    } = props

    return (
      <InputOTPContext.Provider
        value={{
          value,
          length: totalLength,
          activeIndex: isFocused ? activeIndex : -1,
          disabled,
          mask,
          type,
          inputRef,
        }}
      >
        <div
          ref={ref}
          onClick={handleContainerClick}
          className={cn(
            "relative inline-flex items-center justify-center cursor-text select-none",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          {...divProps}
        >
          {/* Real accessible hidden input covering full area */}
          <input
            ref={inputRef}
            id={id}
            name={name}
            type={type === "number" ? "tel" : "text"}
            inputMode={type === "number" ? "numeric" : "text"}
            pattern={type === "number" ? "[0-9]*" : undefined}
            autoComplete="one-time-code"
            maxLength={totalLength}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            autoFocus={autoFocus}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto"
            aria-label={ariaLabel || "One-time password code"}
            aria-describedby={ariaDescribedby}
            aria-invalid={ariaInvalid}
          />

          {children ? (
            children
          ) : (
            <InputOTPGroup>
              {Array.from({ length: totalLength }).map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          )}
        </div>
      </InputOTPContext.Provider>
    )
  }
) as unknown as CompoundedInputOTP

InputOTP.displayName = "InputOTP"
InputOTP.Group = InputOTPGroup
InputOTP.Slot = InputOTPSlot
InputOTP.Separator = InputOTPSeparator
