"use client"

import * as React from "react"
import { ChevronRight, Brain, Sparkles } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../lib/use-controllable-state"

export interface ReasoningDisclosureProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  summary?: React.ReactNode
  duration?: string | number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  isStreaming?: boolean
}

export const ReasoningDisclosure = React.forwardRef<HTMLDivElement, ReasoningDisclosureProps>(
  (
    {
      className,
      title = "Reasoning Process",
      summary,
      duration,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      isStreaming = false,
      children,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useControllableState<boolean>({
      prop: controlledOpen,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    })

    const contentId = React.useId()

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border bg-card transition-all",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-xs text-left cursor-pointer select-none rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <div className="flex items-center gap-2 min-w-0">
            <ChevronRight
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform duration-150 shrink-0",
                open && "rotate-90"
              )}
            />
            {isStreaming ? (
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />
            ) : (
              <Brain aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
            <span className="font-semibold text-foreground truncate">
              {title}
            </span>

            {!open && summary && (
              <span className="text-muted-foreground truncate hidden sm:inline">
                — {summary}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isStreaming && (
              <span
                role="status"
                aria-live="polite"
                className="flex items-center gap-1 text-[11px] font-medium text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" aria-hidden="true" />
                Thinking...
              </span>
            )}
            {duration && (
              <span className="text-[11px] font-medium text-muted-foreground">
                {typeof duration === "number" ? `${duration}s` : duration}
              </span>
            )}
          </div>
        </button>

        {open && (
          <div
            id={contentId}
            className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground font-mono bg-muted/40 rounded-b-xl whitespace-pre-wrap break-words"
          >
            {children}
          </div>
        )}
      </div>
    )
  }
)

ReasoningDisclosure.displayName = "ReasoningDisclosure"
