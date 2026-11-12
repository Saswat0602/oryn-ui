"use client"

import React, { createContext, useContext, forwardRef } from 'react'
import { ChevronDown } from '../../icons'
import { cn } from '../../lib/utils'
import { useControllableState } from '../../lib/use-controllable-state'

export interface AccordionItemData {
  id?: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

interface AccordionContextValue {
  isOpen: (value: string) => boolean
  toggle: (value: string) => void
  disabled?: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordionContext() {
  const ctx = useContext(AccordionContext)
  if (!ctx) {
    throw new Error('Accordion compound components must be used within an Accordion')
  }
  return ctx
}

const AccordionItemContext = createContext<{ value: string; disabled?: boolean } | null>(null)

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value, disabled }}>
        <div
          ref={ref}
          data-state={disabled ? 'disabled' : undefined}
          className={cn('border-b border-border last:border-b-0', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconPosition?: 'left' | 'right'
  customIcon?: any
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, iconPosition = 'right', customIcon: CustomIcon, onClick, ...props }, ref) => {
    const { isOpen, toggle } = useAccordionContext()
    const itemCtx = useContext(AccordionItemContext)
    const val = itemCtx?.value || ''
    const open = isOpen(val)
    const disabled = props.disabled || itemCtx?.disabled

    const IconComponent = CustomIcon || ChevronDown

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented && !disabled) {
        toggle(val)
      }
    }

    return (
      <div className="flex">
        <button
          ref={ref}
          type="button"
          aria-expanded={open}
          disabled={disabled}
          data-state={open ? 'open' : 'closed'}
          onClick={handleClick}
          className={cn(
            'flex flex-1 items-center justify-between py-4 px-5 text-sm font-medium transition-all text-foreground hover:underline disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
            iconPosition === 'left' && 'flex-row-reverse justify-end gap-3',
            className
          )}
          {...props}
        >
          <span className="flex-1 text-left">{children}</span>
          <IconComponent
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground',
              open && 'rotate-180'
            )}
          />
        </button>
      </div>
    )
  }
)
AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useAccordionContext()
    const itemCtx = useContext(AccordionItemContext)
    const val = itemCtx?.value || ''
    const open = isOpen(val)

    return (
      <div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        )}
      >
        <div className="overflow-hidden">
          <div className={cn('pb-4 pt-0 px-5 text-sm text-muted-foreground', className)} {...props}>
            {children}
          </div>
        </div>
      </div>
    )
  }
)
AccordionContent.displayName = 'AccordionContent'

export interface AccordionProps {
  items?: AccordionItemData[]
  allowMultiple?: boolean
  defaultOpen?: number[]
  className?: string
  itemClassName?: string
  headerClassName?: string
  contentClassName?: string
  iconPosition?: 'left' | 'right'
  customIcon?: any
  animated?: boolean
  type?: 'single' | 'multiple'
  collapsible?: boolean
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: any) => void
  children?: React.ReactNode
  [key: string]: any
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      allowMultiple = false,
      defaultOpen = [],
      className,
      itemClassName,
      headerClassName,
      contentClassName,
      iconPosition = 'right',
      customIcon,
      animated = true,
      type = 'single',
      collapsible = true,
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      // Filter out non-DOM props to prevent React warnings
      analyticsId,
      analyticsEvent,
      analyticsData,
      ariaLabel,
      dataTestId,
      onAnalytics,
      variant,
      size,
      searchable,
      searchPlaceholder,
      onSearch,
      onToggle,
      keyboardNavigation,
      ...props
    },
    ref
  ) => {
    const isMultiple = type === 'multiple' || allowMultiple

    // Derive initial default value
    const computeInitialDefault = () => {
      if (defaultValue !== undefined) return defaultValue
      if (items && defaultOpen.length > 0) {
        if (isMultiple) {
          return defaultOpen.map((idx: number) => items[idx]?.id || `item-${idx}`)
        }
        return items[defaultOpen[0]]?.id || `item-${defaultOpen[0]}`
      }
      return isMultiple ? [] : ''
    }

    const [currentVal, setCurrentVal] = useControllableState<any>({
      prop: controlledValue,
      defaultProp: computeInitialDefault(),
      onChange: onValueChange,
    })

    const isOpen = (itemVal: string) => {
      if (isMultiple) {
        return Array.isArray(currentVal) && currentVal.includes(itemVal)
      }
      return currentVal === itemVal
    }

    const toggle = (itemVal: string) => {
      if (isMultiple) {
        const arr = Array.isArray(currentVal) ? [...currentVal] : []
        const idx = arr.indexOf(itemVal)
        if (idx >= 0) {
          arr.splice(idx, 1)
        } else {
          arr.push(itemVal)
        }
        setCurrentVal(arr)
      } else {
        if (currentVal === itemVal) {
          if (collapsible) setCurrentVal('')
        } else {
          setCurrentVal(itemVal)
        }
      }
    }

    const content = items ? (
      items.map((item: AccordionItemData, idx: number) => {
        const val = item.id || `item-${idx}`
        return (
          <AccordionItem key={val} value={val} disabled={item.disabled} className={itemClassName}>
            <AccordionTrigger
              iconPosition={iconPosition}
              customIcon={customIcon}
              className={headerClassName}
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent className={contentClassName}>{item.content}</AccordionContent>
          </AccordionItem>
        )
      })
    ) : (
      children
    )

    return (
      <AccordionContext.Provider value={{ isOpen, toggle }}>
        <div
          ref={ref}
          aria-label={ariaLabel || props['aria-label']}
          data-testid={dataTestId || props['data-testid']}
          className={cn(
            'rounded-xl border border-border bg-card text-card-foreground overflow-hidden divide-y divide-border shadow-xs',
            className
          )}
          {...props}
        >
          {content}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

export default Accordion