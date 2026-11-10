'use client'

import React from 'react'
import { PlaygroundControlDef } from '../types'

interface SliderControlProps {
  control: PlaygroundControlDef
  value: number
  onChange: (value: number) => void
}

export function SliderControl({ control, value, onChange }: SliderControlProps) {
  const min = control.min ?? 0
  const max = control.max ?? 100
  const step = control.step ?? 1
  const numericValue = typeof value === 'number' ? value : control.defaultValue ?? min

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[11px] font-semibold shrink-0">
            {control.name}
          </code>
          <span className="text-xs font-medium text-foreground truncate">{control.label}</span>
        </div>
        <span className="text-xs font-mono font-semibold text-foreground px-2 py-0.5 rounded-md bg-muted border border-border/50 shrink-0">
          {numericValue}
        </span>
      </div>

      <input
        id={`slider-${control.name}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={numericValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-normal">
          {control.description}
        </p>
      )}
    </div>
  )
}
