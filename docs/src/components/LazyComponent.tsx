'use client'

import React, { ComponentType } from 'react'
import { Skeleton } from 'oryn-ui'

interface LazyComponentProps {
  componentName: string
  fallback?: React.ReactNode
}

// Lazy load component registry
const componentRegistry: Record<string, ComponentType<unknown>> = {}

// Dynamic import function
const loadComponent = async (componentName: string) => {
  if (componentRegistry[componentName]) {
    return componentRegistry[componentName]
  }

  try {
    // Import the component dynamically from the built package
    const componentModule = await import(`oryn-ui`)
    const Component = (componentModule as unknown as Record<string, ComponentType<unknown>>)[componentName]
    
    if (Component) {
      componentRegistry[componentName] = Component
      return Component
    }
    
    throw new Error(`Component ${componentName} not found`)
  } catch (error) {
    console.error(`Failed to load component ${componentName}:`, error)
    // Return a fallback component
    const FallbackComponent = () => (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-600">
        Failed to load component: {componentName}
      </div>
    )
    FallbackComponent.displayName = 'FallbackComponent'
    return FallbackComponent
  }
}

// Lazy component wrapper
const LazyComponent: React.FC<LazyComponentProps> = ({ 
  componentName, 
  fallback = <Skeleton className="h-10 w-full" />
}) => {
  const [Component, setComponent] = React.useState<ComponentType<unknown> | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    loadComponent(componentName)
      .then((LoadedComponent) => {
        setComponent(() => LoadedComponent)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [componentName])

  if (loading) {
    return <>{fallback}</>
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-600">
        Error loading {componentName}: {error}
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-600">
        Component {componentName} not available
      </div>
    )
  }

  return <Component />
}

export { LazyComponent }
