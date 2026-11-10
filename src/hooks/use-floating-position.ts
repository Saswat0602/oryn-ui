import * as React from 'react'

export type FloatingSide = 'top' | 'right' | 'bottom' | 'left'
export type FloatingAlign = 'start' | 'center' | 'end'

export interface UseFloatingPositionOptions {
  side?: FloatingSide
  align?: FloatingAlign
  sideOffset?: number
  collisionPadding?: number
  open?: boolean
}

export function useFloatingPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLElement | null>,
  options: UseFloatingPositionOptions = {}
) {
  const {
    side = 'bottom',
    align = 'start',
    sideOffset = 4,
    collisionPadding = 8,
    open = false,
  } = options

  const [computedSide, setComputedSide] = React.useState<FloatingSide>(side)
  const [computedAlign, setComputedAlign] = React.useState<FloatingAlign>(align)
  const [coords, setCoords] = React.useState<{ top: number; left: number; minWidth?: number }>({
    top: 0,
    left: 0,
  })

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current || typeof window === 'undefined') return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current
      ? contentRef.current.getBoundingClientRect()
      : { width: triggerRect.width, height: 200 }

    let nextSide = side
    const nextAlign = align

    // Collision check for vertical axis
    if (side === 'bottom') {
      const spaceBelow = window.innerHeight - triggerRect.bottom - sideOffset - collisionPadding
      if (spaceBelow < contentRect.height && triggerRect.top > contentRect.height) {
        nextSide = 'top'
      }
    } else if (side === 'top') {
      const spaceAbove = triggerRect.top - sideOffset - collisionPadding
      if (spaceAbove < contentRect.height && window.innerHeight - triggerRect.bottom > contentRect.height) {
        nextSide = 'bottom'
      }
    }

    // Position calculation
    let top = 0
    let left = 0

    if (nextSide === 'bottom') {
      top = triggerRect.bottom + sideOffset
    } else if (nextSide === 'top') {
      top = triggerRect.top - contentRect.height - sideOffset
    } else if (nextSide === 'left') {
      left = triggerRect.left - contentRect.width - sideOffset
      top = triggerRect.top
    } else if (nextSide === 'right') {
      left = triggerRect.right + sideOffset
      top = triggerRect.top
    }

    if (nextSide === 'top' || nextSide === 'bottom') {
      if (nextAlign === 'start') {
        left = triggerRect.left
      } else if (nextAlign === 'center') {
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
      } else if (nextAlign === 'end') {
        left = triggerRect.right - contentRect.width
      }

      // Viewport horizontal clamp
      if (left < collisionPadding) {
        left = collisionPadding
      } else if (left + contentRect.width > window.innerWidth - collisionPadding) {
        left = window.innerWidth - contentRect.width - collisionPadding
      }
    }

    setComputedSide(nextSide)
    setComputedAlign(nextAlign)
    setCoords({
      top: Math.round(top),
      left: Math.round(left),
      minWidth: Math.round(triggerRect.width),
    })
  }, [triggerRef, contentRef, side, align, sideOffset, collisionPadding])

  React.useEffect(() => {
    if (!open) return

    updatePosition()

    window.addEventListener('scroll', updatePosition, { capture: true, passive: true })
    window.addEventListener('resize', updatePosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open, updatePosition])

  return {
    style: {
      position: 'fixed' as const,
      top: `${coords.top}px`,
      left: `${coords.left}px`,
      minWidth: coords.minWidth ? `${coords.minWidth}px` : undefined,
    },
    side: computedSide,
    align: computedAlign,
    updatePosition,
  }
}
