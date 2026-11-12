import * as React from 'react'
import { cn } from '../../lib/utils'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from '../../icons'

export interface PaginationProps extends React.ComponentProps<'nav'> {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  showPageNumbers?: boolean
  showFirstLast?: boolean
  showPrevNext?: boolean
}

export interface PaginationItemProps extends React.ComponentProps<'li'> {
  active?: boolean
  disabled?: boolean
}

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1 list-none p-0 m-0', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

export interface PaginationLinkProps extends React.ComponentProps<'button'> {
  isActive?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size = 'icon', children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-40',
        size === 'icon' && 'h-9 min-w-9 px-2',
        size === 'default' && 'h-9 min-w-9 px-3',
        size === 'sm' && 'h-8 min-w-8 px-2.5 text-xs',
        size === 'lg' && 'h-10 min-w-10 px-4 text-sm',
        isActive
          ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border/60',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
PaginationLink.displayName = 'PaginationLink'

export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, active, disabled, onClick, children, ...props }, ref) => {
    if (typeof children === 'string' || typeof children === 'number') {
      return (
        <li ref={ref} className="list-none">
          <PaginationLink
            isActive={active}
            disabled={disabled}
            onClick={onClick as any}
            className={className}
            {...(props as any)}
          >
            {children}
          </PaginationLink>
        </li>
      )
    }

    return (
      <li ref={ref} className={cn('list-none', className)} onClick={onClick} {...props}>
        {children}
      </li>
    )
  }
)
PaginationItem.displayName = 'PaginationItem'

export const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, children, disabled, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    disabled={disabled}
    aria-label="Go to previous page"
    className={cn(
      'inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer border border-border/60 select-none disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>{children ?? 'Previous'}</span>
  </button>
))
PaginationPrevious.displayName = 'PaginationPrevious'

export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, children, disabled, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    disabled={disabled}
    aria-label="Go to next page"
    className={cn(
      'inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer border border-border/60 select-none disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      className
    )}
    {...props}
  >
    <span>{children ?? 'Next'}</span>
    <ChevronRight className="h-4 w-4" />
  </button>
))
PaginationNext.displayName = 'PaginationNext'

export const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center text-muted-foreground', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className,
  showPageNumbers = true,
  showFirstLast = true,
  showPrevNext = true,
  children,
  ...props
}) => {
  if (children) {
    return (
      <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
      >
        {children}
      </nav>
    )
  }

  const getVisiblePages = () => {
    const delta = 2
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page)
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('flex items-center space-x-1', className)}
      {...props}
    >
      <PaginationContent>
        {showFirstLast && (
          <PaginationItem>
            <PaginationLink
              size="icon"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}

        {showPrevNext && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
        )}

        {showPageNumbers &&
          getVisiblePages().map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page as number)}
                  aria-label={
                    page === currentPage
                      ? `Current page, page ${page}`
                      : `Go to page ${page}`
                  }
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

        {showPrevNext && (
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        )}

        {showFirstLast && (
          <PaginationItem>
            <PaginationLink
              size="icon"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </nav>
  )
}

export type PaginationComponent = React.FC<PaginationProps> & {
  Content: typeof PaginationContent
  Item: typeof PaginationItem
  Link: typeof PaginationLink
  Previous: typeof PaginationPrevious
  Next: typeof PaginationNext
  Ellipsis: typeof PaginationEllipsis
}

const CompoundPagination = Pagination as PaginationComponent
CompoundPagination.Content = PaginationContent
CompoundPagination.Item = PaginationItem
CompoundPagination.Link = PaginationLink
CompoundPagination.Previous = PaginationPrevious
CompoundPagination.Next = PaginationNext
CompoundPagination.Ellipsis = PaginationEllipsis

export default CompoundPagination
