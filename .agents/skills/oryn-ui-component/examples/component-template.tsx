import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ExampleComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the component */
  variant?: 'default' | 'primary' | 'outline' | 'subtle'
  /** Component size */
  size?: 'sm' | 'md' | 'lg'
  /** Universal icon prop compatible across React 18 & 19 */
  icon?: any
  /** Disabled state */
  disabled?: boolean
}

export const ExampleComponent = React.forwardRef<HTMLDivElement, ExampleComponentProps>(
  ({ className, variant = 'default', size = 'md', icon: Icon, disabled = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="region"
        aria-disabled={disabled}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          {
            'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200': variant === 'default',
            'bg-blue-600 text-white hover:bg-blue-500': variant === 'primary',
            'border border-zinc-200 bg-transparent hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800': variant === 'outline',
            'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100': variant === 'subtle',
          },
          {
            'px-2.5 py-1.5 text-xs': size === 'sm',
            'px-3.5 py-2 text-sm': size === 'md',
            'px-4.5 py-2.5 text-base': size === 'lg',
          },
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {Icon && (
          <span className="shrink-0">
            {React.isValidElement(Icon) ? Icon : <Icon className="h-4 w-4" />}
          </span>
        )}
        {children}
      </div>
    )
  }
)

ExampleComponent.displayName = 'ExampleComponent'
