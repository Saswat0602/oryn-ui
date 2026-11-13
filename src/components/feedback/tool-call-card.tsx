"use client"

import * as React from "react"
import { ChevronRight, Wrench, CheckCircle2, AlertCircle, Loader2 } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../lib/use-controllable-state"

export type ToolCallStatus = "pending" | "running" | "executing" | "success" | "completed" | "error" | "failed"

export interface ToolCallCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "name"> {
  name?: string
  toolName?: string
  status?: ToolCallStatus
  args?: Record<string, any> | string
  result?: any
  duration?: string | number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const ToolCallCard = React.forwardRef<HTMLDivElement, ToolCallCardProps>(
  (
    {
      className,
      name,
      toolName,
      status = "success",
      args,
      result,
      duration,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    const displayName = toolName || name || "Tool Call"
    const normalizedStatus = 
      status === "completed" ? "success" : 
      status === "executing" ? "running" : 
      status === "failed" ? "error" : status
    const [open, setOpen] = useControllableState<boolean>({
      prop: controlledOpen,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    })

    const contentId = React.useId()

    const statusBadges = {
      pending: (
        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/50">
          Pending
        </span>
      ),
      running: (
        <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary border border-primary/20">
          <Loader2 className="h-3 w-3 motion-safe:animate-spin motion-reduce:animate-none" aria-hidden="true" />
          Running
        </span>
      ),
      success: (
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
          Completed
        </span>
      ),
      error: (
        <span className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive border border-destructive/20">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          Failed
        </span>
      ),
    }

    const formatPayload = (data: any): string => {
      if (typeof data === "string") return data
      try {
        return JSON.stringify(data, null, 2)
      } catch {
        return String(data)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border bg-card text-card-foreground shadow-2xs transition-all",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-xs text-left cursor-pointer select-none rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <div className="flex items-center gap-2 min-w-0">
            <ChevronRight
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform duration-150 shrink-0",
                open && "rotate-90"
              )}
            />
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground shrink-0">
              <Wrench aria-hidden="true" className="h-3.5 w-3.5" />
            </div>
            <span className="font-mono font-semibold text-card-foreground truncate">
              {displayName}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {duration && (
              <span className="text-[11px] font-medium text-muted-foreground">
                {typeof duration === "number" ? `${duration}ms` : duration}
              </span>
            )}
            {statusBadges[normalizedStatus]}
          </div>
        </button>

        {open && (
          <div
            id={contentId}
            className="border-t border-border px-4 py-3 text-xs flex flex-col gap-3 bg-muted/30 rounded-b-xl"
          >
            {args !== undefined && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Arguments
                </span>
                <pre className="mt-1 overflow-x-auto rounded-lg border border-border bg-muted/50 p-2.5 font-mono text-[11px] text-foreground">
                  {formatPayload(args)}
                </pre>
              </div>
            )}

            {result !== undefined && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Result
                </span>
                <pre className="mt-1 max-h-48 overflow-auto rounded-lg border border-border bg-muted/50 p-2.5 font-mono text-[11px] text-foreground">
                  {formatPayload(result)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

ToolCallCard.displayName = "ToolCallCard"
