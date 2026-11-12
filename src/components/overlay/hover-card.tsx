"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"
import { useControllableState } from "../../hooks/use-controllable-state"

interface HoverCardContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  triggerRect: DOMRect | null
  updateTriggerRect: () => void
  openDelay: number
  closeDelay: number
  contentId: string
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null)

function useHoverCardContext() {
  const context = React.useContext(HoverCardContext)
  if (!context) {
    throw new Error("HoverCard compound components must be used within a HoverCard")
  }
  return context
}

export interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  openDelay?: number
  closeDelay?: number
  children?: React.ReactNode
}

export const HoverCard: React.FC<HoverCardProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openDelay = 300,
  closeDelay = 200,
  children,
}) => {
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: controlledOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  const triggerRef = React.useRef<HTMLElement | null>(null)
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)
  const contentId = React.useId()

  const updateTriggerRect = React.useCallback(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect())
    }
  }, [])

  // Auto-measure trigger bounding box whenever open becomes true or changes
  React.useEffect(() => {
    if (open) {
      updateTriggerRect()
      const handleResize = () => updateTriggerRect()
      const handleScroll = () => updateTriggerRect()
      window.addEventListener("resize", handleResize, { passive: true })
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [open, updateTriggerRect])

  // Escape key listener (WCAG 1.4.13 Dismissible)
  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, setOpen])

  return (
    <HoverCardContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        triggerRect,
        updateTriggerRect,
        openDelay,
        closeDelay,
        contentId,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  )
}

export interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

export const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  (
    {
      asChild = false,
      children,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    forwardedRef
  ) => {
    const { open, setOpen, triggerRef, updateTriggerRect, openDelay, closeDelay, contentId } =
      useHoverCardContext()
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const Comp = asChild ? Slot : "a"

    const setMergedRef = React.useCallback(
      (node: HTMLElement | null) => {
        triggerRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          ;(forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
        }
      },
      [forwardedRef, triggerRef]
    )

    const handleEnter = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        updateTriggerRect()
        setOpen(true)
      }, openDelay)
    }

    const handleLeave = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setOpen(false)
      }, closeDelay)
    }

    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }, [])

    return (
      <Comp
        ref={setMergedRef as any}
        aria-describedby={open ? contentId : undefined}
        data-state={open ? "open" : "closed"}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          onMouseEnter?.(e)
          handleEnter()
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          onMouseLeave?.(e)
          handleLeave()
        }}
        onFocus={(e: React.FocusEvent<HTMLElement>) => {
          onFocus?.(e)
          handleEnter()
        }}
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          onBlur?.(e)
          handleLeave()
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
          onKeyDown?.(e)
          if (e.key === "Escape" && open) {
            e.stopPropagation()
            setOpen(false)
          }
        }}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
HoverCardTrigger.displayName = "HoverCardTrigger"

export interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
}

export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 4,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const { open, setOpen, triggerRect, closeDelay, contentId } = useHoverCardContext()
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    const setMergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [ref]
    )

    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }, [])

    if (!open) return null

    // Boundary flip viewport collision detection
    let resolvedSide = side
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800

    if (triggerRect) {
      const estimatedHeight = 160
      if (side === "bottom" && triggerRect.bottom + sideOffset + estimatedHeight > windowHeight) {
        if (triggerRect.top - sideOffset - estimatedHeight > 0) {
          resolvedSide = "top"
        }
      } else if (side === "top" && triggerRect.top - sideOffset - estimatedHeight < 0) {
        if (triggerRect.bottom + sideOffset + estimatedHeight < windowHeight) {
          resolvedSide = "bottom"
        }
      }
    }

    let positioningStyle: React.CSSProperties = {}
    if (triggerRect) {
      if (resolvedSide === "bottom") {
        positioningStyle = {
          position: "fixed",
          top: `${triggerRect.bottom + sideOffset}px`,
          left:
            align === "start"
              ? `${triggerRect.left}px`
              : align === "end"
              ? `${triggerRect.right}px`
              : `${triggerRect.left + triggerRect.width / 2}px`,
          transform: align === "center" ? "translateX(-50%)" : align === "end" ? "translateX(-100%)" : undefined,
        }
      } else {
        positioningStyle = {
          position: "fixed",
          bottom: `${windowHeight - triggerRect.top + sideOffset}px`,
          left:
            align === "start"
              ? `${triggerRect.left}px`
              : align === "end"
              ? `${triggerRect.right}px`
              : `${triggerRect.left + triggerRect.width / 2}px`,
          transform: align === "center" ? "translateX(-50%)" : align === "end" ? "translateX(-100%)" : undefined,
        }
      }
    }

    return (
      <Portal>
        <div
          ref={setMergedRef}
          id={contentId}
          role="dialog"
          aria-modal={false}
          aria-label={
            props["aria-label"] || (props["aria-labelledby"] ? undefined : "Hover card details")
          }
          style={{ ...positioningStyle, ...style }}
          onMouseEnter={(e) => {
            onMouseEnter?.(e)
            if (timerRef.current) clearTimeout(timerRef.current)
          }}
          onMouseLeave={(e) => {
            onMouseLeave?.(e)
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => {
              setOpen(false)
            }, closeDelay)
          }}
          className={cn(
            "fixed z-[70] w-64 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none duration-150 animate-in fade-in-0 zoom-in-95",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </Portal>
    )
  }
)
HoverCardContent.displayName = "HoverCardContent"

export default HoverCard
