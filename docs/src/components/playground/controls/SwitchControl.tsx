'use client'

import React from 'react'
import { PlaygroundControlDef } from '../types'

interface SwitchControlProps {
  control: PlaygroundControlDef
  value: boolean
  onChange: (value: boolean) => void
}

export function SwitchControl({ control, value, onChange }: SwitchControlProps) {
  const isChecked = Boolean(value)

  return (
    <div className="flex items-center justify-between gap-3 p-2 rounded-lg bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors w-full">
      <div className="space-y-0.5">
        <label 
          htmlFor={`switch-${control.name}`} 
          className="text-xs font-medium text-foreground flex items-center gap-1.5 cursor-pointer"
          onClick={() => onChange(!isChecked)}
        >
          <code className="font-mono text-primary bg-primary/10 px-1 py-0.5 rounded text-[11px] font-semibold">
            {control.name}
          </code>
          <span className="text-[11px] text-muted-foreground">{control.label}</span>
        </label>
        {control.description && (
          <p className="text-[10px] text-muted-foreground/80 leading-tight">
            {control.description}
          </p>
        )}
      </div>

      <button
        id={`switch-${control.name}`}
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={() => onChange(!isChecked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 ${
          isChecked ? 'bg-primary' : 'bg-muted-foreground/30'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            isChecked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
