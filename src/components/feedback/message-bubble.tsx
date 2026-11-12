"use client"

import * as React from "react"
import { Copy, Check, User, Bot } from "../../icons"
import { cn } from "../../lib/utils"
import { useClipboard } from "../../hooks/use-clipboard"

export type MessageRole = "user" | "assistant" | "system"

export interface MessageBubbleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  role?: MessageRole
  content?: React.ReactNode
  avatar?: React.ReactNode
  author?: React.ReactNode
  timestamp?: React.ReactNode
  actions?: React.ReactNode
  copyable?: boolean
  copyText?: string
  isStreaming?: boolean
}

export const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  (
    {
      className,
      role = "user",
      content,
      avatar,
      author,
      timestamp,
      actions,
      copyable = true,
      copyText,
      isStreaming = false,
      children,
      ...props
    },
    ref
  ) => {
    const { copy, copied } = useClipboard({ timeout: 2000 })
    const body = children ?? content

    const handleCopy = () => {
      if (copyText) {
        copy(copyText)
      } else if (typeof body === "string") {
        copy(body)
      }
    }

    const defaultAvatars = {
      user: (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-semibold shrink-0">
          <User className="h-4 w-4" />
        </div>
      ),
      assistant: (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">
          <Bot className="h-4 w-4" />
        </div>
      ),
      system: null,
    }

    const renderedAvatar = avatar !== undefined ? avatar : defaultAvatars[role]

    if (role === "system") {
      return (
        <div
          ref={ref}
          role="status"
          aria-label="System notification"
          className={cn(
            "flex w-full items-center justify-center py-2 px-4 text-xs font-medium text-muted-foreground italic",
            className
          )}
          {...props}
        >
          {children}
        </div>
      )
    }

    const isUser = role === "user"

    return (
      <div
        ref={ref}
        role="article"
        aria-label={`${role === "user" ? "User" : "Assistant"} message`}
        className={cn(
          "group relative flex w-full gap-3 py-3 px-1 transition-colors",
          isUser ? "flex-row-reverse" : "flex-row",
          className
        )}
        {...props}
      >
        {renderedAvatar}

        <div className={cn("flex flex-col flex-1 min-w-0", isUser && "items-end")}>
          {(author || timestamp) && (
            <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
              {author && <span className="font-semibold text-foreground">{author}</span>}
              {timestamp && <span>{timestamp}</span>}
            </div>
          )}

          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[85%] break-words",
              isUser
                ? "bg-primary text-primary-foreground rounded-br-xs shadow-xs"
                : "bg-muted text-foreground border border-border/60 rounded-bl-xs"
            )}
          >
            {body}
            {isStreaming && (
              <span className="inline-block ml-1 h-3.5 w-1.5 bg-current animate-pulse align-middle" />
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {copyable && (
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy message"
                className="flex items-center gap-1 rounded-md p-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            )}
            {actions}
          </div>
        </div>
      </div>
    )
  }
)

MessageBubble.displayName = "MessageBubble"
