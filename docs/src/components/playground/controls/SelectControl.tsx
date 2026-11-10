'use client'

import React from 'react'
import { PlaygroundControlDef, PlaygroundControlOption } from '../types'
import { ChevronDown } from 'lucide-react'

interface SelectControlProps {
  control: PlaygroundControlDef
  value: any
  onChange: (value: any) => void
}

export function SelectControl({ control, value, onChange }: SelectControlProps) {
  const options: PlaygroundControlOption[] = (control.options || []).map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return opt as PlaygroundControlOption
    }
    return { label: String(opt), value: opt }
  })

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between gap-2">
        <label 
          htmlFor={`select-${control.name}`} 
          className="text-xs font-medium text-foreground flex items-center gap-1.5"
        >
          <code className="font-mono text-primary bg-primary/10 px-1 py-0.5 rounded text-[11px] font-semibold">
            {control.name}
          </code>
          <span className="text-[11px] text-muted-foreground">{control.label}</span>
        </label>
        {control.defaultValue !== undefined && (
          <span className="text-[10px] font-mono text-muted-foreground/60" title="Default value">
            def: {String(control.defaultValue)}
          </span>
        )}
      </div>

      <div className="relative">
        <select
          id={`select-${control.name}`}
          value={String(value)}
          onChange={(e) => {
            const rawVal = e.target.value
            // Try to find the matching option to preserve type (boolean, number, etc.)
            const match = options.find((opt) => String(opt.value) === rawVal)
            onChange(match ? match.value : rawVal)
          }}
          className="w-full appearance-none rounded-lg border border-border/70 bg-background px-3 py-1.5 pr-8 text-xs font-medium text-foreground shadow-2xs transition-colors focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary/40 cursor-pointer"
        >
          {options.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground opacity-70" />
      </div>

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-tight">
          {control.description}
        </p>
      )}
    </div>
  )
}
