"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"
import { useClickOutside } from "../../lib/use-click-outside"
import { useControllableState } from "../../lib/use-controllable-state"

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  triggerRect: DOMRect | null
  updateTriggerRect: () => void
  contentId: string
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

export function usePopoverContext() {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("Popover compound components must be used within a Popover")
  }
  return context
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  isOpen?: boolean
  onClose?: () => void
  trigger?: React.ReactNode
  content?: React.ReactNode
  placement?: "top" | "bottom" | "left" | "right"
  children?: React.ReactNode
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ asChild = false, onClick, children, "aria-haspopup": ariaHasPopup = "dialog", ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef, updateTriggerRect, contentId } = usePopoverContext()
    const Comp = asChild ? Slot : "button"

    const setMergedRef = React.useCallback(
      (node: HTMLElement | null) => {
        triggerRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
        }
      },
      [forwardedRef, triggerRef]
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        updateTriggerRect()
        setOpen(!open)
      }
    }

    return (
      <Comp
        ref={setMergedRef}
        type={asChild ? undefined : "button"}
        aria-expanded={open}
        aria-haspopup={ariaHasPopup}
        aria-controls={open ? contentId : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

export interface PopoverAnchorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

export const PopoverAnchor = React.forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    )
  }
)
PopoverAnchor.displayName = "PopoverAnchor"

export interface PopoverCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const PopoverClose = React.forwardRef<HTMLElement, PopoverCloseProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { setOpen, triggerRef } = usePopoverContext()
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    return (
      <Comp
        ref={(node: HTMLElement | null) => {
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
        }}
        type={asChild ? undefined : "button"}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
PopoverClose.displayName = "PopoverClose"

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
  showArrow?: boolean
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      align = "center",
      side: requestedSide = "bottom",
      sideOffset = 4,
      showArrow = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { open, setOpen, triggerRef, triggerRect, contentId } = usePopoverContext()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    useClickOutside(contentRef, (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target as Node)) {
        return
      }
      setOpen(false)
    }, open)

    // Focus restoration on close
    const prevOpenRef = React.useRef(open)
    React.useEffect(() => {
      if (prevOpenRef.current && !open) {
        triggerRef.current?.focus()
      }
      prevOpenRef.current = open
    }, [open, triggerRef])

    // Initial focus on open
    React.useEffect(() => {
      if (open && contentRef.current) {
        const focusable = contentRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable) {
          focusable.focus()
        } else {
          contentRef.current.focus()
        }
      }
    }, [open])

    // Escape key
    React.useEffect(() => {
      if (!open) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
          triggerRef.current?.focus()
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, setOpen, triggerRef])

    if (!open) return null

    // Viewport collision flipping
    let side = requestedSide
    if (typeof window !== "undefined" && triggerRect) {
      if (requestedSide === "bottom" && triggerRect.bottom + 200 > window.innerHeight && triggerRect.top > 200) {
        side = "top"
      } else if (requestedSide === "top" && triggerRect.top - 200 < 0 && window.innerHeight - triggerRect.bottom > 200) {
        side = "bottom"
      }
    }

    let positioningStyle: React.CSSProperties = {}
    if (triggerRect && typeof window !== "undefined") {
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
      } else if (side === "top") {
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
      } else if (side === "left") {
        positioningStyle = {
          position: "fixed",
          right: `${window.innerWidth - triggerRect.left + sideOffset}px`,
          top: `${triggerRect.top + triggerRect.height / 2}px`,
          transform: "translateY(-50%)",
        }
      } else if (side === "right") {
        positioningStyle = {
          position: "fixed",
          left: `${triggerRect.right + sideOffset}px`,
          top: `${triggerRect.top + triggerRect.height / 2}px`,
          transform: "translateY(-50%)",
        }
      }
    }

    return (
      <Portal>
        <div
          ref={(node) => {
            contentRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          id={contentId}
          role="dialog"
          tabIndex={-1}
          style={{ ...positioningStyle, ...style }}
          className={cn(
            "fixed z-[70] w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-2xl outline-none duration-150 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95",
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
PopoverContent.displayName = "PopoverContent"

export const Popover: React.FC<PopoverProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isOpen,
  onClose,
  trigger,
  content,
  placement = "bottom",
  children,
}) => {
  const isControlled = controlledOpen !== undefined || isOpen !== undefined
  const resolvedProp = controlledOpen !== undefined ? controlledOpen : isOpen

  const [open, setOpen] = useControllableState<boolean>({
    prop: isControlled ? resolvedProp : undefined,
    defaultProp: defaultOpen,
    onChange: (nextOpen) => {
      onOpenChange?.(nextOpen)
      if (!nextOpen) onClose?.()
    },
  })

  const rawId = React.useId()
  const contentId = `popover-content-${rawId}`

  const triggerRef = React.useRef<HTMLElement | null>(null)
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

  const updateTriggerRect = React.useCallback(() => {
    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect())
    }
  }, [])

  React.useEffect(() => {
    if (!open) return
    updateTriggerRect()
    const handleScrollOrResize = () => updateTriggerRect()
    window.addEventListener("scroll", handleScrollOrResize, true)
    window.addEventListener("resize", handleScrollOrResize)
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true)
      window.removeEventListener("resize", handleScrollOrResize)
    }
  }, [open, updateTriggerRect])

  const contextValue: PopoverContextValue = {
    open,
    setOpen,
    triggerRef,
    triggerRect,
    updateTriggerRect,
    contentId,
  }

  if (trigger) {
    return (
      <PopoverContext.Provider value={contextValue}>
        <PopoverTrigger asChild>
          {React.isValidElement(trigger) ? trigger : <span>{trigger}</span>}
        </PopoverTrigger>
        <PopoverContent side={placement}>{content || children}</PopoverContent>
      </PopoverContext.Provider>
    )
  }

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  )
}

export const usePopover = () => {
  const context = React.useContext(PopoverContext)
  if (context) {
    return {
      open: context.open,
      setOpen: context.setOpen,
    }
  }
  return {
    open: false,
    setOpen: () => {},
  }
}

// Compound component pattern attachment
export type PopoverComponent = typeof Popover & {
  Trigger: typeof PopoverTrigger
  Content: typeof PopoverContent
  Anchor: typeof PopoverAnchor
}

export const PopoverNamespace = Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Anchor: PopoverAnchor,
})

export default Popover
