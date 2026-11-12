"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Search } from "../../icons"
import { Dialog, DialogContent, type DialogProps } from "../overlay/dialog"

interface CommandContextValue {
  listId: string
  activeItemId: string | null
  setActiveItemId: (id: string | null) => void
  commandRef: React.MutableRefObject<HTMLDivElement | null>
  listRef: React.MutableRefObject<HTMLDivElement | null>
  navigateItems: (direction: "next" | "prev" | "first" | "last") => void
  selectActiveItem: () => void
}

const CommandContext = React.createContext<CommandContextValue | null>(null)

export const useCommandContext = () => {
  const context = React.useContext(CommandContext)
  if (!context) {
    throw new Error("Command subcomponents must be rendered within a Command provider")
  }
  return context
}

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export interface CommandInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  heading?: string
  className?: string
}

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  className?: string
  value?: string
}

export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const BaseCommand = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ children, className, ...props }, ref) => {
    const listId = React.useId()
    const [activeItemId, setActiveItemId] = React.useState<string | null>(null)
    const commandRef = React.useRef<HTMLDivElement | null>(null)
    const listRef = React.useRef<HTMLDivElement | null>(null)

    const navigateItems = React.useCallback(
      (direction: "next" | "prev" | "first" | "last") => {
        if (!commandRef.current) return
        const items = Array.from(
          commandRef.current.querySelectorAll<HTMLElement>(
            '[role="option"]:not([aria-disabled="true"]):not([data-disabled])'
          )
        )
        if (!items.length) return

        const currentIdx = activeItemId ? items.findIndex((el) => el.id === activeItemId) : -1
        let nextIdx = 0

        if (direction === "first") {
          nextIdx = 0
        } else if (direction === "last") {
          nextIdx = items.length - 1
        } else if (direction === "next") {
          nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % items.length
        } else if (direction === "prev") {
          nextIdx = currentIdx === -1 ? items.length - 1 : (currentIdx - 1 + items.length) % items.length
        }

        const nextEl = items[nextIdx]
        if (nextEl) {
          setActiveItemId(nextEl.id)
          if (typeof nextEl.scrollIntoView === "function") {
            nextEl.scrollIntoView({ block: "nearest" })
          }
        }
      },
      [activeItemId]
    )

    const selectActiveItem = React.useCallback(() => {
      if (!activeItemId) return
      const activeEl = document.getElementById(activeItemId)
      activeEl?.click()
    }, [activeItemId])

    const contextValue = React.useMemo(
      () => ({
        listId,
        activeItemId,
        setActiveItemId,
        commandRef,
        listRef,
        navigateItems,
        selectActiveItem,
      }),
      [listId, activeItemId, navigateItems, selectActiveItem]
    )

    return (
      <CommandContext.Provider value={contextValue}>
        <div
          ref={(node) => {
            commandRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    )
  }
)
BaseCommand.displayName = "Command"

export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  (
    {
      placeholder = "Type a command or search...",
      value,
      onValueChange,
      className,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const { listId, activeItemId, navigateItems, selectActiveItem } = useCommandContext()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e)
      if (e.key === "ArrowDown") {
        e.preventDefault()
        navigateItems("next")
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        navigateItems("prev")
      } else if (e.key === "Enter") {
        e.preventDefault()
        selectActiveItem()
      }
    }

    return (
      <div
        role="combobox"
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-controls={listId}
        className="flex items-center border-b border-border/80 px-3.5"
      >
        <Search className="mr-2.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          ref={ref}
          type="text"
          role="searchbox"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-activedescendant={activeItemId || undefined}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
CommandInput.displayName = "CommandInput"

export const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, className, ...props }, ref) => {
    const { listId, listRef } = useCommandContext()

    return (
      <div
        ref={(node) => {
          listRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        id={listId}
        role="listbox"
        aria-label="Commands"
        className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-1", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CommandList.displayName = "CommandList"

export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("py-6 text-center text-xs text-muted-foreground", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CommandEmpty.displayName = "CommandEmpty"

export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ children, heading, className, ...props }, ref) => {
    const headingId = React.useId()

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={heading ? headingId : undefined}
        className={cn("overflow-hidden p-1 text-foreground", className)}
        {...props}
      >
        {heading && (
          <div
            id={headingId}
            className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {heading}
          </div>
        )}
        {children}
      </div>
    )
  }
)
CommandGroup.displayName = "CommandGroup"

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ id: customId, children, onSelect, disabled = false, className, onClick, ...props }, ref) => {
    const autoId = React.useId()
    const id = customId || autoId
    const { activeItemId, setActiveItemId } = useCommandContext()
    const isHighlighted = activeItemId === id

    const handleSelect = () => {
      if (!disabled && onSelect) {
        onSelect()
      }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        handleSelect()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleSelect()
      }
    }

    return (
      <div
        ref={ref}
        id={id}
        role="option"
        aria-selected={isHighlighted}
        aria-disabled={disabled}
        data-highlighted={isHighlighted ? "true" : undefined}
        tabIndex={-1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => {
          if (!disabled) setActiveItemId(id)
        }}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none transition-colors",
          isHighlighted
            ? "bg-accent text-accent-foreground"
            : "text-foreground hover:bg-accent hover:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CommandItem.displayName = "CommandItem"

export const CommandSeparator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("-mx-1 my-1 h-px bg-border/80", className)}
        {...props}
      />
    )
  }
)
CommandSeparator.displayName = "CommandSeparator"

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CommandShortcut: React.FC<CommandShortcutProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn("ml-auto text-[11px] font-medium tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export interface CommandDialogProps extends DialogProps {
  children: React.ReactNode
  className?: string
}

export const CommandDialog: React.FC<CommandDialogProps> = ({ children, className, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent showCloseButton={false} className="p-0 overflow-hidden max-w-lg">
        <BaseCommand className={cn("border-none shadow-none", className)}>
          {children}
        </BaseCommand>
      </DialogContent>
    </Dialog>
  )
}
CommandDialog.displayName = "CommandDialog"

export interface CommandComponent
  extends React.ForwardRefExoticComponent<CommandProps & React.RefAttributes<HTMLDivElement>> {
  Input: typeof CommandInput
  List: typeof CommandList
  Empty: typeof CommandEmpty
  Group: typeof CommandGroup
  Item: typeof CommandItem
  Separator: typeof CommandSeparator
  Shortcut: typeof CommandShortcut
  Dialog: typeof CommandDialog
}

export const Command = BaseCommand as CommandComponent
Command.Input = CommandInput
Command.List = CommandList
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Item = CommandItem
Command.Separator = CommandSeparator
Command.Shortcut = CommandShortcut
Command.Dialog = CommandDialog

export default Command


