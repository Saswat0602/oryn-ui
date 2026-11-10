'use client'

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Eye, Code2, Check, FileCode } from 'lucide-react'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
}

export function ComponentPreview({
  children,
  code,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs transition-colors w-full">
      {/* Sleek Minimal Toolbar Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/30 border-b border-border/50 select-none flex-wrap gap-2">
        {/* Left: Clean Segmented Preview/Code Toggle */}
        <div className="inline-flex items-center p-0.5 rounded-lg bg-muted/80 border border-border/50 text-xs">
          <button
            type="button"
            onClick={() => setShowCode(false)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
              !showCode
                ? 'bg-background text-foreground shadow-2xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setShowCode(true)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
              showCode
                ? 'bg-background text-foreground shadow-2xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
        </div>

        {/* Right: Active Indicator & Copy Button */}
        <div className="flex items-center gap-2">
          {showCode ? (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/60 border border-border/40 text-[11px] font-mono text-muted-foreground">
              <FileCode className="w-3 h-3 text-muted-foreground" />
              <span>example.tsx</span>
            </div>
          ) : (
            <span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground/60">
              live preview
            </span>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border/40 transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Stage */}
      {!showCode ? (
        <div className="p-6 sm:p-10 md:p-12 min-h-[160px] flex items-center justify-center bg-zinc-50/40 dark:bg-zinc-950/40 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] transition-colors overflow-x-auto">
          <div className="w-full flex items-center justify-center overflow-x-auto py-2">
            {children}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto text-[13px] leading-[1.65] font-mono selection:bg-primary/20 bg-[#1e1e1e]">
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              background: 'transparent',
              fontSize: '0.8125rem',
              lineHeight: '1.65',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
            lineNumberStyle={{
              minWidth: '2.5em',
              paddingRight: '1em',
              color: '#6e7681',
              textAlign: 'right',
              userSelect: 'none',
            }}
            wrapLines={true}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}
