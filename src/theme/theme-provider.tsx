'use client'

import * as React from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ThemeStyle = 'monochrome' | 'normal'

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultStyle?: ThemeStyle
  storageKey?: string
  styleStorageKey?: string
  attribute?: string
  enableSystem?: boolean
}

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  style: ThemeStyle
  setStyle: (style: ThemeStyle) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultStyle = 'monochrome',
  storageKey = 'oryn-ui-theme',
  styleStorageKey = 'oryn-ui-style',
  attribute = 'class',
  enableSystem = true,
}: ThemeProviderProps) {
  // Initialize with defaults to guarantee matching SSR and initial client hydration
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [style, setStyleState] = React.useState<ThemeStyle>(defaultStyle)

  // Sync stored preferences after client mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored) setThemeState(stored)
      const storedStyle = localStorage.getItem(styleStorageKey) as ThemeStyle | null
      if (storedStyle === 'normal' || storedStyle === 'monochrome') setStyleState(storedStyle)
    } catch {
      // Ignore localStorage read failures
    }
  }, [storageKey, styleStorageKey])

  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (targetTheme: 'light' | 'dark') => {
      setResolvedTheme(targetTheme)
      if (attribute === 'class') {
        root.classList.remove('light', 'dark')
        root.classList.add(targetTheme)
      } else {
        root.setAttribute(attribute, targetTheme)
      }
      root.style.colorScheme = targetTheme
    }

    if (theme === 'system' && enableSystem) {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(systemDark ? 'dark' : 'light')

      const media = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light')
      }

      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } else {
      applyTheme(theme === 'dark' ? 'dark' : 'light')
    }
  }, [theme, attribute, enableSystem])

  React.useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute('data-style', style)
  }, [style])

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch {
        // ignore localstorage write failures
      }
      setThemeState(newTheme)
    },
    [storageKey]
  )

  const setStyle = React.useCallback(
    (newStyle: ThemeStyle) => {
      try {
        localStorage.setItem(styleStorageKey, newStyle)
      } catch {
        // ignore localstorage write failures
      }
      setStyleState(newStyle)
    },
    [styleStorageKey]
  )

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, style, setStyle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

