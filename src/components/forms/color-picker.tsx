"use client"

import * as React from "react"
import { Check, ChevronDown, Copy, Palette } from "../../icons"
import { cn } from "../../lib/utils"
import { useControllableState } from "../../lib/use-controllable-state"
import { useClickOutside } from "../../lib/use-click-outside"
import { Portal } from "../../primitives/portal"

// --- COLOR CONVERSION UTILITIES ---

export interface HsvColor {
  h: number // 0-360
  s: number // 0-100
  v: number // 0-100
  a: number // 0-1
}

export interface RgbColor {
  r: number // 0-255
  g: number // 0-255
  b: number // 0-255
  a: number // 0-1
}

export interface HslColor {
  h: number // 0-360
  s: number // 0-100
  l: number // 0-100
  a: number // 0-1
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}

export function hexToRgb(hex: string): RgbColor {
  let clean = hex.replace(/^#/, "").trim()
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("")
  }
  if (clean.length === 4) {
    clean = clean.split("").map((c) => c + c).join("")
  }

  const num = parseInt(clean.slice(0, 6), 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  let a = 1

  if (clean.length === 8) {
    const alphaNum = parseInt(clean.slice(6, 8), 16)
    a = Number((alphaNum / 255).toFixed(2))
  }

  return {
    r: isNaN(r) ? 0 : r,
    g: isNaN(g) ? 0 : g,
    b: isNaN(b) ? 0 : b,
    a: isNaN(a) ? 1 : a,
  }
}

export function rgbToHex(r: number, g: number, b: number, a = 1): string {
  const toHex = (n: number) => {
    const h = Math.round(clamp(n, 0, 255)).toString(16)
    return h.length === 1 ? "0" + h : h
  }
  const base = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  if (a < 1) {
    const alphaHex = Math.round(clamp(a, 0, 1) * 255).toString(16)
    return `${base}${alphaHex.length === 1 ? "0" + alphaHex : alphaHex}`
  }
  return base
}

export function rgbToHsv(r: number, g: number, b: number, a = 1): HsvColor {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta) % 6
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2
    } else {
      h = (rNorm - gNorm) / delta + 4
    }
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100)
  const v = Math.round(max * 100)

  return { h, s, v, a }
}

export function hsvToRgb(h: number, s: number, v: number, a = 1): RgbColor {
  const sNorm = s / 100
  const vNorm = v / 100
  const c = vNorm * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = vNorm - c

  let r1 = 0
  let g1 = 0
  let b1 = 0

  if (h >= 0 && h < 60) {
    r1 = c; g1 = x; b1 = 0
  } else if (h >= 60 && h < 120) {
    r1 = x; g1 = c; b1 = 0
  } else if (h >= 120 && h < 180) {
    r1 = 0; g1 = c; b1 = x
  } else if (h >= 180 && h < 240) {
    r1 = 0; g1 = x; b1 = c
  } else if (h >= 240 && h < 300) {
    r1 = x; g1 = 0; b1 = c
  } else {
    r1 = c; g1 = 0; b1 = x
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
    a,
  }
}

export function hsvToHex(h: number, s: number, v: number, a = 1): string {
  const { r, g, b } = hsvToRgb(h, s, v, a)
  return rgbToHex(r, g, b, a)
}

export function hexToHsv(hex: string): HsvColor {
  const { r, g, b, a } = hexToRgb(hex)
  return rgbToHsv(r, g, b, a)
}

export function hsvToHsl(h: number, s: number, v: number, a = 1): HslColor {
  const sNorm = s / 100
  const vNorm = v / 100
  const lNorm = vNorm * (1 - sNorm / 2)
  const l = Math.round(lNorm * 100)
  const sHsl =
    lNorm === 0 || lNorm === 1
      ? 0
      : Math.round(((vNorm - lNorm) / Math.min(lNorm, 1 - lNorm)) * 100)

  return { h, s: clamp(sHsl, 0, 100), l: clamp(l, 0, 100), a }
}

export function hslToHsv(h: number, s: number, l: number, a = 1): HsvColor {
  const sNorm = s / 100
  const lNorm = l / 100
  const vNorm = lNorm + sNorm * Math.min(lNorm, 1 - lNorm)
  const sHsv = vNorm === 0 ? 0 : 2 * (1 - lNorm / vNorm)
  return {
    h,
    s: clamp(Math.round(sHsv * 100), 0, 100),
    v: clamp(Math.round(vNorm * 100), 0, 100),
    a,
  }
}

export const DEFAULT_PRESETS = [
  "#09090b", // Zinc 950
  "#64748b", // Slate 500
  "#3b82f6", // Blue 500
  "#6366f1", // Indigo 500
  "#8b5cf6", // Violet 500
  "#ec4899", // Pink 500
  "#f43f5e", // Rose 500
  "#ef4444", // Red 500
  "#f97316", // Orange 500
  "#f59e0b", // Amber 500
  "#10b981", // Emerald 500
  "#14b8a6", // Teal 500
  "#06b6d4", // Cyan 500
  "#0284c7", // Sky 600
  "#ffffff", // Pure White
  "#a1a1aa", // Zinc 400
]

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  format?: "hex" | "rgb" | "hsl"
  showAlpha?: boolean
  showEyeDropper?: boolean
  showPresets?: boolean
  presets?: string[]
  inline?: boolean
  disabled?: boolean
  size?: "sm" | "default" | "lg"
  triggerClassName?: string
  popoverClassName?: string
}

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value: controlledValue,
      defaultValue = "#3b82f6",
      onChange,
      format = "hex",
      showAlpha = false,
      showEyeDropper = true,
      showPresets = true,
      presets = DEFAULT_PRESETS,
      inline = false,
      disabled = false,
      size = "default",
      className,
      triggerClassName,
      popoverClassName,
      ...props
    },
    ref
  ) => {
    // Current hex value state
    const [color, setColor] = useControllableState<string>({
      prop: controlledValue,
      defaultProp: defaultValue,
      onChange,
    })

    // Active HSV representation
    const [hsv, setHsv] = React.useState<HsvColor>(() => hexToHsv(color || "#3b82f6"))

    // Keep HSV in sync when external controlled value updates
    React.useEffect(() => {
      if (color) {
        const parsed = hexToHsv(color)
        setHsv((prev) => {
          // Preserve hue when saturation or value is 0
          if (parsed.s === 0 || parsed.v === 0) {
            return { ...parsed, h: prev.h }
          }
          return parsed
        })
      }
    }, [color])

    // Popover open state
    const [isOpen, setIsOpen] = React.useState(false)
    const triggerRef = React.useRef<HTMLButtonElement | null>(null)
    const popoverRef = React.useRef<HTMLDivElement | null>(null)
    const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

    const generatedId = React.useId()
    const dialogId = `color-picker-dialog-${generatedId}`

    // Formats: 'hex' | 'rgb' | 'hsl'
    const [activeFormat, setActiveFormat] = React.useState<"hex" | "rgb" | "hsl">(format)
    const [copied, setCopied] = React.useState(false)

    // Sync trigger rect
    const updateTriggerRect = React.useCallback(() => {
      if (triggerRef.current) {
        setTriggerRect(triggerRef.current.getBoundingClientRect())
      }
    }, [])

    React.useEffect(() => {
      if (!isOpen) return
      updateTriggerRect()
      const handleScrollOrResize = () => updateTriggerRect()
      window.addEventListener("scroll", handleScrollOrResize, { passive: true, capture: true })
      window.addEventListener("resize", handleScrollOrResize)
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true)
        window.removeEventListener("resize", handleScrollOrResize)
      }
    }, [isOpen, updateTriggerRect])

    React.useEffect(() => {
      if (!isOpen) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setIsOpen(false)
          triggerRef.current?.focus()
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen])

    useClickOutside(
      popoverRef,
      (e) => {
        if (triggerRef.current && triggerRef.current.contains(e.target as Node)) {
          return
        }
        setIsOpen(false)
      },
      isOpen
    )

    // Dispatch color update from HSV
    const updateFromHsv = React.useCallback(
      (newHsv: HsvColor) => {
        setHsv(newHsv)
        const hex = hsvToHex(newHsv.h, newHsv.s, newHsv.v, showAlpha ? newHsv.a : 1)
        setColor(hex)
      },
      [setColor, showAlpha]
    )

    // Direct hex text input handler
    const handleHexInput = (raw: string) => {
      let formatted = raw.trim()
      if (!formatted.startsWith("#")) formatted = "#" + formatted
      if (/^#[0-9a-fA-F]{3,8}$/.test(formatted)) {
        const nextHsv = hexToHsv(formatted)
        updateFromHsv(nextHsv)
      }
    }

    // Native eye-dropper API
    const handleEyeDropper = async () => {
      if (typeof window !== "undefined" && "EyeDropper" in window) {
        try {
          // @ts-expect-error EyeDropper is a modern Web API
          const eyeDropper = new window.EyeDropper()
          const result = await eyeDropper.open()
          if (result && result.sRGBHex) {
            const nextHsv = hexToHsv(result.sRGBHex)
            updateFromHsv(nextHsv)
          }
        } catch {
          // User canceled or failed
        }
      }
    }

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(color || "#000000")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Fallback
      }
    }

    // 2D Saturation-Value Canvas Dragging
    const satAreaRef = React.useRef<HTMLDivElement | null>(null)

    const handleSatPointer = React.useCallback(
      (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!satAreaRef.current) return
        const rect = satAreaRef.current.getBoundingClientRect()
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

        const x = clamp(clientX - rect.left, 0, rect.width)
        const y = clamp(clientY - rect.top, 0, rect.height)

        const s = Math.round((x / rect.width) * 100)
        const v = Math.round((1 - y / rect.height) * 100)

        updateFromHsv({ ...hsv, s, v })
      },
      [hsv, updateFromHsv]
    )

    const onSatMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      handleSatPointer(e)

      const onMouseMove = (moveEvt: MouseEvent) => handleSatPointer(moveEvt)
      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    }

    const onSatTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      handleSatPointer(e)

      const onTouchMove = (moveEvt: TouchEvent) => handleSatPointer(moveEvt)
      const onTouchEnd = () => {
        window.removeEventListener("touchmove", onTouchMove)
        window.removeEventListener("touchend", onTouchEnd)
      }
      window.addEventListener("touchmove", onTouchMove)
      window.addEventListener("touchend", onTouchEnd)
    }

    // Hue Slider Dragging
    const hueTrackRef = React.useRef<HTMLDivElement | null>(null)

    const handleHuePointer = React.useCallback(
      (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!hueTrackRef.current) return
        const rect = hueTrackRef.current.getBoundingClientRect()
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        const x = clamp(clientX - rect.left, 0, rect.width)
        const h = Math.round((x / rect.width) * 360) % 360

        updateFromHsv({ ...hsv, h })
      },
      [hsv, updateFromHsv]
    )

    const onHueMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      handleHuePointer(e)

      const onMouseMove = (moveEvt: MouseEvent) => handleHuePointer(moveEvt)
      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    }

    // Alpha Slider Dragging
    const alphaTrackRef = React.useRef<HTMLDivElement | null>(null)

    const handleAlphaPointer = React.useCallback(
      (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!alphaTrackRef.current) return
        const rect = alphaTrackRef.current.getBoundingClientRect()
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        const x = clamp(clientX - rect.left, 0, rect.width)
        const a = Number((x / rect.width).toFixed(2))

        updateFromHsv({ ...hsv, a })
      },
      [hsv, updateFromHsv]
    )

    const onAlphaMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      handleAlphaPointer(e)

      const onMouseMove = (moveEvt: MouseEvent) => handleAlphaPointer(moveEvt)
      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    }

    // RGB / HSL derived states
    const rgb = React.useMemo(() => hsvToRgb(hsv.h, hsv.s, hsv.v, hsv.a), [hsv])
    const hsl = React.useMemo(() => hsvToHsl(hsv.h, hsv.s, hsv.v, hsv.a), [hsv])

    // Keyboard handlers for sliders
    const onSatKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 5 : 1
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          updateFromHsv({ ...hsv, s: clamp(hsv.s - step, 0, 100) })
          break
        case "ArrowRight":
          e.preventDefault()
          updateFromHsv({ ...hsv, s: clamp(hsv.s + step, 0, 100) })
          break
        case "ArrowUp":
          e.preventDefault()
          updateFromHsv({ ...hsv, v: clamp(hsv.v + step, 0, 100) })
          break
        case "ArrowDown":
          e.preventDefault()
          updateFromHsv({ ...hsv, v: clamp(hsv.v - step, 0, 100) })
          break
        case "Home":
          e.preventDefault()
          updateFromHsv({ ...hsv, s: 0 })
          break
        case "End":
          e.preventDefault()
          updateFromHsv({ ...hsv, s: 100 })
          break
        case "PageUp":
          e.preventDefault()
          updateFromHsv({ ...hsv, v: 100 })
          break
        case "PageDown":
          e.preventDefault()
          updateFromHsv({ ...hsv, v: 0 })
          break
      }
    }

    const onHueKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 10 : 1
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault()
          updateFromHsv({ ...hsv, h: (hsv.h - step + 360) % 360 })
          break
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault()
          updateFromHsv({ ...hsv, h: (hsv.h + step) % 360 })
          break
        case "Home":
          e.preventDefault()
          updateFromHsv({ ...hsv, h: 0 })
          break
        case "End":
          e.preventDefault()
          updateFromHsv({ ...hsv, h: 360 })
          break
      }
    }

    const onAlphaKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 0.05 : 0.01
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault()
          updateFromHsv({ ...hsv, a: Number(clamp(hsv.a - step, 0, 1).toFixed(2)) })
          break
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault()
          updateFromHsv({ ...hsv, a: Number(clamp(hsv.a + step, 0, 1).toFixed(2)) })
          break
        case "Home":
          e.preventDefault()
          updateFromHsv({ ...hsv, a: 0 })
          break
        case "End":
          e.preventDefault()
          updateFromHsv({ ...hsv, a: 1 })
          break
      }
    }

    // Render Color Picker Inner Panel (used inline or in popover)
    const pickerPanel = (
      <div
        ref={popoverRef}
        className={cn(
          "w-64 rounded-xl border border-border/80 bg-popover/95 text-popover-foreground shadow-2xl backdrop-blur-md p-3 select-none space-y-3 z-[9999]",
          popoverClassName
        )}
      >
        {/* 1. 2D Saturation & Value Interactive Gradient Area */}
        <div
          ref={satAreaRef}
          role="slider"
          tabIndex={0}
          aria-label="Color saturation and brightness"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={hsv.s}
          aria-valuetext={`Saturation ${hsv.s}%, Brightness ${hsv.v}%`}
          onMouseDown={onSatMouseDown}
          onTouchStart={onSatTouchStart}
          onKeyDown={onSatKeyDown}
          className="relative w-full h-36 rounded-lg cursor-crosshair overflow-hidden touch-none shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
        >
          {/* White horizontal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          {/* Black vertical gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          {/* Draggable Indicator Handle */}
          <div
            className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none ring-1 ring-black/30"
            style={{
              left: `${hsv.s}%`,
              top: `${100 - hsv.v}%`,
              backgroundColor: color || "#3b82f6",
            }}
          />
        </div>

        {/* 2. Hue Slider & Preview Swatch */}
        <div className="flex items-center gap-2.5">
          {/* Current Swatch Display */}
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border/70 shrink-0 shadow-xs">
            {/* Checkerboard transparency pattern */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
              }}
            />
            <div className="absolute inset-0" style={{ backgroundColor: color || "#3b82f6" }} />
          </div>

          <div className="flex-1 space-y-2">
            {/* Rainbow Hue Track */}
            <div
              ref={hueTrackRef}
              role="slider"
              tabIndex={0}
              aria-label="Hue"
              aria-valuemin={0}
              aria-valuemax={360}
              aria-valuenow={hsv.h}
              aria-valuetext={`${hsv.h} degrees`}
              onMouseDown={onHueMouseDown}
              onKeyDown={onHueKeyDown}
              className="relative h-3 rounded-full cursor-pointer touch-none shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background:
                  "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
              }}
            >
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-border shadow-md pointer-events-none ring-1 ring-black/20"
                style={{ left: `${(hsv.h / 360) * 100}%` }}
              />
            </div>

            {/* Optional Alpha / Opacity Slider */}
            {showAlpha && (
              <div
                ref={alphaTrackRef}
                role="slider"
                tabIndex={0}
                aria-label="Alpha opacity"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(hsv.a * 100)}
                aria-valuetext={`${Math.round(hsv.a * 100)}%`}
                onMouseDown={onAlphaMouseDown}
                onKeyDown={onAlphaKeyDown}
                className="relative h-3 rounded-full cursor-pointer touch-none shadow-inner overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "6px 6px",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, transparent, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}))`,
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-border shadow-md pointer-events-none ring-1 ring-black/20"
                  style={{ left: `${hsv.a * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. Format Controls (HEX / RGB / HSL) & Direct Inputs */}
        <div className="space-y-1.5 pt-1 border-t border-border/40">
          <div className="flex items-center justify-between gap-1">
            {/* Format Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-md bg-muted/60 text-[10px] font-semibold border border-border/40">
              {(["hex", "rgb", "hsl"] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setActiveFormat(fmt)}
                  className={cn(
                    "px-1.5 py-0.5 rounded transition-all uppercase cursor-pointer",
                    activeFormat === fmt
                      ? "bg-background text-foreground shadow-2xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Quick Actions: EyeDropper + Copy */}
            <div className="flex items-center gap-1">
              {showEyeDropper && typeof window !== "undefined" && "EyeDropper" in window && (
                <button
                  type="button"
                  onClick={handleEyeDropper}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  title="Pick color from screen"
                  aria-label="Pick color from screen"
                >
                  <Palette className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                title="Copy color code"
                aria-label={copied ? "Copied to clipboard" : "Copy color code"}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Formatted Input Row */}
          {activeFormat === "hex" && (
            <div className="relative">
              <input
                type="text"
                value={color || "#3b82f6"}
                onChange={(e) => handleHexInput(e.target.value)}
                className="w-full h-8 px-2 text-xs font-mono font-medium rounded-lg border border-border/70 bg-background text-foreground shadow-2xs focus:outline-hidden focus:ring-1 focus:ring-primary uppercase text-center"
                placeholder="#3B82F6"
                maxLength={9}
              />
            </div>
          )}

          {activeFormat === "rgb" && (
            <div className="grid grid-cols-3 gap-1.5">
              {(["r", "g", "b"] as const).map((channel) => (
                <div key={channel} className="space-y-0.5 text-center">
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[channel]}
                    onChange={(e) => {
                      const val = clamp(Number(e.target.value) || 0, 0, 255)
                      const nextRgb = { ...rgb, [channel]: val }
                      updateFromHsv(rgbToHsv(nextRgb.r, nextRgb.g, nextRgb.b, hsv.a))
                    }}
                    className="w-full h-8 text-center text-xs font-mono font-medium rounded-lg border border-border/70 bg-background text-foreground shadow-2xs focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-[9px] uppercase font-mono text-muted-foreground">
                    {channel}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeFormat === "hsl" && (
            <div className="grid grid-cols-3 gap-1.5">
              <div className="space-y-0.5 text-center">
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={hsl.h}
                  onChange={(e) => {
                    const val = clamp(Number(e.target.value) || 0, 0, 360)
                    updateFromHsv({ ...hsv, h: val })
                  }}
                  className="w-full h-8 text-center text-xs font-mono font-medium rounded-lg border border-border/70 bg-background text-foreground shadow-2xs focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
                <span className="text-[9px] uppercase font-mono text-muted-foreground">H</span>
              </div>
              <div className="space-y-0.5 text-center">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.s}
                  onChange={(e) => {
                    const val = clamp(Number(e.target.value) || 0, 0, 100)
                    const next = hslToHsv(hsl.h, val, hsl.l, hsv.a)
                    updateFromHsv(next)
                  }}
                  className="w-full h-8 text-center text-xs font-mono font-medium rounded-lg border border-border/70 bg-background text-foreground shadow-2xs focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
                <span className="text-[9px] uppercase font-mono text-muted-foreground">S%</span>
              </div>
              <div className="space-y-0.5 text-center">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.l}
                  onChange={(e) => {
                    const val = clamp(Number(e.target.value) || 0, 0, 100)
                    const next = hslToHsv(hsl.h, hsl.s, val, hsv.a)
                    updateFromHsv(next)
                  }}
                  className="w-full h-8 text-center text-xs font-mono font-medium rounded-lg border border-border/70 bg-background text-foreground shadow-2xs focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
                <span className="text-[9px] uppercase font-mono text-muted-foreground">L%</span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Preset Color Swatches Palette */}
        {showPresets && presets && presets.length > 0 && (
          <div className="pt-2 border-t border-border/40">
            <div className="grid grid-cols-8 gap-1.5" role="group" aria-label="Color presets">
              {presets.map((presetHex) => {
                const isSelected =
                  (color || "").toLowerCase().slice(0, 7) === presetHex.toLowerCase().slice(0, 7)
                return (
                  <button
                    key={presetHex}
                    type="button"
                    onClick={() => {
                      const next = hexToHsv(presetHex)
                      updateFromHsv(next)
                    }}
                    className={cn(
                      "w-5 h-5 rounded-md transition-all cursor-pointer relative shrink-0 border border-black/10 dark:border-white/10 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "ring-2 ring-primary ring-offset-1 scale-110 shadow-xs z-10"
                        : "hover:scale-105 opacity-85 hover:opacity-100"
                    )}
                    style={{ backgroundColor: presetHex }}
                    title={presetHex}
                    aria-label={`Select color ${presetHex}`}
                    aria-pressed={isSelected}
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
    )

    // If rendered inline directly
    if (inline) {
      return (
        <div ref={ref} className={cn("inline-block", className)} {...props}>
          {pickerPanel}
        </div>
      )
    }

    // Size variants for the trigger button
    const sizeClasses = {
      sm: "h-8 px-2 text-[11px]",
      default: "h-9 px-2.5 text-xs",
      lg: "h-10 px-3 text-sm",
    }[size]

    const swatchSizes = {
      sm: "w-4 h-4",
      default: "w-5 h-5",
      lg: "w-6 h-6",
    }[size]

    // Calculate popover positioning with flip
    const shouldFlip = triggerRect
      ? typeof window !== "undefined" &&
        triggerRect.bottom + 380 > window.innerHeight &&
        triggerRect.top > 380
      : false

    const popoverStyle: React.CSSProperties = triggerRect
      ? {
          position: "fixed",
          top: shouldFlip ? `${triggerRect.top - 6}px` : `${triggerRect.bottom + 6}px`,
          transform: shouldFlip ? "translateY(-100%)" : undefined,
          left: `${triggerRect.left}px`,
          zIndex: 9999,
        }
      : {
          zIndex: 9999,
        }

    return (
      <div ref={ref} className={cn("relative inline-block w-full", className)} {...props}>
        {/* Sleek Trigger Button */}
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              updateTriggerRect()
              setIsOpen(!isOpen)
            }
          }}
          onKeyDown={(e) => {
            if (disabled) return
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
              e.preventDefault()
              updateTriggerRect()
              setIsOpen(true)
            }
          }}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border border-input bg-background font-medium shadow-2xs transition-colors hover:bg-muted/40 focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            sizeClasses,
            triggerClassName
          )}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-controls={isOpen ? dialogId : undefined}
          aria-label={`Color picker, current color ${color || "#3b82f6"}`}
        >
          <div className="flex items-center gap-2 truncate">
            {/* Color Swatch Chip */}
            <div
              className={cn(
                "rounded-md border border-black/15 dark:border-white/15 shrink-0 shadow-2xs",
                swatchSizes
              )}
              style={{ backgroundColor: color || "#3b82f6" }}
              aria-hidden="true"
            />
            <span className="font-mono uppercase font-semibold text-foreground truncate">
              {color || "#3b82f6"}
            </span>
          </div>

          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground opacity-60 transition-transform duration-200 shrink-0",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>

        {/* Floating Portal Popover */}
        {isOpen && (
          <Portal>
            <div
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label="Color picker"
              style={popoverStyle}
              className="fixed z-[9999] animate-in fade-in-0 zoom-in-95"
            >
              {pickerPanel}
            </div>
          </Portal>
        )}
      </div>
    )
  }
)

ColorPicker.displayName = "ColorPicker"
