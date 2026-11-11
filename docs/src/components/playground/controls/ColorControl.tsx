'use client'

import React from 'react'
import { PlaygroundControlDef } from '../types'
import { ColorPicker } from 'oryn-ui'

interface ColorControlProps {
  control: PlaygroundControlDef
  value: string
  onChange: (value: string) => void
}

export function ColorControl({ control, value, onChange }: ColorControlProps) {
  const currentColor = value || control.defaultValue || '#3b82f6'

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[11px] font-semibold shrink-0">
            {control.name}
          </code>
          <span className="text-xs font-medium text-foreground truncate">
            {control.label}
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/50 shrink-0 uppercase">
          {currentColor}
        </span>
      </div>

      <ColorPicker
        value={currentColor}
        onChange={onChange}
        showAlpha={false}
        showEyeDropper={true}
        size="default"
        className="w-full"
      />

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-normal">
          {control.description}
        </p>
      )}
    </div>
  )
}
