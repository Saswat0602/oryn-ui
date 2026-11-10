'use client'

import React from 'react'
import { PlaygroundControlDef } from '../types'
import { Input } from 'oryn-ui'

interface TextControlProps {
  control: PlaygroundControlDef
  value: string
  onChange: (value: string) => void
}

export function TextControl({ control, value, onChange }: TextControlProps) {
  const strVal = typeof value === 'string' ? value : String(value ?? '')
  const isShortDefault = 
    control.defaultValue !== undefined && 
    String(control.defaultValue).length <= 10 &&
    typeof control.defaultValue !== 'object'

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[11px] font-semibold shrink-0">
            {control.name}
          </code>
          <span className="text-xs font-medium text-foreground truncate">
            {control.label}
          </span>
        </div>
        {isShortDefault && (
          <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0" title="Default value">
            def: &quot;{String(control.defaultValue)}&quot;
          </span>
        )}
      </div>

      <Input
        value={strVal}
        onChange={(e: any) => onChange(e.target.value)}
        placeholder={control.defaultValue ? String(control.defaultValue) : 'Enter text...'}
        className="h-9 text-xs rounded-lg"
      />

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-normal">
          {control.description}
        </p>
      )}
    </div>
  )
}
