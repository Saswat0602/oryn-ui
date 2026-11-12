"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"
import { Presence } from "../../primitives/presence"
import { useFocusTrap } from "../../lib/focus"
import { useControllableState } from "../../lib/use-controllable-state"

interface AlertDialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null)

export function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext)
  if (!context) {
    throw new Error("AlertDialog compound components must be used within an AlertDialog")
  }
  return context
}

export interface AlertDialogProps {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [open, setOpen] = useControllableState<boolean>({
    prop: controlledOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  const uniqueId = React.useId()
  const titleId = `alert-dialog-title-${uniqueId}`
  const descriptionId = `alert-dialog-desc-${uniqueId}`

  return (
    <AlertDialogContext.Provider value={{ open, setOpen, titleId, descriptionId }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

export interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { setOpen } = useAlertDialogContext()
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(true)
      }
    }

    return (
      <Comp
        ref={ref as any}
        type={asChild ? undefined : "button"}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
AlertDialogTrigger.displayName = "AlertDialogTrigger"

export interface AlertDialogPortalProps {
  children: React.ReactNode
}

export const AlertDialogPortal: React.FC<AlertDialogPortalProps> = ({ children }) => {
  const { open } = useAlertDialogContext()
  return (
    <Presence present={open}>
      <Portal>{children}</Portal>
    </Presence>
  )
}

export interface AlertDialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogOverlay = React.forwardRef<HTMLDivElement, AlertDialogOverlayProps>(
  ({ className, ...props }, ref) => {
    const { open } = useAlertDialogContext()
    return (
      <div
        ref={ref}
        data-state={open ? "open" : "closed"}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs duration-200",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      />
    )
  }
)
AlertDialogOverlay.displayName = "AlertDialogOverlay"

export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOnEscape?: boolean
}

export const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className, children, closeOnEscape = true, ...props }, forwardedRef) => {
    const { open, setOpen, titleId, descriptionId } = useAlertDialogContext()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    useFocusTrap(contentRef as React.RefObject<HTMLElement>, open)

    // Body scroll lock
    React.useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
          document.body.style.overflow = originalOverflow
        }
      }
    }, [open])

    // Escape key
    React.useEffect(() => {
      if (!open || !closeOnEscape) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, setOpen, closeOnEscape])

    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <div
          ref={(node) => {
            contentRef.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={props['aria-labelledby'] || titleId}
          aria-describedby={props['aria-describedby'] || descriptionId}
          data-state={open ? "open" : "closed"}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card p-6 text-card-foreground shadow-2xl duration-200 rounded-2xl",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AlertDialogPortal>
    )
  }
)
AlertDialogContent.displayName = "AlertDialogContent"

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogHeader = React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
      {...props}
    />
  )
)
AlertDialogHeader.displayName = "AlertDialogHeader"

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 sm:gap-0 mt-6",
        className
      )}
      {...props}
    />
  )
)
AlertDialogFooter.displayName = "AlertDialogFooter"

export interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, id, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext)
    const titleId = id || context?.titleId
    return (
      <h2
        ref={ref}
        id={titleId}
        className={cn("text-base font-semibold text-foreground", className)}
        {...props}
      />
    )
  }
)
AlertDialogTitle.displayName = "AlertDialogTitle"

export interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className, id, ...props }, ref) => {
    const context = React.useContext(AlertDialogContext)
    const descriptionId = id || context?.descriptionId
    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn("text-xs text-muted-foreground leading-relaxed", className)}
        {...props}
      />
    )
  }
)
AlertDialogDescription.displayName = "AlertDialogDescription"

export interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className, asChild = false, onClick, children, ...props }, ref) => {
    const { setOpen } = useAlertDialogContext()
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(false)
      }
    }

    return (
      <Comp
        ref={ref as any}
        type={asChild ? undefined : "button"}
        onClick={handleClick}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background cursor-pointer disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
AlertDialogAction.displayName = "AlertDialogAction"

export interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ className, asChild = false, onClick, children, ...props }, ref) => {
    const { setOpen } = useAlertDialogContext()
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(false)
      }
    }

    return (
      <Comp
        ref={ref as any}
        type={asChild ? undefined : "button"}
        onClick={handleClick}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-2xs hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background cursor-pointer disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
AlertDialogCancel.displayName = "AlertDialogCancel"

export const useAlertDialog = () => {
  const context = React.useContext(AlertDialogContext)
  if (context) {
    return {
      open: context.open,
      onOpenChange: context.setOpen,
    }
  }
  return {
    open: false,
    onOpenChange: () => {},
  }
}

export default AlertDialog
