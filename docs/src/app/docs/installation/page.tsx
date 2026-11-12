"use client"

import React, { useState } from "react"
import Link from "next/link"
import { 
  ArrowRight, 
  ExternalLink,
  Package,
  Layers,
  Terminal,
  Cpu,
  CheckCircle2,
  Sparkles,
  Zap,
  Flame,
  Wrench,
  BookOpen
} from "lucide-react"
import { CodeBlock } from "@/components/CodeBlock"
import * as snippets from "@/data/installation-snippets"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

type PkgManager = snippets.PkgManager
type FrameworkKey = snippets.FrameworkKey

function NextjsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none">
      <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" fill="currentColor" r="90" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_next)" />
        <rect fill="url(#paint1_linear_next)" height="72" width="12" x="115" y="54" />
      </g>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_next" x1="109" x2="144.5" y1="116.5" y2="160.5">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_next" x1="121" x2="120.799" y1="54" y2="106.875">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ViteIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M29.6 4.9L16.9 29.5c-.4.7-1.4.7-1.8 0L2.4 4.9c-.4-.8.2-1.7 1.1-1.6l12.4 2.1c.3 0 .7 0 1-.1L28.5 3.3c.9-.1 1.5.8 1.1 1.6z" fill="url(#viteGradient1)" />
      <path d="M21.7 3.5L11.4 5.3c-.3 0-.6.2-.7.5L5.4 16.5c-.3.7.3 1.5 1.1 1.4l5.3-.9-3 7.8c-.4.9.8 1.7 1.5 1l11.4-11.3c.6-.6.2-1.6-.7-1.6l-5 .2 6.5-8.5c.5-.7 0-1.7-.8-1.7z" fill="url(#viteGradient2)" />
      <defs>
        <linearGradient id="viteGradient1" x1="2.4" y1="3.3" x2="29.6" y2="29.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="viteGradient2" x1="12" y1="4" x2="20" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFEA83" />
          <stop offset=".08" stopColor="#FFDD35" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function AstroIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 364" className={className} fill="none">
      <path d="M192.5 281.8C189.6 281.8 186.8 281.1 184.2 279.7L128 249.2L71.8 279.7C63.8 284 54 281.1 49.7 273.1C47.4 268.8 47.4 263.6 49.7 259.3L114.7 139.7C118.9 131.7 128.7 128.8 136.7 133C139.5 134.5 141.8 136.8 143.3 139.7L208.3 259.3C212.6 267.3 209.7 277.1 201.7 281.4C198.8 281.7 195.7 281.8 192.5 281.8Z" fill="url(#astroGradient1)" />
      <path d="M128 0C128 0 102.7 54.6 102.7 93.3C102.7 114.3 116.8 132.8 136.8 138.8C143.6 117.8 163.2 102.7 186.3 102.7C191.1 102.7 195.8 103.4 200.3 104.7C196.2 46.1 128 0 128 0Z" fill="url(#astroGradient2)" />
      <defs>
        <linearGradient id="astroGradient1" x1="128" y1="130" x2="128" y2="282" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5D01" />
          <stop offset="1" stopColor="#D83333" />
        </linearGradient>
        <linearGradient id="astroGradient2" x1="128" y1="0" x2="200" y2="139" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BC52EE" />
          <stop offset="1" stopColor="#5E17EB" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const FRAMEWORKS: Array<{
  id: FrameworkKey
  name: string
  badge: string
  description: string
  icon: React.ReactNode
}> = [
  {
    id: "nextjs",
    name: "Next.js",
    badge: "App Router",
    description: "Server Components, App Router & Turbopack support.",
    icon: <NextjsIcon className="w-6 h-6 text-foreground" />,
  },
  {
    id: "vite",
    name: "Vite",
    badge: "React 19",
    description: "Fast Single Page Applications with instantaneous HMR.",
    icon: <ViteIcon className="w-6 h-6" />,
  },
  {
    id: "astro",
    name: "Astro",
    badge: "Islands",
    description: "Content sites with zero-JS default & on-demand hydration.",
    icon: <AstroIcon className="w-6 h-6" />,
  },
  {
    id: "manual",
    name: "Manual",
    badge: "Custom Setup",
    description: "Integrate into any existing React project with Tailwind.",
    icon: <Wrench className="w-5 h-5 text-primary" />,
  },
]

export default function InstallationPage() {
  const [activePkgManager, setActivePkgManager] = useState<PkgManager>("npm")
  const [activeFramework, setActiveFramework] = useState<FrameworkKey>("nextjs")
  const [nextjsMethod, setNextjsMethod] = useState<"css" | "tailwind-v4" | "tailwind-v3">("css")

  return (
    <div className="space-y-12 w-full max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-border/40 pb-8">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Documentation</span>
          <span>•</span>
          <span>Installation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Installation
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-3xl">
          How to install and set up {siteConfig.fullName} in your project. Choose your framework below to view tailored, step-by-step instructions.
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

      {/* Framework Selection Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Select Framework
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Choose your target framework for step-by-step setup guides.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {FRAMEWORKS.map((fw) => {
            const isSelected = activeFramework === fw.id
            return (
              <button
                key={fw.id}
                type="button"
                onClick={() => setActiveFramework(fw.id)}
                className={cn(
                  "relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer group",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary shadow-xs"
                    : "border-border/60 bg-card/40 hover:bg-card/80 hover:border-border"
                )}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="p-2 rounded-lg bg-background border border-border/60 flex items-center justify-center">
                    {fw.icon}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-mono px-2 py-0.5 rounded-full border",
                      isSelected
                        ? "bg-primary/15 text-primary border-primary/30 font-semibold"
                        : "bg-muted text-muted-foreground border-border/60"
                    )}
                  >
                    {fw.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                  <span>{fw.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-snug line-clamp-2">
                  {fw.description}
                </p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Global Package Manager Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 bg-muted/20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Terminal className="w-4 h-4 text-primary" />
          <span>Active Package Manager (updates all commands below):</span>
        </div>
        <div className="inline-flex items-center p-0.5 rounded-lg bg-muted/80 border border-border/60 text-xs font-mono self-start sm:self-auto">
          {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
            <button
              key={pm}
              type="button"
              onClick={() => setActivePkgManager(pm)}
              className={cn(
                "px-3 py-1 rounded-md transition-all cursor-pointer",
                activePkgManager === pm
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      {/* FRAMEWORK 1: NEXT.JS */}
      {activeFramework === "nextjs" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <NextjsIcon className="w-7 h-7 text-foreground" />
              <span>Next.js Setup Guide</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Optimized for Next.js 14, 15, and 16 App Router, React 19, and Turbopack.
            </p>
          </div>

          {/* Step 1: Create Project */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <h3 className="text-sm font-semibold text-foreground">
                Create a Next.js Project (if starting fresh)
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Initialize a Next.js App Router project with TypeScript and Tailwind CSS configured:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                code={snippets.getCreateAppCommand("nextjs", activePkgManager)} 
                language="bash" 
              />
            </div>
          </div>

          {/* Step 2: Install Package */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <h3 className="text-sm font-semibold text-foreground">
                Install {siteConfig.fullName}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Install the component library. All primitives, hooks, and icons are bundled with zero external UI runtime dependencies:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                code={snippets.getInstallCommand(activePkgManager)} 
                language="bash" 
              />
            </div>
          </div>

          {/* Step 3: Configure Tailwind CSS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <h3 className="text-sm font-semibold text-foreground">
                Configure Tailwind CSS Styles
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Choose the integration method that best matches your project architecture:
            </p>

            <div className="pl-8.5 space-y-3">
              {/* Method Tabs */}
              <div className="inline-flex p-1 rounded-lg bg-muted/60 border border-border/40 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setNextjsMethod("css")}
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-all cursor-pointer",
                    nextjsMethod === "css"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Method 1: Precompiled CSS (Recommended)
                </button>
                <button
                  type="button"
                  onClick={() => setNextjsMethod("tailwind-v4")}
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-all cursor-pointer",
                    nextjsMethod === "tailwind-v4"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Method 2: Tailwind v4 (@source)
                </button>
                <button
                  type="button"
                  onClick={() => setNextjsMethod("tailwind-v3")}
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-all cursor-pointer",
                    nextjsMethod === "tailwind-v3"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Method 3: Tailwind v3 (tailwind.config.js)
                </button>
              </div>

              {nextjsMethod === "css" && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Zero content scanning required. All component styles are pre-compiled and tree-shaken into a single optimized CSS stylesheet:
                  </p>
                  <CodeBlock 
                    filename="app/layout.tsx" 
                    language="tsx" 
                    code={snippets.nextjs.methodCss} 
                    showLineNumbers 
                  />
                </div>
              )}

              {nextjsMethod === "tailwind-v4" && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    In Tailwind CSS v4, use the modern <code className="text-foreground font-mono">@source</code> directive to scan the distributed component files:
                  </p>
                  <CodeBlock 
                    filename="app/globals.css" 
                    language="css" 
                    code={snippets.nextjs.methodTailwindV4} 
                    showLineNumbers 
                  />
                </div>
              )}

              {nextjsMethod === "tailwind-v3" && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Use <code className="text-foreground font-mono">path.dirname(require.resolve(...))</code> for monorepo-safe resolution across Turborepo, pnpm workspaces, and standard node_modules:
                  </p>
                  <CodeBlock 
                    filename="tailwind.config.js" 
                    language="javascript" 
                    code={snippets.nextjs.tailwindConfig} 
                    showLineNumbers 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Step 4: Theme Provider Setup (Optional) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <h3 className="text-sm font-semibold text-foreground">
                Set Up ThemeProvider (Optional)
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Wrap your root layout with ORYN UI&apos;s built-in <code className="text-foreground font-mono">ThemeProvider</code> for instant dark mode and color scheme persistence:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="components/theme-provider.tsx" 
                language="tsx" 
                code={snippets.nextjs.themeProvider} 
                showLineNumbers 
              />
            </div>
          </div>

          {/* Step 5: Import and Use */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">5</span>
              <h3 className="text-sm font-semibold text-foreground">
                Import and Use Components in Page
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Interactive components (Modals, Drawers, Dropdowns, Tabs) use React hooks and should be rendered in client components:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="app/page.tsx" 
                language="tsx" 
                code={snippets.nextjs.pageUsage} 
                showLineNumbers 
              />
            </div>
          </div>
        </div>
      )}

      {/* FRAMEWORK 2: VITE */}
      {activeFramework === "vite" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ViteIcon className="w-7 h-7" />
              <span>Vite (React + TypeScript) Setup Guide</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Ultra-fast build setup with React 19, TypeScript, and modern Tailwind CSS.
            </p>
          </div>

          {/* Step 1: Create Project */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <h3 className="text-sm font-semibold text-foreground">
                Create a Vite Project
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Scaffold a new Vite React application with TypeScript:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                code={snippets.getCreateAppCommand("vite", activePkgManager)} 
                language="bash" 
              />
            </div>
          </div>

          {/* Step 2: Install Tailwind & ORYN UI */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <h3 className="text-sm font-semibold text-foreground">
                Install Dependencies &amp; ORYN UI
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Install Tailwind CSS tools along with the <code className="text-foreground font-mono">{siteConfig.packageName}</code> library:
            </p>
            <div className="pl-8.5 space-y-2">
              <CodeBlock 
                code={`${snippets.vite.installTailwind(activePkgManager)}\n${snippets.getInstallCommand(activePkgManager)}`} 
                language="bash" 
              />
            </div>
          </div>

          {/* Step 3: Configure Tailwind Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <h3 className="text-sm font-semibold text-foreground">
                Configure Tailwind Content Scanning
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Update <code className="text-foreground font-mono">tailwind.config.js</code> to scan your local source and the ORYN UI package:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="tailwind.config.js" 
                language="javascript" 
                code={snippets.vite.tailwindConfig} 
                showLineNumbers 
              />
            </div>
          </div>

          {/* Step 4: Import CSS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <h3 className="text-sm font-semibold text-foreground">
                Import CSS in index.css
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Import Tailwind directives and ORYN UI stylesheets into your main CSS entry point:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="src/index.css" 
                language="css" 
                code={snippets.vite.indexCss} 
                showLineNumbers 
              />
            </div>
          </div>

          {/* Step 5: Test in App.tsx */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">5</span>
              <h3 className="text-sm font-semibold text-foreground">
                Build Components in App.tsx
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Render your first components with instant Vite Hot Module Replacement:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="src/App.tsx" 
                language="tsx" 
                code={snippets.vite.appUsage} 
                showLineNumbers 
              />
            </div>
          </div>
        </div>
      )}

      {/* FRAMEWORK 3: ASTRO */}
      {activeFramework === "astro" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <AstroIcon className="w-7 h-7" />
              <span>Astro Setup Guide</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Zero-JavaScript by default. Hydrate interactive ORYN UI components on demand using Astro Islands.
            </p>
          </div>

          {/* Step 1: Create Astro Project */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <h3 className="text-sm font-semibold text-foreground">
                Create an Astro Project
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Scaffold a new Astro project:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                code={snippets.getCreateAppCommand("astro", activePkgManager)} 
                language="bash" 
              />
            </div>
          </div>

          {/* Step 2: Add React & Tailwind Integrations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <h3 className="text-sm font-semibold text-foreground">
                Add React and Tailwind Integrations
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Use the official Astro CLI to automatically configure the React renderer and Tailwind CSS:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                code={snippets.getAstroIntegrationsCommand(activePkgManager)} 
                language="bash" 
              />
            </div>
          </div>

          {/* Step 3: Install ORYN UI */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <h3 className="text-sm font-semibold text-foreground">
                Install {siteConfig.fullName}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Add the package to your Astro project dependencies:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                code={snippets.getInstallCommand(activePkgManager)} 
                language="bash" 
              />
            </div>
          </div>

          {/* Step 4: Import Styles in Layout.astro */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <h3 className="text-sm font-semibold text-foreground">
                Import Styles in Layout.astro
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Import the pre-bundled stylesheet in your root Astro layout frontmatter:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="src/layouts/Layout.astro" 
                language="astro" 
                code={snippets.astro.layoutAstro} 
                showLineNumbers 
              />
            </div>
          </div>

          {/* Step 5: Render with Astro Client Directives */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">5</span>
              <h3 className="text-sm font-semibold text-foreground">
                Use Components with Client Directives
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              In Astro pages, static components (Badges, Cards, Avatars) render as pure HTML. For interactive components (Buttons with clicks, Modals, Drawers), add <code className="text-foreground font-mono">client:load</code> or <code className="text-foreground font-mono">client:visible</code>:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="src/pages/index.astro" 
                language="astro" 
                code={snippets.astro.pageAstro} 
                showLineNumbers 
              />
            </div>
          </div>
        </div>
      )}

      {/* FRAMEWORK 4: MANUAL */}
      {activeFramework === "manual" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Wrench className="w-7 h-7 text-primary" />
              <span>Manual Setup Guide</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Add ORYN UI to any custom React setup, existing dashboard, or Webpack/Rollup pipeline.
            </p>
          </div>

          {/* Step 1: Peer Dependencies */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <h3 className="text-sm font-semibold text-foreground">
                Peer Dependencies &amp; Package Install
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              ORYN UI supports React &gt;= 18.0.0 and React 19. Ensure React and DOM are installed:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                code={snippets.manual.install(activePkgManager)} 
                language="bash" 
              />
            </div>
          </div>

          {/* Step 2: CSS Setup */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <h3 className="text-sm font-semibold text-foreground">
                Import Styles in CSS Entry
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Import the precompiled CSS in your global stylesheet:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="src/index.css" 
                language="css" 
                code={snippets.manual.css} 
                showLineNumbers 
              />
            </div>
          </div>

          {/* Step 3: Usage */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <h3 className="text-sm font-semibold text-foreground">
                Verify Component Rendering
              </h3>
            </div>
            <p className="text-xs text-muted-foreground pl-8.5">
              Import any component directly into your React application view:
            </p>
            <div className="pl-8.5">
              <CodeBlock 
                filename="src/App.tsx" 
                language="tsx" 
                code={snippets.manual.appUsage} 
                showLineNumbers 
              />
            </div>
          </div>
        </div>
      )}

      {/* THE ORYN WAY ARCHITECTURE */}
      <section className="space-y-6 pt-8 border-t border-border/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">The ORYN Way</h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Built for enterprise-scale web applications with zero external UI runtime dependencies and 3-tier tree-shaking granularity.
          </p>
        </div>

        {/* 3 Import Tiers */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4.5 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Level 1: Full</span>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Convenient root barrel import for rapid prototyping</p>
            <div className="text-[11px] font-mono text-foreground bg-muted/60 p-2.5 rounded-lg border border-border/40">
              import &#123; Button &#125; from &apos;{siteConfig.packageName}&apos;
            </div>
          </div>

          <div className="p-4.5 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Level 2: Category</span>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Grouped subpath module for related components</p>
            <div className="text-[11px] font-mono text-foreground bg-muted/60 p-2.5 rounded-lg border border-border/40">
              import &#123; Button &#125; from &apos;{siteConfig.packageName}/core&apos;
            </div>
          </div>

          <div className="p-4.5 rounded-xl border border-border/60 bg-card/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Level 3: Component</span>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Direct subpath export for absolute zero-bloat tree shaking</p>
            <div className="text-[11px] font-mono text-foreground bg-muted/60 p-2.5 rounded-lg border border-border/40">
              import &#123; Button &#125; from &apos;{siteConfig.packageName}/button&apos;
            </div>
          </div>
        </div>
      </section>

      {/* Direct CLI Component Distribution (shadcn-style) */}
      <section className="rounded-2xl border border-border/60 bg-card/30 p-6 sm:p-8 backdrop-blur-xs shadow-xs space-y-6">
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Direct CLI Distribution (Optional)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Prefer full local ownership over your component code? Use our built-in CLI to copy source components with all required primitives and hooks automatically resolved.
            </p>
          </div>
        </div>

        <div className="space-y-4">
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
      </section>

      {/* Theme Customization with HSL Channel Tokens */}
      <section className="space-y-4 pt-4 border-t border-border/40">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Theme Variables (HSL Channel Tokens)</h2>
          <p className="text-xs text-muted-foreground mt-1">
            ORYN UI uses HSL channel tokens (<code className="font-mono text-foreground">--primary: 221.2 83.2% 53.3%</code>) without hardcoded color functions. This ensures Tailwind opacity modifiers like <code className="font-mono text-foreground">bg-primary/80</code> and <code className="font-mono text-foreground">ring-primary/20</code> work without color clipping.
          </p>
        </div>

        <CodeBlock 
          filename="app/globals.css"
          language="css"
          code={snippets.themeVariables}
          showLineNumbers
        />
      </section>

      {/* Next Steps CTA */}
      <div className="border-t border-border/40 pt-6 flex items-center justify-between">
        <Link 
          href="/docs/getting-started"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
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
