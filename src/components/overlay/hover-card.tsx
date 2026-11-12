"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"

interface HoverCardContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  triggerRect: DOMRect | null
  updateTriggerRect: () => void
  openDelay: number
  closeDelay: number
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
  const [open, setOpen] = React.useState<boolean>(controlledOpen ?? defaultOpen)

  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen)
    }
  }, [controlledOpen])

  const handleOpenChange = (nextOpen: boolean) => {
    if (controlledOpen === undefined) {
      setOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const triggerRef = React.useRef<HTMLElement | null>(null)
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

  const updateTriggerRect = React.useCallback(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect())
    }
  }, [])

  return (
    <HoverCardContext.Provider
      value={{
        open,
        setOpen: handleOpenChange,
        triggerRef,
        triggerRect,
        updateTriggerRect,
        openDelay,
        closeDelay,
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
  ({ asChild = false, children, onMouseEnter, onMouseLeave, ...props }, forwardedRef) => {
    const { setOpen, triggerRef, updateTriggerRect, openDelay, closeDelay } = useHoverCardContext()
    const timerRef = React.useRef<any>(null)
    const Comp = asChild ? Slot : "a"

    const setMergedRef = React.useCallback(
      (node: HTMLElement | null) => {
        triggerRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<any>).current = node
        }
      },
      [forwardedRef, triggerRef]
    )

    const handleEnter = () => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        updateTriggerRect()
        setOpen(true)
      }, openDelay)
    }

    const handleLeave = () => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setOpen(false)
      }, closeDelay)
    }

    return (
      <Comp
        ref={setMergedRef as any}
        onMouseEnter={(e: any) => {
          onMouseEnter?.(e)
          handleEnter()
        }}
        onMouseLeave={(e: any) => {
          onMouseLeave?.(e)
          handleLeave()
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
    const { open, setOpen, triggerRect, closeDelay } = useHoverCardContext()
    const timerRef = React.useRef<any>(null)

    if (!open) return null

    let positioningStyle: React.CSSProperties = {}
    if (triggerRect) {
      if (side === "bottom") {
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
          bottom: `${window.innerHeight - triggerRect.top + sideOffset}px`,
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
          ref={ref}
          style={{ ...positioningStyle, ...style }}
          onMouseEnter={(e) => {
            onMouseEnter?.(e)
            clearTimeout(timerRef.current)
          }}
          onMouseLeave={(e) => {
            onMouseLeave?.(e)
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
