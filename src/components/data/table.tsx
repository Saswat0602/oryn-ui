"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Plus, Trash2 } from "../../icons"

export interface TableColumn<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string | number
  align?: "left" | "center" | "right"
  className?: string
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data?: T[]
  columns?: TableColumn<T>[]
  selectedRows?: string[]
  onSelectionChange?: (selectedRows: string[]) => void
  pagination?: {
    current: number
    total: number
    pageSize: number
    onChange: (page: number) => void
  }
  sortable?: boolean
  selectable?: boolean
  hoverable?: boolean
  striped?: boolean
  bordered?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outlined" | "elevated"
  color?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  headerColor?: string
  borderRadius?: string | number
  shadow?: "none" | "sm" | "md" | "lg"
  fullWidth?: boolean
  emptyMessage?: string
  loading?: boolean
  onRowClick?: (row: T, index: number) => void
  rowKey?: keyof T | ((row: T, index: number) => string)
  editable?: boolean
  onAddRow?: () => void
  onAddColumn?: () => void
  onEditCell?: (row: T, column: keyof T, value: any) => void
  onDeleteRow?: (row: T, index: number) => void
  showAddRowButton?: boolean
  showAddColumnButton?: boolean
  showDeleteRowButton?: boolean
  addRowButtonText?: string
  addColumnButtonText?: string
  deleteRowButtonText?: string
}

function Table<T extends Record<string, unknown>>({
  data,
  columns,
  selectedRows = [],
  onSelectionChange,
  pagination,
  sortable = true,
  selectable = false,
  hoverable = true,
  striped = false,
  bordered = false,
  size = "md",
  variant = "default",
  color,
  backgroundColor,
  borderColor,
  textColor,
  headerColor,
  borderRadius,
  shadow = "none",
  fullWidth = true,
  emptyMessage = "No data available",
  loading = false,
  onRowClick,
  rowKey = "id",
  editable = false,
  onAddRow,
  onAddColumn,
  onEditCell,
  onDeleteRow,
  showAddRowButton = false,
  showAddColumnButton = false,
  showDeleteRowButton = false,
  addRowButtonText = "Add Row",
  addColumnButtonText = "Add Column",
  deleteRowButtonText = "Delete",
  className,
  style,
  children,
  ...props
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return
    if (checked) {
      const allRowKeys = data ? data.map((row, index) => getRowKey(row, index)) : []
      onSelectionChange(allRowKeys)
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectRow = (rowKey: string, checked: boolean) => {
    if (!onSelectionChange) return
    if (checked) {
      onSelectionChange([...selectedRows, rowKey])
    } else {
      onSelectionChange(selectedRows.filter(key => key !== rowKey))
    }
  }

  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === "function") {
      return rowKey(row, index)
    }
    return String(row[rowKey] || index)
  }

  // If used as standard declarative table wrapper (children passed without columns/data)
  // This early return must come AFTER all hooks to satisfy Rules of Hooks
  if (!columns || !data) {
    return (
      <div className={cn("relative w-full overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800", className)}>
        <table className="w-full caption-bottom text-sm" style={style} {...props}>
          {children}
        </table>
      </div>
    )
  }



  const sizeClasses = {
    sm: "py-2 px-3 text-xs",
    md: "py-3 px-4 text-sm",
    lg: "py-4 px-5 text-base"
  }

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortable) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection, sortable])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-7 w-7 border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div 
      className={cn(
        "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs",
        fullWidth && "w-full",
        className
      )}
      style={{
        borderRadius,
        ...(borderColor ? { borderColor } : {}),
        ...style
      }}
      {...props}
    >
      {/* Table Actions Toolbar */}
      {(showAddRowButton || showAddColumnButton) && (
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50/50 dark:bg-zinc-900/50">
          {showAddRowButton && (
            <button
              onClick={onAddRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-xs font-medium cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{addRowButtonText}</span>
            </button>
          )}
          {showAddColumnButton && (
            <button
              onClick={onAddColumn}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-xs font-medium cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{addColumnButtonText}</span>
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/75 dark:bg-zinc-900/75">
              {selectable && (
                <th className={cn("w-12 text-left font-medium py-3 px-4", sizeClasses[size])}>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-primary focus:ring-primary/40 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "text-left font-semibold text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider py-3 px-4 select-none",
                    sizeClasses[size],
                    column.sortable && sortable && "cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors",
                    column.className
                  )}
                  style={{
                    width: column.width,
                    textAlign: column.align || "left"
                  }}
                  onClick={() => column.sortable && sortable && handleSort(column.key)}
                >
                  <div className="inline-flex items-center gap-1.5">
                    <span>{column.header}</span>
                    {column.sortable && sortable && (
                      <span className="text-muted-foreground/70">
                        {sortColumn === column.key ? (
                          sortDirection === "asc" ? <ArrowUp className="h-3.5 w-3.5 text-primary" /> : <ArrowDown className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-40 hover:opacity-100" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {showDeleteRowButton && (
                <th className={cn("text-left font-medium py-3 px-4", sizeClasses[size])}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
            {sortedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0) + (showDeleteRowButton ? 1 : 0)}
                  className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-xs"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => {
                const currentKey = getRowKey(row, index)
                const isSelected = selectedRows.includes(currentKey)

                return (
                  <tr
                    key={currentKey}
                    className={cn(
                      "transition-colors duration-150",
                      hoverable && "hover:bg-zinc-500/5",
                      striped && index % 2 === 1 && "bg-zinc-500/2",
                      isSelected && "bg-primary/5",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {selectable && (
                      <td className={cn("py-3 px-4", sizeClasses[size])} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(currentKey, e.target.checked)}
                          className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-primary focus:ring-primary/40 cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn(
                          "py-3 px-4 text-zinc-800 dark:text-zinc-200",
                          sizeClasses[size],
                          column.className
                        )}
                        style={{ textAlign: column.align || "left" }}
                      >
                        {column.render 
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? "")}
                      </td>
                    ))}
                    {showDeleteRowButton && (
                      <td className={cn("py-3 px-4", sizeClasses[size])} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onDeleteRow?.(row, index)}
                          className="p-1 rounded text-red-500 hover:bg-red-500/10 transition-colors"
                          title={deleteRowButtonText}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs text-muted-foreground">
          <div>
            Showing <span className="font-medium text-foreground">{((pagination.current - 1) * pagination.pageSize) + 1}</span> to{" "}
            <span className="font-medium text-foreground">{Math.min(pagination.current * pagination.pageSize, pagination.total)}</span> of{" "}
            <span className="font-medium text-foreground">{pagination.total}</span> entries
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => pagination.onChange(pagination.current - 1)}
              disabled={pagination.current === 1}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>
            <span className="px-2 font-mono text-[11px]">
              {pagination.current} / {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <button
              onClick={() => pagination.onChange(pagination.current + 1)}
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

Table.displayName = "Table"

// Declarative composable subcomponents
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/75 dark:bg-zinc-900/75", className)} {...props} />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0 divide-y divide-zinc-200/60 dark:divide-zinc-800/60", className)} {...props} />
  )
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 font-medium", className)} {...props} />
  )
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors hover:bg-zinc-500/5 data-[state=selected]:bg-muted", className)} {...props} />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn("h-10 px-4 text-left align-middle font-semibold text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider [&:has([role=checkbox])]:pr-0", className)} {...props} />
  )
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle text-sm text-zinc-800 dark:text-zinc-200 [&:has([role=checkbox])]:pr-0", className)} {...props} />
  )
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-xs text-zinc-500 dark:text-zinc-400", className)} {...props} />
  )
)
TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
