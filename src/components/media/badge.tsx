import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
    
    const variantClasses = {
      default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs',
      primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'text-foreground border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20',
      warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20',
      error: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90',
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
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
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
