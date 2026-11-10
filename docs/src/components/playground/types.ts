import React from 'react'

export type PropControlType = 'select' | 'segmented' | 'boolean' | 'slider' | 'text' | 'color'

export interface PlaygroundControlOption {
  label: string
  value: any
  description?: string
}

export interface PlaygroundControlDef {
  name: string
  label: string
  type: PropControlType
  defaultValue: any
  options?: (PlaygroundControlOption | string | number)[]
  min?: number
  max?: number
  step?: number
  description?: string
  category?: 'appearance' | 'size' | 'state' | 'content' | 'options'
}

export interface PlaygroundRenderContext {
  theme?: 'light' | 'dark'
  onEvent: (name: string, detail?: any) => void
  lastEvent?: { name: string; timestamp: number; detail?: any } | null
}

export interface PlaygroundConfig {
  slug: string
  title: string
  description?: string
  importStatement?: string
  componentName?: string
  defaultProps: Record<string, any>
  controls: PlaygroundControlDef[]
  render: (props: Record<string, any>, context: PlaygroundRenderContext) => React.ReactNode
  generateCode?: (props: Record<string, any>) => string
}
