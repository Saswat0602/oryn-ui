"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X, Loader2 } from "../../icons"

export type SonnerType = "default" | "success" | "error" | "warning" | "info" | "loading"

export interface SonnerToast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  type?: SonnerType
  duration?: number
  action?: {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  }
  cancel?: {
    label: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  }
  onDismiss?: (id: string) => void
  onAutoClose?: (id: string) => void
  style?: React.CSSProperties
  className?: string
}

type ToastPromiseOptions<T> = {
  loading: React.ReactNode
  success: React.ReactNode | ((data: T) => React.ReactNode)
  error: React.ReactNode | ((error: any) => React.ReactNode)
}

// --- Global Sonner Observer State ---

let sonnerCount = 0
function genSonnerId() {
  sonnerCount = (sonnerCount + 1) % Number.MAX_SAFE_INTEGER
  return `sonner-${sonnerCount}-${Date.now()}`
}

class SonnerObserver {
  private subscribers: Array<(toasts: SonnerToast[]) => void> = []
  private toasts: SonnerToast[] = []

  subscribe(subscriber: (toasts: SonnerToast[]) => void) {
    this.subscribers.push(subscriber)
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== subscriber)
    }
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber([...this.toasts]))
  }

  create(data: Partial<SonnerToast> & { title?: React.ReactNode }): string {
    const id = data.id || genSonnerId()
    const toastItem: SonnerToast = {
      id,
      title: data.title,
      description: data.description,
      type: data.type || "default",
      duration: data.duration ?? (data.type === "loading" ? Infinity : 4000),
      action: data.action,
      cancel: data.cancel,
      onDismiss: data.onDismiss,
      style: data.style,
      className: data.className,
    }

    // Prepend to array
    this.toasts = [toastItem, ...this.toasts.filter((t) => t.id !== id)]
    this.notify()
    return id
  }

  dismiss(id?: string) {
    if (id) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    } else {
      this.toasts = []
    }
    this.notify()
  }
}

export const sonnerObserver = new SonnerObserver()

export interface SonnerToastFunction {
  (message: React.ReactNode, data?: Partial<Omit<SonnerToast, "id" | "title">>): string
  success: (message: React.ReactNode, data?: Partial<Omit<SonnerToast, "id" | "title">>) => string
  error: (message: React.ReactNode, data?: Partial<Omit<SonnerToast, "id" | "title">>) => string
  info: (message: React.ReactNode, data?: Partial<Omit<SonnerToast, "id" | "title">>) => string
  warning: (message: React.ReactNode, data?: Partial<Omit<SonnerToast, "id" | "title">>) => string
  loading: (message: React.ReactNode, data?: Partial<Omit<SonnerToast, "id" | "title">>) => string
  promise: <T>(promise: Promise<T>, options: ToastPromiseOptions<T>) => Promise<T>
  dismiss: (id?: string) => void
}

const sonnerToastFn: any = (
  message: React.ReactNode,
  data?: Partial<Omit<SonnerToast, "id" | "title">>
) => {
  return sonnerObserver.create({
    title: message,
    ...data,
  })
}

sonnerToastFn.success = (
  message: React.ReactNode,
  data?: Partial<Omit<SonnerToast, "id" | "title">>
) => {
  return sonnerObserver.create({
    title: message,
    type: "success",
    ...data,
  })
}

sonnerToastFn.error = (
  message: React.ReactNode,
  data?: Partial<Omit<SonnerToast, "id" | "title">>
) => {
  return sonnerObserver.create({
    title: message,
    type: "error",
    ...data,
  })
}

sonnerToastFn.info = (
  message: React.ReactNode,
  data?: Partial<Omit<SonnerToast, "id" | "title">>
) => {
  return sonnerObserver.create({
    title: message,
    type: "info",
    ...data,
  })
}

sonnerToastFn.warning = (
  message: React.ReactNode,
  data?: Partial<Omit<SonnerToast, "id" | "title">>
) => {
  return sonnerObserver.create({
    title: message,
    type: "warning",
    ...data,
  })
}

sonnerToastFn.loading = (
  message: React.ReactNode,
  data?: Partial<Omit<SonnerToast, "id" | "title">>
) => {
  return sonnerObserver.create({
    title: message,
    type: "loading",
    duration: Infinity,
    ...data,
  })
}

sonnerToastFn.promise = async <T,>(
  promise: Promise<T>,
  options: ToastPromiseOptions<T>
): Promise<T> => {
  const id = sonnerObserver.create({
    title: options.loading,
    type: "loading",
    duration: Infinity,
  })

  try {
    const result = await promise
    sonnerObserver.dismiss(id)
    const successTitle =
      typeof options.success === "function" ? options.success(result) : options.success
    sonnerObserver.create({
      title: successTitle,
      type: "success",
    })
    return result
  } catch (err) {
    sonnerObserver.dismiss(id)
    const errorTitle =
      typeof options.error === "function" ? options.error(err) : options.error
    sonnerObserver.create({
      title: errorTitle,
      type: "error",
    })
    throw err
  }
}

sonnerToastFn.dismiss = (id?: string) => {
  sonnerObserver.dismiss(id)
}

export const sonnerToast: SonnerToastFunction = sonnerToastFn

// --- UI Components ---

export interface SonnerProps {
  toasts?: SonnerToast[]
  onDismiss?: (id: string) => void
  className?: string
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"
  richColors?: boolean
  closeButton?: boolean
  expand?: boolean
}

export const Sonner: React.FC<SonnerProps> = ({
  toasts: controlledToasts,
  onDismiss: controlledDismiss,
  className,
  position = "bottom-right",
  richColors = false,
  closeButton = true,
}) => {
  const [internalToasts, setInternalToasts] = React.useState<SonnerToast[]>([])
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    if (!controlledToasts) {
      return sonnerObserver.subscribe(setInternalToasts)
    }
  }, [controlledToasts])

  const activeToasts = controlledToasts || internalToasts

  const handleDismiss = (id: string) => {
    if (controlledDismiss) {
      controlledDismiss(id)
    } else {
      sonnerObserver.dismiss(id)
    }
  }

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }

  if (activeToasts.length === 0) return null

  return (
    <div
      className={cn(
        "fixed z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none select-none",
        positionClasses[position],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {activeToasts.slice(0, 5).map((toastItem, index) => (
        <SonnerToastCard
          key={toastItem.id}
          toast={toastItem}
          index={index}
          isHovered={isHovered}
          richColors={richColors}
          closeButton={closeButton}
          onDismiss={() => handleDismiss(toastItem.id)}
        />
      ))}
    </div>
  )
}

interface SonnerToastCardProps {
  toast: SonnerToast
  index: number
  isHovered: boolean
  richColors?: boolean
  closeButton?: boolean
  onDismiss: () => void
}

const SonnerToastCard: React.FC<SonnerToastCardProps> = ({
  toast,
  index,
  isHovered,
  richColors = false,
  closeButton = true,
  onDismiss,
}) => {
  React.useEffect(() => {
    if (toast.duration && toast.duration !== Infinity) {
      const timer = setTimeout(() => {
        onDismiss()
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, onDismiss])

  const typeIcons = {
    default: null,
    success: <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />,
    error: <AlertCircle aria-hidden="true" className="h-4 w-4 text-destructive shrink-0 mt-0.5" />,
    warning: <AlertTriangle aria-hidden="true" className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />,
    info: <Info aria-hidden="true" className="h-4 w-4 text-primary shrink-0 mt-0.5" />,
    loading: (
      <span className="shrink-0 mt-0.5 inline-flex items-center">
        <Loader2 aria-hidden="true" className="h-4 w-4 text-muted-foreground motion-safe:animate-spin" />
        <span className="sr-only">Loading</span>
      </span>
    ),
  }

  const richStyles = {
    default: "bg-background border-border text-foreground",
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100",
    error: "bg-destructive/10 border-destructive/30 text-destructive",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100",
    info: "bg-primary/10 border-primary/30 text-foreground",
    loading: "bg-background border-border text-foreground",
  }

  const baseStyles = richColors
    ? richStyles[toast.type || "default"]
    : "bg-background border-border text-foreground shadow-lg"

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto relative flex w-full items-start gap-3 rounded-xl border p-4 shadow-md backdrop-blur-sm transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-2",
        baseStyles,
        toast.className
      )}
      style={toast.style}
    >
      {typeIcons[toast.type || "default"]}

      <div className="flex-1 min-w-0 pr-4">
        {toast.title && (
          <div className="text-xs font-semibold tracking-tight">{toast.title}</div>
        )}
        {toast.description && (
          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {toast.description}
          </div>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={toast.action.onClick}
            className="mt-2 inline-flex h-6 items-center justify-center rounded-md border border-input bg-background px-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {closeButton && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss toast"
          className="shrink-0 -mr-1 -mt-1 p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

// Aliases
export const SonnerToaster = Sonner
export { sonnerToast as toast }
export type ToastItem = SonnerToast
