import { PlaygroundConfig } from './types'

export function generateComponentCode(config: PlaygroundConfig, currentProps: Record<string, any>): string {
  // If a custom code generator is provided for complex compound components, use it
  if (config.generateCode) {
    return config.generateCode(currentProps)
  }

  const componentName = config.componentName || config.title.replace(/[\s-]/g, '')
  const importName = config.importStatement || `import { ${componentName} } from 'mad-ui-components'`

  const activePropEntries: string[] = []
  let childrenContent: string | null = null

  for (const control of config.controls) {
    const val = currentProps[control.name]
    const def = control.defaultValue

    // Check if property is different from default
    if (val === undefined || val === def) {
      continue
    }

    if (control.name === 'children') {
      childrenContent = String(val)
      continue
    }

    if (typeof val === 'boolean') {
      if (val === true) {
        activePropEntries.push(control.name)
      } else {
        activePropEntries.push(`${control.name}={false}`)
      }
    } else if (typeof val === 'number') {
      activePropEntries.push(`${control.name}={${val}}`)
    } else if (typeof val === 'string') {
      activePropEntries.push(`${control.name}="${val}"`)
    } else if (typeof val === 'object' && val !== null) {
      activePropEntries.push(`${control.name}={${JSON.stringify(val)}}`)
    }
  }

  // Format JSX
  let jsx = ''
  if (activePropEntries.length === 0) {
    if (childrenContent) {
      jsx = `<${componentName}>${childrenContent}</${componentName}>`
    } else {
      jsx = `<${componentName} />`
    }
  } else if (activePropEntries.length <= 2) {
    const propsStr = activePropEntries.join(' ')
    if (childrenContent) {
      jsx = `<${componentName} ${propsStr}>${childrenContent}</${componentName}>`
    } else {
      jsx = `<${componentName} ${propsStr} />`
    }
  } else {
    // Multi-line props format
    const propsLines = activePropEntries.map((p) => `  ${p}`).join('\n')
    if (childrenContent) {
      jsx = `<${componentName}\n${propsLines}\n>\n  ${childrenContent}\n</${componentName}>`
    } else {
      jsx = `<${componentName}\n${propsLines}\n/>`
    }
  }

  return `${importName}\n\nexport default function Example() {\n  return (\n    ${jsx.split('\n').join('\n    ')}\n  )\n}`
}
