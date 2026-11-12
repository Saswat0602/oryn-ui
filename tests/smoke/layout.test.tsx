import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { Drawer } from '../../src/components/layout/drawer'
import { Layout } from '../../src/components/layout/layout'
import { Modal } from '../../src/components/layout/modal'
import { Navbar } from '../../src/components/layout/navbar'
import { Popover } from '../../src/components/layout/popover'
import { Resizable, ResizablePanel, ResizableHandle } from '../../src/components/layout/resizable'
import { ScrollArea } from '../../src/components/layout/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../src/components/layout/sheet'
import { Sidebar, SidebarProvider, SidebarTrigger } from '../../src/components/layout/sidebar'
import { Tooltip, TooltipProvider } from '../../src/components/layout/tooltip'
import { Button } from '../../src/components/core/button'

describe('Layout Domain Smoke & Accessibility Suite', () => {
  it('renders Layout with header, sidebar, and content', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <Layout
          navbar={{ brand: 'Mad UI' }}
          sidebar={{
            items: [{ label: 'Overview' }]
          }}
        >
          <div>Main Application Canvas</div>
        </Layout>
      </StrictMode>
    )
    expect(getByText('Mad UI')).toBeDefined()
    expect(getByText('Overview')).toBeDefined()
    expect(getByText('Main Application Canvas')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Navbar with logo and navigation links', async () => {
    const { container, getByText, getAllByText, getByRole, getByLabelText } = render(
      <StrictMode>
        <Navbar
          brand="Mad UI"
          showNotifications={true}
          notificationCount={3}
          showProfile={true}
          navItems={[
            {
              id: '1',
              label: 'Documentation',
              dropdown: [
                { label: 'Getting Started', action: () => {} },
                { label: 'Installation', action: () => {} }
              ]
            },
            { id: '2', label: 'Components' }
          ]}
        />
      </StrictMode>
    )
    expect(getByText('Mad UI')).toBeDefined()
    expect(getAllByText('Documentation')[0]).toBeDefined()

    // Test mobile menu toggle aria attributes
    const mobileToggle = getByLabelText('Toggle navigation menu')
    expect(mobileToggle.getAttribute('aria-expanded')).toBe('false')
    expect(mobileToggle.getAttribute('aria-controls')).toBe('navbar-mobile-menu')

    fireEvent.click(mobileToggle)
    expect(mobileToggle.getAttribute('aria-expanded')).toBe('true')

    // Test notification menu toggle and escape dismissal
    const notifBtn = getByLabelText('Notifications')
    expect(notifBtn.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(notifBtn)
    expect(notifBtn.getAttribute('aria-expanded')).toBe('true')
    expect(getByRole('dialog', { name: 'Notifications' })).toBeDefined()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(notifBtn.getAttribute('aria-expanded')).toBe('false')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Sidebar with items, toggle buttons, and aria-expanded attributes', async () => {
    const { container, getByText, getByLabelText } = render(
      <StrictMode>
        <Sidebar
          title="Platform"
          showToggleButton
          items={[
            { label: 'Overview' },
            { label: 'Deployments' }
          ]}
        />
        <SidebarProvider defaultOpen={true}>
          <SidebarTrigger />
        </SidebarProvider>
      </StrictMode>
    )
    expect(getByText('Platform')).toBeDefined()
    expect(getByText('Overview')).toBeDefined()

    const collapseBtn = getByLabelText('Collapse sidebar')
    expect(collapseBtn.getAttribute('aria-expanded')).toBe('true')
    expect(collapseBtn.getAttribute('aria-controls')).toBe('sidebar-navigation')

    const triggerBtn = getByLabelText('Toggle Sidebar')
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('true')
    expect(triggerBtn.getAttribute('aria-controls')).toBe('sidebar-navigation')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Modal and Drawer overlays', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <Modal isOpen={true} onClose={() => {}} title="Cluster Details">
          <div>Modal body content</div>
        </Modal>

        <Drawer isOpen={true} onClose={() => {}} position="right">
          <div>Quick Drawer Content</div>
        </Drawer>
      </StrictMode>
    )
    expect(getByText('Cluster Details')).toBeDefined()
    expect(getByText('Quick Drawer Content')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Sheet and Resizable split panels', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <Sheet open={true}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Environment Variables</SheetTitle>
            </SheetHeader>
            <div>Sheet body</div>
          </SheetContent>
        </Sheet>

        <Resizable>
          <ResizablePanel>Panel Left</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Panel Right</ResizablePanel>
        </Resizable>
      </StrictMode>
    )
    const title = getByText('Environment Variables')
    expect(title).toBeDefined()
    const dialog = document.querySelector('[role="dialog"]')!
    expect(dialog).toBeDefined()
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'))
    expect(getByText('Panel Left')).toBeDefined()
    expect(getByText('Panel Right')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders ScrollArea and Tooltip', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <ScrollArea className="h-40 w-48">
          <div>Long scrollable content list</div>
        </ScrollArea>

        <TooltipProvider>
          <Tooltip defaultOpen content="Helpful tooltip text">
            <Button variant="outline">Hover trigger</Button>
          </Tooltip>
        </TooltipProvider>
      </StrictMode>
    )
    expect(getByText('Long scrollable content list')).toBeDefined()
    expect(getByText('Hover trigger')).toBeDefined()

    // Assert tooltip role and content is in document
    const tooltipContent = getByText('Helpful tooltip text')
    expect(tooltipContent).toBeDefined()
    const tooltipEl = document.querySelector('[role="tooltip"]')
    expect(tooltipEl).toBeDefined()
    expect(tooltipEl?.className).not.toContain('pointer-events-none')

    // Escape key dismisses the tooltip
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(document.querySelector('[role="tooltip"]')).toBeNull()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Popover floating element', async () => {
    const { container, getByText, queryByText } = render(
      <StrictMode>
        <Popover
          trigger={<Button variant="outline">Open Popover</Button>}
          content={<div>Floating popover card</div>}
        />
      </StrictMode>
    )
    const triggerBtn = getByText('Open Popover')
    expect(triggerBtn).toBeDefined()
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(triggerBtn)
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('true')
    const popoverContent = getByText('Floating popover card')
    expect(popoverContent).toBeDefined()
    const contentPanel = document.querySelector('[role="dialog"]')!
    expect(contentPanel).toBeDefined()
    expect(triggerBtn.getAttribute('aria-controls')).toBe(contentPanel.getAttribute('id'))

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('false')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
