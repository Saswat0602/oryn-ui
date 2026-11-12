"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "./table"
import { Checkbox } from "../core/checkbox"
import { Skeleton } from "../core/skeleton"
import { useVirtualizer } from "../../hooks/use-virtualizer"
import { 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  SlidersHorizontal
} from "../../icons"

export interface DataTableColumn<T> {
  key: keyof T | string
  header: string
  cell?: (item: T, index: number) => React.ReactNode
  sortable?: boolean
  sortFn?: (a: T, b: T) => number
  width?: string | number
  className?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  className?: string
  sortable?: boolean
  searchable?: boolean
  selectable?: boolean
  selectedRows?: (string | number)[]
  onSelectionChange?: (selectedRows: (string | number)[]) => void
  rowKey?: keyof T | ((item: T, index: number) => string | number)
  pagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  striped?: boolean
  hoverable?: boolean
  virtualized?: boolean
  rowHeight?: number
  loading?: boolean
  emptyMessage?: string
  emptyState?: React.ReactNode
  onRowClick?: (item: T) => void
  renderBulkActions?: (selectedRows: (string | number)[]) => React.ReactNode
}

export interface DataTableHeaderProps<T> {
  columns: DataTableColumn<T>[]
  sortColumn?: keyof T | string
  sortDirection?: "asc" | "desc"
  onSort?: (column: keyof T | string) => void
  sortable?: boolean
  selectable?: boolean
  isAllSelected?: boolean
  isPartiallySelected?: boolean
  onToggleSelectAll?: () => void
}

export interface DataTableRowProps<T> {
  item: T
  index: number
  columns: DataTableColumn<T>[]
  selectable?: boolean
  isSelected?: boolean
  onToggleSelect?: () => void
  onClick?: () => void
}

export interface DataTablePaginationProps {
  currentPage: number
  totalPages: number
  totalRecords: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data = [],
  columns = [],
  className,
  sortable = true,
  searchable = true,
  selectable = false,
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  rowKey = "id" as keyof T,
  pagination = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  striped = false,
  hoverable = true,
  virtualized = false,
  rowHeight = 48,
  loading = false,
  emptyMessage = "No matching records found.",
  emptyState,
  onRowClick,
  renderBulkActions,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<keyof T | string | undefined>(undefined)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(initialPageSize)
  const [internalSelectedRows, setInternalSelectedRows] = React.useState<(string | number)[]>([])

  const selectedRows = controlledSelectedRows ?? internalSelectedRows

  const getRowId = React.useCallback(
    (item: T, index: number): string | number => {
      if (typeof rowKey === "function") {
        return rowKey(item, index)
      }
      return item[rowKey] ?? index
    },
    [rowKey]
  )

  const handleSelectionChange = React.useCallback(
    (newSelected: (string | number)[]) => {
      if (controlledSelectedRows === undefined) {
        setInternalSelectedRows(newSelected)
      }
      onSelectionChange?.(newSelected)
    },
    [controlledSelectedRows, onSelectionChange]
  )

  // 1. Filtering
  const filteredData = React.useMemo(() => {
    if (!searchable || !searchTerm.trim()) {
      return data
    }
    const lower = searchTerm.toLowerCase().trim()
    return data.filter((item) =>
      Object.values(item).some((val) => {
        if (val === null || val === undefined) return false
        return String(val).toLowerCase().includes(lower)
      })
    )
  }, [data, searchable, searchTerm])

  // 2. Sorting
  const sortedData = React.useMemo(() => {
    if (!sortable || !sortColumn) return filteredData

    const colDef = columns.find((c) => c.key === sortColumn)

    return [...filteredData].sort((a, b) => {
      if (colDef?.sortFn) {
        const res = colDef.sortFn(a, b)
        return sortDirection === "asc" ? res : -res
      }

      const aVal = a[sortColumn as keyof T]
      const bVal = b[sortColumn as keyof T]

      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal
      }

      const aStr = String(aVal).toLowerCase()
      const bStr = String(bVal).toLowerCase()
      if (aStr < bStr) return sortDirection === "asc" ? -1 : 1
      if (aStr > bStr) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortable, sortColumn, sortDirection, columns])

  // 3. Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize))

  const paginatedData = React.useMemo(() => {
    if (!pagination || virtualized) return sortedData
    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, pagination, virtualized, currentPage, pageSize])

  // Virtualizer setup
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null)
  const virtualizer = useVirtualizer({
    count: sortedData.length,
    itemHeight: rowHeight,
    overscan: 5,
    getScrollElement: () => scrollContainerRef.current,
  })

  // Selection handlers
  const currentItemIds = React.useMemo(
    () => paginatedData.map((item, idx) => getRowId(item, idx)),
    [paginatedData, getRowId]
  )

  const isAllSelected =
    currentItemIds.length > 0 && currentItemIds.every((id) => selectedRows.includes(id))

  const isPartiallySelected =
    currentItemIds.some((id) => selectedRows.includes(id)) && !isAllSelected

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      handleSelectionChange(selectedRows.filter((id) => !currentItemIds.includes(id)))
    } else {
      const combined = Array.from(new Set([...selectedRows, ...currentItemIds]))
      handleSelectionChange(combined)
    }
  }

  const handleToggleRow = (id: string | number) => {
    if (selectedRows.includes(id)) {
      handleSelectionChange(selectedRows.filter((r) => r !== id))
    } else {
      handleSelectionChange([...selectedRows, id])
    }
  }

  const handleSort = (column: keyof T | string) => {
    if (!sortable) return
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else {
        setSortColumn(undefined)
        setSortDirection("asc")
      }
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Table Toolbar */}
      {(searchable || (selectable && selectedRows.length > 0)) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {searchable && (
            <div className="relative w-full max-w-xs sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search table..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all shadow-2xs"
              />
            </div>
          )}

          {selectable && selectedRows.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto">
              <span className="font-medium text-foreground">
                {selectedRows.length} selected
              </span>
              {renderBulkActions?.(selectedRows)}
            </div>
          )}
        </div>
      )}

      {/* Main Table Container */}
      <div
        ref={virtualized ? scrollContainerRef : undefined}
        className={cn(
          "rounded-xl border border-border bg-card text-card-foreground shadow-2xs overflow-x-auto w-full",
          virtualized ? "max-h-[480px] overflow-auto relative" : ""
        )}
      >
        <Table>
          <DataTableHeader
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            sortable={sortable}
            selectable={selectable}
            isAllSelected={isAllSelected}
            isPartiallySelected={isPartiallySelected}
            onToggleSelectAll={handleToggleSelectAll}
          />

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, rIdx) => (
                <TableRow key={`skeleton-${rIdx}`}>
                  {selectable && (
                    <TableCell className="w-10">
                      <Skeleton className="h-4 w-4 rounded" />
                    </TableCell>
                  )}
                  {columns.map((col, cIdx) => (
                    <TableCell key={`skeleton-col-${cIdx}`}>
                      <Skeleton className="h-4 w-full max-w-[120px] rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-32 text-center"
                >
                  {emptyState || (
                    <div className="flex flex-col items-center justify-center space-y-1 text-muted-foreground py-6">
                      <SlidersHorizontal className="h-5 w-5 opacity-40 mb-1" />
                      <p className="text-xs font-medium">{emptyMessage}</p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : virtualized ? (
              <>
                <tr style={{ height: `${virtualizer.virtualItems[0]?.start ?? 0}px` }} />
                {virtualizer.virtualItems.map((virtualRow) => {
                  const item = sortedData[virtualRow.index]
                  const id = getRowId(item, virtualRow.index)
                  const isSelected = selectedRows.includes(id)
                  return (
                    <DataTableRow
                      key={id}
                      item={item}
                      index={virtualRow.index}
                      columns={columns}
                      selectable={selectable}
                      isSelected={isSelected}
                      onToggleSelect={() => handleToggleRow(id)}
                      onClick={onRowClick ? () => onRowClick(item) : undefined}
                    />
                  )
                })}
                <tr
                  style={{
                    height: `${
                      virtualizer.totalSize -
                      (virtualizer.virtualItems[virtualizer.virtualItems.length - 1]?.start ?? 0) -
                      rowHeight
                    }px`,
                  }}
                />
              </>
            ) : (
              paginatedData.map((item, index) => {
                const id = getRowId(item, index)
                const isSelected = selectedRows.includes(id)
                return (
                  <DataTableRow
                    key={id}
                    item={item}
                    index={index}
                    columns={columns}
                    selectable={selectable}
                    isSelected={isSelected}
                    onToggleSelect={() => handleToggleRow(id)}
                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                  />
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {pagination && !virtualized && sortedData.length > 0 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={sortedData.length}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize)
            setCurrentPage(1)
          }}
        />
      )}
    </div>
  )
}

export const DataTableHeader = <T extends Record<string, any>>({
  columns,
  sortColumn,
  sortDirection,
  onSort,
  sortable = true,
  selectable = false,
  isAllSelected = false,
  isPartiallySelected = false,
  onToggleSelectAll,
}: DataTableHeaderProps<T>) => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        {selectable && (
          <TableHead className="w-10 px-4">
            <Checkbox
              checked={isAllSelected}
              aria-label="Select all rows"
              onChange={onToggleSelectAll}
              className={cn(isPartiallySelected && "opacity-70")}
            />
          </TableHead>
        )}
        {columns.map((column) => {
          const isSorted = sortColumn === column.key
          const canSort = sortable && column.sortable !== false

          return (
            <TableHead
              key={String(column.key)}
              style={column.width ? { width: column.width } : undefined}
              className={cn("text-xs font-semibold select-none", column.className)}
            >
              {canSort ? (
                <button
                  type="button"
                  onClick={() => onSort?.(column.key)}
                  className="group inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                >
                  <span>{column.header}</span>
                  {isSorted ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="h-3 w-3 text-foreground" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-foreground" />
                    )
                  ) : (
                    <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  )}
                </button>
              ) : (
                <span>{column.header}</span>
              )}
            </TableHead>
          )
        })}
      </TableRow>
    </TableHeader>
  )
}

export const DataTableRow = <T extends Record<string, any>>({
  item,
  index,
  columns,
  selectable = false,
  isSelected = false,
  onToggleSelect,
  onClick,
}: DataTableRowProps<T>) => {
  return (
    <TableRow
      data-state={isSelected ? "selected" : undefined}
      className={cn(
        "cursor-default transition-colors",
        isSelected && "bg-muted/60",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {selectable && (
        <TableCell
          className="w-10 px-4"
          onClick={(e) => {
            e.stopPropagation()
            onToggleSelect?.()
          }}
        >
          <Checkbox
            checked={isSelected}
            aria-label={`Select row ${index + 1}`}
            onChange={() => onToggleSelect?.()}
          />
        </TableCell>
      )}
      {columns.map((column) => {
        const val = item[column.key as keyof T]
        return (
          <TableCell key={String(column.key)} className={cn("text-xs", column.className)}>
            {column.cell ? column.cell(item, index) : String(val ?? "")}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  className,
}) => {
  const startRecord = (currentPage - 1) * pageSize + 1
  const endRecord = Math.min(currentPage * pageSize, totalRecords)

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground px-1",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span>
          Showing <span className="font-medium text-foreground">{startRecord}</span> to{" "}
          <span className="font-medium text-foreground">{endRecord}</span> of{" "}
          <span className="font-medium text-foreground">{totalRecords}</span> records
        </span>
        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-3">
            <span className="text-muted-foreground">Rows:</span>
            <select
              aria-label="Rows per page"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-0.5 rounded border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-1 ml-auto">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          aria-label="First page"
          className="p-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="p-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <span className="px-2.5 py-0.5 text-xs font-mono font-medium text-foreground">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="p-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          aria-label="Last page"
          className="p-1 rounded-md border border-border hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
