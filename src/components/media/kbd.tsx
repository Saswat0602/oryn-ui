import * as React from "react"
import { cn, createVariants } from "../../lib/utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "outline" | "subtle"
  size?: "xs" | "sm" | "md"
  keys?: string[]
}

const kbdVariants = createVariants({
  base: "inline-flex items-center justify-center font-mono font-medium rounded select-none text-muted-foreground",
  variants: {
    variant: {
      default:
        "bg-muted text-muted-foreground border border-border shadow-2xs",
      outline:
        "border border-border bg-transparent shadow-none",
      subtle:
        "bg-muted/70 border border-transparent",
    },
    size: {
      xs: "min-h-[18px] min-w-[18px] px-1 text-[10px]",
      sm: "min-h-[22px] min-w-[22px] px-1.5 text-xs",
      md: "min-h-[26px] min-w-[26px] px-2 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
})

const KEY_SYMBOLS: Record<string, string> = {
  command: "⌘",
  cmd: "⌘",
  meta: "⌘",
  shift: "⇧",
  ctrl: "⌃",
  control: "⌃",
  alt: "⌥",
  option: "⌥",
  opt: "⌥",
  enter: "↵",
  return: "↵",
  backspace: "⌫",
  delete: "⌦",
  del: "⌦",
  escape: "⎋",
  esc: "⎋",
  tab: "⇥",
  capslock: "⇪",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘",
  space: "␣",
}

export function formatKeySymbol(key: string): string {
  const normalized = key.toLowerCase().trim()
  return KEY_SYMBOLS[normalized] ?? key
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, keys, children, ...props }, ref) => {
    if (keys && keys.length > 0) {
      return (
        <span className="inline-flex items-center gap-1">
          {keys.map((k, index) => (
            <kbd
              key={`${k}-${index}`}
              ref={index === 0 ? ref : undefined}
              className={cn(kbdVariants({ variant, size }), className)}
              {...props}
            >
              {formatKeySymbol(k)}
            </kbd>
          ))}
        </span>
      )
    }

    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, size }), className)}
        {...props}
      >
        {typeof children === "string" ? formatKeySymbol(children) : children}
      </kbd>
    )
  }
)

Kbd.displayName = "Kbd"

