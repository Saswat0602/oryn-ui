'use client'

import React from 'react'
import { PlaygroundControlDef, PlaygroundControlOption } from '../types'
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from 'oryn-ui'

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

  // Only display default value if it's very concise so it never crowds or squeezes the label
  const isShortDefault = 
    control.defaultValue !== undefined && 
    String(control.defaultValue).length <= 10 &&
    typeof control.defaultValue !== 'object'

  const stringValue = value !== undefined && value !== null ? String(value) : String(control.defaultValue ?? '')

  return (
    <div className="space-y-1.5 w-full">
      {/* Clean Header: Label + Prop Code Tag + Short Default Indicator */}
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

      {/* Library's Own Floating Dropdown Select */}
      <Select
        value={stringValue}
        onValueChange={(val) => {
          const match = options.find((opt) => String(opt.value) === val)
          onChange(match ? match.value : val)
        }}
      >
        <SelectTrigger className="w-full h-9 rounded-lg border-border/70 bg-background/90 hover:bg-muted/40 text-xs font-medium px-3 shadow-2xs transition-colors">
          <SelectValue placeholder={`Select ${control.label.toLowerCase()}...`} />
        </SelectTrigger>
        <SelectContent className="max-h-60 rounded-xl border-border/80 bg-popover/95 backdrop-blur-md shadow-xl p-1 z-[80]">
          {options.map((option) => (
            <SelectItem 
              key={String(option.value)} 
              value={String(option.value)}
              className="text-xs py-2 px-2.5 rounded-lg font-medium cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {control.description && (
        <p className="text-[11px] text-muted-foreground leading-normal">
          {control.description}
        </p>
      )}
    </div>
  )
}
