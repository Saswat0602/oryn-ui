import { coreExamples } from './core'
import { formsExamples } from './forms'
import { mediaExamples } from './media'
import { layoutExamples } from './layout'
import { overlayExamples } from './overlay'
import { navigationExamples } from './navigation'
import { dataExamples } from './data'
import { feedbackExamples } from './feedback'

import React from 'react'

export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}

// Combine all examples into a single object
export const COMPONENT_EXAMPLES: Record<string, ComponentExample[]> = {
  ...coreExamples,
  ...formsExamples,
  ...mediaExamples,
  ...layoutExamples,
  ...overlayExamples,
  ...navigationExamples,
  ...dataExamples,
  ...feedbackExamples
} as unknown as Record<string, ComponentExample[]>


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
  'layout-shell': 'layout',
}

export function getComponentExamples(slug: string): ComponentExample[] {
  const resolvedKey = COMPONENT_EXAMPLES[slug] 
    ? slug 
    : (SLUG_ALIASES[slug] && COMPONENT_EXAMPLES[SLUG_ALIASES[slug]]) 
      ? SLUG_ALIASES[slug] 
      : Object.keys(COMPONENT_EXAMPLES).find(k => k.replace(/-/g, '') === slug.replace(/-/g, '')) || slug

  return COMPONENT_EXAMPLES[resolvedKey] || [
    {
      title: 'Basic Example',
      description: 'A basic example of the component',
      code: `import { ${slug.charAt(0).toUpperCase() + slug.slice(1)} } from 'oryn-ui'

export function Example() {
  return <${slug.charAt(0).toUpperCase() + slug.slice(1)} />
}`,
      preview: <div className="p-4 border rounded-md bg-card">Component Preview</div>
    }
  ]
}
