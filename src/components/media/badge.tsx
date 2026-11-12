import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, onClick, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
    
    const variantClasses = {
      default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs',
      primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-2xs',
      outline: 'text-foreground border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20',
      warning: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 hover:bg-amber-500/20',
      error: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-2xs',
      info: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }
    
    const sizeClasses = {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    }
    
    return (
      <span
        ref={ref}
        onClick={onClick}
        role={onClick ? (props.role || 'button') : props.role}
        tabIndex={onClick ? (props.tabIndex ?? 0) : props.tabIndex}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          onClick && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
