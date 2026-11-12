import * as React from "react"
import { cn, createVariants } from "../../lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "ghost"
  hoverable?: boolean
  clickable?: boolean
}

const cardVariants = createVariants({
  base: "rounded-xl transition-all duration-200 text-card-foreground",
  variants: {
    variant: {
      default: "border border-border bg-card shadow-xs hover:border-border/80",
      elevated: "border border-border/80 bg-card shadow-md hover:shadow-lg dark:shadow-black/40 hover:border-border",
      outlined: "border-2 border-border bg-transparent shadow-none hover:border-border/80",
      ghost: "border border-transparent bg-transparent shadow-none hover:bg-accent/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hoverable, clickable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant }),
        hoverable && "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
        clickable && "cursor-pointer active:scale-[0.99] transition-transform select-none",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-card-foreground",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0 text-card-foreground", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0 text-muted-foreground", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>