"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Check, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react'
import * as snippets from '@/data/getting-started-snippets'
import { CodeBlock } from '@/components/CodeBlock'
import { siteConfig } from '@/lib/site-config'

export default function GettingStartedPage() {
  const [activeTab, setActiveTab] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm')
  return (
    <div className="space-y-12 w-full">
      {/* Header */}
      <div className="border-b border-border/40 pb-8">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Documentation</span>
          <span>•</span>
          <span>Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Getting Started with {siteConfig.fullName}
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-3xl">
          {siteConfig.fullName} — {siteConfig.tagline} {siteConfig.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{siteConfig.totalComponents} Components</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>React 18 &amp; 19 Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>TypeScript First</span>
          </div>
        </div>
      </div>

      {/* Step 1: Install */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h2 className="text-lg font-bold text-foreground">Install the Package</h2>
        </div>

        <p className="text-xs text-muted-foreground">
          Install <code className="text-foreground font-mono">{siteConfig.packageName}</code> into your project (zero external framework lock-in, with native SVG icon primitives):
        </p>

        <div className="space-y-2">
          {/* Segmented Package Manager Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-muted/50 border border-border/40 w-fit">
            {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setActiveTab(pm)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === pm
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {pm}
              </button>
            ))}
          </div>

          <CodeBlock
            code={snippets.installCommands[activeTab]}
            language="bash"
            filename={`terminal (${activeTab})`}
          />
        </div>
      </section>

      {/* Step 2: Import Styles */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h2 className="text-lg font-bold text-foreground">Import Styles (1 Line)</h2>
        </div>

        <p className="text-xs text-muted-foreground">
          Import pre-compiled styles in your root layout (<code className="text-foreground font-mono">app/layout.tsx</code> in Next.js or <code className="text-foreground font-mono">src/main.tsx</code> in Vite). No Tailwind configuration is required:
        </p>

        <CodeBlock
          code={snippets.cssImport}
          language="tsx"
          filename="app/layout.tsx"
          showLineNumbers={true}
        />

        {/* Style Selection Quick Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg border border-border/60 bg-card/40 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 border border-zinc-500" />
              <span>B&amp;W / Monochrome (Default)</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Active automatically. All buttons, badges, and focus rings render with sleek black &amp; white monochrome contrast.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border/60 bg-card/40 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-blue-400" />
              <span>Normal (Vibrant Blue)</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Just add <code className="text-foreground font-mono bg-muted/60 px-1 py-0.5 rounded text-[11px]">data-style=&quot;normal&quot;</code> to your <code className="text-foreground font-mono bg-muted/60 px-1 py-0.5 rounded text-[11px]">&lt;html&gt;</code> element.
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: Usage */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h2 className="text-lg font-bold text-foreground">Import &amp; Use Components</h2>
        </div>

        <p className="text-xs text-muted-foreground">
          Import components anywhere in your application:
        </p>

        <CodeBlock
          code={snippets.usage}
          language="tsx"
          filename="MyComponent.tsx"
          showLineNumbers={true}
        />
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-4 border-t border-border/40 pt-8">
        <h2 className="text-xl font-bold text-foreground">Why ORYN UI?</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-border/50 bg-card/40 space-y-1.5">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs">
              <Zap className="h-4 w-4" />
              <span>Modular &amp; Tree-shakable</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Import from root or individual subpaths (<code className="text-foreground">/button</code>, <code className="text-foreground">/core</code>) for minimal bundle size.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border/50 bg-card/40 space-y-1.5">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>Full Accessibility</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Keyboard navigation, focus rings, and ARIA roles pre-configured across all interactive elements.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border/50 bg-card/40 space-y-1.5">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs">
              <Sparkles className="h-4 w-4" />
              <span>Dark &amp; Light Theming</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tailwind CSS CSS variables system with automatic dark-mode switching and theme tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Theming Section */}
      <section className="space-y-4 border-t border-border/40 pt-8">
        <h2 className="text-xl font-bold text-foreground">Theming &amp; CSS Variables</h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
          {siteConfig.fullName} components are styled using semantic CSS custom properties. You can import the pre-built stylesheet directly or customize the color tokens in your global stylesheet:
        </p>

        <CodeBlock
          code={`/* Import pre-built theme */\n@import "${siteConfig.packageName}/theme.css";\n\n/* Or customize design tokens directly */\n:root {\n  --background: #ffffff;\n  --foreground: #09090b;\n  --primary: #2563eb;\n  --primary-foreground: #ffffff;\n  --muted: #f4f4f5;\n  --muted-foreground: #71717a;\n  --border: #e4e4e7;\n  --ring: #2563eb;\n  --radius: 0.5rem;\n}\n\n.dark {\n  --background: #09090b;\n  --foreground: #fafafa;\n  --primary: #3b82f6;\n  --primary-foreground: #ffffff;\n  --muted: #27272a;\n  --muted-foreground: #a1a1aa;\n  --border: #27272a;\n  --ring: #3b82f6;\n}`}
          language="css"
          filename="globals.css"
          showLineNumbers={true}
        />
      </section>

      {/* Next links */}
      <div className="border-t border-border/40 pt-6 flex items-center justify-between">
        <Link 
          href="/docs/installation"
          className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          View Framework Installation Guides &rarr;
        </Link>
        <Link 
          href="/docs/components"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          <span>Browse All Components</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}