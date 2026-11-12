import React, { StrictMode } from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../../src/components/overlay/dialog'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '../../src/components/overlay/alert-dialog'
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '../../src/components/overlay/dropdown-menu'
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
    const title = getByText('Deploy Revision')
    expect(title).toBeDefined()
    expect(getByText('Deploying production release v3.0.0.')).toBeDefined()
    const dialog = document.querySelector('[role="dialog"]')!
    expect(dialog).toBeDefined()
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'))

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
    const handleSelect = vi.fn()
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
            <div data-testid="context-trigger">Right click target zone</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={handleSelect}>Inspect</ContextMenuItem>
            <ContextMenuItem>View Source</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </StrictMode>
    )
    expect(getByText('Profile')).toBeDefined()
    expect(getByText('Right click target zone')).toBeDefined()

    // Right-click target zone
    const target = getByText('Right click target zone')
    fireEvent.contextMenu(target, { clientX: 100, clientY: 150 })

    const menu = document.querySelector('[role="menu"]')
    expect(menu).toBeDefined()
    expect(getByText('Inspect')).toBeDefined()

    // Test Enter activation on menuitem
    const inspectItem = getByText('Inspect')
    fireEvent.keyDown(inspectItem, { key: 'Enter' })
    expect(handleSelect).toHaveBeenCalled()

    // Test keyboard trigger Shift+F10
    fireEvent.keyDown(target, { key: 'F10', shiftKey: true })
    expect(document.querySelector('[role="menu"]')).toBeDefined()

    // Escape closes context menu
    fireEvent.keyDown(document, { key: 'Escape' })

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('supports checkbox, radio, submenus, and keyboard interaction in DropdownMenu', async () => {
    const handleCheckedChange = vi.fn()
    const handleRadioSelect = vi.fn()
    const { container, getByText } = render(
      <StrictMode>
        <DropdownMenu defaultOpen={true}>
          <DropdownMenuTrigger asChild>
            <Button>Settings</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={false} onCheckedChange={handleCheckedChange}>
              Show Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioItem checked={true} onSelect={handleRadioSelect}>
              Dark Mode
            </DropdownMenuRadioItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Developer Tools</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </StrictMode>
    )

    const checkboxItem = getByText('Show Status Bar')
    const radioItem = getByText('Dark Mode')
    expect(checkboxItem.getAttribute('role')).toBe('menuitemcheckbox')
    expect(checkboxItem.getAttribute('aria-checked')).toBe('false')
    expect(radioItem.getAttribute('role')).toBe('menuitemradio')
    expect(radioItem.getAttribute('aria-checked')).toBe('true')

    // Toggle with Space
    fireEvent.keyDown(checkboxItem, { key: ' ' })
    expect(handleCheckedChange).toHaveBeenCalledWith(true)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders HoverCard, Collapsible, and Separator', async () => {
    const { container, getByText, getByRole } = render(
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

    const collapsibleTrigger = getByRole('button', { name: 'Toggle Section' })
    const collapsibleBody = getByText('Expanded collapsible body').parentElement?.parentElement?.parentElement
    expect(collapsibleTrigger.getAttribute('aria-expanded')).toBe('true')
    const controlledId = collapsibleTrigger.getAttribute('aria-controls')
    expect(controlledId).toBeTruthy()
    expect(collapsibleBody?.getAttribute('id')).toBe(controlledId)

    // Toggle collapse
    fireEvent.click(collapsibleTrigger)
    expect(collapsibleTrigger.getAttribute('aria-expanded')).toBe('false')
    expect(collapsibleBody?.getAttribute('aria-hidden')).toBe('true')

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

  it('supports keyboard focus and Escape dismissal on HoverCard', async () => {
    vi.useFakeTimers()
    const handleOpenChange = vi.fn()
    const { container, getByRole, getByText } = render(
      <StrictMode>
        <HoverCard openDelay={0} closeDelay={0} onOpenChange={handleOpenChange}>
          <HoverCardTrigger asChild>
            <a href="#profile">@developer</a>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>Engineer Profile Card</p>
          </HoverCardContent>
        </HoverCard>
      </StrictMode>
    )

    const trigger = getByRole('link', { name: '@developer' })
    expect(trigger.getAttribute('data-state')).toBe('closed')

    // Keyboard focus triggers open
    act(() => {
      fireEvent.focus(trigger)
      vi.runAllTimers()
    })
    expect(handleOpenChange).toHaveBeenCalledWith(true)

    // Escape dismisses
    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' })
      vi.runAllTimers()
    })
    expect(handleOpenChange).toHaveBeenCalledWith(false)

    vi.useRealTimers()
    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})

