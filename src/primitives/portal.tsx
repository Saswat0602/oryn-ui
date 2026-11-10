import * as React from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: React.ReactNode
  container?: HTMLElement | null
}

/**
 * Headless Portal primitive for SSR-safe DOM subtree teleportation.
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    children,
    container || document.body
  )
}

/**
 * Hook to retrieve or create a persistent portal container.
 */
export function usePortal(id?: string) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    const portalId = id || 'oryn-ui-portal'
    let element = document.getElementById(portalId)

    if (!element) {
      element = document.createElement('div')
      element.id = portalId
      document.body.appendChild(element)
    }

    setContainer(element)

    return () => {
      if (element && !id && element.childNodes.length === 0) {
        document.body.removeChild(element)
      }
    }
  }, [id])

  return container
}
