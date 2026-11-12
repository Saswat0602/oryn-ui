"use client"

import React, { createContext, useContext, useState, forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface AvatarContextValue {
  imageLoaded: boolean
  setImageLoaded: (loaded: boolean) => void
  imageError: boolean
  setImageError: (error: boolean) => void
}

const AvatarContext = createContext<AvatarContextValue | null>(null)

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, onLoad, onError, alt = 'Avatar', ...props }, ref) => {
    const ctx = useContext(AvatarContext)

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      ctx?.setImageLoaded(true)
      ctx?.setImageError(false)
      onLoad?.(e)
    }

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      ctx?.setImageLoaded(false)
      ctx?.setImageError(true)
      onError?.(e)
    }

    if (ctx?.imageError) return null

    return (
      <img
        ref={ref}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn('aspect-square h-full w-full object-cover', className)}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = 'AvatarImage'

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useContext(AvatarContext)

    if (ctx && ctx.imageLoaded && !ctx.imageError) return null

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center bg-muted text-foreground font-semibold uppercase tracking-tight select-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AvatarFallback.displayName = 'AvatarFallback'

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      size = 'md',
      shape = 'circle',
      children,
      ...props
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(!src)

    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    }

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-xl',
    }

    const contextValue = {
      imageLoaded,
      setImageLoaded,
      imageError,
      setImageError,
    }

    if (children) {
      return (
        <AvatarContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(
              'relative inline-flex shrink-0 overflow-hidden font-semibold select-none border border-border/60',
              sizeClasses[size],
              shapeClasses[shape],
              className
            )}
            {...props}
          >
            {children}
          </div>
        </AvatarContext.Provider>
      )
    }

    return (
      <AvatarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'relative inline-flex shrink-0 overflow-hidden font-semibold select-none border border-border/60',
            sizeClasses[size],
            shapeClasses[shape],
            className
          )}
          {...props}
        >
          {src && <AvatarImage src={src} alt={alt || 'Avatar'} />}
          <AvatarFallback>
            {fallback || (alt ? alt.slice(0, 2).toUpperCase() : 'U')}
          </AvatarFallback>
        </div>
      </AvatarContext.Provider>
    )
  }
)
Avatar.displayName = 'Avatar'

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  className,
  max,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children)
  const displayCount = max ? Math.min(childrenArray.length, max) : childrenArray.length
  const hiddenCount = max ? Math.max(0, childrenArray.length - max) : 0

  return (
    <div className={cn('flex -space-x-2.5 items-center', className)} {...props}>
      {childrenArray.slice(0, displayCount).map((child, index) => (
        <div key={index} className="ring-2 ring-background rounded-full shrink-0">
          {child}
        </div>
      ))}
      {hiddenCount > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground ring-2 ring-background shrink-0">
          +{hiddenCount}
        </div>
      )}
    </div>
  )
}
AvatarGroup.displayName = 'AvatarGroup'

export default Avatar
