"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Presence } from "../../primitives/presence"
import { useFocusTrap } from "../../lib/focus"
import { X } from "../../icons"

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  color?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  borderRadius?: string | number
  shadow?: "none" | "sm" | "md" | "lg" | "xl"
  overlayColor?: string
  overlayBlur?: boolean
  zIndex?: number
  footer?: React.ReactNode
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-full m-4",
}

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-xl",
  xl: "shadow-2xl",
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      isOpen,
      onClose,
      title,
      children,
      size = "md",
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      fullWidth = false,
      fullHeight = false,
      color,
      backgroundColor,
      borderColor,
      textColor,
      borderRadius,
      shadow = "lg",
      overlayColor,
      overlayBlur = true,
      zIndex = 50,
      footer,
      style,
      ...props
    },
    ref
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
          onClose()
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, closeOnEscape, onClose])

    const ariaLabelledby = props["aria-labelledby"] || (title ? titleId : undefined)
    const ariaLabel = props["aria-label"] || (!ariaLabelledby && !title ? "Dialog" : undefined)

    return (
      <Presence present={isOpen}>
        <Portal>
          {/* Overlay */}
          <div
            aria-hidden="true"
            onClick={() => {
              if (closeOnOverlayClick) onClose()
            }}
            data-state={isOpen ? "open" : "closed"}
            className={cn(
              "fixed inset-0 bg-black/60 duration-200",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
              overlayBlur ? "backdrop-blur-xs" : ""
            )}
            style={{
              zIndex,
              backgroundColor: overlayColor || undefined,
            }}
          />

          {/* Modal Dialog Content */}
          <div
            ref={(node) => {
              contentRef.current = node
              if (typeof ref === "function") ref(node)
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-label={ariaLabel}
            data-state={isOpen ? "open" : "closed"}
            className={cn(
              "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full rounded-2xl border duration-200",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "bg-background border-border text-foreground",
              sizeClasses[size],
              shadowClasses[shadow],
              fullWidth && "w-full",
              fullHeight && "h-full",
              className
            )}
            style={{
              zIndex: zIndex + 1,
              borderRadius,
              ...(backgroundColor || color ? { backgroundColor: backgroundColor || color } : {}),
              ...(borderColor ? { borderColor } : {}),
              ...(textColor ? { color: textColor } : {}),
              ...style,
            }}
            {...props}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                {title ? (
                  <h2 id={titleId} className="text-base font-semibold text-foreground leading-none">
                    {title}
                  </h2>
                ) : (
                  <div />
                )}

                {showCloseButton && (
                  <button
                    type="button"
                    aria-label="Close modal"
                    onClick={onClose}
                    className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">{children}</div>

            {/* Optional Footer */}
            {footer && (
              <div className="px-6 py-3.5 border-t border-border bg-muted/30 rounded-b-2xl flex items-center justify-end gap-2">
                {footer}
              </div>
            )}
          </div>
        </Portal>
      </Presence>
    )
  }
)
Modal.displayName = "Modal"

export default Modal
