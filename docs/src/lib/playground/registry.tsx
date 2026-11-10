import React from 'react'
import { PlaygroundConfig, PlaygroundControlDef } from '@/components/playground/types'
import { corePlaygrounds } from './configs/core'
import { formsPlaygrounds } from './configs/forms'
import { overlayPlaygrounds } from './configs/overlay'
import { layoutPlaygrounds } from './configs/layout'
import { navigationPlaygrounds } from './configs/navigation'
import { dataPlaygrounds } from './configs/data'
import { mediaPlaygrounds } from './configs/media'
import { feedbackPlaygrounds } from './configs/feedback'
import { getComponentProps } from '@/lib/component-props'

// Combined registry of all 75 components across all 8 domains
export const PLAYGROUND_REGISTRY: Record<string, PlaygroundConfig> = {
  ...corePlaygrounds,
  ...formsPlaygrounds,
  ...overlayPlaygrounds,
  ...layoutPlaygrounds,
  ...navigationPlaygrounds,
  ...dataPlaygrounds,
  ...mediaPlaygrounds,
  ...feedbackPlaygrounds
}

const SLUG_ALIASES: Record<string, string> = {
  inputotp: 'input-otp',
  radiogroup: 'radio-group',
  scrollarea: 'scroll-area',
  datatable: 'data-table',
  navigationmenu: 'navigation-menu',
  alertdialog: 'alert-dialog',
  dropdownmenu: 'dropdown-menu',
  contextmenu: 'context-menu',
  hovercard: 'hover-card',
  aspectratio: 'aspect-ratio',
  breadcrumb: 'breadcrumbs',
  'layout-shell': 'layout-shell',
  layout: 'layout-shell',
  timepicker: 'time-picker',
  datetimepicker: 'datetime-picker',
  'date-picker': 'datetime-picker',
  datepicker: 'datetime-picker',
  statcard: 'stat-card',
  treeview: 'tree-view',
  multiselect: 'multi-select',
  buttongroup: 'button-group',
  inputgroup: 'input-group',
  passwordinput: 'password-input',
  numberinput: 'number-input',
  emptystate: 'empty-state',
  promptinput: 'prompt-input',
  messagebubble: 'message-bubble',
  reasoningdisclosure: 'reasoning-disclosure',
  toolcallcard: 'tool-call-card'
}

/**
 * Resolves the playground configuration for a given slug.
 * If not explicitly registered, generates a dynamic configuration
 * from the component's canonical prop metadata.
 */
export function getPlaygroundConfig(slug: string): PlaygroundConfig {
  const direct = PLAYGROUND_REGISTRY[slug]
  if (direct) return direct

  const aliasedKey = SLUG_ALIASES[slug]
  if (aliasedKey && PLAYGROUND_REGISTRY[aliasedKey]) {
    return PLAYGROUND_REGISTRY[aliasedKey]
  }

  const normalized = slug.replace(/-/g, '').toLowerCase()
  const match = Object.entries(PLAYGROUND_REGISTRY).find(
    ([k]) => k.replace(/-/g, '').toLowerCase() === normalized
  )
  if (match) return match[1]

  // Dynamic Fallback Engine: Infer controls from component-props.ts
  const rawProps = getComponentProps(slug)
  const inferredControls: PlaygroundControlDef[] = []
  const defaultProps: Record<string, any> = {}

  rawProps.forEach((prop) => {
    // Exclude react internal or event props from primary controls
    if (prop.name.startsWith('on') || prop.name === 'ref' || prop.name === 'key') {
      return
    }

    if (prop.type.includes('|') && !prop.type.includes('ReactNode')) {
      const options = prop.type
        .split('|')
        .map((s) => s.trim().replace(/['"]/g, ''))
        .filter(Boolean)

      inferredControls.push({
        name: prop.name,
        label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
        type: options.length <= 4 ? 'segmented' : 'select',
        defaultValue: prop.default ?? options[0],
        options,
        description: prop.description
      })
      defaultProps[prop.name] = prop.default ?? options[0]
    } else if (prop.type === 'boolean') {
      inferredControls.push({
        name: prop.name,
        label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
        type: 'boolean',
        defaultValue: prop.default ?? false,
        description: prop.description
      })
      defaultProps[prop.name] = prop.default ?? false
    } else if (prop.type === 'number') {
      inferredControls.push({
        name: prop.name,
        label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
        type: 'slider',
        defaultValue: prop.default ?? 10,
        description: prop.description
      })
      defaultProps[prop.name] = prop.default ?? 10
    } else if (prop.type === 'string') {
      inferredControls.push({
        name: prop.name,
        label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
        type: 'text',
        defaultValue: prop.default ?? '',
        description: prop.description
      })
      defaultProps[prop.name] = prop.default ?? ''
    }
  })

  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')

  return {
    slug,
    title,
    componentName: title,
    defaultProps,
    controls: inferredControls,
    render: () => (
      <div className="p-6 rounded-xl border border-border/60 bg-card text-center space-y-2">
        <h3 className="text-sm font-semibold text-foreground">{title} Preview</h3>
        <p className="text-xs text-muted-foreground">
          Interactive preview rendered for {title}.
        </p>
      </div>
    )
  }
}
