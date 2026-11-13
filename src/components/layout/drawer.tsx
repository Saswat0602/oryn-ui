"use client"

import * as React from "react"
import { X } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Presence } from "../../primitives/presence"
import { useFocusTrap } from "../../lib/focus"

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer is open */
  isOpen?: boolean
  /** Callback when drawer should close */
  onClose?: () => void
  /** Title of the drawer for accessibility */
  title?: string
  /** Position of the drawer */
  position?: "right" | "left" | "top" | "bottom"
  /** Size of the drawer */
  size?: "sm" | "md" | "lg" | "full"
  /** Custom width for left/right drawers */
  width?: string | number
  /** Custom height for top/bottom drawers */
  height?: string | number
  /** Whether to show overlay */
  overlay?: boolean
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean
  /** Whether to close on escape key */
  closeOnEscape?: boolean
  /** Whether to show close button */
  showCloseButton?: boolean
  /** Additional CSS classes */
  className?: string
  /** Overlay CSS classes */
  overlayClassName?: string
  /** Drawer content */
  children: React.ReactNode
}

const positionVariants = {
  right:
    "inset-y-0 right-0 h-full border-l border-border data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full",
  left:
    "inset-y-0 left-0 h-full border-r border-border data-[state=open]:animate-in data-[state=open]:slide-in-from-left-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left-full",
  top:
    "inset-x-0 top-0 w-full border-b border-border data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-full",
  bottom:
    "inset-x-0 bottom-0 w-full border-t border-border data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full",
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen = false,
      onClose,
      title,
      position = "right",
      size = "md",
      width,
      height,
      overlay = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      className = "",
      overlayClassName = "",
      children,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const previousActiveElement = React.useRef<HTMLElement | null>(null)
    const titleId = React.useId()

    useFocusTrap(contentRef as React.RefObject<HTMLElement>, isOpen)

    // Focus restoration
    React.useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement as HTMLElement | null
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus?.()
        previousActiveElement.current = null
      }
    }, [isOpen])

    React.useEffect(() => {
      return () => {
        if (previousActiveElement.current) {
          previousActiveElement.current.focus?.()
        }
      }
    }, [])

    // Body scroll lock
    React.useEffect(() => {
      if (isOpen) {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
          document.body.style.overflow = originalOverflow
        }
      }
    }, [isOpen])

    // Escape key
    React.useEffect(() => {
      if (!isOpen || !closeOnEscape) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          onClose?.()
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, closeOnEscape, onClose])

    const getSizeClasses = () => {
      if (width && (position === "left" || position === "right")) {
        return { width: typeof width === "number" ? `${width}px` : width }
      }
      if (height && (position === "top" || position === "bottom")) {
        return { height: typeof height === "number" ? `${height}px` : height }
      }

      const sizeClasses = {
        sm: position === "left" || position === "right" ? "w-80" : "h-80",
        md: position === "left" || position === "right" ? "w-96" : "h-96",
        lg: position === "left" || position === "right" ? "w-[32rem]" : "h-[32rem]",
        full: position === "left" || position === "right" ? "w-full" : "h-full",
      }
      return { className: sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md }
    }

    const sizeProps = getSizeClasses()
    const ariaLabelledby = props["aria-labelledby"] || (title ? titleId : undefined)
    const ariaLabel = props["aria-label"] || (!ariaLabelledby && !title ? "Drawer" : undefined)

    return (
      <Presence present={isOpen}>
        <Portal>
          {overlay && (
            <div
              aria-hidden="true"
              onClick={() => {
                if (closeOnOverlayClick) onClose?.()
              }}
              data-state={isOpen ? "open" : "closed"}
              className={cn(
                "fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs duration-300",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                overlayClassName
              )}
            />
          )}
          <div
            ref={(node) => {
              contentRef.current = node
              if (typeof forwardedRef === "function") forwardedRef(node)
              else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-label={ariaLabel}
            aria-describedby={props["aria-describedby"]}
            data-state={isOpen ? "open" : "closed"}
            className={cn(
              "fixed z-[60] bg-background text-foreground border-border shadow-2xl flex flex-col transition ease-in-out duration-300",
              positionVariants[position as keyof typeof positionVariants] || positionVariants.right,
              sizeProps.className,
              className
            )}
            style={{
              ...sizeProps,
              ...style,
            }}
            {...props}
          >
            {title && (
              <h2 id={titleId} className="sr-only">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer z-10 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <div className={cn("p-6 h-full overflow-y-auto", showCloseButton ? "pt-14" : "")}>
              {children}
            </div>
          </div>
        </Portal>
      </Presence>
    )
  }
)
Drawer.displayName = "Drawer"

export default Drawer