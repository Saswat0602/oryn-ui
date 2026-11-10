'use client'

import React from 'react'
import { PlaygroundControlDef, PlaygroundControlOption } from '../types'

interface SegmentedControlProps {
  control: PlaygroundControlDef
  value: any
  onChange: (value: any) => void
}

export function SegmentedControl({ control, value, onChange }: SegmentedControlProps) {
  const options: PlaygroundControlOption[] = (control.options || []).map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return opt as PlaygroundControlOption
    }
    return { label: String(opt), value: opt }
  })

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
            def: {String(control.defaultValue)}
          </span>
        )}
      </div>

      <div 
        role="radiogroup" 
        aria-label={control.label}
        className="grid p-1 rounded-lg bg-muted/60 border border-border/50 gap-1"
        style={{
          gridTemplateColumns: `repeat(${Math.max(2, Math.min(options.length, 5))}, minmax(0, 1fr))`
        }}
      >
        {options.map((option) => {
          const isSelected = String(value) === String(option.value)
          return (
            <button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={`py-1 px-2 rounded-md text-xs font-medium transition-all text-center truncate cursor-pointer ${
                isSelected
                  ? 'bg-background text-foreground shadow-2xs font-semibold border border-border/60'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
              title={option.description || option.label}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-normal">
          {control.description}
        </p>
      )}
    </div>
  )
}
