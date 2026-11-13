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
    const isSolid = lineStyle === 'solid'

    const solidThickness = {
      thin: orientation === 'horizontal' ? 'h-px' : 'w-px',
      medium: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
      thick: orientation === 'horizontal' ? 'h-1' : 'w-1',
    }

    const borderWidthClasses = {
      thin: orientation === 'horizontal' ? 'border-b' : 'border-r',
      medium: orientation === 'horizontal' ? 'border-b-2' : 'border-r-2',
      thick: orientation === 'horizontal' ? 'border-b-4' : 'border-r-4',
    }

    const styleClass = isSolid
      ? cn('bg-border', solidThickness[thickness])
      : cn(
          'border-border bg-transparent',
          lineStyle === 'dashed' ? 'border-dashed' : 'border-dotted',
          borderWidthClasses[thickness]
        )

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          'shrink-0',
          orientation === 'horizontal' ? 'w-full' : 'h-full self-stretch',
          styleClass,
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = 'Separator'

export default Separator
