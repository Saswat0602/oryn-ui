"use client"

import React, { useState, useMemo, useEffect } from 'react'
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
  Alert,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from 'oryn-ui'
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
  Download,
  Share2,
  Sun,
  Moon,
  Type,
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight,
  Search,
  CheckCircle2
} from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import {
  BaseColorName,
  RadiusValue,
  FontFamily,
  ThemeConfig,
  COLOR_PRESETS,
  BASE_PALETTES,
  RADIUS_OPTIONS,
  FONT_OPTIONS,
  isValidHex,
  normalizeHex,
  hexToHslString,
  getLuminance,
  hexToRgb,
  deriveThemeTokensFromHex,
  generateCssVariables,
  generateTailwindV3,
  generateTailwindV4,
  generateJsonTokens
} from '@/lib/theme-builder'

export default function ThemeBuilderPage() {
  // Theme State
  const [primaryHex, setPrimaryHex] = useState<string>('#4f46e5') // Indigo
  const [hexInput, setHexInput] = useState<string>('#4f46e5')
  const [baseColor, setBaseColor] = useState<BaseColorName>('zinc')
  const [radius, setRadius] = useState<RadiusValue>('0.5rem')
  const [font, setFont] = useState<FontFamily>('sans')
  const [isCustom, setIsCustom] = useState<boolean>(false)
  const [activePresetId, setActivePresetId] = useState<string>('indigo')

  // Preview & Export State
  const [sandboxMode, setSandboxMode] = useState<'inherit' | 'light' | 'dark'>('inherit')
  const [previewTab, setPreviewTab] = useState<'canvas' | 'code'>('canvas')
  const [exportFormat, setExportFormat] = useState<'css' | 'tailwind-v4' | 'tailwind-v3' | 'json'>('css')
  const [copied, setCopied] = useState<boolean>(false)
  const [shareCopied, setShareCopied] = useState<boolean>(false)

  // Interactive Form Sample State
  const [inputVal, setInputVal] = useState<string>('enterprise-workspace')
  const [twoFactor, setTwoFactor] = useState<boolean>(true)
  const [autoSave, setAutoSave] = useState<boolean>(true)
  const [sliderVal, setSliderVal] = useState<number>(68)
  const [clusterRegion, setClusterRegion] = useState<string>('us-east-1')

  // Derive theme tokens dynamically
  const activeTokens = useMemo(() => {
    return deriveThemeTokensFromHex(primaryHex)
  }, [primaryHex])

  const activeBasePalette = useMemo(() => {
    return BASE_PALETTES.find((b) => b.id === baseColor) || BASE_PALETTES[0]
  }, [baseColor])

  const themeConfig: ThemeConfig = useMemo(() => ({
    primaryHex,
    baseColor,
    radius,
    font,
    isCustom,
    activePresetId
  }), [primaryHex, baseColor, radius, font, isCustom, activePresetId])

  // Contrast calculations for accessibility feedback
  const contrastInfo = useMemo(() => {
    const rgb = hexToRgb(primaryHex)
    const lum = getLuminance(rgb)
    const contrastRatio = lum > 0.5 ? ((lum + 0.05) / (0 + 0.05)) : ((1 + 0.05) / (lum + 0.05))
    const rounded = Math.round(contrastRatio * 10) / 10
    const passesAA = rounded >= 4.5
    const passesAAA = rounded >= 7.0
    return {
      ratio: `${rounded}:1`,
      passesAA,
      passesAAA,
      badgeText: passesAAA ? 'WCAG AAA' : passesAA ? 'WCAG AA' : 'WCAG Large'
    }
  }, [primaryHex])

  // Generated Snippets
  const cssVariablesSnippet = useMemo(() => {
    return generateCssVariables(themeConfig, activeTokens, activeBasePalette)
  }, [themeConfig, activeTokens, activeBasePalette])

  const tailwindV4Snippet = useMemo(() => {
    return generateTailwindV4(themeConfig, activeTokens)
  }, [themeConfig, activeTokens])

  const tailwindV3Snippet = useMemo(() => {
    return generateTailwindV3()
  }, [])

  const jsonSnippet = useMemo(() => {
    return generateJsonTokens(themeConfig, activeTokens)
  }, [themeConfig, activeTokens])

  // Select Preset Handler
  const handleSelectPreset = (presetId: string) => {
    const preset = COLOR_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    setActivePresetId(preset.id)
    setIsCustom(false)
    setPrimaryHex(preset.hex)
    setHexInput(preset.hex)
  }

  // Custom Color Input Handler
  const handleHexChange = (value: string) => {
    setHexInput(value)
    if (isValidHex(value)) {
      const normalized = normalizeHex(value)
      setPrimaryHex(normalized)
      setIsCustom(true)
      setActivePresetId('')
    }
  }

  // Reset to default
  const handleReset = () => {
    handleSelectPreset('indigo')
    setBaseColor('zinc')
    setRadius('0.5rem')
    setFont('sans')
  }

  // Copy code handler
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Download CSS file handler
  const handleDownloadCss = () => {
    const blob = new Blob([cssVariablesSnippet], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `oryn-theme-${isCustom ? 'custom' : activePresetId}.css`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Share link handler
  const handleShare = () => {
    const params = new URLSearchParams({
      primary: primaryHex,
      radius,
      base: baseColor,
      font
    })
    const shareUrl = `${window.location.origin}${window.location.pathname}#${params.toString()}`
    navigator.clipboard.writeText(shareUrl)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
  }

  // Parse URL hash on mount or hashchange
  useEffect(() => {
    const applyHash = () => {
      if (typeof window === 'undefined' || !window.location.hash) return
      try {
        const hash = window.location.hash.replace(/^#/, '')
        const params = new URLSearchParams(hash)
        const primary = params.get('primary')
        const rad = params.get('radius') as RadiusValue | null
        const base = params.get('base') as BaseColorName | null
        const fnt = params.get('font') as FontFamily | null

        if (primary && isValidHex(primary)) {
          const norm = normalizeHex(primary)
          setPrimaryHex(norm)
          setHexInput(norm)
          setIsCustom(true)
        }
        if (rad && RADIUS_OPTIONS.some((r) => r.value === rad)) {
          setRadius(rad)
        }
        if (base && BASE_PALETTES.some((b) => b.id === base)) {
          setBaseColor(base)
        }
        if (fnt && FONT_OPTIONS.some((f) => f.id === fnt)) {
          setFont(fnt)
        }
      } catch {
        // Fallback safely
      }
    }

    // Schedule on animation frame to avoid synchronous cascading render warning
    const frameId = requestAnimationFrame(applyHash)
    window.addEventListener('hashchange', applyHash)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('hashchange', applyHash)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Live Sandbox CSS Token Injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
          #theme-preview-sandbox {
            --primary: ${activeTokens.light.primary};
            --primary-foreground: ${activeTokens.light.primaryForeground};
            --ring: ${activeTokens.light.primary};
            --radius: ${radius};
          }
          #theme-preview-sandbox.theme-sandbox-dark,
          .dark #theme-preview-sandbox:not(.theme-sandbox-light) {
            --primary: ${activeTokens.dark.primary};
            --primary-foreground: ${activeTokens.dark.primaryForeground};
            --ring: ${activeTokens.dark.primary};
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                <Palette className="h-3.5 w-3.5" />
                <span>Interactive Theme Builder</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                Tailor ORYN UI to Your Brand
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Configure primary brand accents, neutral base tones, border radii, and typography. Preview live React components in real time and copy zero-runtime CSS tokens.
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-1.5 text-xs"
                title="Copy shareable theme URL"
              >
                {shareCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{shareCopied ? 'Link Copied' : 'Share Theme'}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadCss}
                className="gap-1.5 text-xs"
                title="Download theme.css file"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download CSS</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-1.5 text-xs"
                title="Reset theme to defaults"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </Button>

              <Button
                size="sm"
                onClick={() => handleCopy(
                  exportFormat === 'css' ? cssVariablesSnippet : 
                  exportFormat === 'tailwind-v4' ? tailwindV4Snippet : 
                  exportFormat === 'tailwind-v3' ? tailwindV3Snippet : 
                  jsonSnippet
                )}
                className="gap-1.5 text-xs font-semibold"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied Tokens' : 'Export Tokens'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Theme Customization Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Custom Brand Color Picker & Swatch Input */}
            <div className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">
                    Primary Brand Color
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={contrastInfo.passesAA ? 'outline' : 'secondary'} 
                    className="text-[10px] font-mono px-2 py-0.5"
                    title={`Contrast Ratio: ${contrastInfo.ratio}`}
                  >
                    {contrastInfo.badgeText} ({contrastInfo.ratio})
                  </Badge>
                </div>
              </div>

              {/* Direct Color Picker & Hex Input Box */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/20">
                  {/* Native Color Picker Swatch */}
                  <label 
                    className="relative w-11 h-11 rounded-xl border border-black/20 dark:border-white/20 shadow-xs cursor-pointer shrink-0 overflow-hidden flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                    style={{ backgroundColor: primaryHex }}
                    title="Click to open color picker"
                  >
                    <input
                      type="color"
                      value={primaryHex}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </label>

                  {/* Hex Text Input */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Custom Color (Hex)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={hexInput}
                        onChange={(e) => handleHexChange(e.target.value)}
                        placeholder="#4f46e5"
                        className="h-8 font-mono text-xs uppercase"
                        maxLength={7}
                      />
                      <span className="text-[11px] font-mono text-muted-foreground/80 shrink-0 bg-muted px-2 py-1 rounded-md border border-border/40">
                        {hexToHslString(primaryHex)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Select any custom color via the picker, paste a hex code, or choose from the curated designer palettes below.
                </p>
              </div>

              {/* Designer Presets Palette Grid */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    Curated Designer Presets
                  </span>
                  {isCustom && (
                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Custom Color Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {COLOR_PRESETS.map((preset) => {
                    const isSelected = !isCustom && activePresetId === preset.id
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.id)}
                        className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/10 ring-2 ring-primary ring-offset-1 shadow-xs'
                            : 'border-border/60 hover:bg-muted/40 hover:border-border'
                        }`}
                        title={`${preset.name} (${preset.hex})`}
                      >
                        <span 
                          className="w-5 h-5 rounded-full shadow-2xs transition-transform group-hover:scale-110 flex items-center justify-center"
                          style={{ backgroundColor: preset.hex }}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white drop-shadow-xs" />}
                        </span>
                        <span className="text-[11px] font-medium text-foreground truncate w-full">
                          {preset.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Base Neutral Palette */}
            <div className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">
                    Base Neutral Palette
                  </h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground uppercase">{baseColor}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {BASE_PALETTES.map((base) => {
                  const isSelected = baseColor === base.id
                  return (
                    <button
                      key={base.id}
                      type="button"
                      onClick={() => setBaseColor(base.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-2xs font-semibold'
                          : 'border-border/60 hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <p className="text-xs font-semibold text-foreground">{base.name}</p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5 leading-snug">
                        {base.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Border Radius Options */}
            <div className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">
                    Border Radius
                  </h2>
                </div>
                <span className="text-xs font-mono font-medium text-muted-foreground">{radius}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {RADIUS_OPTIONS.map((opt) => {
                  const isSelected = radius === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRadius(opt.value)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-semibold shadow-2xs'
                          : 'border-border/60 text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                      }`}
                    >
                      <span className="block font-semibold">{opt.label}</span>
                      <span className="text-[10px] opacity-75">{opt.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Typography Selection */}
            <div className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">
                    Typography Style
                  </h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground capitalize">{font}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {FONT_OPTIONS.map((f) => {
                  const isSelected = font === f.id
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFont(f.id)}
                      className={`p-2.5 text-center rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-semibold shadow-2xs'
                          : 'border-border/60 text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                      }`}
                    >
                      <span className={`text-base block font-medium ${f.className}`}>Ag</span>
                      <span className="text-xs font-medium block mt-0.5">{f.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Showcase & Export Hub (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* View Mode & In-Canvas Sandbox Mode Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5 flex-wrap gap-3">
              {/* Segmented Mode: Live Preview vs Export */}
              <div className="inline-flex items-center p-1 rounded-xl bg-muted/60 border border-border/50 text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewTab('canvas')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                    previewTab === 'canvas'
                      ? 'bg-background text-foreground shadow-2xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Live Sandbox</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTab('code')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                    previewTab === 'code'
                      ? 'bg-background text-foreground shadow-2xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Export Code</span>
                </button>
              </div>

              {/* In-Canvas Theme Preview (Light / Dark Switcher) */}
              {previewTab === 'canvas' && (
                <div className="inline-flex items-center p-1 rounded-xl bg-muted/60 border border-border/50 text-xs">
                  <button
                    type="button"
                    onClick={() => setSandboxMode('light')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      sandboxMode === 'light'
                        ? 'bg-background text-foreground shadow-2xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Simulate light theme"
                  >
                    <Sun className="h-3 w-3" />
                    <span>Light</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSandboxMode('dark')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      sandboxMode === 'dark'
                        ? 'bg-background text-foreground shadow-2xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Simulate dark theme"
                  >
                    <Moon className="h-3 w-3" />
                    <span>Dark</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSandboxMode('inherit')}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      sandboxMode === 'inherit'
                        ? 'bg-background text-foreground shadow-2xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Inherit current page theme"
                  >
                    <span>Auto</span>
                  </button>
                </div>
              )}

              {/* Code Export Format Switcher */}
              {previewTab === 'code' && (
                <div className="inline-flex items-center p-1 rounded-xl bg-muted/60 border border-border/50 text-xs">
                  {(['css', 'tailwind-v4', 'tailwind-v3', 'json'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setExportFormat(fmt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        exportFormat === fmt
                          ? 'bg-background text-foreground shadow-2xs font-semibold'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {fmt === 'css' ? 'globals.css' : fmt === 'tailwind-v4' ? 'Tailwind v4' : fmt === 'tailwind-v3' ? 'Tailwind v3' : 'JSON'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LIVE PREVIEW CANVAS */}
            {previewTab === 'canvas' && (
              <div 
                id="theme-preview-sandbox" 
                className={`space-y-6 ${
                  sandboxMode === 'dark' 
                    ? 'theme-sandbox-dark dark bg-[#09090b] text-zinc-100 p-6 rounded-2xl border border-zinc-800' 
                    : sandboxMode === 'light' 
                    ? 'theme-sandbox-light bg-white text-zinc-900 p-6 rounded-2xl border border-zinc-200' 
                    : ''
                } ${font === 'serif' ? 'font-serif' : font === 'mono' ? 'font-mono' : 'font-sans'}`}
              >
                
                {/* 1. Quick Stats Metric Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-border/70 bg-card shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-xs font-medium">Monthly Active</span>
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-foreground">
                      84,230
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+14.2% vs last month</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border/70 bg-card shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-xs font-medium">API Throughput</span>
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-foreground">
                      99.98%
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>All regions healthy</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border/70 bg-card shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-xs font-medium">Active Quota</span>
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-foreground">
                      {sliderVal}%
                    </div>
                    <div className="pt-0.5">
                      <Progress value={sliderVal} className="h-1.5" />
                    </div>
                  </div>
                </div>

                {/* 2. Enterprise Dashboard Container Card */}
                <Card className="shadow-xs border-border/80">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">Workspace Preferences</CardTitle>
                        <Badge variant="outline" className="text-[10px] font-mono">
                          Enterprise
                        </Badge>
                      </div>
                      <CardDescription className="text-xs mt-1">
                        Configure deployment policies, cluster clusters, and security policies.
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
                    
                    {/* Modern Tabs */}
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                      </TabsList>
                      
                      {/* General Tab */}
                      <TabsContent value="general" className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">
                              Workspace Identifier
                            </label>
                            <Input
                              value={inputVal}
                              onChange={(e) => setInputVal(e.target.value)}
                              placeholder="workspace-slug"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">
                              Primary Cluster Region
                            </label>
                            <Select value={clusterRegion} onValueChange={setClusterRegion}>
                              <SelectTrigger className="w-full h-9 text-xs">
                                <SelectValue placeholder="Select region" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                                <SelectItem value="eu-west-1">Europe (Frankfurt)</SelectItem>
                                <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Interactive Range Slider */}
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Resource Utilization Quota</span>
                            <span className="font-mono text-foreground font-semibold">{sliderVal}%</span>
                          </div>
                          <Slider
                            value={sliderVal}
                            onChange={(val: number | number[]) => setSliderVal(typeof val === 'number' ? val : (Array.isArray(val) ? val[0] : 50))}
                            min={10}
                            max={100}
                            step={1}
                          />
                        </div>
                      </TabsContent>

                      {/* Security Tab */}
                      <TabsContent value="security" className="space-y-4 pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/20">
                            <div className="space-y-0.5">
                              <p className="text-xs font-semibold text-foreground">Enforce Hardware Key / 2FA</p>
                              <p className="text-[11px] text-muted-foreground">Require WebAuthn or TOTP on every login</p>
                            </div>
                            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                          </div>

                          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/20">
                            <div className="space-y-0.5">
                              <p className="text-xs font-semibold text-foreground">Automated Session Invalidation</p>
                              <p className="text-[11px] text-muted-foreground">Log out dormant sessions after 30 minutes</p>
                            </div>
                            <Checkbox checked={autoSave} onCheckedChange={(c) => setAutoSave(!!c)} />
                          </div>
                        </div>
                      </TabsContent>

                      {/* Billing Tab */}
                      <TabsContent value="billing" className="space-y-3 pt-4">
                        <Alert className="text-xs">
                          <Info className="h-4 w-4" />
                          <span>Enterprise billing cycle renews on November 1st, 2026. Custom token allocation applies.</span>
                        </Alert>
                      </TabsContent>
                    </Tabs>

                    {/* Button Hierarchy Matrix */}
                    <div className="pt-3 border-t border-border/60 space-y-2.5">
                      <p className="text-xs font-semibold text-foreground">
                        Button Hierarchy &amp; Action States
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        <Button size="sm">Primary Action</Button>
                        <Button variant="secondary" size="sm">Secondary</Button>
                        <Button variant="outline" size="sm">Outlined</Button>
                        <Button variant="ghost" size="sm">Ghost</Button>
                        <Button variant="destructive" size="sm">Destructive</Button>
                        <Button size="sm" loading>Processing</Button>
                      </div>
                    </div>

                  </CardContent>

                  <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Zero-runtime tokens compiled into standard CSS custom properties</span>
                    </span>
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                      Live React 19 Engine
                    </Badge>
                  </CardFooter>
                </Card>

              </div>
            )}

            {/* CODE EXPORT VIEW */}
            {previewTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {exportFormat === 'css' && 'Paste into your globals.css to apply custom CSS variables across light and dark modes.'}
                    {exportFormat === 'tailwind-v4' && 'Next.js 16 + Tailwind CSS v4 @theme declaration block.'}
                    {exportFormat === 'tailwind-v3' && 'Classic Tailwind v3 config extend block.'}
                    {exportFormat === 'json' && 'Raw design tokens JSON for programmatic tooling and design systems.'}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(
                      exportFormat === 'css' ? cssVariablesSnippet : 
                      exportFormat === 'tailwind-v4' ? tailwindV4Snippet : 
                      exportFormat === 'tailwind-v3' ? tailwindV3Snippet : 
                      jsonSnippet
                    )}
                    className="gap-1.5 text-xs font-semibold shrink-0"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Snippet'}</span>
                  </Button>
                </div>

                <CodeBlock
                  language={exportFormat === 'json' ? 'json' : exportFormat === 'css' || exportFormat === 'tailwind-v4' ? 'css' : 'javascript'}
                  code={
                    exportFormat === 'css' ? cssVariablesSnippet : 
                    exportFormat === 'tailwind-v4' ? tailwindV4Snippet : 
                    exportFormat === 'tailwind-v3' ? tailwindV3Snippet : 
                    jsonSnippet
                  }
                />
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}
