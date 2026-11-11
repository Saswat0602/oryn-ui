export type BaseColorName = 'zinc' | 'slate' | 'stone' | 'gray' | 'neutral'
export type RadiusValue = '0rem' | '0.25rem' | '0.375rem' | '0.5rem' | '0.75rem' | '1rem' | '9999px'
export type FontFamily = 'sans' | 'serif' | 'mono'

export interface ColorPreset {
  id: string
  name: string
  hex: string
  category: 'monochrome' | 'vibrant' | 'cool' | 'warm'
  light: {
    primary: string
    primaryForeground: string
  }
  dark: {
    primary: string
    primaryForeground: string
  }
}

export interface BasePaletteDef {
  id: BaseColorName
  name: string
  description: string
  light: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    muted: string
    mutedForeground: string
    border: string
    input: string
  }
  dark: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    muted: string
    mutedForeground: string
    border: string
    input: string
  }
}

export interface ThemeConfig {
  primaryHex: string
  baseColor: BaseColorName
  radius: RadiusValue
  font: FontFamily
  isCustom: boolean
  activePresetId?: string
}
