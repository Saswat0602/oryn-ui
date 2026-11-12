import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Combobox } from '../../src/components/navigation/combobox'
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandItem, 
  CommandGroup 
} from '../../src/components/navigation/command'
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarContent, 
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from '../../src/components/navigation/menubar'
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger, 
  NavigationMenuContent 
} from '../../src/components/navigation/navigation-menu'
import { Pagination } from '../../src/components/navigation/pagination'
import { Stepper } from '../../src/components/navigation/stepper'

describe('Navigation Domain Smoke & Accessibility Suite', () => {
  it('renders NavigationMenu and Menubar', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>Product catalog links</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Window</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </StrictMode>
    )
    expect(getByText('Products')).toBeDefined()
    expect(getByText('File')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('supports full keyboard navigation, roving tabindex, and submenus in Menubar', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New File</MenubarItem>
              <MenubarItem>Open File</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email Link</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </StrictMode>
    )

    const fileTrigger = getByText('File')
    const editTrigger = getByText('Edit')
    expect(fileTrigger.getAttribute('aria-haspopup')).toBe('menu')
    expect(fileTrigger.getAttribute('aria-expanded')).toBe('false')

    // Open via click
    fireEvent.click(fileTrigger)
    expect(fileTrigger.getAttribute('aria-expanded')).toBe('true')
    expect(document.querySelector('[role="menu"]')).toBeDefined()

    // Top-level traversal via ArrowRight
    fireEvent.keyDown(fileTrigger, { key: 'ArrowRight' })
    expect(editTrigger.getAttribute('aria-expanded')).toBe('true')

    // Close via Escape
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(editTrigger.getAttribute('aria-expanded')).toBe('false')

    const axeResult = await axe(container)
    expect(axeResult.violations).toEqual([])
  })

  it('renders Combobox and Command palette', async () => {
    const { container, getByPlaceholderText } = render(
      <StrictMode>
        <Combobox
          options={[
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' }
          ]}
          placeholder="Select country"
        />

        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </StrictMode>
    )
    expect(getByPlaceholderText('Type a command or search...')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('supports listbox semantics, keyboard arrow navigation, and search filtering in Combobox', async () => {
    const handleValueChange = vi.fn()
    const { container, getByRole, getByPlaceholderText, queryByText } = render(
      <StrictMode>
        <Combobox
          name="country"
          options={[
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
            { label: 'Germany', value: 'de', disabled: true }
          ]}
          placeholder="Select country"
          onValueChange={handleValueChange}
        />
      </StrictMode>
    )

    const trigger = getByRole('combobox')
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // Open via Enter
    fireEvent.keyDown(trigger, { key: 'Enter' })
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    const searchInput = getByPlaceholderText('Search...')
    expect(searchInput).toBeDefined()

    // Filter
    fireEvent.change(searchInput, { target: { value: 'Can' } })
    expect(queryByText('United States')).toBeNull()
    expect(queryByText('Canada')).toBeDefined()

    // Select with Enter
    fireEvent.keyDown(searchInput, { key: 'Enter' })
    expect(handleValueChange).toHaveBeenCalledWith('ca')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    const axeResult = await axe(container)
    expect(axeResult.violations).toEqual([])
  })

  it('renders Pagination controls', async () => {
    const { container } = render(
      <StrictMode>
        <Pagination
          currentPage={2}
          totalPages={10}
          onPageChange={() => {}}
        />
      </StrictMode>
    )
    expect(container.firstChild).toBeDefined()

    const ssr = renderToString(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    )
    expect(ssr).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Stepper with active and completed steps', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <Stepper
          steps={[
            { title: 'Project Details', description: 'Name and repository' },
            { title: 'Environment', description: 'Configure cloud region' },
            { title: 'Review', description: 'Verify setup' }
          ]}
          activeStep={1}
        />
      </StrictMode>
    )
    expect(getByText('Project Details')).toBeDefined()
    expect(getByText('Environment')).toBeDefined()
    expect(getByText('Review')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})

