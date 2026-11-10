'use client'

import React from 'react'
import { PlaygroundControlDef } from '../types'
import { Switch } from 'oryn-ui'

interface SwitchControlProps {
  control: PlaygroundControlDef
  value: boolean
  onChange: (value: boolean) => void
}

export function SwitchControl({ control, value, onChange }: SwitchControlProps) {
  const isChecked = Boolean(value)

  return (
    <div className="flex items-start justify-between gap-3.5 p-3 rounded-xl border border-border/50 bg-card/50 hover:bg-muted/30 transition-colors w-full">
      <div className="space-y-1 min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[11px] font-semibold">
            {control.name}
          </code>
          <span className="text-xs font-semibold text-foreground">
            {control.label}
          </span>
        </div>
        {control.description && (
          <p className="text-[11px] text-muted-foreground leading-normal">
            {control.description}
          </p>
        )}
      </div>

      <div className="pt-0.5 shrink-0">
        <Switch
          checked={isChecked}
          onCheckedChange={onChange}
          size="sm"
          aria-label={control.label}
        />
      </div>
    </div>
  )
}
