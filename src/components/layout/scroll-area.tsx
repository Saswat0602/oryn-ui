"use client"

import React from 'react'
import { cn } from '../../lib/utils'

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal' | 'both'
  scrollbarVariant?: 'default' | 'subtle' | 'pill' | 'minimal' | 'none'
  scrollbarClassName?: string
  thumbClassName?: string
  scrollbarSize?: 'sm' | 'md' | 'lg'
  viewportRef?: React.Ref<HTMLDivElement>
  viewportProps?: React.HTMLAttributes<HTMLDivElement>
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      children,
      orientation = 'vertical',
      scrollbarVariant = 'default',
      scrollbarClassName,
      thumbClassName,
      scrollbarSize = 'md',
      viewportRef,
      viewportProps,
      style,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const overflowClasses = {
      vertical: 'overflow-y-auto overflow-x-hidden',
      horizontal: 'overflow-x-auto overflow-y-hidden',
      both: 'overflow-auto',
    }

    const sizeClasses = {
      sm: 'scrollbar-w-1 scrollbar-h-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [scrollbar-width:thin]',
      md: 'scrollbar-w-1.5 scrollbar-h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [scrollbar-width:thin]',
      lg: 'scrollbar-w-2.5 scrollbar-h-2.5 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar]:h-2.5 [scrollbar-width:auto]',
    }

    const variantClasses = {
      default:
        '[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50',
      subtle:
        '[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30',
      pill:
        '[&::-webkit-scrollbar-track]:bg-muted/30 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/70 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary',
      minimal:
        '[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border/40 [&::-webkit-scrollbar-thumb]:rounded-xs hover:[&::-webkit-scrollbar-thumb]:bg-border',
      none: '[&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]',
    }

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        style={style}
        {...props}
      >
        <div
          ref={viewportRef}
          tabIndex={viewportProps?.tabIndex ?? tabIndex ?? 0}
          className={cn(
            'h-full w-full rounded-[inherit] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
            overflowClasses[orientation],
            sizeClasses[scrollbarSize],
            variantClasses[scrollbarVariant],
            scrollbarClassName,
            thumbClassName && `[&::-webkit-scrollbar-thumb]:${thumbClassName}`,
            viewportProps?.className
          )}
          {...viewportProps}
        >
          {children}
        </div>
      </div>
    )
  }
)
ScrollArea.displayName = 'ScrollArea'

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
  variant?: 'default' | 'subtle' | 'pill' | 'minimal'
  thumbClassName?: string
}

export const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = 'vertical', variant = 'default', thumbClassName, ...props }, ref) => {
    const thumbVariants = {
      default: 'bg-border/80 hover:bg-muted-foreground/50 rounded-full',
      subtle: 'bg-muted/50 hover:bg-muted-foreground/30 rounded-full',
      pill: 'bg-primary/70 hover:bg-primary rounded-full ring-1 ring-primary/20',
      minimal: 'bg-border/40 hover:bg-border rounded-xs',
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'flex touch-none select-none transition-colors duration-150 ease-out',
          orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
          orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'relative flex-1 transition-colors',
            thumbVariants[variant],
            thumbClassName
          )}
        />
      </div>
    )
  }
)
ScrollBar.displayName = 'ScrollBar'

export type ScrollAreaComponent = typeof ScrollArea & {
  ScrollBar: typeof ScrollBar
  Bar: typeof ScrollBar
}

;(ScrollArea as any).ScrollBar = ScrollBar
;(ScrollArea as any).Bar = ScrollBar

export default ScrollArea
