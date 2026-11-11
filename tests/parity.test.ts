import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { componentManifest } from '../src/component.manifest'
import { COMPONENT_PROPS, getComponentProps } from '../docs/src/lib/component-props'

describe('Component & Documentation Parity Test Suite', () => {
  it('ensures all manifest components have documented props tables', () => {
    expect(componentManifest.length).toBe(76)

    const missingProps: string[] = []

    for (const component of componentManifest) {
      const props = getComponentProps(component.name)
      if (!props || props.length === 0) {
        missingProps.push(component.name)
      }
    }

    expect(missingProps).toEqual([])
  })

  it('ensures all prop definitions contain required fields and valid descriptions', () => {
    for (const [componentName, props] of Object.entries(COMPONENT_PROPS)) {
      expect(props.length).toBeGreaterThan(0)

      for (const prop of props) {
        expect(prop.name, `Prop in ${componentName} missing name`).toBeTruthy()
        expect(prop.type, `Prop ${prop.name} in ${componentName} missing type`).toBeTruthy()
        expect(prop.description, `Prop ${prop.name} in ${componentName} missing description`).toBeTruthy()
        expect(typeof prop.required).toBe('boolean')
      }
    }
  })

  it('ensures CLI component distributor maps to real source files on disk', () => {
    const cliScriptPath = path.resolve(__dirname, '../scripts/copy-component.js')
    const cliContent = fs.readFileSync(cliScriptPath, 'utf8')

    // Extract all mapped component paths
    const matches = [...cliContent.matchAll(/path:\s*['"]([^'"]+)['"]/g)]
    expect(matches.length).toBe(76)

    for (const match of matches) {
      const relativePath = match[1]
      const fullPath = path.resolve(__dirname, '..', relativePath)
      expect(fs.existsSync(fullPath), `CLI source file does not exist: ${relativePath}`).toBe(true)
    }
  })

  it('ensures zero third-party UI dependencies in package.json', () => {
    const pkgPath = path.resolve(__dirname, '../package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

    const prodDeps = Object.keys(pkg.dependencies || {})
    
    // Disallow external UI frameworks
    expect(prodDeps.some(d => d.startsWith('@radix-ui/'))).toBe(false)
    expect(prodDeps.some(d => d.startsWith('@tanstack/'))).toBe(false)
    expect(prodDeps.some(d => d.startsWith('framer-motion'))).toBe(false)

    // Allowed base dependencies only (clsx and tailwind-merge; lucide-react is decoupled peer/optional)
    expect(prodDeps.sort()).toEqual(['clsx', 'tailwind-merge'].sort())
    expect(pkg.peerDependencies?.['lucide-react']).toBeDefined()
  })

  it('executes CLI list and dry-run copy commands successfully', async () => {
    const { execSync } = await import('child_process')
    const listOutput = execSync('node scripts/copy-component.js list', { encoding: 'utf8' })
    expect(listOutput).toContain('ORYN UI Available Components (76 Total)')
    expect(listOutput).toContain('button')
    expect(listOutput).toContain('data-table')
    expect(listOutput).toContain('dialog')

    const dryRunOutput = execSync('node scripts/copy-component.js dialog --dry-run', { encoding: 'utf8' })
    expect(dryRunOutput).toContain('[DRY RUN MODE')
    expect(dryRunOutput).toContain('Would create')
    expect(dryRunOutput).toContain('Primitive: primitives/presence.tsx')
  })

  it('validates displayName, ref forwarding, and className merging on core primitives', async () => {
    const React = await import('react')
    const { render } = await import('@testing-library/react')
    const { Button } = await import('../src/components/core/button')
    const { Input } = await import('../src/components/core/input')
    const { Badge } = await import('../src/components/media/badge')
    const { Checkbox } = await import('../src/components/core/checkbox')
    const { Switch } = await import('../src/components/core/switch')
    const { Drawer } = await import('../src/components/layout/drawer')
    const { Combobox } = await import('../src/components/navigation/combobox')
    const { DateTimePicker } = await import('../src/components/forms/datetime-picker')

    // displayName assertions
    expect(Button.displayName).toBe('Button')
    expect(Input.displayName).toBe('Input')
    expect(Badge.displayName).toBe('Badge')
    expect(Checkbox.displayName).toBe('Checkbox')
    expect(Switch.displayName).toBe('Switch')
    expect(Drawer.displayName).toBe('Drawer')
    expect(Combobox.displayName).toBe('Combobox')
    expect(DateTimePicker.displayName).toBe('DateTimePicker')

    // Ref forwarding & className merge assertions
    const buttonRef = React.createRef<HTMLButtonElement>()
    const { getByTestId } = render(
      React.createElement(Button, {
        ref: buttonRef,
        className: 'custom-parity-class',
        'data-testid': 'parity-btn',
        'aria-label': 'Parity Button',
      }, 'Test')
    )

    const btnElement = getByTestId('parity-btn')
    expect(buttonRef.current).toBe(btnElement)
    expect(btnElement.className).toContain('custom-parity-class')
    expect(btnElement.getAttribute('aria-label')).toBe('Parity Button')
  })

  it('guarantees all source components utilizing React hooks carry the "use client" directive', () => {
    function walkSync(dir: string): string[] {
      let files: string[] = []
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          files = files.concat(walkSync(fullPath))
        } else if (fullPath.endsWith('.tsx')) {
          files.push(fullPath)
        }
      }
      return files
    }

    const componentFiles = walkSync(path.resolve(__dirname, '../src/components'))
    const missingUseClient: string[] = []

    for (const file of componentFiles) {
      const content = fs.readFileSync(file, 'utf8')
      const usesHooks = /useState|useEffect|useRef|useCallback|useMemo|useId|useContext|useReducer|useImperativeHandle/.test(content)
      const hasUseClient = content.startsWith('"use client"') || content.startsWith("'use client'")
      if (usesHooks && !hasUseClient) {
        missingUseClient.push(path.basename(file))
      }
    }

    expect(missingUseClient, `Components using hooks must carry "use client" for Next.js App Router RSC safety`).toEqual([])
  })
})
