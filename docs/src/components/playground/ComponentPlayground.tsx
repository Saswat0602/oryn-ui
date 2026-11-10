'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { PlaygroundConfig, PlaygroundControlDef, PlaygroundRenderContext } from './types'
import { 
  SegmentedControl, 
  SelectControl, 
  SwitchControl, 
  SliderControl, 
  TextControl,
  ColorControl
} from './controls'
import { generateComponentCode } from './code-generator'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  Eye, 
  Code2, 
  Copy, 
  Check, 
  RotateCcw, 
  SlidersHorizontal, 
  Sparkles, 
  Activity,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react'

interface ComponentPlaygroundProps {
  config: PlaygroundConfig
  className?: string
}

export function ComponentPlayground({ config, className = '' }: ComponentPlaygroundProps) {
  // State for active component props
  const [currentProps, setCurrentProps] = useState<Record<string, any>>(() => ({
    ...config.defaultProps
  }))

  // View state: Preview vs Generated Code
  const [activeView, setActiveView] = useState<'preview' | 'code'>('preview')
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)

  // Interactive event listener state
  const [lastEvent, setLastEvent] = useState<{ name: string; timestamp: number; detail?: any } | null>(null)

  const handleEvent = useCallback((name: string, detail?: any) => {
    setLastEvent({ name, timestamp: Date.now(), detail })
    const timer = setTimeout(() => {
      setLastEvent((prev) => (prev?.name === name ? null : prev))
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const renderContext: PlaygroundRenderContext = useMemo(
    () => ({
      onEvent: handleEvent,
      lastEvent
    }),
    [handleEvent, lastEvent]
  )

  const handlePropChange = (name: string, value: any) => {
    setCurrentProps((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleReset = () => {
    setCurrentProps({ ...config.defaultProps })
    setLastEvent(null)
  }

  // Generate dynamic TSX code
  const generatedCode = useMemo(() => {
    return generateComponentCode(config, currentProps)
  }, [config, currentProps])

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  // Group controls by category if present
  const categorizedControls = useMemo(() => {
    const groups: Record<string, PlaygroundControlDef[]> = {
      Appearance: [],
      Size: [],
      Interactivity: [],
      Options: []
    }

    config.controls.forEach((control) => {
      if (control.category === 'appearance' || control.name === 'variant' || control.name === 'color') {
        groups.Appearance.push(control)
      } else if (control.category === 'size' || control.name === 'size') {
        groups.Size.push(control)
      } else if (
        control.category === 'state' ||
        control.name === 'disabled' ||
        control.name === 'loading' ||
        control.name === 'readOnly'
      ) {
        groups.Interactivity.push(control)
      } else {
        groups.Options.push(control)
      }
    })

    return groups
  }, [config.controls])

  return (
    <div className={`rounded-xl border border-border/70 bg-card overflow-hidden shadow-xs transition-colors w-full ${className}`}>
      {/* Chrome Window Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/40 border-b border-border/60 select-none flex-wrap gap-2">
        {/* Left: Window Traffic Lights & Title */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80 inline-block" />
          </div>

          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground tracking-tight">
              Interactive Playground
            </span>
          </div>

          {/* Segmented View Toggle: Preview vs Code */}
          <div className="inline-flex items-center p-0.5 rounded-lg bg-muted border border-border/50 text-xs">
            <button
              type="button"
              onClick={() => setActiveView('preview')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
                activeView === 'preview'
                  ? 'bg-background text-foreground shadow-2xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('code')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
                activeView === 'code'
                  ? 'bg-background text-foreground shadow-2xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
          </div>

          {/* Responsive Breakpoint Switcher */}
          {activeView === 'preview' && (
            <div className="hidden sm:inline-flex items-center p-0.5 rounded-lg bg-muted border border-border/50 text-xs">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`p-1 rounded font-medium transition-all cursor-pointer ${
                  viewport === 'desktop'
                    ? 'bg-background text-foreground shadow-2xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('tablet')}
                className={`p-1 rounded font-medium transition-all cursor-pointer ${
                  viewport === 'tablet'
                    ? 'bg-background text-foreground shadow-2xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`p-1 rounded font-medium transition-all cursor-pointer ${
                  viewport === 'mobile'
                    ? 'bg-background text-foreground shadow-2xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Reset & Copy Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Reset properties to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Copy generated code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Grid: Stage (8 cols) & Controls Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
        {/* Left/Top: Live Stage / Code Stage */}
        <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-border/60 flex flex-col justify-between">
          {activeView === 'preview' ? (
            <div className="relative p-6 sm:p-10 flex-1 flex flex-col items-center justify-center bg-zinc-50/80 dark:bg-[#0c0d12] bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] transition-colors overflow-x-auto min-h-[340px]">
              {/* Event Toast / Notification Chip */}
              {lastEvent && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono animate-in fade-in slide-in-from-top-2">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>Event: {lastEvent.name}</span>
                </div>
              )}

              {/* Live Rendered Component with Responsive Viewport Wrapper */}
              <div 
                className={`flex items-center justify-center py-4 transition-all duration-300 ${
                  viewport === 'mobile' 
                    ? 'w-full max-w-[375px] border border-dashed border-border/80 rounded-xl p-4 bg-background/50 shadow-2xs relative' 
                    : viewport === 'tablet' 
                    ? 'w-full max-w-[768px] border border-dashed border-border/80 rounded-xl p-6 bg-background/50 shadow-2xs relative' 
                    : 'w-full'
                }`}
              >
                {viewport !== 'desktop' && (
                  <span className="absolute -top-2.5 right-3 px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border/60 shadow-2xs">
                    {viewport === 'mobile' ? '375px (Mobile)' : '768px (Tablet)'}
                  </span>
                )}
                <div className="w-full flex items-center justify-center">
                  {(() => {
                    try {
                      return config.render(currentProps, renderContext)
                    } catch (err: any) {
                      return (
                        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                          Error rendering preview: {err?.message || 'Unknown error'}
                        </div>
                      )
                    }
                  })()}
                </div>
              </div>

              {/* Informational Sub-label */}
              <div className="mt-auto pt-4 text-center">
                <span className="text-[11px] font-mono text-muted-foreground/60">
                  Real React {config.title} component rendering
                </span>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-[#1e1e1e] overflow-x-auto text-[13px] leading-[1.65] font-mono p-4 selection:bg-primary/30">
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: 'transparent',
                  fontSize: '0.8125rem',
                  lineHeight: '1.65',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
                }}
                lineNumberStyle={{
                  minWidth: '2.5em',
                  paddingRight: '1em',
                  color: '#6e7681',
                  textAlign: 'right',
                  userSelect: 'none'
                }}
                wrapLines={true}
              >
                {generatedCode.trim()}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Right/Bottom: Property Configuration Panel */}
        <div className="lg:col-span-4 bg-card/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between max-h-[520px] overflow-y-auto scrollbar-thin">
          <div className="space-y-5">
            {/* Controls Panel Header */}
            <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Props Configurator
                </span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border/40">
                {config.controls.length} props
              </span>
            </div>

            {/* Render Controls by Category */}
            {Object.entries(categorizedControls).map(([categoryName, controls]) => {
              if (controls.length === 0) return null

              return (
                <div key={categoryName} className="space-y-3">
                  <h4 className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">
                    {categoryName}
                  </h4>

                  <div className="space-y-3">
                    {controls.map((control) => {
                      const val = currentProps[control.name]

                      switch (control.type) {
                        case 'segmented':
                          return (
                            <SegmentedControl
                              key={control.name}
                              control={control}
                              value={val}
                              onChange={(newVal) => handlePropChange(control.name, newVal)}
                            />
                          )

                        case 'select':
                          return (
                            <SelectControl
                              key={control.name}
                              control={control}
                              value={val}
                              onChange={(newVal) => handlePropChange(control.name, newVal)}
                            />
                          )

                        case 'boolean':
                          return (
                            <SwitchControl
                              key={control.name}
                              control={control}
                              value={val}
                              onChange={(newVal) => handlePropChange(control.name, newVal)}
                            />
                          )

                        case 'slider':
                          return (
                            <SliderControl
                              key={control.name}
                              control={control}
                              value={val}
                              onChange={(newVal) => handlePropChange(control.name, newVal)}
                            />
                          )

                        case 'text':
                          return (
                            <TextControl
                              key={control.name}
                              control={control}
                              value={val}
                              onChange={(newVal) => handlePropChange(control.name, newVal)}
                            />
                          )

                        case 'color':
                          return (
                            <ColorControl
                              key={control.name}
                              control={control}
                              value={val}
                              onChange={(newVal) => handlePropChange(control.name, newVal)}
                            />
                          )

                        default:
                          return null
                      }
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
