"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  Badge 
} from '@oryn/ui'
import { 
  useClipboard, 
  useHotkeys, 
  useDebounce, 
  useLocalStorage 
} from '@oryn/ui/hooks'
import { 
  Copy, 
  Check, 
  Command, 
  Clock, 
  Database, 
  Sparkles, 
  Code2, 
  Layers, 
  Zap, 
  ArrowRight,
  Sliders
} from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'

export default function HooksPage() {
  // 1. useClipboard Interactive State
  const { copied, copy } = useClipboard({ timeout: 2000 })
  const [copyText, setCopyText] = useState('npm install @oryn/ui')

  // 2. useHotkeys Interactive State
  const [hotkeyCount, setHotkeyCount] = useState(0)
  const [lastHotkey, setLastHotkey] = useState<string | null>(null)
  
  useHotkeys('mod+k', () => {
    setHotkeyCount(c => c + 1)
    setLastHotkey('Cmd/Ctrl + K')
  })
  useHotkeys('mod+shift+l', () => {
    setHotkeyCount(c => c + 1)
    setLastHotkey('Cmd/Ctrl + Shift + L')
  })

  // 3. useDebounce Interactive State
  const [liveQuery, setLiveQuery] = useState('')
  const debouncedQuery = useDebounce(liveQuery, 400)

  // 4. useLocalStorage Interactive State
  const [savedTheme, setSavedTheme] = useLocalStorage<'system' | 'light' | 'dark'>('oryn-demo-theme', 'system')

  const hooksList = [
    {
      name: 'useClipboard',
      category: 'Utility',
      signature: 'useClipboard({ timeout?: number }): { copied: boolean, copy: (text: string) => Promise<boolean> }',
      description: 'Provides accessible copy-to-clipboard functionality with automatic success timeout indicator and fallback support.',
      code: `import { useClipboard } from '@oryn/ui/hooks'

export function CopySnippet() {
  const { copied, copy } = useClipboard({ timeout: 2000 })

  return (
    <button onClick={() => copy('npm install @oryn/ui')}>
      {copied ? 'Copied to clipboard!' : 'Copy installation command'}
    </button>
  )
}`
    },
    {
      name: 'useHotkeys',
      category: 'Keyboard & Accessibility',
      signature: 'useHotkeys(hotkey: string, callback: (e: KeyboardEvent) => void, options?: HotkeyOptions): void',
      description: 'Declarative keyboard shortcut listener supporting modifier combinations (mod, ctrl, meta, shift, alt) and input-prevention controls.',
      code: `import { useHotkeys } from '@oryn/ui/hooks'
import { useState } from 'react'

export function QuickSearchModal() {
  const [open, setOpen] = useState(false)

  // Listens for Cmd+K on Mac or Ctrl+K on Windows/Linux
  useHotkeys('mod+k', (e) => {
    e.preventDefault()
    setOpen((prev) => !prev)
  })

  return <div>Press Cmd+K to toggle search</div>
}`
    },
    {
      name: 'useDebounce',
      category: 'Performance',
      signature: 'useDebounce<T>(value: T, delayMs?: number): T',
      description: 'Delays updating state values until a specified idle duration has passed. Essential for real-time search inputs and API throttles.',
      code: `import { useDebounce } from '@oryn/ui/hooks'
import { useState, useEffect } from 'react'

export function SearchUsers() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      // Trigger search API only after 300ms idle
      fetchUsers(debouncedQuery)
    }
  }, [debouncedQuery])

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />
}`
    },
    {
      name: 'useLocalStorage',
      category: 'Persistence',
      signature: 'useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void, () => void]',
      description: 'Type-safe, SSR-hydrated local storage synchronization that listens across browser tabs and avoids React hydration mismatches.',
      code: `import { useLocalStorage } from '@oryn/ui/hooks'

export function UserPreferences() {
  const [preferences, setPreferences, removePreferences] = useLocalStorage('app-settings', {
    sidebarCollapsed: false,
    fontSize: 'normal'
  })

  return (
    <button onClick={() => setPreferences(p => ({ ...p, sidebarCollapsed: !p.sidebarCollapsed }))}>
      Toggle Sidebar
    </button>
  )
}`
    },
    {
      name: 'useControllableState',
      category: 'Headless State',
      signature: 'useControllableState<T>({ prop?: T, defaultProp?: T, onChange?: (val: T) => void }): [T, (val: T) => void]',
      description: 'Coordinates controlled and uncontrolled component state patterns seamlessly, allowing consumer overrides while maintaining internal defaults.',
      code: `import { useControllableState } from '@oryn/ui/hooks'

export function ToggleGroup({ value: valueProp, defaultValue, onChange }) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange
  })

  return <button onClick={() => setValue('option-1')}>{value}</button>
}`
    },
    {
      name: 'useClickOutside',
      category: 'Overlay & Dom',
      signature: 'useClickOutside(ref: RefObject<HTMLElement>, handler: (e: MouseEvent) => void, enabled?: boolean): void',
      description: 'Detects pointer interactions outside a target element, used by Dropdowns, Popovers, and Dialogs for clean dismissals.',
      code: `import { useClickOutside } from '@oryn/ui/hooks'
import { useRef, useState } from 'react'

export function Popover() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => setOpen(false), open)

  return open ? <div ref={menuRef}>Popover menu content</div> : null
}`
    },
    {
      name: 'useEscapeKey',
      category: 'Keyboard & Accessibility',
      signature: 'useEscapeKey(handler: (e: KeyboardEvent) => void, enabled?: boolean): void',
      description: 'Accessible listener for Escape keydown events, adhering to WAI-ARIA modal dismiss guidelines.',
      code: `import { useEscapeKey } from '@oryn/ui/hooks'

export function Modal({ isOpen, onClose }) {
  useEscapeKey(onClose, isOpen)
  return isOpen ? <div>Modal dialog</div> : null
}`
    },
    {
      name: 'useId',
      category: 'Accessibility',
      signature: 'useId(prefix?: string): string',
      description: 'Deterministic SSR-safe accessibility ID generation for connecting labels, inputs, and aria-describedby hints.',
      code: `import { useId } from '@oryn/ui/hooks'

export function FormField() {
  const id = useId('input-field')
  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} />
    </>
  )
}`
    },
    {
      name: 'useFocusTrap',
      category: 'Accessibility',
      signature: 'useFocusTrap(containerRef: RefObject<HTMLElement>, active?: boolean): void',
      description: 'Traps keyboard Tab focus within an overlay container, preventing background focus leakage for accessible dialogs and modals.',
      code: `import { useFocusTrap } from '@oryn/ui/hooks'
import { useRef } from 'react'

export function AccessibleModal({ active }) {
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef, active)

  return <div ref={modalRef} role="dialog">Focus remains here while active</div>
}`
    },
    {
      name: 'useMediaQuery',
      category: 'Responsive',
      signature: 'useMediaQuery(query: string): boolean',
      description: 'Reactive CSS media query listener for building responsive components that adjust between mobile and desktop layouts in JavaScript.',
      code: `import { useMediaQuery } from '@oryn/ui/hooks'

export function ResponsiveView() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return <div>{isDesktop ? 'Desktop Sidebar' : 'Mobile Drawer'}</div>
}`
    }
  ]

  return (
    <div className="space-y-12 w-full">
      {/* Header */}
      <div className="border-b border-border/40 pb-8">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Primitives &amp; Utilities</span>
          <span>•</span>
          <span>Headless Custom Hooks</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Headless Utility Hooks
          </h1>
          <Badge variant="outline" className="font-mono text-xs">
            10 Production Hooks
          </Badge>
        </div>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-3xl">
          ORYN UI ships a suite of zero-dependency headless React hooks designed for keyboard navigation, focus management, persistent storage, and reactive performance.
        </p>

        {/* Subpath import callout */}
        <div className="mt-6 p-3 rounded-lg border border-border/60 bg-muted/30 flex items-center justify-between text-xs font-mono overflow-x-auto">
          <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
            <span className="text-primary font-bold">import</span>
            <span>&#123; useClipboard, useHotkeys, useDebounce &#125;</span>
            <span className="text-primary font-bold">from</span>
            <span className="text-foreground">&apos;@oryn/ui/hooks&apos;</span>
          </div>
        </div>
      </div>

      {/* Interactive Hooks Playground Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/30 pb-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Live Interactive Playground</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. useClipboard Live Demo */}
          <Card className="p-4 space-y-3 border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">useClipboard</span>
              <Badge variant={copied ? "success" : "outline"} className="text-[10px]">
                {copied ? "Copied!" : "Ready"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Test native clipboard copying with automatic timeout reset:
            </p>
            <div className="flex items-center gap-2">
              <Input 
                value={copyText} 
                onChange={(e) => setCopyText(e.target.value)} 
                className="text-xs font-mono"
              />
              <Button 
                size="sm" 
                onClick={() => copy(copyText)} 
                className="shrink-0 text-xs"
                variant={copied ? "default" : "outline"}
              >
                {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          </Card>

          {/* 2. useHotkeys Live Demo */}
          <Card className="p-4 space-y-3 border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">useHotkeys</span>
              <Badge variant="outline" className="font-mono text-[10px]">
                Triggers: {hotkeyCount}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Try pressing <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[11px] border border-border">Cmd/Ctrl + K</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[11px] border border-border">Cmd/Ctrl + Shift + L</kbd> right now:
            </p>
            <div className="p-2.5 rounded-md bg-muted/40 border border-border/40 text-xs flex items-center justify-between">
              <span className="text-muted-foreground">Last Shortcut Detected:</span>
              <span className="font-mono font-semibold text-primary">
                {lastHotkey || 'Waiting for keypress...'}
              </span>
            </div>
          </Card>

          {/* 3. useDebounce Live Demo */}
          <Card className="p-4 space-y-3 border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">useDebounce</span>
              <Badge variant="outline" className="font-mono text-[10px]">
                Delay: 400ms
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Type rapidly below to see real-time state vs debounced state:
            </p>
            <Input 
              value={liveQuery}
              onChange={(e) => setLiveQuery(e.target.value)}
              placeholder="Start typing rapidly..."
              className="text-xs"
            />
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2 rounded bg-muted/30 border border-border/30">
                <span className="text-[10px] text-muted-foreground uppercase font-mono block">Instant:</span>
                <span className="font-mono font-semibold truncate block">{liveQuery || '—'}</span>
              </div>
              <div className="p-2 rounded bg-muted/30 border border-border/30">
                <span className="text-[10px] text-muted-foreground uppercase font-mono block">Debounced (400ms):</span>
                <span className="font-mono font-semibold text-primary truncate block">{debouncedQuery || '—'}</span>
              </div>
            </div>
          </Card>

          {/* 4. useLocalStorage Live Demo */}
          <Card className="p-4 space-y-3 border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">useLocalStorage</span>
              <Badge variant="outline" className="font-mono text-[10px]">
                Key: &apos;oryn-demo-theme&apos;
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              State is synced with browser LocalStorage and persists across page refreshes:
            </p>
            <div className="flex items-center gap-2 pt-1">
              {(['system', 'light', 'dark'] as const).map((mode) => (
                <Button
                  key={mode}
                  size="sm"
                  variant={savedTheme === mode ? 'default' : 'outline'}
                  onClick={() => setSavedTheme(mode)}
                  className="text-xs capitalize flex-1"
                >
                  {mode}
                </Button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground font-mono">
              Current stored value: <span className="font-bold text-foreground">&quot;{savedTheme}&quot;</span>
            </p>
          </Card>
        </div>
      </section>

      {/* Complete Hooks Catalog */}
      <section className="space-y-8 pt-4">
        <div className="flex items-baseline justify-between border-b border-border/30 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Complete Hooks Catalog
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            {hooksList.length} Headless Hooks
          </span>
        </div>

        <div className="space-y-6">
          {hooksList.map((hook) => (
            <div 
              key={hook.name}
              id={hook.name}
              className="p-5 rounded-xl border border-border/60 bg-card/40 space-y-4 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/30 pb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-foreground font-mono">
                    {hook.name}
                  </h3>
                  <Badge variant="outline" className="text-[10px]">
                    {hook.category}
                  </Badge>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {hook.description}
              </p>

              {/* Signature */}
              <div className="p-2.5 rounded-lg bg-muted/50 border border-border/40 font-mono text-[11px] text-primary overflow-x-auto">
                {hook.signature}
              </div>

              {/* Code Snippet */}
              <div className="space-y-1">
                <CodeBlock 
                  code={hook.code}
                  language="tsx"
                  filename={`${hook.name}.example.tsx`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation footer */}
      <div className="border-t border-border/40 pt-6 flex items-center justify-between">
        <Link 
          href="/docs/components"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Browse All Components
        </Link>
        <Link 
          href="/theme-builder"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          <span>Open Theme Builder</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
