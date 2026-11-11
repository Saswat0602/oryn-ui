'use client'

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Eye, Code2, Check } from 'lucide-react'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  title?: string
  description?: string
  className?: string
}

export function ComponentPreview({
  children,
  code,
  title,
  description,
  className = '',
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
    <div className={`rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs transition-colors w-full ${className}`}>
      {/* Integrated Header / Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-muted/30 border-b border-border/50 select-none">
        {title ? (
          <div className="space-y-0.5 min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{title}</span>
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed pl-3.5">
                {description}
              </p>
            )}
          </div>
        ) : (
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
        )}

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {title && (
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
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border/40 transition-colors cursor-pointer"
            title="Copy code snippet"
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
        <div className="p-6 sm:p-10 md:p-12 min-h-[180px] flex items-center justify-center bg-zinc-50/50 dark:bg-[#0c0d12] bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#1f222e_1px,transparent_1px)] [background-size:20px_20px] transition-colors overflow-x-auto">
          <div className="w-full flex items-center justify-center overflow-x-auto py-2">
            {children}
          </div>
        </div>
      ) : (
        <div className="bg-[#121318] border-t border-border/40 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/5 text-xs text-muted-foreground select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-zinc-400 pl-2">example.tsx</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">TypeScript TSX</span>
          </div>

          <div className="overflow-x-auto text-[13px] leading-[1.65] font-mono selection:bg-primary/25">
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
        </div>
      )}
    </div>
  )
}
