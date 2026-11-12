import * as React from "react"
import { cn } from "../../lib/utils"
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Bell, X } from "../../icons"

export type AlertType = "default" | "success" | "error" | "warning" | "info" | "primary" | "neutral" | "destructive"
export type AlertVariant = "default" | "destructive" | "success" | "warning" | "info" | "filled" | "outlined"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType
  variant?: AlertVariant
  title?: string
  message?: string
  onClose?: () => void
  closable?: boolean
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  icon?: React.ReactNode
  actions?: React.ReactNode
  color?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  iconColor?: string
  borderRadius?: string | number
  shadow?: "none" | "sm" | "md" | "lg"
  loading?: boolean
  dismissible?: boolean
  autoDismiss?: boolean
  dismissTimeout?: number
  onDismiss?: () => void
  onShow?: () => void
  priority?: "low" | "medium" | "high" | "critical"
  category?: string
  tags?: string[]
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    type,
    variant = "default",
    title,
    message,
    onClose,
    closable = false,
    size = "md",
    fullWidth = false,
    color,
    backgroundColor,
    borderColor,
    textColor,
    iconColor,
    borderRadius,
    shadow = "none",
    icon,
    actions,
    children,
    style,
    role,
    ...props 
  }, ref) => {
    // Resolve effective semantic variant from type or variant
    const resolvedVariant: AlertType = (
      type === "error" ? "destructive" :
      type === "primary" ? "info" :
      type === "neutral" ? "default" :
      (type || (variant === "outlined" || variant === "filled" ? "default" : variant) || "default")
    ) as AlertType

    const sizeClasses = {
      sm: "p-3 text-xs [&>svg]:h-3.5 [&>svg]:w-3.5",
      md: "p-4 text-sm [&>svg]:h-4 [&>svg]:w-4",
      lg: "p-5 text-base [&>svg]:h-5 [&>svg]:w-5"
    }

    const shadowClasses = {
      none: "",
      sm: "shadow-xs",
      md: "shadow-sm",
      lg: "shadow-md"
    }

    // Default icon lookup
    const getDefaultIcon = () => {
      switch (resolvedVariant) {
        case "success":
          return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        case "destructive":
        case "error":
          return <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
        case "warning":
          return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        case "info":
        case "primary":
          return <Info className="h-4 w-4 shrink-0 text-foreground" />
        default:
          return <Bell className="h-4 w-4 shrink-0 text-muted-foreground" />
      }
    }

    // Semantic variant styling (clean, modern Tailwind conforming to senior standards)
    const getVariantClasses = () => {
      if (variant === "filled") {
        switch (resolvedVariant) {
          case "success":
            return "bg-emerald-700 text-white border-transparent dark:bg-emerald-800"
          case "destructive":
          case "error":
            return "bg-destructive text-destructive-foreground border-transparent"
          case "warning":
            return "bg-amber-700 text-white border-transparent dark:bg-amber-800"
          case "info":
          case "primary":
            return "bg-primary text-primary-foreground border-transparent"
          default:
            return "bg-primary text-primary-foreground border-transparent"
        }
      }

      if (variant === "outlined") {
        switch (resolvedVariant) {
          case "success":
            return "bg-transparent text-emerald-700 dark:text-emerald-400 border-emerald-500/40"
          case "destructive":
          case "error":
            return "bg-transparent text-destructive border-destructive/40"
          case "warning":
            return "bg-transparent text-amber-700 dark:text-amber-400 border-amber-500/40"
          case "info":
          case "primary":
            return "bg-transparent text-foreground border-border"
          default:
            return "bg-transparent text-foreground border-border"
        }
      }

      // Default subtle semantic tinting
      switch (resolvedVariant) {
        case "success":
          return "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border-emerald-500/20 dark:border-emerald-500/30"
        case "destructive":
        case "error":
          return "bg-destructive/10 text-destructive border-destructive/20 dark:border-destructive/30"
        case "warning":
          return "bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/20 dark:border-amber-500/30"
        case "info":
        case "primary":
          return "bg-muted text-foreground border-border"
        default:
          return "bg-card text-card-foreground border-border"
      }
    }

    const effectiveIcon = icon !== undefined ? icon : getDefaultIcon()

    const effectiveRole = role || (resolvedVariant === "destructive" || resolvedVariant === "error" ? "alert" : "status")

    return (
      <div
        ref={ref}
        role={effectiveRole}
        className={cn(
          "relative w-full rounded-xl border transition-all duration-200",
          sizeClasses[size],
          shadowClasses[shadow],
          getVariantClasses(),
          fullWidth ? "w-full" : "",
          className
        )}
        style={{
          borderRadius,
          ...(backgroundColor ? { backgroundColor } : {}),
          ...(borderColor ? { borderColor } : {}),
          ...(textColor ? { color: textColor } : {}),
          ...style
        }}
        {...props}
      >
        <div className="flex items-start gap-3">
          {effectiveIcon && (
            <div className="shrink-0 mt-0.5" style={{ color: iconColor }}>
              {effectiveIcon}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {title && (
              <h5 className="font-semibold text-sm leading-tight tracking-tight mb-1">
                {title}
              </h5>
            )}
            {message && (
              <div className="text-xs leading-relaxed opacity-90">
                {message}
              </div>
            )}
            {children}
            {actions && (
              <div className="mt-3 flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>

          {(closable || onClose) && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close alert"
              className="shrink-0 -mr-1 -mt-1 p-1 rounded-md text-current opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-current"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-tight tracking-tight text-sm", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs leading-relaxed opacity-90 [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
