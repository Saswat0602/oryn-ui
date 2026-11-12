"use client"

import * as React from "react"
import { X } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"
import { Presence } from "../../primitives/presence"
import { useFocusTrap } from "../../lib/focus"
import { useControllableState } from "../../lib/use-controllable-state"

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog compound components must be used within a Dialog")
  }
  return context
}

export interface DialogProps {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Dialog: React.FC<DialogProps> = ({
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

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { setOpen } = useDialogContext()
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
DialogTrigger.displayName = "DialogTrigger"

export interface DialogPortalProps {
  children: React.ReactNode
}

export const DialogPortal: React.FC<DialogPortalProps> = ({ children }) => {
  const { open } = useDialogContext()
  return (
    <Presence present={open}>
      <Portal>{children}</Portal>
    </Presence>
  )
}

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { open, setOpen } = useDialogContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(false)
      }
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
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
DialogOverlay.displayName = "DialogOverlay"

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { setOpen } = useDialogContext()
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
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
DialogClose.displayName = "DialogClose"

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, showCloseButton = true, ...props }, forwardedRef) => {
    const { open, setOpen } = useDialogContext()
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
      if (!open) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, setOpen])

    return (
      <DialogPortal>
        <DialogOverlay />
        <div
          ref={(node) => {
            contentRef.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="dialog"
          aria-modal="true"
          data-state={open ? "open" : "closed"}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card p-6 text-card-foreground shadow-2xl duration-200 rounded-2xl",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </DialogPortal>
    )
  }
)
DialogContent.displayName = "DialogContent"

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
)
DialogHeader.displayName = "DialogHeader"

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
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
DialogFooter.displayName = "DialogFooter"

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "text-base font-semibold leading-none tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
)
DialogTitle.displayName = "DialogTitle"

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
)
DialogDescription.displayName = "DialogDescription"

export const useDialog = () => ({
  open: false,
  onOpenChange: () => {},
})

export default Dialog
