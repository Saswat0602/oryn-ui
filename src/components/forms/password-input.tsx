"use client"

import * as React from "react"
import { Eye, EyeOff, ArrowUpFromLine, Check, X as CloseIcon } from "../../icons"
import { cn } from "../../lib/utils"
import { Input, type InputProps } from "../core/input"

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  showToggle?: boolean
  strengthMeter?: boolean
  strengthScore?: number // 0 to 4
  showRequirements?: boolean
  onVisibilityChange?: (visible: boolean) => void
}

interface PasswordRule {
  label: string
  met: boolean
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      showToggle = true,
      strengthMeter = false,
      strengthScore: controlledScore,
      showRequirements = false,
      onVisibilityChange,
      disabled,
      value,
      defaultValue,
      onChange,
      autoComplete = "current-password",
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false)
    const [capsLockActive, setCapsLockActive] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(
      typeof value === "string" ? value : typeof defaultValue === "string" ? defaultValue : ""
    )

    const currentValue = String(value !== undefined ? value : (internalValue ?? defaultValue ?? ""))

    const toggleVisibility = React.useCallback(() => {
      setVisible((prev) => {
        const next = !prev
        onVisibilityChange?.(next)
        return next
      })
    }, [onVisibilityChange])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState("CapsLock"))
      }
      props.onKeyDown?.(e)
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState("CapsLock"))
      }
      props.onKeyUp?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    // Auto-calculate strength score from current value if not explicitly controlled
    const rules: PasswordRule[] = React.useMemo(() => [
      { label: "At least 8 characters", met: currentValue.length >= 8 },
      { label: "Upper and lowercase letters", met: /[a-z]/.test(currentValue) && /[A-Z]/.test(currentValue) },
      { label: "At least 1 number", met: /\d/.test(currentValue) },
      { label: "At least 1 special character", met: /[^A-Za-z0-9]/.test(currentValue) },
    ], [currentValue])

    const autoScore = React.useMemo(() => {
      if (!currentValue) return 0
      return rules.filter((r) => r.met).length
    }, [currentValue, rules])

    const score = controlledScore !== undefined ? controlledScore : autoScore

    const getStrengthColor = (s: number, index: number) => {
      if (index >= s) return "bg-muted"
      if (s <= 1) return "bg-destructive"
      if (s === 2) return "bg-amber-500 dark:bg-amber-400"
      if (s === 3) return "bg-primary"
      return "bg-emerald-600 dark:bg-emerald-500"
    }

    const getStrengthLabel = (s: number) => {
      if (s === 0) return ""
      if (s === 1) return "Weak"
      if (s === 2) return "Fair"
      if (s === 3) return "Good"
      return "Strong"
    }

    const hasBothIndicators = capsLockActive && showToggle

    return (
      <div className="w-full space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            type={visible ? "text" : "password"}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            autoComplete={autoComplete}
            className={cn(
              hasBothIndicators ? "pr-16" : showToggle || capsLockActive ? "pr-10" : "",
              className
            )}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            {...props}
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground select-none">
            {capsLockActive && (
              <span
                role="status"
                aria-live="assertive"
                title="Caps Lock is active"
                className="flex items-center text-amber-600 dark:text-amber-400 p-1 rounded"
              >
                <ArrowUpFromLine className="h-4 w-4" />
                <span className="sr-only">Caps Lock is active</span>
              </span>
            )}
            {showToggle && (
              <button
                type="button"
                onClick={toggleVisibility}
                disabled={disabled}
                aria-label={visible ? "Hide password" : "Show password"}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                {visible ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>

        {strengthMeter && (
          <div
            role="meter"
            aria-label="Password strength"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuetext={score > 0 ? getStrengthLabel(score) : "No password entered"}
            className="space-y-1.5"
          >
            <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={cn(
                    "rounded-full h-1.5 transition-colors duration-200",
                    getStrengthColor(score, idx)
                  )}
                />
              ))}
            </div>
            {score > 0 && (
              <p className="text-xs text-muted-foreground text-right font-medium">
                {getStrengthLabel(score)}
              </p>
            )}
          </div>
        )}

        {showRequirements && (
          <div aria-live="polite" className="pt-1 space-y-1">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-2 text-xs transition-colors",
                  rule.met ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-muted-foreground"
                )}
              >
                {rule.met ? (
                  <Check className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <CloseIcon className="h-3.5 w-3.5 shrink-0 opacity-40" />
                )}
                <span>{rule.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"