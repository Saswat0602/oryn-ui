'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light' | 'system'
export type ThemeStyle = 'monochrome' | 'normal'

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultStyle?: ThemeStyle
  storageKey?: string
  styleStorageKey?: string
}

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  style: ThemeStyle
  setStyle: (style: ThemeStyle) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  style: 'monochrome',
  setStyle: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const storageSubscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function useStoredValue<T extends string>(key: string, defaultValue: T): [T, (val: T) => void] {
  const getSnapshot = () => {
    try {
      const item = localStorage?.getItem(key) as T | null
      return item ?? defaultValue
    } catch {
      return defaultValue
    }
  }

  const getServerSnapshot = () => defaultValue

  const value = React.useSyncExternalStore(storageSubscribe, getSnapshot, getServerSnapshot)

  const setValue = (newVal: T) => {
    try {
      localStorage?.setItem(key, newVal)
      window.dispatchEvent(new Event('storage'))
    } catch {
      // ignore
    }
  }

  return [value, setValue]
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultStyle = 'monochrome',
  storageKey = 'oryn-ui-theme',
  styleStorageKey = 'oryn-ui-style',
  ...props
}: ThemeProviderProps) {
  const [theme, handleSetTheme] = useStoredValue<Theme>(storageKey, defaultTheme)
  const [style, handleSetStyle] = useStoredValue<ThemeStyle>(styleStorageKey, defaultStyle)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      root.style.colorScheme = systemTheme
      return
    }

    root.classList.add(theme)
    root.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute('data-style', style)
  }, [style])

  const value = {
    theme,
    setTheme: handleSetTheme,
    style,
    setStyle: handleSetStyle,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
