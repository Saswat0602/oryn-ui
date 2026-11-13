import React from 'react'
import { cn } from '../../lib/utils'

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {}

export type TypographyH1Props = React.HTMLAttributes<HTMLHeadingElement>
export type TypographyH2Props = React.HTMLAttributes<HTMLHeadingElement>
export type TypographyH3Props = React.HTMLAttributes<HTMLHeadingElement>
export type TypographyH4Props = React.HTMLAttributes<HTMLHeadingElement>
export type TypographyH5Props = React.HTMLAttributes<HTMLHeadingElement>
export type TypographyH6Props = React.HTMLAttributes<HTMLHeadingElement>
export type TypographyPProps = React.HTMLAttributes<HTMLParagraphElement>
export type TypographyBlockquoteProps = React.BlockquoteHTMLAttributes<HTMLQuoteElement>
export type TypographyCodeProps = React.HTMLAttributes<HTMLElement>
export type TypographyLeadProps = React.HTMLAttributes<HTMLParagraphElement>
export type TypographyLargeProps = React.HTMLAttributes<HTMLDivElement>
export type TypographySmallProps = React.HTMLAttributes<HTMLElement>
export type TypographyMutedProps = React.HTMLAttributes<HTMLParagraphElement>

export const TypographyH1 = React.forwardRef<HTMLHeadingElement, TypographyH1Props>(
  ({ children, className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
      {...props}
    >
      {children}
    </h1>
  )
)
TypographyH1.displayName = 'TypographyH1'

export const TypographyH2 = React.forwardRef<HTMLHeadingElement, TypographyH2Props>(
  ({ children, className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    >
      {children}
    </h2>
  )
)
TypographyH2.displayName = 'TypographyH2'

export const TypographyH3 = React.forwardRef<HTMLHeadingElement, TypographyH3Props>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
)
TypographyH3.displayName = 'TypographyH3'

export const TypographyH4 = React.forwardRef<HTMLHeadingElement, TypographyH4Props>(
  ({ children, className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h4>
  )
)
TypographyH4.displayName = 'TypographyH4'

export const TypographyH5 = React.forwardRef<HTMLHeadingElement, TypographyH5Props>(
  ({ children, className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('scroll-m-20 text-lg font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h5>
  )
)
TypographyH5.displayName = 'TypographyH5'

export const TypographyH6 = React.forwardRef<HTMLHeadingElement, TypographyH6Props>(
  ({ children, className, ...props }, ref) => (
    <h6
      ref={ref}
      className={cn('scroll-m-20 text-base font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h6>
  )
)
TypographyH6.displayName = 'TypographyH6'

export const TypographyP = React.forwardRef<HTMLParagraphElement, TypographyPProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    >
      {children}
    </p>
  )
)
TypographyP.displayName = 'TypographyP'

export const TypographyBlockquote = React.forwardRef<HTMLQuoteElement, TypographyBlockquoteProps>(
  ({ children, className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn('mt-6 border-l-2 border-border pl-6 italic', className)}
      {...props}
    >
      {children}
    </blockquote>
  )
)
TypographyBlockquote.displayName = 'TypographyBlockquote'

export const TypographyCode = React.forwardRef<HTMLElement, TypographyCodeProps>(
  ({ children, className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground', className)}
      {...props}
    >
      {children}
    </code>
  )
)
TypographyCode.displayName = 'TypographyCode'

export const TypographyLead = React.forwardRef<HTMLParagraphElement, TypographyLeadProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-xl text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
)
TypographyLead.displayName = 'TypographyLead'

export const TypographyLarge = React.forwardRef<HTMLDivElement, TypographyLargeProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
    >
      {children}
    </div>
  )
)
TypographyLarge.displayName = 'TypographyLarge'

export const TypographySmall = React.forwardRef<HTMLElement, TypographySmallProps>(
  ({ children, className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    >
      {children}
    </small>
  )
)
TypographySmall.displayName = 'TypographySmall'

export const TypographyMuted = React.forwardRef<HTMLParagraphElement, TypographyMutedProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
)
TypographyMuted.displayName = 'TypographyMuted'
