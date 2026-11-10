"use client"

import React, { useState } from "react"
import Link from "next/link"
import { 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink,
  Package,
  Layers,
  Terminal,
  Cpu
} from "lucide-react"
import { CodeBlock } from "@/components/CodeBlock"
import * as snippets from "@/data/installation-snippets"
import { siteConfig } from "@/lib/site-config"

interface CodeSnippetProps {
  code: string
  language?: string
  filename?: string
  copyKey?: string
  copiedKey: string | null
  onCopy: (text: string, key: string) => void
}

function CodeSnippet({ 
  code, 
  language = "bash", 
  filename, 
}: CodeSnippetProps) {
  return (
    <CodeBlock
      code={code}
      language={language}
      filename={filename}
      showLineNumbers={Boolean(filename)}
    />
  )
}

export default function InstallationPage() {
  const [activePkgManager, setActivePkgManager] = useState<"npm" | "pnpm" | "yarn" | "bun">("npm")
  const [activeFramework, setActiveFramework] = useState<"nextjs" | "vite" | "manual">("nextjs")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="space-y-12 w-full">
      {/* Page Header */}
      <div className="border-b border-border/40 pb-8">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Documentation</span>
          <span>•</span>
          <span>Setup Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Installation &amp; Setup
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-3xl">
          Quickly install and integrate {siteConfig.fullName} into your project with Next.js, Vite, or standard React setups.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
          <a 
            href={siteConfig.links.npm} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <span className="font-bold text-red-500">npm</span>
            <span>{siteConfig.packageName}</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <a 
            href={siteConfig.links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Step 1: Package Manager Quick Install */}
      <section className="rounded-2xl border border-border/50 bg-card/30 p-4 sm:p-6 md:p-8 backdrop-blur-xs shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
              1
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <span>Install {siteConfig.fullName} Package</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Select your package manager to copy the install command.
              </p>
            </div>
          </div>

          {/* Segmented Pill Selector for Package Managers */}
          <div className="inline-flex flex-wrap items-center p-1 rounded-xl bg-muted/60 border border-border/40 text-xs font-mono self-start sm:self-auto">
            {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setActivePkgManager(pm)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activePkgManager === pm
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        <CodeSnippet 
          code={snippets.pkgCommands[activePkgManager]} 
          language="bash" 
          copyKey={`pkg-${activePkgManager}`} 
          copiedKey={copiedKey}
          onCopy={copyText}
        />
      </section>

      {/* Step 2: Framework Integration Section */}
      <section className="rounded-2xl border border-border/50 bg-card/30 p-4 sm:p-6 md:p-8 backdrop-blur-xs shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Framework Setup Guide
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Step-by-step instructions for your specific framework environment.
              </p>
            </div>
          </div>

          {/* Segmented Pill Framework Tabs */}
          <div className="inline-flex flex-wrap p-1 rounded-xl bg-muted/60 border border-border/40 text-xs font-medium self-start sm:self-auto">
            {[
              { id: "nextjs", label: "Next.js (App Router)" },
              { id: "vite", label: "Vite (React + TS)" },
              { id: "manual", label: "React Manual / CRA" },
            ].map((fw) => (
              <button
                key={fw.id}
                onClick={() => setActiveFramework(fw.id as typeof activeFramework)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFramework === fw.id
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {fw.label}
              </button>
            ))}
          </div>
        </div>

        {/* Next.js Setup */}
        {activeFramework === "nextjs" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">1</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Create Next.js Project (if starting new)
                </h3>
              </div>
              <CodeSnippet 
                code={snippets.nextjs.createApp}
                language="bash"
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">2</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Install ORYN UI
                </h3>
              </div>
              <CodeSnippet 
                code={snippets.nextjs.install}
                language="bash"
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">3</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Configure Tailwind CSS
                </h3>
              </div>
              <p className="text-xs text-muted-foreground pl-7.5">
                Choose the integration method that matches your architecture:
              </p>

              <div className="space-y-4 pl-7.5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">Method 1 (Recommended)</span>
                    <span className="text-xs font-medium text-foreground">Self-Contained Precompiled CSS</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Zero content scanning required. All 75+ component styles are pre-compiled and tree-shaken into a single CSS file.
                  </p>
                  <CodeSnippet 
                    filename="app/layout.tsx"
                    language="tsx"
                    code={snippets.nextjs.methodCss}
                    copiedKey={copiedKey}
                    onCopy={copyText}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-500">Method 2</span>
                    <span className="text-xs font-medium text-foreground">Tailwind CSS v4 (@source directive)</span>
                  </div>
                  <CodeSnippet 
                    filename="app/globals.css"
                    language="css"
                    code={snippets.nextjs.methodTailwindV4}
                    copiedKey={copiedKey}
                    onCopy={copyText}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-500">Method 3</span>
                    <span className="text-xs font-medium text-foreground">Tailwind v3 Monorepo &amp; Hoisting-Safe Path</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Using <code className="font-mono text-foreground">path.dirname(require.resolve(...))</code> ensures styles compile accurately in pnpm, Turborepo, Yarn Berry, and npm workspaces.
                  </p>
                  <CodeSnippet 
                    filename="tailwind.config.js"
                    language="javascript"
                    code={snippets.nextjs.tailwindConfig}
                    copiedKey={copiedKey}
                    onCopy={copyText}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">4</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Import and Use in Components
                </h3>
              </div>
              <p className="text-xs text-muted-foreground pl-7.5">
                Interactive components (Drawer, Modal, Dropdown, Tabs) use React hooks and should be rendered in client components:
              </p>
              <CodeSnippet 
                filename="app/page.tsx"
                language="tsx"
                code={snippets.nextjs.pageUsage}
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>
          </div>
        )}

        {/* Vite Setup */}
        {activeFramework === "vite" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">1</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Create Vite React + TypeScript App
                </h3>
              </div>
              <CodeSnippet 
                code={snippets.vite.createApp}
                language="bash"
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">2</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Install Tailwind CSS &amp; ORYN UI
                </h3>
              </div>
              <CodeSnippet 
                code={snippets.vite.install}
                language="bash"
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">3</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Update tailwind.config.js
                </h3>
              </div>
              <CodeSnippet 
                filename="tailwind.config.js"
                language="javascript"
                code={snippets.vite.tailwindConfig}
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">4</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Use in App.tsx
                </h3>
              </div>
              <CodeSnippet 
                filename="src/App.tsx"
                language="tsx"
                code={snippets.vite.appUsage}
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>
          </div>
        )}

        {/* Manual Setup */}
        {activeFramework === "manual" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">1</span>
                <h3 className="text-sm font-semibold text-foreground">Peer Dependencies</h3>
              </div>
              <p className="text-xs text-muted-foreground pl-7.5">
                ORYN UI requires React &gt;= 18.0.0 and Tailwind CSS 3 or 4.
              </p>
              <CodeSnippet 
                code={snippets.manual.install}
                language="bash"
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold">2</span>
                <h3 className="text-sm font-semibold text-foreground">Tailwind CSS Setup</h3>
              </div>
              <p className="text-xs text-muted-foreground pl-7.5">
                In your primary CSS file (<code className="text-foreground font-mono">index.css</code> or <code className="text-foreground font-mono">App.css</code>):
              </p>
              <CodeSnippet 
                filename="src/index.css"
                language="css"
                code={snippets.manual.css}
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            </div>
          </div>
        )}
      </section>

      {/* Step 3: Import Methods Overview */}
      <section className="space-y-6 pt-6 border-t border-border/40">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Import Methods</h2>
          <p className="text-xs text-muted-foreground mt-1">ORYN UI provides 3 import levels for bundle size optimization.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Level 1: Full</span>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Convenient single package import</p>
            <div className="text-[11px] font-mono text-foreground bg-muted/60 p-2.5 rounded-lg border border-border">
              import &#123; Button &#125; from &apos;{siteConfig.packageName}&apos;
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Level 2: Category</span>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Grouped subpath module</p>
            <div className="text-[11px] font-mono text-foreground bg-muted/60 p-2.5 rounded-lg border border-border">
              import &#123; Button &#125; from &apos;{siteConfig.packageName}/core&apos;
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Level 3: Component</span>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Maximum tree-shaking efficiency</p>
            <div className="text-[11px] font-mono text-foreground bg-muted/60 p-2.5 rounded-lg border border-border">
              import &#123; Button &#125; from &apos;{siteConfig.packageName}/button&apos;
            </div>
          </div>
        </div>
      </section>

      {/* Step 5: Direct CLI Component Distribution (shadcn-style) */}
      <section className="rounded-2xl border border-border/50 bg-card/30 p-6 sm:p-8 backdrop-blur-xs shadow-xs space-y-6">
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
            5
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Direct CLI Distribution (Optional)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Prefer full local ownership over your component code? Use our built-in CLI to copy source components with all required primitives and hooks automatically resolved.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-foreground">Add components with dependencies:</span>
            <CodeBlock 
              language="bash" 
              code={`# Add individual components (primitives and hooks bundled automatically)
${siteConfig.cli.command} add button
${siteConfig.cli.command} add dialog
${siteConfig.cli.command} add data-table

# Specify custom target directory
${siteConfig.cli.command} add form --path src/components/ui

# Explore all available components
${siteConfig.cli.command} list`} 
            />
          </div>
        </div>
      </section>

      {/* Step 6: Theme Customization with HSL Channel Tokens */}
      <section className="space-y-4 pt-6 border-t border-border/40">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Theme Variables (HSL Channel Tokens)</h2>
          <p className="text-xs text-muted-foreground mt-1">
            ORYN UI uses HSL channel tokens (<code className="font-mono text-foreground">--primary: 221.2 83.2% 53.3%</code>) without hardcoded color functions. This ensures Tailwind opacity modifiers like <code className="font-mono text-foreground">bg-primary/80</code> and <code className="font-mono text-foreground">ring-primary/20</code> work without color clipping.
          </p>
        </div>

        <CodeSnippet 
          filename="app/globals.css"
          language="css"
          code={snippets.themeVariables}
          copiedKey={copiedKey}
          onCopy={copyText}
        />
      </section>

      {/* Next Steps CTA */}
      <div className="border-t border-border/40 pt-6 flex items-center justify-between">
        <Link 
          href="/docs/getting-started"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Getting Started Overview
        </Link>
        <Link 
          href="/docs/components"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          <span>Explore All 75+ Components</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
