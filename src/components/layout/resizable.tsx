"use client"

import React, { useState, useRef, useEffect, useCallback, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface ResizableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  minSize?: number
  maxSize?: number
  defaultSize?: number
  unit?: '%' | 'px'
  withHandle?: boolean
  onResize?: (size: number) => void
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  direction?: 'horizontal' | 'vertical'
  withHandle?: boolean
  disabled?: boolean
  isDragging?: boolean
  onMouseDown?: (e: React.MouseEvent) => void
  onTouchStart?: (e: React.TouchEvent) => void
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  defaultSize?: number
  minSize?: number
  maxSize?: number
  collapsible?: boolean
  collapsedSize?: number
  onCollapse?: (collapsed: boolean) => void
  style?: React.CSSProperties
}

export const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('overflow-auto min-w-0 min-h-0', className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResizablePanel.displayName = 'ResizablePanel'

export const ResizableHandle = forwardRef<HTMLDivElement, ResizableHandleProps>(
  (
    {
      direction = 'horizontal',
      withHandle = false,
      disabled = false,
      isDragging = false,
      className,
      onMouseDown,
      onTouchStart,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="separator"
        tabIndex={disabled ? -1 : 0}
        aria-orientation={direction}
        aria-valuenow={props['aria-valuenow'] !== undefined ? props['aria-valuenow'] : 50}
        aria-valuemin={props['aria-valuemin'] !== undefined ? props['aria-valuemin'] : 0}
        aria-valuemax={props['aria-valuemax'] !== undefined ? props['aria-valuemax'] : 100}
        onMouseDown={disabled ? undefined : onMouseDown}
        onTouchStart={disabled ? undefined : onTouchStart}
        onKeyDown={onKeyDown}
        className={cn(
          'relative flex items-center justify-center bg-border transition-colors select-none shrink-0 group',
          direction === 'horizontal'
            ? 'w-px hover:w-1.5 cursor-col-resize after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 hover:bg-primary/70'
            : 'h-px hover:h-1.5 cursor-row-resize after:absolute after:inset-x-0 after:top-1/2 after:h-4 after:-translate-y-1/2 hover:bg-primary/70',
          isDragging && 'bg-primary ring-2 ring-primary/30 z-20',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-primary',
          disabled && 'cursor-default opacity-40 pointer-events-none',
          className
        )}
        {...props}
      >
        {withHandle && (
          <div
            className={cn(
              'z-10 flex items-center justify-center rounded-xs border border-border bg-card shadow-xs group-hover:border-primary/50 group-hover:bg-accent transition-all',
              direction === 'horizontal' ? 'h-4 w-3' : 'h-3 w-4',
              isDragging && 'border-primary bg-primary text-primary-foreground'
            )}
          >
            <svg
              className={cn(
                'h-2.5 w-2.5 text-muted-foreground group-hover:text-foreground',
                isDragging && 'text-primary-foreground'
              )}
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              {direction === 'horizontal' ? (
                <>
                  <circle cx="5" cy="4" r="1.2" />
                  <circle cx="11" cy="4" r="1.2" />
                  <circle cx="5" cy="8" r="1.2" />
                  <circle cx="11" cy="8" r="1.2" />
                  <circle cx="5" cy="12" r="1.2" />
                  <circle cx="11" cy="12" r="1.2" />
                </>
              ) : (
                <>
                  <circle cx="4" cy="5" r="1.2" />
                  <circle cx="8" cy="5" r="1.2" />
                  <circle cx="12" cy="5" r="1.2" />
                  <circle cx="4" cy="11" r="1.2" />
                  <circle cx="8" cy="11" r="1.2" />
                  <circle cx="12" cy="11" r="1.2" />
                </>
              )}
            </svg>
          </div>
        )}
      </div>
    )
  }
)
ResizableHandle.displayName = 'ResizableHandle'

const ResizableRoot = forwardRef<HTMLDivElement, ResizableProps>(
  (
    {
      children,
      className,
      direction = 'horizontal',
      minSize: minSizeProp,
      maxSize: maxSizeProp,
      defaultSize = 50,
      unit: unitProp,
      withHandle = true,
      onResize,
      ...props
    },
    forwardedRef
  ) => {
    const isPercentage = unitProp ? unitProp === '%' : defaultSize <= 100
    const minSize = minSizeProp ?? (isPercentage ? 10 : 50)
    const maxSize = maxSizeProp ?? (isPercentage ? 90 : Infinity)

    const [size, setSize] = useState(defaultSize)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const startPos = useRef(0)
    const startSize = useRef(0)
    const containerDim = useRef(1)

    // Sync size if defaultSize changes externally
    useEffect(() => {
      setSize(defaultSize)
    }, [defaultSize])

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()
        setIsDragging(true)
        startPos.current = direction === 'horizontal' ? e.clientX : e.clientY
        startSize.current = size

        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          containerDim.current = direction === 'horizontal' ? rect.width : rect.height
        }
      },
      [direction, size]
    )

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (!e.touches[0]) return
        setIsDragging(true)
        startPos.current = direction === 'horizontal' ? e.touches[0].clientX : e.touches[0].clientY
        startSize.current = size

        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          containerDim.current = direction === 'horizontal' ? rect.width : rect.height
        }
      },
      [direction, size]
    )

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging) return
        const currentPos = direction === 'horizontal' ? e.clientX : e.clientY
        const deltaPx = currentPos - startPos.current

        let nextSize = size
        if (isPercentage) {
          const deltaPct = containerDim.current > 0 ? (deltaPx / containerDim.current) * 100 : 0
          nextSize = Math.max(minSize, Math.min(maxSize, startSize.current + deltaPct))
        } else {
          nextSize = Math.max(minSize, Math.min(maxSize, startSize.current + deltaPx))
        }

        setSize(Math.round(nextSize * 10) / 10)
        onResize?.(nextSize)
      },
      [isDragging, direction, isPercentage, minSize, maxSize, size, onResize]
    )

    const handleTouchMove = useCallback(
      (e: TouchEvent) => {
        if (!isDragging || !e.touches[0]) return
        const currentPos = direction === 'horizontal' ? e.touches[0].clientX : e.touches[0].clientY
        const deltaPx = currentPos - startPos.current

        let nextSize = size
        if (isPercentage) {
          const deltaPct = containerDim.current > 0 ? (deltaPx / containerDim.current) * 100 : 0
          nextSize = Math.max(minSize, Math.min(maxSize, startSize.current + deltaPct))
        } else {
          nextSize = Math.max(minSize, Math.min(maxSize, startSize.current + deltaPx))
        }

        setSize(Math.round(nextSize * 10) / 10)
        onResize?.(nextSize)
      },
      [isDragging, direction, isPercentage, minSize, maxSize, size, onResize]
    )

    const handleMouseUp = useCallback(() => {
      setIsDragging(false)
    }, [])

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleMouseUp)
        document.body.style.userSelect = 'none'
        document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize'
        return () => {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
          document.removeEventListener('touchmove', handleTouchMove)
          document.removeEventListener('touchend', handleMouseUp)
          document.body.style.userSelect = ''
          document.body.style.cursor = ''
        }
      }
    }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp, direction])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const step = isPercentage ? 5 : 15
        let nextSize = size
        if (
          (direction === 'horizontal' && e.key === 'ArrowRight') ||
          (direction === 'vertical' && e.key === 'ArrowDown')
        ) {
          e.preventDefault()
          nextSize = Math.min(maxSize, size + step)
        } else if (
          (direction === 'horizontal' && e.key === 'ArrowLeft') ||
          (direction === 'vertical' && e.key === 'ArrowUp')
        ) {
          e.preventDefault()
          nextSize = Math.max(minSize, size - step)
        } else if (e.key === 'Home') {
          e.preventDefault()
          nextSize = minSize
        } else if (e.key === 'End' && maxSize !== Infinity) {
          e.preventDefault()
          nextSize = maxSize
        }
        if (nextSize !== size) {
          setSize(nextSize)
          onResize?.(nextSize)
        }
      },
      [direction, size, isPercentage, minSize, maxSize, onResize]
    )

    const childArray = React.Children.toArray(children)
    const panels = childArray.filter(
      (c) =>
        React.isValidElement(c) &&
        ((c.type as any)?.displayName === 'ResizablePanel' || c.type === ResizablePanel)
    )
    const hasCustomHandle = childArray.some(
      (c) =>
        React.isValidElement(c) &&
        ((c.type as any)?.displayName === 'ResizableHandle' || c.type === ResizableHandle)
    )

    return (
      <div
        ref={(el) => {
          containerRef.current = el
          if (typeof forwardedRef === 'function') forwardedRef(el)
          else if (forwardedRef) (forwardedRef as any).current = el
        }}
        className={cn(
          'flex overflow-hidden rounded-xl border border-border/80 bg-background w-full h-full min-h-[160px]',
          direction === 'vertical' ? 'flex-col' : 'flex-row',
          className
        )}
        {...props}
      >
        {childArray.map((child, index) => {
          if (!React.isValidElement(child)) return child

          const isPanel =
            (child.type as any)?.displayName === 'ResizablePanel' || child.type === ResizablePanel
          const isHandle =
            (child.type as any)?.displayName === 'ResizableHandle' || child.type === ResizableHandle

          if (isHandle) {
            return React.cloneElement(child as React.ReactElement<any>, {
              direction,
              isDragging,
              'aria-valuenow': Math.round(size),
              'aria-valuemin': Math.round(minSize),
              'aria-valuemax': maxSize !== Infinity ? Math.round(maxSize) : 100,
              onMouseDown: handleMouseDown,
              onTouchStart: handleTouchStart,
              onKeyDown: handleKeyDown,
            })
          }

          if (isPanel) {
            const panelIndex = panels.indexOf(child)
            const isFirst = panelIndex === 0
            const panelStyle: React.CSSProperties = isPercentage
              ? {
                  flex: isFirst ? `0 0 ${size}%` : `1 1 ${100 - size}%`,
                  minWidth: 0,
                  minHeight: 0,
                  ...(child.props.style || {}),
                }
              : {
                  ...(child.props.style || {}),
                  [direction === 'horizontal' ? 'width' : 'height']: isFirst ? `${size}px` : undefined,
                  flex: isFirst ? undefined : 1,
                  flexShrink: isFirst ? 0 : 1,
                  minWidth: 0,
                  minHeight: 0,
                }

            return (
              <React.Fragment key={index}>
                {React.cloneElement(child as React.ReactElement<any>, {
                  style: panelStyle,
                })}
                {isFirst && !hasCustomHandle && (
                  <ResizableHandle
                    direction={direction}
                    isDragging={isDragging}
                    withHandle={withHandle}
                    aria-valuenow={Math.round(size)}
                    aria-valuemin={Math.round(minSize)}
                    aria-valuemax={maxSize !== Infinity ? Math.round(maxSize) : 100}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onKeyDown={handleKeyDown}
                  />
                )}
              </React.Fragment>
            )
          }

          return child
        })}
      </div>
    )
  }
)
ResizableRoot.displayName = 'Resizable'

export type ResizableComponent = typeof ResizableRoot & {
  Panel: typeof ResizablePanel
  Handle: typeof ResizableHandle
}

export const Resizable = ResizableRoot as ResizableComponent
Resizable.Panel = ResizablePanel
Resizable.Handle = ResizableHandle

export const ResizablePanelGroup = ResizableRoot

export default Resizable
