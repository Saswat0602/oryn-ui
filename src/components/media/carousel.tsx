"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronLeft, ChevronRight } from "../../icons"

export interface CarouselContextValue {
  currentIndex: number
  count: number
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  goToIndex: (index: number) => void
  orientation: "horizontal" | "vertical"
  loop?: boolean
  registerItem: () => number
  unregisterItem: (id: number) => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel")
  }
  return context
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  loop?: boolean
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
  children: React.ReactNode
  onSlideChange?: (index: number) => void
}

export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export interface CarouselPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface CarouselNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface CarouselIndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CarouselIndicatorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index: number
  isActive?: boolean
}

export const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { currentIndex, orientation } = useCarousel()
    const isVertical = orientation === "vertical"

    // Touch swipe gesture handling
    const [touchStart, setTouchStart] = React.useState<number | null>(null)
    const [touchDelta, setTouchDelta] = React.useState(0)
    const { scrollPrev, scrollNext } = useCarousel()

    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(isVertical ? e.touches[0].clientY : e.touches[0].clientX)
      setTouchDelta(0)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      if (touchStart === null) return
      const current = isVertical ? e.touches[0].clientY : e.touches[0].clientX
      setTouchDelta(current - touchStart)
    }

    const handleTouchEnd = () => {
      if (touchStart === null) return
      if (touchDelta > 50) {
        scrollPrev()
      } else if (touchDelta < -50) {
        scrollNext()
      }
      setTouchStart(null)
      setTouchDelta(0)
    }

    return (
      <div
        className="overflow-hidden w-full select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={ref}
          className={cn(
            "flex transition-transform duration-300 ease-out",
            isVertical ? "flex-col" : "flex-row",
            className
          )}
          style={{
            transform: isVertical
              ? `translateY(-${currentIndex * 100}%)`
              : `translateX(-${currentIndex * 100}%)`,
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
)
CarouselContent.displayName = "CarouselContent"

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CarouselItem.displayName = "CarouselItem"

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, onClick, disabled: disabledProp, ...props }, ref) => {
    const { scrollPrev, canScrollPrev, orientation } = useCarousel()
    const isVertical = orientation === "vertical"
    const disabled = disabledProp ?? !canScrollPrev

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Previous slide"
        disabled={disabled}
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) scrollPrev()
        }}
        className={cn(
          "absolute z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
          isVertical
            ? "-top-4 left-1/2 -translate-x-1/2 rotate-90"
            : "left-2 top-1/2 -translate-y-1/2",
          className
        )}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    )
  }
)
CarouselPrevious.displayName = "CarouselPrevious"

export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, onClick, disabled: disabledProp, ...props }, ref) => {
    const { scrollNext, canScrollNext, orientation } = useCarousel()
    const isVertical = orientation === "vertical"
    const disabled = disabledProp ?? !canScrollNext

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Next slide"
        disabled={disabled}
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) scrollNext()
        }}
        className={cn(
          "absolute z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
          isVertical
            ? "-bottom-4 left-1/2 -translate-x-1/2 rotate-90"
            : "right-2 top-1/2 -translate-y-1/2",
          className
        )}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    )
  }
)
CarouselNext.displayName = "CarouselNext"

export const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { currentIndex, count, goToIndex } = useCarousel()

  if (count <= 1) return null

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Slides"
      className={cn("flex items-center justify-center gap-1.5 pt-3", className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => goToIndex(index)}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
            index === currentIndex
              ? "w-6 bg-primary"
              : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
        />
      ))}
    </div>
  )
})
CarouselIndicators.displayName = "CarouselIndicators"

export const CarouselIndicator = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { index: number; isActive?: boolean }
>(({ index, isActive, className, onClick, ...props }, ref) => {
  const { currentIndex, goToIndex } = useCarousel()
  const active = isActive ?? currentIndex === index

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={`Go to slide ${index + 1}`}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) goToIndex(index)
      }}
      className={cn(
        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
        active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
        className
      )}
      {...props}
    />
  )
})
CarouselIndicator.displayName = "CarouselIndicator"

interface CompoundedCarousel extends React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<HTMLDivElement>> {
  Content: typeof CarouselContent
  Item: typeof CarouselItem
  Previous: typeof CarouselPrevious
  Next: typeof CarouselNext
  Indicators: typeof CarouselIndicators
  Indicator: typeof CarouselIndicator
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      loop = false,
      autoPlay = false,
      interval = 4000,
      showArrows,
      showDots,
      className,
      children,
      onSlideChange,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [itemCount, setItemCount] = React.useState(0)
    const registeredCountRef = React.useRef(0)

    // Check if children contain composable CarouselContent or raw items
    const rawChildren = React.Children.toArray(children)
    const hasCarouselContent = rawChildren.some(
      (child) => React.isValidElement(child) && (child.type === CarouselContent || (child.type as any).displayName === "CarouselContent")
    )

    // Count items from CarouselContent if present
    React.useEffect(() => {
      if (hasCarouselContent) {
        rawChildren.forEach((child) => {
          if (React.isValidElement(child) && (child.type === CarouselContent || (child.type as any).displayName === "CarouselContent")) {
            const nestedItems = React.Children.toArray((child.props as any).children)
            setItemCount(nestedItems.length)
          }
        })
      } else {
        setItemCount(rawChildren.length)
      }
    }, [hasCarouselContent, rawChildren.length])

    const count = itemCount || 1

    const canScrollPrev = loop || currentIndex > 0
    const canScrollNext = loop || currentIndex < count - 1

    const scrollPrev = React.useCallback(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev > 0 ? prev - 1 : loop ? count - 1 : prev
        onSlideChange?.(nextIndex)
        return nextIndex
      })
    }, [loop, count, onSlideChange])

    const scrollNext = React.useCallback(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev < count - 1 ? prev + 1 : loop ? 0 : prev
        onSlideChange?.(nextIndex)
        return nextIndex
      })
    }, [loop, count, onSlideChange])

    const goToIndex = React.useCallback(
      (index: number) => {
        const clamped = Math.max(0, Math.min(count - 1, index))
        setCurrentIndex(clamped)
        onSlideChange?.(clamped)
      },
      [count, onSlideChange]
    )

    const registerItem = React.useCallback(() => {
      const id = registeredCountRef.current++
      return id
    }, [])

    const unregisterItem = React.useCallback(() => {
      registeredCountRef.current = Math.max(0, registeredCountRef.current - 1)
    }, [])

    // Autoplay timer
    React.useEffect(() => {
      if (!autoPlay || count <= 1) return
      const timer = setInterval(() => {
        scrollNext()
      }, interval)
      return () => clearInterval(timer)
    }, [autoPlay, interval, count, scrollNext])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented) return

      if (orientation === "horizontal") {
        if (e.key === "ArrowLeft") {
          e.preventDefault()
          scrollPrev()
        } else if (e.key === "ArrowRight") {
          e.preventDefault()
          scrollNext()
        }
      } else {
        if (e.key === "ArrowUp") {
          e.preventDefault()
          scrollPrev()
        } else if (e.key === "ArrowDown") {
          e.preventDefault()
          scrollNext()
        }
      }
    }

    return (
      <CarouselContext.Provider
        value={{
          currentIndex,
          count,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          goToIndex,
          orientation,
          loop,
          registerItem,
          unregisterItem,
        }}
      >
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-lg",
            className
          )}
          {...props}
        >
          {hasCarouselContent ? (
            children
          ) : (
            <>
              <CarouselContent>
                {rawChildren.map((child, index) => (
                  <CarouselItem key={index}>{child}</CarouselItem>
                ))}
              </CarouselContent>
              {showArrows !== false && count > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
              {showDots && count > 1 && <CarouselIndicators />}
            </>
          )}
        </div>
      </CarouselContext.Provider>
    )
  }
) as unknown as CompoundedCarousel

Carousel.displayName = "Carousel"
Carousel.Content = CarouselContent
Carousel.Item = CarouselItem
Carousel.Previous = CarouselPrevious
Carousel.Next = CarouselNext
Carousel.Indicators = CarouselIndicators
Carousel.Indicator = CarouselIndicator
