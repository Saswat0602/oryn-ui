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
        <label 
          htmlFor={`slider-${control.name}`} 
          className="text-xs font-medium text-foreground flex items-center gap-1.5"
        >
          <code className="font-mono text-primary bg-primary/10 px-1 py-0.5 rounded text-[11px] font-semibold">
            {control.name}
          </code>
          <span className="text-[11px] text-muted-foreground">{control.label}</span>
        </label>
        <span className="text-xs font-mono font-semibold text-foreground px-1.5 py-0.5 rounded bg-muted/60 border border-border/40">
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
        <p className="text-[11px] text-muted-foreground leading-tight">
          {control.description}
        </p>
      )}
    </div>
  )
}
