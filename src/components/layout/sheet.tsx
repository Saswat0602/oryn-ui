"use client"

import * as React from "react"
import { X } from "../../icons"
import { cn } from "../../lib/utils"
import { Portal } from "../../lib/portal"
import { Slot } from "../../lib/slot"
import { Presence } from "../../primitives/presence"
import { useFocusTrap } from "../../lib/focus"
import { useControllableState } from "../../lib/use-controllable-state"

interface SheetContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

function useSheetContext() {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error("Sheet compound components must be used within a Sheet")
  }
  return context
}

export interface SheetProps {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Sheet: React.FC<SheetProps> = ({
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
  const titleId = `sheet-title-${uniqueId}`
  const descriptionId = `sheet-desc-${uniqueId}`
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <SheetContext.Provider value={{ open, setOpen, titleId, descriptionId, triggerRef }}>
      {children}
    </SheetContext.Provider>
  )
}

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, forwardedRef) => {
    const { setOpen, triggerRef } = useSheetContext()
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(true)
      }
    }

    return (
      <Comp
        ref={(node: HTMLButtonElement | null) => {
          triggerRef.current = node
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
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
SheetTrigger.displayName = "SheetTrigger"

export interface SheetPortalProps {
  children: React.ReactNode
}

export const SheetPortal: React.FC<SheetPortalProps> = ({ children }) => {
  const { open } = useSheetContext()
  return (
    <Presence present={open}>
      <Portal>{children}</Portal>
    </Presence>
  )
}

export interface SheetOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SheetOverlay = React.forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { open, setOpen } = useSheetContext()

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
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs duration-300",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      />
    )
  }
)
SheetOverlay.displayName = "SheetOverlay"

export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { setOpen } = useSheetContext()
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
SheetClose.displayName = "SheetClose"

const sheetVariants = {
  top: "inset-x-0 top-0 border-b border-border data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-full",
  bottom:
    "inset-x-0 bottom-0 border-t border-border data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full",
  left: "inset-y-0 left-0 h-full w-3/4 border-r border-border data-[state=open]:animate-in data-[state=open]:slide-in-from-left-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left-full sm:max-w-sm",
  right:
    "inset-y-0 right-0 h-full w-3/4 border-l border-border data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full sm:max-w-sm",
}

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right"
  showCloseButton?: boolean
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, showCloseButton = true, ...props }, forwardedRef) => {
    const { open, setOpen, titleId, descriptionId, triggerRef } = useSheetContext()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    useFocusTrap(contentRef as React.RefObject<HTMLElement>, open)

    // Focus restoration
    const prevOpenRef = React.useRef(open)
    React.useEffect(() => {
      if (prevOpenRef.current && !open) {
        triggerRef.current?.focus()
      }
      prevOpenRef.current = open
    }, [open, triggerRef])

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
      <SheetPortal>
        <SheetOverlay />
        <div
          ref={(node) => {
            contentRef.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={props["aria-labelledby"] || titleId}
          aria-describedby={props["aria-describedby"] || descriptionId}
          data-state={open ? "open" : "closed"}
          className={cn(
            "fixed z-[60] gap-4 bg-background text-foreground border-border p-6 shadow-2xl transition ease-in-out duration-300",
            sheetVariants[side],
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <button
              type="button"
              aria-label="Close sheet"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </SheetPortal>
    )
  }
)
SheetContent.displayName = "SheetContent"

export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>
export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>

export const SheetHeader = ({
  className,
  ...props
}: SheetHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

export const SheetFooter = ({
  className,
  ...props
}: SheetFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

export interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, id, ...props }, ref) => {
    const context = React.useContext(SheetContext)
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
SheetTitle.displayName = "SheetTitle"

export interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const SheetDescription = React.forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ className, id, ...props }, ref) => {
    const context = React.useContext(SheetContext)
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
SheetDescription.displayName = "SheetDescription"

export const useSheet = () => {
  const context = React.useContext(SheetContext)
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
export type SheetComponent = typeof Sheet & {
  Trigger: typeof SheetTrigger
  Content: typeof SheetContent
  Header: typeof SheetHeader
  Title: typeof SheetTitle
  Description: typeof SheetDescription
  Footer: typeof SheetFooter
  Close: typeof SheetClose
  Overlay: typeof SheetOverlay
  Portal: typeof SheetPortal
}

;(Sheet as any).Trigger = SheetTrigger
;(Sheet as any).Content = SheetContent
;(Sheet as any).Header = SheetHeader
;(Sheet as any).Title = SheetTitle
;(Sheet as any).Description = SheetDescription
;(Sheet as any).Footer = SheetFooter
;(Sheet as any).Close = SheetClose
;(Sheet as any).Overlay = SheetOverlay
;(Sheet as any).Portal = SheetPortal

export default Sheet
