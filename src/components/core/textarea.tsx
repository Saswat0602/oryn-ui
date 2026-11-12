import * as React from "react"
import { cn } from "../../lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  success?: boolean
  resize?: "none" | "vertical" | "horizontal" | "both"
  fullWidth?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, resize = "vertical", fullWidth = true, ...props }, ref) => {
    const isError = Boolean(error || props["aria-invalid"] === true || props["aria-invalid"] === "true")
    const state = isError ? "error" : success ? "success" : "default"

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-2xs",
          state === "error" && "border-destructive text-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
          state === "success" && "border-emerald-500 text-emerald-900 dark:text-emerald-100 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
          state === "default" && "border-input focus-visible:border-ring focus-visible:ring-ring",
          resize === "none" && "resize-none",
          resize === "vertical" && "resize-y",
          resize === "horizontal" && "resize-x",
          resize === "both" && "resize",
          !fullWidth && "w-auto",
          className
        )}
        ref={ref}
        {...props}
        aria-invalid={props["aria-invalid"] !== undefined ? props["aria-invalid"] : (isError ? "true" : undefined)}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
