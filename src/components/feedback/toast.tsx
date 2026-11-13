"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "../../icons"
import { sonnerObserver } from "./sonner"

// --- Global Toast Store & State Machine ---

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info"

export interface ToastData {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  message?: React.ReactNode
  action?: React.ReactNode
  variant?: ToastVariant
  type?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
  [key: string]: any
}

type Action =
  | { type: "ADD_TOAST"; toast: ToastData }
  | { type: "UPDATE_TOAST"; toast: Partial<ToastData> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string }

interface State {
  toasts: ToastData[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return `toast-${count}-${Date.now()}`
}

let memoryState: State = { toasts: [] }
const listeners: Array<(state: State) => void> = []

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export interface ToastFn {
  (
    titleOrProps: React.ReactNode | (Omit<ToastData, "id"> & { id?: string }),
    options?: Partial<Omit<ToastData, "id">>
  ): {
    id: string
    dismiss: () => void
    update: (updatedProps: Partial<ToastData>) => void
  }
  success: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id">>) => { id: string; dismiss: () => void }
  error: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id">>) => { id: string; dismiss: () => void }
  warning: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id">>) => { id: string; dismiss: () => void }
  info: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id">>) => { id: string; dismiss: () => void }
  dismiss: (toastId?: string) => void
}

function baseToast(
  titleOrProps: React.ReactNode | (Omit<ToastData, "id"> & { id?: string }),
  options?: Partial<Omit<ToastData, "id">>
) {
  let toastPayload: Omit<ToastData, "id"> & { id?: string }

  if (
    typeof titleOrProps === "object" &&
    titleOrProps !== null &&
    !React.isValidElement(titleOrProps) &&
    !("props" in (titleOrProps as any))
  ) {
    toastPayload = { ...(titleOrProps as any), ...options }
  } else {
    toastPayload = { title: titleOrProps, ...options }
  }

  const id = toastPayload.id || genId()

  const dismiss = () => {
    dispatch({ type: "DISMISS_TOAST", toastId: id })
    try {
      sonnerObserver.dismiss(id)
    } catch {
      // safe fallback
    }
  }

  const update = (updatedProps: Partial<ToastData>) => {
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...updatedProps, id },
    })
    try {
      const variant = updatedProps.variant ?? toastPayload.variant
      const sonnerType =
        updatedProps.type ||
        (variant === "destructive"
          ? "error"
          : variant === "success"
          ? "success"
          : variant === "warning"
          ? "warning"
          : variant === "info"
          ? "info"
          : "default")
      sonnerObserver.create({
        id,
        title: updatedProps.title ?? updatedProps.message ?? toastPayload.title ?? toastPayload.message,
        description: updatedProps.description ?? toastPayload.description,
        type: sonnerType as any,
        duration: updatedProps.duration ?? toastPayload.duration ?? 4000,
        action: (updatedProps.action ?? toastPayload.action) as any,
      })
    } catch {
      // safe fallback
    }
  }

  // Also broadcast to sonnerObserver so <Sonner /> instances receive toast dispatches
  try {
    const sonnerType =
      toastPayload.type ||
      (toastPayload.variant === "destructive"
        ? "error"
        : toastPayload.variant === "success"
        ? "success"
        : toastPayload.variant === "warning"
        ? "warning"
        : toastPayload.variant === "info"
        ? "info"
        : "default")

    sonnerObserver.create({
      id,
      title: toastPayload.title ?? toastPayload.message,
      description: toastPayload.description,
      type: sonnerType as any,
      duration: toastPayload.duration ?? 4000,
      action: toastPayload.action as any,
    })
  } catch {
    // safe fallback
  }

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...toastPayload,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

baseToast.success = (title: React.ReactNode, options?: Partial<Omit<ToastData, "id">>) =>
  baseToast(title, { variant: "success", ...options })

baseToast.error = (title: React.ReactNode, options?: Partial<Omit<ToastData, "id">>) =>
  baseToast(title, { variant: "destructive", ...options })

baseToast.warning = (title: React.ReactNode, options?: Partial<Omit<ToastData, "id">>) =>
  baseToast(title, { variant: "warning", ...options })

baseToast.info = (title: React.ReactNode, options?: Partial<Omit<ToastData, "id">>) =>
  baseToast(title, { variant: "info", ...options })

baseToast.dismiss = (toastId?: string) => {
  dispatch({ type: "DISMISS_TOAST", toastId })
  try {
    sonnerObserver.dismiss(toastId)
  } catch {
    // safe fallback
  }
}

export const toast: ToastFn = baseToast as unknown as ToastFn

// --- Component Implementations ---

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string
  title?: React.ReactNode
  message?: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  type?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
  action?: React.ReactNode
  closable?: boolean
  onClose?: (id?: string) => void
  open?: boolean
  isVisible?: boolean
  onOpenChange?: (open: boolean) => void
}

export const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"
  }
>(({ className, position = "bottom-right", ...props }, ref) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  }

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={cn(
        "fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 pointer-events-none sm:max-w-[420px] gap-2.5",
        positionClasses[position],
        className
      )}
      {...props}
    />
  )
})
ToastViewport.displayName = "ToastViewport"

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant: variantProp,
      type = "default",
      title,
      description,
      message,
      action,
      closable = true,
      duration = 5000,
      open: openProp,
      isVisible,
      onClose,
      onOpenChange,
      children,
      id,
      ...props
    },
    ref
  ) => {
    const open = openProp !== undefined ? openProp : (isVisible !== undefined ? isVisible : true)
    const variant: ToastVariant =
      variantProp || (type === "error" ? "destructive" : (type as ToastVariant)) || "default"

    React.useEffect(() => {
      if (duration && duration > 0 && open) {
        const timer = setTimeout(() => {
          onOpenChange?.(false)
          onClose?.(id)
        }, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, open, onOpenChange, onClose, id])

    if (!open) return null

    const variantStyles = {
      default: "border-border bg-background text-foreground shadow-lg",
      destructive: "border-destructive/30 bg-destructive/10 text-destructive shadow-lg",
      success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 shadow-lg",
      warning: "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100 shadow-lg",
      info: "border-primary/30 bg-primary/10 text-foreground shadow-lg",
    }

    const renderIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
        case "destructive":
          return <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
        case "warning":
          return <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        case "info":
          return <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        default:
          return null
      }
    }

    const handleClose = () => {
      onOpenChange?.(false)
      onClose?.(id)
    }

    const isDestructive = variant === "destructive"

    return (
      <div
        ref={ref}
        role={isDestructive ? "alert" : "status"}
        aria-live={isDestructive ? "assertive" : "polite"}
        className={cn(
          "pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl border p-4 shadow-md transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-2",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {renderIcon()}

        <div className="flex-1 min-w-0 pr-4">
          {title && <ToastTitle>{title}</ToastTitle>}
          {(description || message) && (
            <ToastDescription>{description || message}</ToastDescription>
          )}
          {children}
          {action && <div className="mt-2.5">{action}</div>}
        </div>

        {closable && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="shrink-0 -mr-1 -mt-1 p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

export const ToastTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("text-xs font-semibold tracking-tight text-foreground", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

export const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground leading-relaxed mt-0.5", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

export const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-7 items-center justify-center rounded-md border border-input bg-transparent px-2.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = "ToastAction"

export const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    aria-label="Close"
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  >
    <X className="h-3.5 w-3.5" />
  </button>
))
ToastClose.displayName = "ToastClose"

export interface ToastProviderProps {
  children?: React.ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return <>{children}</>
}

export const Toaster: React.FC<{
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"
}> = ({ position = "bottom-right" }) => {
  const { toasts, dismiss } = useToast()

  return (
    <Portal>
      <ToastViewport position={position}>
        {toasts.map(({ id, title, description, action, variant, ...toastProps }) => (
          <Toast
            key={id}
            id={id}
            variant={variant}
            title={title}
            description={description}
            action={action}
            onClose={() => dismiss(id)}
            {...toastProps}
          />
        ))}
      </ToastViewport>
    </Portal>
  )
}
