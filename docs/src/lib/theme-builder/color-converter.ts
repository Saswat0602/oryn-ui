export interface RgbColor {
  r: number
  g: number
  b: number
}

export interface HslColor {
  h: number
  s: number
  l: number
}

export function isValidHex(hex: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex.trim())
}

export function normalizeHex(hex: string): string {
  let clean = hex.trim().replace(/^#/, '')
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('')
  }
  return `#${clean.toLowerCase()}`
}

export function hexToRgb(hex: string): RgbColor {
  const normalized = normalizeHex(hex).replace('#', '')
  const num = parseInt(normalized, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)))
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function rgbToHsl(r: number, g: number, b: number): HslColor {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)
        break
      case gNorm:
        h = (bNorm - rNorm) / d + 2
        break
      case bNorm:
        h = (rNorm - gNorm) / d + 4
        break
    }
    h *= 60
  }

  return {
    h: Math.round(h * 10) / 10,
    s: Math.round(s * 1000) / 10,
    l: Math.round(l * 1000) / 10
  }
}

export function hslToString(hsl: HslColor): string {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`
}

export function hexToHslString(hex: string): string {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return hslToString(hsl)
}

/**
 * Calculates relative luminance per WCAG 2.1 specifications.
 */
export function getLuminance({ r, g, b }: RgbColor): number {
  const a = [r, g, b].map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * Returns an accessible foreground color token (white or dark zinc) based on background luminance.
 */
export function getAccessibleForeground(hex: string): { hex: string; hsl: string } {
  const rgb = hexToRgb(hex)
  const lum = getLuminance(rgb)
  // Contrast threshold: If background is lighter than 0.45 luminance, use dark foreground
  if (lum > 0.45) {
    return { hex: '#09090b', hsl: '240 5.9% 10%' }
  }
  return { hex: '#ffffff', hsl: '0 0% 98%' }
}

/**
 * Derives light and dark primary color tokens dynamically from any hex color.
 */
export function deriveThemeTokensFromHex(hex: string): {
  light: { primary: string; primaryForeground: string }
  dark: { primary: string; primaryForeground: string }
} {
  const safeHex = isValidHex(hex) ? normalizeHex(hex) : '#4f46e5'
  const rgb = hexToRgb(safeHex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  // Light Mode: Use input color directly, compute accessible foreground
  const lightPrimaryHsl = hslToString(hsl)
  const lightForeground = getAccessibleForeground(safeHex).hsl

  // Dark Mode: Slightly increase lightness and ensure it's punchy against dark surfaces
  const darkL = Math.min(75, Math.max(52, hsl.l > 60 ? hsl.l : hsl.l + 8))
  const darkPrimaryHsl = `${hsl.h} ${Math.min(100, Math.max(60, hsl.s))}% ${darkL}%`
  const darkForeground = hsl.l > 70 ? '240 5.9% 10%' : '0 0% 98%'

  return {
    light: {
      primary: lightPrimaryHsl,
      primaryForeground: lightForeground
    },
    dark: {
      primary: darkPrimaryHsl,
      primaryForeground: darkForeground
    }
  }
}

