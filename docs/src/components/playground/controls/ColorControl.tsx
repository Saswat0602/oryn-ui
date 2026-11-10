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
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-foreground tracking-tight">
          {control.label}
        </label>
        <span className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border/40">
          {currentColor}
        </span>
      </div>

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-snug">
          {control.description}
        </p>
      )}

      {/* Preset color swatches + color picker input */}
      <div className="flex items-center gap-1.5 pt-0.5">
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/40 border border-border/50">
          {PRESET_COLORS.map((preset) => {
            const isSelected = currentColor.toLowerCase() === preset.hex.toLowerCase()
            return (
              <button
                key={preset.hex}
                type="button"
                onClick={() => onChange(preset.hex)}
                className={`w-5 h-5 rounded-md transition-all cursor-pointer relative ${
                  isSelected ? 'ring-2 ring-primary ring-offset-1 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: preset.hex }}
                title={preset.name}
              />
            )
          })}
        </div>

        {/* Native Hex Picker Input */}
        <label className="relative w-7 h-7 rounded-lg border border-border/60 overflow-hidden cursor-pointer flex items-center justify-center bg-card hover:bg-muted transition-colors">
          <input
            type="color"
            value={currentColor}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            title="Custom hex color"
          />
          <div
            className="w-4 h-4 rounded-full border border-black/20 dark:border-white/20"
            style={{ backgroundColor: currentColor }}
          />
        </label>
      </div>
    </div>
  )
}
