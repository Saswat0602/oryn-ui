import { ColorPreset, BasePaletteDef, RadiusValue, FontFamily } from './types'

export const COLOR_PRESETS: ColorPreset[] = [
  // Monochrome & Neutrals
  {
    id: 'zinc',
    name: 'Zinc',
    hex: '#18181b',
    category: 'monochrome',
    light: { primary: '240 5.9% 10%', primaryForeground: '0 0% 98%' },
    dark: { primary: '0 0% 98%', primaryForeground: '240 5.9% 10%' }
  },
  {
    id: 'slate',
    name: 'Slate',
    hex: '#475569',
    category: 'monochrome',
    light: { primary: '215.4 16.3% 46.9%', primaryForeground: '0 0% 100%' },
    dark: { primary: '215.4 16.3% 65%', primaryForeground: '222.2 47.4% 11.2%' }
  },
  {
    id: 'stone',
    name: 'Stone',
    hex: '#57534e',
    category: 'monochrome',
    light: { primary: '25 5.3% 44.7%', primaryForeground: '0 0% 100%' },
    dark: { primary: '25 5.3% 68%', primaryForeground: '24 9.8% 10%' }
  },

  // Cool & Blues
  {
    id: 'indigo',
    name: 'Indigo',
    hex: '#4f46e5',
    category: 'cool',
    light: { primary: '226 70% 55.5%', primaryForeground: '0 0% 100%' },
    dark: { primary: '226 70% 64%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'blue',
    name: 'Blue',
    hex: '#2563eb',
    category: 'cool',
    light: { primary: '221.2 83.2% 53.3%', primaryForeground: '210 40% 98%' },
    dark: { primary: '217.2 91.2% 59.8%', primaryForeground: '222.2 47.4% 11.2%' }
  },
  {
    id: 'sky',
    name: 'Sky',
    hex: '#0284c7',
    category: 'cool',
    light: { primary: '198.6 88.7% 48.4%', primaryForeground: '0 0% 100%' },
    dark: { primary: '198.6 88.7% 56%', primaryForeground: '222.2 47.4% 11.2%' }
  },
  {
    id: 'cyan',
    name: 'Cyan',
    hex: '#0891b2',
    category: 'cool',
    light: { primary: '191.6 91.4% 36.5%', primaryForeground: '0 0% 100%' },
    dark: { primary: '191.6 91.4% 48%', primaryForeground: '222.2 47.4% 11.2%' }
  },
  {
    id: 'teal',
    name: 'Teal',
    hex: '#0d9488',
    category: 'cool',
    light: { primary: '174.7 83.9% 31.6%', primaryForeground: '0 0% 100%' },
    dark: { primary: '174.7 83.9% 44%', primaryForeground: '0 0% 100%' }
  },

  // Greens & Natural
  {
    id: 'emerald',
    name: 'Emerald',
    hex: '#059669',
    category: 'cool',
    light: { primary: '158 64% 40%', primaryForeground: '0 0% 100%' },
    dark: { primary: '158 64% 50%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'green',
    name: 'Green',
    hex: '#16a34a',
    category: 'cool',
    light: { primary: '142.1 76.2% 36.3%', primaryForeground: '355.7 100% 97.3%' },
    dark: { primary: '142.1 70.6% 45.3%', primaryForeground: '144.9 80.4% 10%' }
  },

  // Vibrant & Purples
  {
    id: 'violet',
    name: 'Violet',
    hex: '#7c3aed',
    category: 'vibrant',
    light: { primary: '262 83% 58%', primaryForeground: '0 0% 100%' },
    dark: { primary: '262 83% 66%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'purple',
    name: 'Purple',
    hex: '#9333ea',
    category: 'vibrant',
    light: { primary: '271 81% 56%', primaryForeground: '0 0% 100%' },
    dark: { primary: '271 81% 64%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'fuchsia',
    name: 'Fuchsia',
    hex: '#c026d3',
    category: 'vibrant',
    light: { primary: '292 84% 49%', primaryForeground: '0 0% 100%' },
    dark: { primary: '292 84% 58%', primaryForeground: '0 0% 100%' }
  },
  {
    id: 'pink',
    name: 'Pink',
    hex: '#db2777',
    category: 'vibrant',
    light: { primary: '330 81% 51%', primaryForeground: '0 0% 100%' },
    dark: { primary: '330 81% 60%', primaryForeground: '0 0% 100%' }
  },

  // Warm & Reds
  {
    id: 'rose',
    name: 'Rose',
    hex: '#e11d48',
    category: 'warm',
    light: { primary: '346.8 77.2% 49.8%', primaryForeground: '355.7 100% 97.3%' },
    dark: { primary: '346.8 77.2% 58%', primaryForeground: '355.7 100% 97.3%' }
  },
  {
    id: 'red',
    name: 'Red',
    hex: '#dc2626',
    category: 'warm',
    light: { primary: '0 72.2% 50.6%', primaryForeground: '0 85.7% 97.3%' },
    dark: { primary: '0 72.2% 58%', primaryForeground: '0 85.7% 97.3%' }
  },
  {
    id: 'orange',
    name: 'Orange',
    hex: '#ea580c',
    category: 'warm',
    light: { primary: '24.6 95% 53.1%', primaryForeground: '60 9.1% 97.8%' },
    dark: { primary: '20.5 90.2% 48.2%', primaryForeground: '60 9.1% 97.8%' }
  },
  {
    id: 'amber',
    name: 'Amber',
    hex: '#d97706',
    category: 'warm',
    light: { primary: '37.7 92.1% 43.7%', primaryForeground: '0 0% 100%' },
    dark: { primary: '37.7 92.1% 52%', primaryForeground: '0 0% 100%' }
  }
]

export const BASE_PALETTES: BasePaletteDef[] = [
  {
    id: 'zinc',
    name: 'Zinc',
    description: 'Clean, industrial modern neutral with crisp edges',
    light: {
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
      card: '0 0% 100%',
      cardForeground: '240 10% 3.9%',
      popover: '0 0% 100%',
      popoverForeground: '240 10% 3.9%',
      muted: '240 4.8% 95.9%',
      mutedForeground: '240 3.8% 46.1%',
      border: '240 5.9% 90%',
      input: '240 5.9% 90%'
    },
    dark: {
      background: '240 10% 3.9%',
      foreground: '0 0% 98%',
      card: '240 10% 3.9%',
      cardForeground: '0 0% 98%',
      popover: '240 10% 3.9%',
      popoverForeground: '0 0% 98%',
      muted: '240 3.7% 15.9%',
      mutedForeground: '240 5% 64.9%',
      border: '240 3.7% 15.9%',
      input: '240 3.7% 15.9%'
    }
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Cool blue-gray undertones inspired by modern cloud tools',
    light: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      popover: '0 0% 100%',
      popoverForeground: '222.2 84% 4.9%',
      muted: '210 40% 96.1%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%'
    },
    dark: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '222.2 84% 4.9%',
      cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%',
      popoverForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%'
    }
  },
  {
    id: 'stone',
    name: 'Stone',
    description: 'Warm, organic stone tint ideal for editorial and brand sites',
    light: {
      background: '0 0% 100%',
      foreground: '20 14.3% 4.1%',
      card: '0 0% 100%',
      cardForeground: '20 14.3% 4.1%',
      popover: '0 0% 100%',
      popoverForeground: '20 14.3% 4.1%',
      muted: '60 4.8% 95.9%',
      mutedForeground: '25 5.3% 45%',
      border: '20 5.9% 90%',
      input: '20 5.9% 90%'
    },
    dark: {
      background: '20 14.3% 4.1%',
      foreground: '60 9.1% 97.8%',
      card: '20 14.3% 4.1%',
      cardForeground: '60 9.1% 97.8%',
      popover: '20 14.3% 4.1%',
      popoverForeground: '60 9.1% 97.8%',
      muted: '12 6.5% 15.1%',
      mutedForeground: '24 5.4% 63.9%',
      border: '12 6.5% 15.1%',
      input: '12 6.5% 15.1%'
    }
  },
  {
    id: 'gray',
    name: 'Gray',
    description: 'Balanced, timeless neutral gray across light and dark interfaces',
    light: {
      background: '0 0% 100%',
      foreground: '220.9 39.3% 11%',
      card: '0 0% 100%',
      cardForeground: '220.9 39.3% 11%',
      popover: '0 0% 100%',
      popoverForeground: '220.9 39.3% 11%',
      muted: '220 14.3% 95.9%',
      mutedForeground: '220 8.9% 46.1%',
      border: '220 13% 91%',
      input: '220 13% 91%'
    },
    dark: {
      background: '224 71.4% 4.1%',
      foreground: '210 20% 98%',
      card: '224 71.4% 4.1%',
      cardForeground: '210 20% 98%',
      popover: '224 71.4% 4.1%',
      popoverForeground: '210 20% 98%',
      muted: '215 27.9% 16.9%',
      mutedForeground: '217.9 10.6% 64.9%',
      border: '215 27.9% 16.9%',
      input: '215 27.9% 16.9%'
    }
  }
]

export const RADIUS_OPTIONS: { label: string; value: RadiusValue; name: string }[] = [
  { label: '0px', value: '0rem', name: 'Sharp' },
  { label: '4px', value: '0.25rem', name: 'Small' },
  { label: '6px', value: '0.375rem', name: 'Default' },
  { label: '8px', value: '0.5rem', name: 'Medium' },
  { label: '12px', value: '0.75rem', name: 'Large' },
  { label: '16px', value: '1rem', name: 'X-Large' },
  { label: 'Full', value: '9999px', name: 'Pill' }
]

export const FONT_OPTIONS: { id: FontFamily; label: string; description: string; className: string }[] = [
  { id: 'sans', label: 'Sans-Serif', description: 'Geist / Inter modern clean sans', className: 'font-sans' },
  { id: 'serif', label: 'Serif', description: 'Editorial, classic luxury typography', className: 'font-serif' },
  { id: 'mono', label: 'Monospace', description: 'Technical, devtools, and terminal code', className: 'font-mono' }
]
