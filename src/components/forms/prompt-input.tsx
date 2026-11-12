"use client"

import * as React from "react"
import { ArrowUp, Square } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../lib/use-controllable-state"

export interface PromptInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "defaultValue" | "onChange"> {
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onStop?: () => void
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  maxRows?: number
  minRows?: number
  startActions?: React.ReactNode
  endActions?: React.ReactNode
  autoFocus?: boolean
}

export const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onChange,
      onValueChange,
      onSubmit,
      onStop,
      placeholder = "Ask anything or type a prompt...",
      loading = false,
      disabled = false,
      maxRows = 8,
      minRows = 1,
      startActions,
      endActions,
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useControllableState<string>({
      prop: controlledValue,
      defaultProp: defaultValue,
      onChange: onValueChange,
    })

    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    // Auto-adjust textarea height
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      textarea.style.height = "auto"
      const singleRowHeight = 24
      const minHeight = minRows * singleRowHeight
      const maxHeight = maxRows * singleRowHeight
      const scrollHeight = textarea.scrollHeight

      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
      textarea.style.height = `${newHeight}px`
      textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden"
    }, [minRows, maxRows])

    React.useEffect(() => {
      adjustHeight()
    }, [value, adjustHeight])

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
      onChange?.(e)
    }

    const handleSubmit = () => {
      if (loading) {
        onStop?.()
        return
      }

      const trimmed = (value ?? "").trim()
      if (!trimmed || disabled) return

      onSubmit?.(trimmed)
      setValue("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.nativeEvent.isComposing) return
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    }

    const canSubmit = Boolean((value ?? "").trim()) && !disabled

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col rounded-2xl border bg-background p-2.5 transition-all shadow-sm",
          "border-input focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
          disabled && "opacity-60 cursor-not-allowed bg-muted",
          className
        )}
        {...props}
      >
        <textarea
          ref={textareaRef}
          value={value ?? ""}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          rows={minRows}
          className="w-full resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground text-foreground"
        />

        <div className="flex items-center justify-between gap-2 pt-2 px-1">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            {startActions}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {endActions}

            {loading ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop generating"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors cursor-pointer"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                aria-label="Send prompt"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
                  canSubmit
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-xs"
                    : "bg-muted text-muted-foreground/50 cursor-not-allowed"
                )}
              >
                <ArrowUp className="h-4 w-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

PromptInput.displayName = "PromptInput"
