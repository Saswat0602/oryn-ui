"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Input, 
  Badge, 
  Switch, 
  Progress, 
  Slider,
  Avatar
} from 'oryn-ui'
import { 
  ArrowRight, 
  Copy, 
  Check, 
  Github,
  ShieldCheck, 
  Layers, 
  Cpu,
  Search,
  Zap,
  CheckCircle2,
  BarChart3,
  Users,
  Settings,
  Terminal,
  LayoutGrid,
  FileCode,
  Sliders,
  Sparkles,
  MousePointerClick
} from 'lucide-react'
import * as snippets from '@/data/landing-snippets'

export default function HomePage() {
  const [activePm, setActivePm] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [switchChecked, setSwitchChecked] = useState(true)
  const [sliderValue, setSliderValue] = useState(45)
  const [activeFw, setActiveFw] = useState<'nextjs' | 'vite' | 'manual'>('nextjs')

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }


  const categories = [
    {
      name: 'Core',
      count: '15 components',
      description: 'Foundational primitives including buttons, cards, inputs, groups, and toggles.',
      slug: 'button',
      tags: ['Button', 'Card', 'Input', 'ButtonGroup', 'InputGroup', 'Slider']
    },
    {
      name: 'Forms',
      count: '15 components',
      description: 'Comprehensive inputs, calendars, datepickers, multi-select, and AI prompt input.',
      slug: 'prompt-input',
      tags: ['PromptInput', 'MultiSelect', 'DateRangePicker', 'FileUpload', 'Form']
    },
    {
      name: 'Layout',
      count: '10 components',
      description: 'Structural systems including responsive navbars, sidebars, shells, and sheets.',
      slug: 'navbar',
      tags: ['Navbar', 'Sidebar', 'LayoutShell', 'Modal', 'Drawer', 'Sheet']
    },
    {
      name: 'Overlay',
      count: '8 components',
      description: 'Contextual layers, modal dialogs, context menus, tooltips, and popovers.',
      slug: 'dialog',
      tags: ['Dialog', 'AlertDialog', 'DropdownMenu', 'ContextMenu', 'HoverCard']
    },
    {
      name: 'Navigation',
      count: '6 components',
      description: 'Multi-level navigation bars, command palettes, steppers, and paginations.',
      slug: 'command',
      tags: ['Command', 'Combobox', 'NavigationMenu', 'Menubar', 'Stepper']
    },
    {
      name: 'Data',
      count: '6 components',
      description: 'Data tables, stat cards, interactive timelines, tree views, and charts.',
      slug: 'data-table',
      tags: ['DataTable', 'StatCard', 'Timeline', 'TreeView', 'Chart']
    },
    {
      name: 'Media',
      count: '6 components',
      description: 'Typography, status badges, carousels, keyboard keys, and responsive avatars.',
      slug: 'avatar',
      tags: ['Avatar', 'Badge', 'Carousel', 'AspectRatio', 'Kbd']
    },
    {
      name: 'Feedback',
      count: '9 components',
      description: 'AI message bubbles, reasoning disclosures, tool cards, toasts, and status banners.',
      slug: 'message-bubble',
      tags: ['MessageBubble', 'ReasoningDisclosure', 'ToolCallCard', 'Banner', 'Alert']
    }
  ]

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        {/* Release Pill using authentic ORYN Badge */}
        <Badge variant="outline" className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/40 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-foreground">{siteConfig.fullName} {siteConfig.version}</span>
          <span className="text-muted-foreground/60">•</span>
          <span>{siteConfig.totalComponents} Production Components</span>
          <ArrowRight className="h-3 w-3 text-primary ml-0.5" />
        </Badge>

        {/* Headline */}
        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary font-mono">
            {siteConfig.name}.
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            {siteConfig.tagline}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/docs/components">
            <Button size="lg" className="px-6 font-semibold shadow-md">
              <span>Explore Components</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="/docs/installation">
            <Button variant="outline" size="lg" className="px-6 font-medium">
              <span>Installation Guide</span>
            </Button>
          </Link>
          <a 
            href={siteConfig.links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-border/60 bg-background hover:bg-muted text-sm font-medium transition-colors"
          >
            <Github className="h-4 w-4 mr-2" />
            <span>Star on GitHub</span>
          </a>
        </div>

        {/* Quick Install Bar */}
        <div className="max-w-md mx-auto pt-4">
          <div className="rounded-lg border border-border/60 bg-zinc-950 p-2 flex items-center justify-between text-xs font-mono shadow-xl">
            <div className="flex items-center space-x-1 pl-1">
              {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setActivePm(pm)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                    activePm === pm
                      ? 'bg-zinc-800 text-zinc-100 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pr-1 min-w-0">
              <span className="text-zinc-300 truncate max-w-[160px] sm:max-w-none text-[11px] sm:text-xs">{snippets.installCommands[activePm]}</span>
              <button
                onClick={() => copyToClipboard(snippets.installCommands[activePm], 'hero-install')}
                className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                title="Copy install command"
              >
                {copiedKey === 'hero-install' ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/30 max-w-4xl mx-auto">
          <div className="p-3 space-y-0.5">
            <div className="text-2xl font-bold tracking-tight text-foreground">75+</div>
            <div className="text-xs text-muted-foreground">Components &amp; Modules</div>
          </div>
          <div className="p-3 space-y-0.5">
            <div className="text-2xl font-bold tracking-tight text-foreground">10</div>
            <div className="text-xs text-muted-foreground">Headless Custom Hooks</div>
          </div>
          <div className="p-3 space-y-0.5">
            <div className="text-2xl font-bold tracking-tight text-foreground">18 &amp; 19</div>
            <div className="text-xs text-muted-foreground">React Version Support</div>
          </div>
          <div className="p-3 space-y-0.5">
            <div className="text-2xl font-bold tracking-tight text-foreground">0 Config</div>
            <div className="text-xs text-muted-foreground">Tailwind CSS Ready</div>
          </div>
        </div>
      </section>

      {/* Live Interactive Enterprise Showcase */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Crafted for Enterprise Applications
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every component is built with semantic design tokens, clean hover effects, and built-in accessibility.
          </p>
        </div>

        {/* High-End Interactive SaaS Widgets */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Account Settings & Auth */}
          <Card className="border border-border/70 bg-card/70 backdrop-blur-sm shadow-sm hover:border-border transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar fallback="JD" className="h-9 w-9 bg-primary text-primary-foreground font-medium text-xs" />
                  <div>
                    <CardTitle className="text-sm font-semibold">Jane Doe</CardTitle>
                    <CardDescription className="text-xs">jane@enterprise.io</CardDescription>
                  </div>
                </div>
                <Badge variant="success" className="text-[10px]">Active Pro</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-medium text-foreground block">Two-Factor Authentication</span>
                    <span className="text-[11px] text-muted-foreground">Require security keys on sign-in</span>
                  </div>
                  <Switch 
                    checked={switchChecked} 
                    onChange={(e) => setSwitchChecked(e.target.checked)}
                  />
                </div>

                <div className="space-y-1.5 pt-1 border-t border-border/40">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">Session Timeout</span>
                    <Badge variant="outline" className="font-mono text-[10px]">{sliderValue}m</Badge>
                  </div>
                  <Slider 
                    value={sliderValue} 
                    onChange={(val: any) => setSliderValue(Array.isArray(val) ? val[0] : val)}
                    min={15}

                    max={120}
                    step={5}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button size="sm" className="w-full text-xs" leftIcon={<Check className="h-3.5 w-3.5" />}>
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Discard
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Command Center & Navigation */}
          <Card className="border border-border/70 bg-card/70 backdrop-blur-sm shadow-sm hover:border-border transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span>Command Center</span>
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">Quick Actions</Badge>
              </div>
              <CardDescription className="text-xs">Keyboard-navigable shortcuts and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-1">
              <div className="relative">
                <Input 
                  placeholder="Search commands, docs, tools..." 
                  leftIcon={<Search className="h-3.5 w-3.5" />}
                  className="text-xs h-8 pl-8 pr-12"
                />
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded border border-border/60 bg-muted text-muted-foreground">
                  ⌘K
                </kbd>
              </div>

              <div className="space-y-1 pt-1">
                {[
                  { icon: BarChart3, title: 'Analytics & Telemetry', badge: 'Live' },
                  { icon: Users, title: 'Team Access Control', badge: 'Admin' },
                  { icon: Settings, title: 'API & Webhooks', badge: 'v2' }
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2.5 text-foreground font-medium">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{item.title}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] py-0 px-1.5">{item.badge}</Badge>
                    </div>
                  )
                })}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40">
                <span>Navigation shortcut</span>
                <span className="font-mono text-foreground font-medium">Press ↵ to select</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Live Telemetry & Feedback */}
          <Card className="border border-border/70 bg-card/70 backdrop-blur-sm shadow-sm hover:border-border transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-500" />
                  <span>Production Telemetry</span>
                </CardTitle>
                <Badge variant="success" className="text-[10px]">Vercel Edge</Badge>
              </div>
              <CardDescription className="text-xs">Real-time status indicators and metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <div className="space-y-2 p-3 rounded-lg border border-border/50 bg-muted/20">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">Bundle Optimizations</span>
                  <span className="font-mono text-primary font-semibold">82%</span>
                </div>
                <Progress value={82} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-md border border-border/40 bg-muted/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>Uptime</span>
                  </div>
                  <div className="font-bold text-foreground font-mono">99.98%</div>
                </div>
                <div className="p-2.5 rounded-md border border-border/40 bg-muted/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                    <Cpu className="h-3 w-3 text-primary" />
                    <span>Bundle Size</span>
                  </div>
                  <div className="font-bold text-foreground font-mono">&lt; 25 kB</div>
                </div>
              </div>

              <Link href="/docs/components" className="block pt-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <span>Explore all 75+ components</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Monaco-Style Framework Integration Showcase */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-6">
        <div className="border-t border-border/40 pt-12 space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Integrates with Any Modern Stack
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose your framework and start building with ORYN UI in under 2 minutes.
          </p>
        </div>

        {/* Framework Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: 'nextjs', label: 'Next.js App Router', icon: FileCode },
            { id: 'vite', label: 'Vite (React + TS)', icon: Zap },
            { id: 'manual', label: 'CRA / Remix / Manual', icon: Terminal }
          ].map((fw) => {
            const Icon = fw.icon
            return (
              <button
                key={fw.id}
                onClick={() => setActiveFw(fw.id as typeof activeFw)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  activeFw === fw.id
                    ? 'bg-foreground text-background font-semibold shadow-xs'
                    : 'bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{fw.label}</span>
              </button>
            )
          })}
        </div>

        {/* Monaco IDE Code Window */}
        <div className="rounded-xl border border-zinc-800 bg-[#0d0e12] overflow-hidden text-xs max-w-3xl mx-auto shadow-2xl">
          {/* Editor Header Bar with macOS Window Controls */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-[#14151b] text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-zinc-600 pl-2">|</span>
              <span className="font-mono text-[11px] text-zinc-300 flex items-center gap-1.5 pl-1 truncate max-w-[150px] sm:max-w-none">
                <FileCode className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span className="truncate">{activeFw === 'nextjs' ? 'app/page.tsx' : activeFw === 'vite' ? 'src/App.tsx' : 'src/index.tsx'}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider hidden sm:inline">React 18 &amp; 19</span>
              <button
                onClick={() => copyToClipboard(snippets.rawCodeString[activeFw], 'framework-code')}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] transition-colors cursor-pointer"
                title="Copy snippet"
              >
                {copiedKey === 'framework-code' ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Window with Monaco Syntax Highlights and Line Numbers */}
          <div className="p-4 font-mono text-[13px] leading-relaxed overflow-x-auto select-text">
            <div className="table w-full">
              {snippets.frameworkSnippets[activeFw].map((lineObj) => (
                <div key={lineObj.line} className="table-row hover:bg-zinc-900/40">
                  <span className="table-cell select-none pr-4 text-right text-zinc-600 font-mono text-[11px] w-8">
                    {lineObj.line}
                  </span>
                  <span className="table-cell">
                    {lineObj.type === 'directive' && (
                      <span className="text-[#ce9178]">&apos;use client&apos;</span>
                    )}
                    {lineObj.type === 'empty' && <span>&nbsp;</span>}
                    {lineObj.type === 'import' && (
                      <span>
                        <span className="text-[#c586c0]">import </span>
                        {lineObj.text.includes('{') ? (
                          <>
                            <span className="text-[#9cdcfe]">
                              {lineObj.text.slice(lineObj.text.indexOf('{'), lineObj.text.indexOf('}') + 1)}
                            </span>
                            <span className="text-[#c586c0]"> from </span>
                            <span className="text-[#ce9178]">&apos;{siteConfig.packageName}&apos;</span>
                          </>
                        ) : (
                          <span className="text-zinc-300">{lineObj.text.replace('import ', '')}</span>
                        )}
                      </span>
                    )}
                    {lineObj.type === 'fn' && (
                      <span>
                        <span className="text-[#c586c0]">{lineObj.text.split(' ')[0]} </span>
                        {lineObj.text.includes('default') && <span className="text-[#c586c0]">default </span>}
                        {lineObj.text.includes('function') && <span className="text-[#569cd6]">function </span>}
                        <span className="text-[#dcdcaa]">
                          {lineObj.text.includes('function') ? lineObj.text.split('function ')[1].split('(')[0] : ''}
                        </span>
                        <span className="text-zinc-300">() {'{'}</span>
                      </span>
                    )}
                    {lineObj.type === 'jsx' && (
                      <span className="text-zinc-200">
                        {lineObj.text}
                      </span>
                    )}
                    {lineObj.type === 'close-brace' && (
                      <span className="text-zinc-300">{'}'}</span>
                    )}
                    {lineObj.type === 'plain' && (
                      <span className="text-zinc-300">{lineObj.text}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Component Catalog by Category (Requested by User) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        <div className="border-t border-border/40 pt-12 space-y-2 text-center max-w-2xl mx-auto">
          <Badge variant="secondary" className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            <LayoutGrid className="h-3 w-3 text-primary" />
            <span>Complete Component Ecosystem</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Explore 75+ Components by Category
          </h2>
          <p className="text-sm text-muted-foreground">
            Direct subpath module imports and tree-shaking for every category.
          </p>
        </div>

        {/* 8 Category Bento Grid using authentic ORYN UI Card & Badge primitives */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Card 
              key={cat.name}
              className="p-5 border border-border/60 bg-card/60 hover:bg-card hover:border-border transition-all duration-200 flex flex-col justify-between space-y-4 group shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-mono">
                    {cat.count}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Component Tag Pills using authentic ORYN UI Badges */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag) => (
                    <Link key={tag} href={`/docs/components/${tag.toLowerCase()}`}>
                      <Badge 
                        variant="outline" 
                        className="text-[11px] px-2 py-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border-border/50"
                      >
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <Link 
                  href={`/docs/components/${cat.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline pt-1"
                >
                  <span>View category docs</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Architectural Features Bento Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-6">
        <div className="border-t border-border/40 pt-12 space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Engineered for High-Scale Applications
          </h2>
          <p className="text-sm text-muted-foreground">
            Clean code architecture designed by engineers who care about bundle size and developer experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="p-5 border border-border/50 bg-card/40 space-y-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">3-Tier Import System</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Import from full package, category bundle (<code className="text-foreground">/core</code>, <code className="text-foreground">/forms</code>), or single components (<code className="text-foreground">/button</code>).
            </p>
          </Card>

          <Card className="p-5 border border-border/50 bg-card/40 space-y-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">Universal React Support</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strictly typed with peer dependency support across React 18 and React 19 without type friction.
            </p>
          </Card>

          <Card className="p-5 border border-border/50 bg-card/40 space-y-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <Cpu className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">Minimal Dependencies</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Only standard utilities: <code className="text-foreground">clsx</code>, <code className="text-foreground">tailwind-merge</code>, and <code className="text-foreground">lucide-react</code>. No heavy runtime baggage.
            </p>
          </Card>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-xl border border-border/60 bg-gradient-to-b from-card/80 to-muted/20 space-y-4 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Start Building with ORYN UI Today
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Discover all 75+ components with comprehensive interactive previews, props tables, and code snippets.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/docs/components">
              <Button size="lg" className="px-6 font-semibold">
                <span>Explore Component Library</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/installation">
              <Button variant="outline" size="lg" className="px-6">
                <span>Read Setup Guide</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}