import React from 'react'
import { cn } from '../../lib/utils'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  thickness?: 'thin' | 'medium' | 'thick'
  lineStyle?: 'solid' | 'dashed' | 'dotted'
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      thickness = 'thin',
      lineStyle = 'solid',
      ...props
    },
    ref
  ) => {
    const thicknessClasses = {
      thin: orientation === 'horizontal' ? 'h-px' : 'w-px',
      medium: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
      thick: orientation === 'horizontal' ? 'h-1' : 'w-1',
    }

    const styleClasses = {
      solid: 'bg-border',
      dashed:
        orientation === 'horizontal'
          ? 'border-b border-dashed border-border bg-transparent'
          : 'border-r border-dashed border-border bg-transparent',
      dotted:
        orientation === 'horizontal'
          ? 'border-b border-dotted border-border bg-transparent'
          : 'border-r border-dotted border-border bg-transparent',
    }

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          'shrink-0',
          orientation === 'horizontal' ? 'w-full' : 'h-full',
          thicknessClasses[thickness],
          styleClasses[lineStyle],
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = 'Separator'

export default Separator
