import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../../src/components/overlay/dialog'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '../../src/components/overlay/alert-dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../src/components/overlay/dropdown-menu'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '../../src/components/overlay/context-menu'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../../src/components/overlay/hover-card'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../src/components/overlay/collapsible'
import { Separator } from '../../src/components/overlay/separator'
import { Toggle, ToggleGroup, ToggleGroupItem } from '../../src/components/overlay/toggle'
import { Button } from '../../src/components/core/button'

describe('Overlay Domain Smoke & Accessibility Suite', () => {
  it('renders Dialog with trigger and modal content', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <Dialog open={true}>
          <DialogTrigger asChild>
            <Button>Launch Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deploy Revision</DialogTitle>
            </DialogHeader>
            <p>Deploying production release v3.0.0.</p>
          </DialogContent>
        </Dialog>
      </StrictMode>
    )
    expect(getByText('Deploy Revision')).toBeDefined()
    expect(getByText('Deploying production release v3.0.0.')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders AlertDialog confirmation modal', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <AlertDialog open={true}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Database</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <p>This action cannot be undone.</p>
          </AlertDialogContent>
        </AlertDialog>
      </StrictMode>
    )
    expect(getByText('Are you absolutely sure?')).toBeDefined()
    const dialog = document.querySelector('[role="alertdialog"]')!
    expect(dialog).toBeDefined()
    const title = getByText('Are you absolutely sure?')
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'))

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders DropdownMenu and ContextMenu trigger elements', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <DropdownMenu open={true}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ContextMenu>
          <ContextMenuTrigger>
            <div>Right click target zone</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Inspect</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </StrictMode>
    )
    expect(getByText('Profile')).toBeDefined()
    expect(getByText('Right click target zone')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders HoverCard, Collapsible, and Separator', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <HoverCard open={true}>
          <HoverCardTrigger asChild>
            <span>@antigravity</span>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>Advanced Agentic AI Assistant</p>
          </HoverCardContent>
        </HoverCard>

        <Separator />

        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost">Toggle Section</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>Expanded collapsible body</div>
          </CollapsibleContent>
        </Collapsible>
      </StrictMode>
    )
    expect(getByText('Advanced Agentic AI Assistant')).toBeDefined()
    expect(getByText('Expanded collapsible body')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Toggle and ToggleGroup', async () => {
    const { container, getByRole, getByText } = render(
      <StrictMode>
        <Toggle aria-label="Toggle bold formatting">
          <span>B</span>
        </Toggle>

        <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </StrictMode>
    )
    expect(getByRole('button', { name: /toggle bold/i })).toBeDefined()
    expect(getByText('Center')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})

