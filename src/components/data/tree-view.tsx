"use client"

import * as React from "react"
import { ChevronRight, Folder, FolderOpen, FileText } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../lib/use-controllable-state"

export interface TreeNode {
  id: string
  label: string
  icon?: any
  children?: TreeNode[]
  disabled?: boolean
  [key: string]: any
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: TreeNode[]
  selectedId?: string
  defaultSelectedId?: string
  onSelect?: (node: TreeNode) => void
  expandedIds?: string[]
  defaultExpandedIds?: string[]
  onToggleExpand?: (id: string, expanded: boolean) => void
}

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      data,
      selectedId: controlledSelectedId,
      defaultSelectedId,
      onSelect,
      expandedIds: controlledExpandedIds,
      defaultExpandedIds = [],
      onToggleExpand,
      ...props
    },
    ref
  ) => {
    const [selectedId, setSelectedId] = useControllableState<string | undefined>({
      prop: controlledSelectedId,
      defaultProp: defaultSelectedId,
    })

    const [expanded, setExpanded] = useControllableState<string[]>({
      prop: controlledExpandedIds,
      defaultProp: defaultExpandedIds,
    })

    const isExpanded = (id: string) => (expanded ?? []).includes(id)

    const toggleExpand = (id: string) => {
      const current = expanded ?? []
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      setExpanded(next)
      onToggleExpand?.(id, !current.includes(id))
    }

    const handleSelect = (node: TreeNode) => {
      if (node.disabled) return
      setSelectedId(node.id)
      onSelect?.(node)
    }

    const renderNode = (node: TreeNode, depth = 0): React.ReactNode => {
      const hasChildren = Boolean(node.children && node.children.length > 0)
      const expandedNode = isExpanded(node.id)
      const selected = selectedId === node.id

      const defaultIcon = hasChildren ? (
        expandedNode ? (
          <FolderOpen className="h-4 w-4 text-foreground shrink-0" />
        ) : (
          <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
        )
      ) : (
        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
      )

      return (
        <div key={node.id} role="none" className="flex flex-col">
          <div
            role="treeitem"
            aria-expanded={hasChildren ? expandedNode : undefined}
            aria-selected={selected}
            aria-disabled={node.disabled}
            tabIndex={node.disabled ? -1 : selected ? 0 : -1}
            onClick={() => {
              if (hasChildren) {
                toggleExpand(node.id)
              }
              handleSelect(node)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                if (hasChildren) toggleExpand(node.id)
                handleSelect(node)
              } else if (e.key === "ArrowRight" && hasChildren && !expandedNode) {
                e.preventDefault()
                toggleExpand(node.id)
              } else if (e.key === "ArrowLeft" && hasChildren && expandedNode) {
                e.preventDefault()
                toggleExpand(node.id)
              }
            }}
            style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
            className={cn(
              "flex items-center gap-1.5 py-1.5 pr-2 rounded-md text-xs font-medium cursor-pointer select-none transition-colors outline-none",
              selected
                ? "bg-accent text-accent-foreground font-semibold"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
              node.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className="flex h-4 w-4 items-center justify-center shrink-0 cursor-pointer"
              onClick={(e) => {
                if (hasChildren) {
                  e.stopPropagation()
                  toggleExpand(node.id)
                }
              }}
            >
              {hasChildren ? (
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground transition-transform duration-150",
                    expandedNode && "rotate-90"
                  )}
                />
              ) : (
                <span className="w-3.5" />
              )}
            </div>

            {node.icon !== undefined ? node.icon : defaultIcon}
            <span className="truncate">{node.label}</span>
          </div>

          {hasChildren && expandedNode && (
            <div role="group" className="flex flex-col">
              {node.children!.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="tree"
        aria-label="Hierarchy tree"
        className={cn("flex flex-col space-y-0.5", className)}
        {...props}
      >
        {data.map((node) => renderNode(node, 0))}
      </div>
    )
  }
)

TreeView.displayName = "TreeView"
