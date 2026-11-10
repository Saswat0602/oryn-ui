'use client'

import React from 'react'
import { PlaygroundControlDef } from '../types'

interface TextControlProps {
  control: PlaygroundControlDef
  value: string
  onChange: (value: string) => void
}

export function TextControl({ control, value, onChange }: TextControlProps) {
  const strVal = typeof value === 'string' ? value : String(value ?? '')

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between gap-2">
        <label 
          htmlFor={`text-${control.name}`} 
          className="text-xs font-medium text-foreground flex items-center gap-1.5"
        >
          <code className="font-mono text-primary bg-primary/10 px-1 py-0.5 rounded text-[11px] font-semibold">
            {control.name}
          </code>
          <span className="text-[11px] text-muted-foreground">{control.label}</span>
        </label>
        {control.defaultValue !== undefined && (
          <span className="text-[10px] font-mono text-muted-foreground/60" title="Default value">
            def: &quot;{String(control.defaultValue)}&quot;
          </span>
        )}
      </div>

      <input
        id={`text-${control.name}`}
        type="text"
        value={strVal}
        onChange={(e) => onChange(e.target.value)}
        placeholder={control.defaultValue ? String(control.defaultValue) : 'Enter value...'}
        className="w-full rounded-lg border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-2xs transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary/40"
      />

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-tight">
          {control.description}
        </p>
      )}
    </div>
  )
}
