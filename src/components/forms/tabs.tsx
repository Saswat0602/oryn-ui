"use client"

import React, { createContext, useContext, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { useControllableState } from '../../lib/use-controllable-state'

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  badge?: string | number
}

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
  orientation: 'horizontal' | 'vertical'
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('Tabs compound components must be used within a Tabs component')
  }
  return ctx
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, onKeyDown, ...props }, ref) => {
    const { orientation } = useTabsContext()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented) return

      const target = e.target as HTMLElement
      if (!target || target.getAttribute('role') !== 'tab') return

      const tabList = e.currentTarget
      const tabs = Array.from(tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'))
      if (!tabs.length) return

      const currentIndex = tabs.indexOf(target as HTMLButtonElement)
      if (currentIndex === -1) return

      let nextIndex = currentIndex
      const isHorizontal = orientation === 'horizontal'

      if ((isHorizontal && e.key === 'ArrowRight') || (!isHorizontal && e.key === 'ArrowDown')) {
        e.preventDefault()
        nextIndex = (currentIndex + 1) % tabs.length
      } else if ((isHorizontal && e.key === 'ArrowLeft') || (!isHorizontal && e.key === 'ArrowUp')) {
        e.preventDefault()
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIndex = tabs.length - 1
      }

      if (nextIndex !== currentIndex) {
        const nextTab = tabs[nextIndex]
        nextTab.focus()
        nextTab.click()
      }
    }

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
          className
        )}
        {...props}
      />
    )
  }
)
TabsList.displayName = 'TabsList'

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value: triggerValue, disabled = false, id, onClick, onKeyDown, ...props }, ref) => {
    const { value, setValue, baseId } = useTabsContext()
    const isActive = value === triggerValue
    const tabId = id || `${baseId}-tab-${triggerValue}`
    const panelId = `${baseId}-panel-${triggerValue}`

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented && !disabled) {
        setValue(triggerValue)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e)
      if ((e.key === ' ' || e.key === 'Enter') && !e.defaultPrevented && !disabled) {
        e.preventDefault()
        setValue(triggerValue)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={tabId}
        aria-controls={props['aria-controls'] || panelId}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        data-state={isActive ? 'active' : 'inactive'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs',
          isActive && 'bg-background text-foreground shadow-xs font-semibold',
          className
        )}
        {...props}
      />
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  forceMount?: boolean
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value: contentValue, forceMount, id, children, ...props }, ref) => {
    const { value, baseId } = useTabsContext()
    const isActive = value === contentValue
    const panelId = id || `${baseId}-panel-${contentValue}`
    const tabId = `${baseId}-tab-${contentValue}`

    if (!isActive && !forceMount) {
      return (
        <div
          ref={ref}
          role="tabpanel"
          id={panelId}
          aria-labelledby={props['aria-labelledby'] || tabId}
          hidden
          tabIndex={0}
          data-state="inactive"
          className={cn('hidden', className)}
          {...props}
        />
      )
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={props['aria-labelledby'] || tabId}
        tabIndex={0}
        hidden={!isActive}
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in-50 duration-200',
          !isActive && 'hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = 'TabsContent'

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items?: TabItem[]
  variant?: 'default' | 'pills' | 'underline' | 'cards' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
  defaultActiveTab?: string
  defaultValue?: string
  value?: string
  animation?: 'fade' | 'slide' | 'scale' | 'none'
  fullWidth?: boolean
  onChange?: (activeTab: string) => void
  onValueChange?: (activeTab: string) => void
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      variant = 'default',
      size = 'md',
      orientation = 'horizontal',
      defaultActiveTab,
      defaultValue,
      value: controlledValue,
      animation = 'fade',
      fullWidth = false,
      onChange,
      onValueChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const baseId = props.id || generatedId
    const initialDefault = defaultValue || defaultActiveTab || items?.[0]?.id || ''

    const [value, setValue] = useControllableState<string>({
      prop: controlledValue,
      defaultProp: initialDefault,
      onChange: (val) => {
        onValueChange?.(val)
        onChange?.(val)
      },
    })

    if (!items) {
      return (
        <TabsContext.Provider value={{ value, setValue, orientation, baseId }}>
          <div ref={ref} className={cn('w-full', className)} {...props}>
            {children}
          </div>
        </TabsContext.Provider>
      )
    }

    const sizeClasses = {
      sm: 'text-xs px-2.5 py-1',
      md: 'text-sm px-3.5 py-1.5',
      lg: 'text-base px-4 py-2',
    }

    return (
      <TabsContext.Provider value={{ value, setValue, orientation, baseId }}>
        <div
          ref={ref}
          className={cn('w-full', orientation === 'vertical' && 'flex gap-4', className)}
          {...props}
        >
          <TabsList
            className={cn(
              'flex gap-1',
              orientation === 'vertical' ? 'flex-col shrink-0 h-auto' : 'flex-row items-center',
              variant === 'default' &&
                'rounded-xl bg-muted p-1 text-muted-foreground',
              variant === 'pills' && 'rounded-full bg-muted p-1',
              variant === 'underline' &&
                'border-b border-border gap-2 pb-px bg-transparent rounded-none h-auto',
              variant === 'cards' &&
                'rounded-xl border border-border bg-muted/40 p-1',
              variant === 'minimal' && 'gap-2 bg-transparent rounded-none h-auto',
              fullWidth && 'w-full'
            )}
          >
            {items.map((item) => {
              const isActive = value === item.id
              const triggerVariantClasses = {
                default: cn(
                  'rounded-lg font-medium transition-all text-muted-foreground hover:text-foreground',
                  isActive &&
                    'bg-background text-foreground shadow-xs'
                ),
                pills: cn(
                  'rounded-full font-medium transition-all text-muted-foreground hover:text-foreground',
                  isActive && 'bg-primary text-primary-foreground shadow-xs'
                ),
                underline: cn(
                  'border-b-2 border-transparent font-medium transition-all rounded-none text-muted-foreground hover:text-foreground',
                  isActive &&
                    'border-primary text-foreground'
                ),
                cards: cn(
                  'rounded-lg font-medium transition-all text-muted-foreground hover:text-foreground border border-transparent',
                  isActive &&
                    'border-border bg-background text-foreground shadow-xs'
                ),
                minimal: cn(
                  'rounded-lg font-medium transition-all text-muted-foreground hover:text-foreground',
                  isActive && 'text-foreground font-semibold'
                ),
              }[variant]

              return (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  disabled={item.disabled}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 whitespace-nowrap outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 transition-all',
                    sizeClasses[size],
                    triggerVariantClasses,
                    fullWidth && 'flex-1'
                  )}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1.5 rounded-full bg-secondary text-secondary-foreground px-2 py-0.5 text-[11px] font-medium">
                      {item.badge}
                    </span>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <div className={cn('mt-3 flex-1', orientation === 'vertical' && 'mt-0')}>
            {items.map((item) => (
              <TabsContent key={item.id} value={item.id}>
                {item.content}
              </TabsContent>
            ))}
          </div>
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = 'Tabs'

// Compound component pattern attachment
export type TabsComponent = typeof Tabs & {
  List: typeof TabsList
  Trigger: typeof TabsTrigger
  Content: typeof TabsContent
}

;(Tabs as any).List = TabsList
;(Tabs as any).Trigger = TabsTrigger
;(Tabs as any).Content = TabsContent

export default Tabs
