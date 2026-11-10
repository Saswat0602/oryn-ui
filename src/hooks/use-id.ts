import * as React from 'react'

let count = 0

/**
 * Universal SSR-safe unique identifier generator.
 * Uses React.useId when available, with automatic fallback for older React environments.
 */
export function useId(providedId?: string): string {
  const reactId = React.useId ? React.useId() : undefined
  const [fallbackId] = React.useState(() => `oryn-ui-${++count}`)
  return providedId || reactId || fallbackId
}

