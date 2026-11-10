"use client"

import React, { useState, useMemo } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Checkbox,
  Switch,
  Slider,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert
} from '@oryn/ui'
import { 
  Palette, 
  Check, 
  Copy, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  Code2, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Info,
  CheckCircle2
} from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'

interface PresetTheme {
  id: string
  name: string
  description: string
  colorBadge: string
  light: {
    primary: string
    primaryForeground: string
  }
  dark: {
    primary: string
    primaryForeground: string
  }
}

const PRESETS: PresetTheme[] = [
  {
    id: 'zinc',
    name: 'Zinc',
    description: 'Crisp, industrial monochrome aesthetic',
    colorBadge: 'bg-zinc-900 dark:bg-zinc-100',
    light: { primary: '240 5.9% 10%', primaryForeground: '0 0% 98%' },
    dark: { primary: '0 0% 98%', primaryForeground: '240 5.9% 10%' }
  },
  {
    id: 'indigo',
    name: 'Indigo',
    description: 'Enterprise cloud and modern SaaS standard',
    colorBadge: 'bg-indigo-600',
    light: { primary: '226 70% 55.5%', primaryForeground: '0 0% 100%' },
    dark: { primary: '226 70% 62%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Fintech, growth, and sustainability',
    colorBadge: 'bg-emerald-600',
    light: { primary: '158 64% 40%', primaryForeground: '0 0% 100%' },
    dark: { primary: '158 64% 48%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Consumer luxury, warmth, and hospitality',
    colorBadge: 'bg-rose-600',
    light: { primary: '346 77% 49.8%', primaryForeground: '0 0% 100%' },
    dark: { primary: '346 77% 58%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'High-tech cyan, devtools, and data systems',
    colorBadge: 'bg-cyan-600',
    light: { primary: '199 89% 48%', primaryForeground: '0 0% 100%' },
    dark: { primary: '199 89% 54%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'violet',
    name: 'Violet',
    description: 'Creative intelligence, studio, and deep tech',
    colorBadge: 'bg-violet-600',
    light: { primary: '262 83% 58%', primaryForeground: '0 0% 100%' },
    dark: { primary: '262 83% 66%', primaryForeground: '0 0% 100%' }
  }
]

const RADIUS_OPTIONS = [
  { label: '0px', value: '0rem', name: 'Sharp' },
  { label: '4px', value: '0.25rem', name: 'Small' },
  { label: '8px', value: '0.5rem', name: 'Medium (Default)' },
  { label: '12px', value: '0.75rem', name: 'Large' },
  { label: '16px', value: '1rem', name: 'X-Large' },
  { label: 'Full', value: '9999px', name: 'Pill' }
]

export default function ThemeBuilderPage() {
  const [selectedPreset, setSelectedPreset] = useState<PresetTheme>(PRESETS[1]) // Indigo default
  const [radius, setRadius] = useState<string>('0.5rem')
  const [previewMode, setPreviewMode] = useState<'canvas' | 'code'>('canvas')
  const [codeTab, setCodeTab] = useState<'css' | 'tailwind'>('css')
  const [copied, setCopied] = useState(false)

  // Interactive sample state
  const [inputVal, setInputVal] = useState('enterprise-workspace')
  const [twoFactor, setTwoFactor] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [sliderVal, setSliderVal] = useState<number>(65)

  const cssVariablesSnippet = useMemo(() => {
    return `/* Add to your globals.css */
:root {
  --primary: ${selectedPreset.light.primary};
  --primary-foreground: ${selectedPreset.light.primaryForeground};
  --radius: ${radius};
}

.dark {
  --primary: ${selectedPreset.dark.primary};
  --primary-foreground: ${selectedPreset.dark.primaryForeground};
}`
  }, [selectedPreset, radius])

  const tailwindSnippet = useMemo(() => {
    return `// In your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
}`
  }, [])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setSelectedPreset(PRESETS[0])
    setRadius('0.5rem')
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Dynamic CSS Injection for Preview */}
      <style dangerouslySetInnerHTML={{
        __html: `
          #theme-preview-sandbox {
            --primary: ${selectedPreset.light.primary};
            --primary-foreground: ${selectedPreset.light.primaryForeground};
            --radius: ${radius};
          }
          .dark #theme-preview-sandbox {
            --primary: ${selectedPreset.dark.primary};
            --primary-foreground: ${selectedPreset.dark.primaryForeground};
            --radius: ${radius};
          }
          #theme-preview-sandbox button,
          #theme-preview-sandbox input,
          #theme-preview-sandbox .rounded-lg,
          #theme-preview-sandbox .rounded-md {
            border-radius: ${radius};
          }
        `
      }} />

      {/* Hero Header */}
      <div className="border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                <Palette className="h-3.5 w-3.5" />
                <span>Interactive Theme Builder</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                Tailor ORYN UI to Your Brand
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Customize primary accents, border radii, and visual density. Preview live components instantly and copy zero-runtime CSS tokens into your application.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-1.5 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={() => handleCopy(codeTab === 'css' ? cssVariablesSnippet : tailwindSnippet)}
                className="gap-1.5 text-xs"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied Tokens' : 'Export Theme'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Presets Selection */}
            <div className="p-5 rounded-xl border border-border/60 bg-card shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Color Presets
                </h2>
                <Badge variant="outline" className="text-[10px] uppercase font-mono">
                  {selectedPreset.name}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {PRESETS.map((preset) => {
                  const isSelected = selectedPreset.id === preset.id
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset)}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                          : 'border-border/60 hover:bg-muted/50'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full shrink-0 shadow-2xs ${preset.colorBadge}`} />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{preset.name}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <p className="text-[11px] text-muted-foreground pt-1">
                {selectedPreset.description}.
              </p>
            </div>

            {/* Radius Selector */}
            <div className="p-5 rounded-xl border border-border/60 bg-card shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-primary" />
                  Border Radius
                </h2>
                <span className="text-xs font-mono text-muted-foreground">{radius}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {RADIUS_OPTIONS.map((opt) => {
                  const isSelected = radius === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setRadius(opt.value)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border/60 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quick Export Panel */}
            <div className="p-5 rounded-xl border border-border/60 bg-card shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Active CSS Token</span>
                <button
                  onClick={() => handleCopy(`--primary: ${selectedPreset.light.primary}; --radius: ${radius};`)}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  Copy inline
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950 text-zinc-300 font-mono text-[11px] overflow-x-auto">
                <code>--primary: {selectedPreset.light.primary};</code>
                <br />
                <code>--radius: {radius};</code>
              </div>
            </div>

          </div>

          {/* Right Column: Live Showcase Sandbox & Code Output */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Segmented View Mode Toggle */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg">
                <button
                  onClick={() => setPreviewMode('canvas')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    previewMode === 'canvas'
                      ? 'bg-background text-foreground shadow-2xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Live Preview Canvas
                </button>
                <button
                  onClick={() => setPreviewMode('code')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    previewMode === 'code'
                      ? 'bg-background text-foreground shadow-2xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  Export Configuration
                </button>
              </div>

              {previewMode === 'code' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCodeTab('css')}
                    className={`px-2.5 py-1 rounded text-xs font-medium ${
                      codeTab === 'css' ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'
                    }`}
                  >
                    globals.css
                  </button>
                  <button
                    onClick={() => setCodeTab('tailwind')}
                    className={`px-2.5 py-1 rounded text-xs font-medium ${
                      codeTab === 'tailwind' ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'
                    }`}
                  >
                    tailwind.config.js
                  </button>
                </div>
              )}
            </div>

            {/* Canvas View */}
            {previewMode === 'canvas' && (
              <div id="theme-preview-sandbox" className="space-y-6">
                
                {/* Enterprise Dashboard Card */}
                <Card className="shadow-xs border-border/80">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">Workspace Preferences</CardTitle>
                        <Badge variant="outline" className="text-[10px]">
                          Production
                        </Badge>
                      </div>
                      <CardDescription className="text-xs mt-1">
                        Configure deployment policies and notification hooks for this cluster.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <Button variant="outline" size="sm" className="text-xs">
                        Audit Logs
                      </Button>
                      <Button size="sm" className="text-xs gap-1.5">
                        <Zap className="h-3.5 w-3.5" />
                        Save Changes
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-2">
                    
                    {/* Tabs */}
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="general" className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-foreground">Workspace Identifier</label>
                            <Input
                              value={inputVal}
                              onChange={(e) => setInputVal(e.target.value)}
                              placeholder="workspace-slug"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-foreground">Environment Tier</label>
                            <Input value="Enterprise High-Availability (EU-West)" readOnly />
                          </div>
                        </div>

                        {/* Interactive Sliders and Progress */}
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Resource Utilization Quota</span>
                            <span className="font-mono text-foreground font-medium">{sliderVal}%</span>
                          </div>
                          <Progress value={sliderVal} />
                        </div>
                      </TabsContent>

                      <TabsContent value="security" className="space-y-4 pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
                            <div>
                              <p className="text-xs font-medium text-foreground">Enforce Multi-Factor Authentication</p>
                              <p className="text-[11px] text-muted-foreground">Require hardware key or TOTP on login</p>
                            </div>
                            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
                            <div>
                              <p className="text-xs font-medium text-foreground">Automated Session Invalidation</p>
                              <p className="text-[11px] text-muted-foreground">Log out dormant connections after 30 minutes</p>
                            </div>
                            <Checkbox checked={autoSave} onCheckedChange={(c) => setAutoSave(!!c)} />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="billing" className="space-y-3 pt-4">
                        <Alert className="text-xs">
                          <Info className="h-4 w-4" />
                          <span>Enterprise billing renewal occurs on November 1st, 2026.</span>
                        </Alert>
                      </TabsContent>
                    </Tabs>

                    {/* Button Showcase Matrix */}
                    <div className="pt-2 border-t border-border/60 space-y-2">
                      <p className="text-xs font-medium text-foreground">Button Hierarchy & Variants</p>
                      <div className="flex flex-wrap gap-2.5">
                        <Button size="sm">Primary Action</Button>
                        <Button variant="secondary" size="sm">Secondary</Button>
                        <Button variant="outline" size="sm">Outlined</Button>
                        <Button variant="ghost" size="sm">Ghost</Button>
                        <Button variant="destructive" size="sm">Destructive</Button>
                        <Button size="sm" loading>Syncing</Button>
                      </div>
                    </div>

                  </CardContent>

                  <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Zero-runtime design tokens compiled directly into CSS custom properties</span>
                    </span>
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                      React 19 Native
                    </Badge>
                  </CardFooter>
                </Card>

              </div>
            )}

            {/* Code Output View */}
            {previewMode === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Copy this snippet directly into your project to apply the active theme tokens.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(codeTab === 'css' ? cssVariablesSnippet : tailwindSnippet)}
                    className="gap-1.5 text-xs"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied to Clipboard' : 'Copy Snippet'}
                  </Button>
                </div>

                <CodeBlock
                  language={codeTab === 'css' ? 'css' : 'javascript'}
                  code={codeTab === 'css' ? cssVariablesSnippet : tailwindSnippet}
                />
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}

