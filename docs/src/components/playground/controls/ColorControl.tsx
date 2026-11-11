'use client'

import React from 'react'
import { PlaygroundControlDef } from '../types'

interface ColorControlProps {
  control: PlaygroundControlDef
  value: string
  onChange: (value: string) => void
}

const PRESET_COLORS = [
  { name: 'Primary Blue', hex: '#3b82f6' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Slate', hex: '#64748b' }
]

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
        <span className="text-[10px] font-mono font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/50 shrink-0">
          {currentColor}
        </span>
      </div>

      {/* Preset color swatches + color picker input */}
      <div className="flex items-center gap-2 pt-0.5">
        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-muted/40 border border-border/50 flex-wrap">
          {PRESET_COLORS.map((preset) => {
            const isSelected = currentColor.toLowerCase() === preset.hex.toLowerCase()
            return (
              <button
                key={preset.hex}
                type="button"
                onClick={() => onChange(preset.hex)}
                className={`w-5 h-5 rounded-md transition-all cursor-pointer relative ${
                  isSelected ? 'ring-2 ring-primary ring-offset-1 scale-110 shadow-xs' : 'hover:scale-105 opacity-85 hover:opacity-100'
                }`}
                style={{ backgroundColor: preset.hex }}
                title={preset.name}
              />
            )
          })}
        </div>

        {/* Native Hex Picker Input */}
        <label className="relative w-8 h-8 rounded-lg border border-border/60 overflow-hidden cursor-pointer flex items-center justify-center bg-card hover:bg-muted transition-colors shrink-0 shadow-2xs">
          <input
            type="color"
            value={currentColor}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            title="Custom hex color"
          />
          <div
            className="w-4 h-4 rounded-full border border-black/20 dark:border-white/20 shadow-xs"
            style={{ backgroundColor: currentColor }}
          />
        </label>
      </div>

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-normal">
          {control.description}
        </p>
      )}
    </div>
  )
}
