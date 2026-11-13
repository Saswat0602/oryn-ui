import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { Button } from '../../src/components/core/button'
import { Input } from '../../src/components/core/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../src/components/core/card'
import { Label } from '../../src/components/core/label'
import { Checkbox } from '../../src/components/core/checkbox'
import { Radio } from '../../src/components/core/radio'
import { Select } from '../../src/components/core/select'
import { Switch } from '../../src/components/core/switch'
import { Progress } from '../../src/components/core/progress'
import { Slider } from '../../src/components/core/slider'
import { Rating } from '../../src/components/core/rating'
import { Skeleton } from '../../src/components/core/skeleton'
import { Textarea } from '../../src/components/core/textarea'
import { ButtonGroup, ButtonGroupItem } from '../../src/components/core/button-group'
import { InputGroup, InputGroupAddon } from '../../src/components/core/input-group'

describe('Core Domain Smoke & Accessibility Suite', () => {
  it('renders Button with variants and handles click events', async () => {
    let clicked = false
    let loadingClicked = false
    const { container, getByRole, getByLabelText } = render(
      <StrictMode>
        <Button variant="default" onClick={() => { clicked = true }}>
          Click Action
        </Button>
        <Button size="icon" aria-label="Settings action">
          ⚙️
        </Button>
        <Button loading onClick={() => { loadingClicked = true }}>
          Loading Action
        </Button>
      </StrictMode>
    )
    const btn = getByRole('button', { name: 'Click Action' })
    expect(btn).toBeDefined()
    fireEvent.click(btn)
    expect(clicked).toBe(true)

    const iconBtn = getByLabelText('Settings action')
    expect(iconBtn).toBeDefined()

    const loadingBtn = getByRole('button', { name: 'Loading Action' })
    expect(loadingBtn.getAttribute('aria-busy')).toBe('true')
    fireEvent.click(loadingBtn)
    expect(loadingClicked).toBe(false)

    // SSR
    const ssr = renderToString(<Button variant="outline">SSR Button</Button>)
    expect(ssr).toContain('SSR Button')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Input and Textarea with input typing events', async () => {
    let text = ''
    const { container, getByPlaceholderText } = render(
      <StrictMode>
        <Input 
          placeholder="Enter username" 
          onChange={(e) => { text = e.target.value }} 
        />
        <Input
          placeholder="Error email"
          aria-label="Email error"
          error
          leftIcon={<span data-testid="left-icon">@</span>}
        />
        <Textarea 
          placeholder="Enter biography" 
          aria-label="Biography"
          error
        />
      </StrictMode>
    )
    const input = getByPlaceholderText('Enter username')
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: 'alice' } })
    expect(text).toBe('alice')

    const errorInput = getByPlaceholderText('Error email')
    expect(errorInput.getAttribute('aria-invalid')).toBe('true')

    const textarea = getByPlaceholderText('Enter biography')
    expect(textarea.getAttribute('aria-invalid')).toBe('true')

    const ssr = renderToString(<Input placeholder="SSR Input" />)
    expect(ssr).toContain('SSR Input')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Card with all compound subcomponents', async () => {
    let cardClicked = false
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <Card clickable onClick={() => { cardClicked = true }}>
          <CardHeader>
            <CardTitle as="h2">Enterprise Cloud</CardTitle>
            <CardDescription>Cluster telemetry settings</CardDescription>
          </CardHeader>
          <CardContent>Cluster is operating at 99.99% uptime.</CardContent>
          <CardFooter>Last updated 1m ago</CardFooter>
        </Card>
      </StrictMode>
    )
    expect(getByText('Enterprise Cloud')).toBeDefined()
    expect(getByText('Cluster telemetry settings')).toBeDefined()
    expect(getByText('Cluster is operating at 99.99% uptime.')).toBeDefined()

    // Test clickable card keyboard activation
    const cardBtn = getByRole('button')
    expect(cardBtn.getAttribute('tabindex')).toBe('0')
    fireEvent.keyDown(cardBtn, { key: 'Enter' })
    expect(cardClicked).toBe(true)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Checkbox, Radio, and Switch controls', async () => {
    let checked = false
    const { container, getByRole, getByLabelText, getByText } = render(
      <StrictMode>
        <Checkbox 
          label="Agree to terms"
          onChange={(e) => { checked = e.target.checked }} 
        />
        <Switch 
          aria-label="Push notifications" 
        />
        <Radio 
          name="deployment-tier" 
          value="pro" 
          aria-label="Pro plan" 
        />
      </StrictMode>
    )
    const checkbox = getByLabelText('Agree to terms')
    fireEvent.click(checkbox)
    expect(checked).toBe(true)

    const labelEl = getByText('Agree to terms')
    fireEvent.click(labelEl)
    expect(checked).toBe(false)

    const switchEl = getByRole('switch')
    expect(switchEl).toBeDefined()

    const radio = getByLabelText('Pro plan') as HTMLInputElement
    expect(radio.checked).toBe(false)
    fireEvent.click(radio)
    expect(radio.checked).toBe(true)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Slider, Progress, and Rating components', async () => {
    const handleSliderChange = vi.fn()
    const { container, getAllByRole, getByRole } = render(
      <StrictMode>
        <Slider value={[40]} max={100} step={1} aria-label="Volume slider" />
        <Slider
          defaultValue={[20, 80]}
          range
          min={0}
          max={100}
          onValueChange={handleSliderChange}
          aria-label="Price range"
        />
        <Slider orientation="vertical" defaultValue={50} aria-label="Vertical height" />
        <Progress value={65} max={100} aria-label="Download progress" />
        <Rating value={4} max={5} aria-label="Customer rating" />
      </StrictMode>
    )
    const sliders = getAllByRole('slider')
    expect(sliders.length).toBe(4) // 1 single + 2 range thumbs + 1 vertical
    const progressBar = getByRole('progressbar')
    expect(progressBar).toBeDefined()
    expect(progressBar.getAttribute('aria-valuenow')).toBe('65')
    expect(progressBar.getAttribute('aria-valuetext')).toBe('65%')

    // Test keyboard navigation Home & End on first range thumb
    const minThumb = sliders[1]
    fireEvent.keyDown(minThumb, { key: 'Home' })
    expect(handleSliderChange).toHaveBeenCalledWith([0, 80])

    const ratingGroup = getByRole('radiogroup', { name: 'Customer rating' })
    expect(ratingGroup).toBeDefined()
    const radios = ratingGroup.querySelectorAll('[role="radio"]')
    expect(radios.length).toBe(5)
    expect(radios[3].getAttribute('aria-checked')).toBe('true')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Select dropdown and Label', async () => {
    const handleSelectChange = vi.fn()
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <Label htmlFor="framework-select" required>Preferred Framework</Label>
        <Select 
          id="framework-select"
          options={[
            { label: 'Next.js App Router', value: 'nextjs' },
            { label: 'Vite React', value: 'vite' },
            { label: 'Remix', value: 'remix' }
          ]}
          defaultValue="nextjs"
          onValueChange={handleSelectChange}
        />
      </StrictMode>
    )
    expect(getByText('Preferred Framework')).toBeDefined()
    expect(getByText('(required)')).toBeDefined()
    expect(container.querySelector('[aria-hidden="true"]')?.textContent?.trim()).toBe('*')
    const trigger = getByRole('combobox')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    const viteOption = getByText('Vite React')
    fireEvent.click(viteOption)
    expect(handleSelectChange).toHaveBeenCalledWith('vite')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Skeleton placeholders with role status and ref forwarding in single and multi-line modes', async () => {
    const singleRef = React.createRef<HTMLDivElement>()
    const multiRef = React.createRef<HTMLDivElement>()

    const { container, getAllByRole } = render(
      <StrictMode>
        <Skeleton ref={singleRef} className="h-4 w-32" />
        <Skeleton ref={multiRef} lines={3} />
      </StrictMode>
    )
    expect(singleRef.current).toBeDefined()
    expect(multiRef.current).toBeDefined()

    const statuses = getAllByRole('status')
    expect(statuses.length).toBe(2)
    expect(statuses[0].getAttribute('aria-label')).toBe('Loading...')
    expect(statuses[1].getAttribute('aria-busy')).toBe('true')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders ButtonGroup and InputGroup composites', async () => {
    const { container, getByText, getByPlaceholderText, getByRole } = render(
      <StrictMode>
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>

        <InputGroup size="sm" aria-label="Website domain input group">
          <InputGroupAddon>https://</InputGroupAddon>
          <Input placeholder="example.com" aria-label="Domain" />
        </InputGroup>
      </StrictMode>
    )
    expect(getByText('Left')).toBeDefined()
    expect(getByText('Middle')).toBeDefined()
    expect(getByText('Right')).toBeDefined()
    expect(getByPlaceholderText('example.com')).toBeDefined()

    const group = getByRole('group', { name: 'Website domain input group' })
    expect(group).toBeDefined()
    expect(group.getAttribute('data-size')).toBe('sm')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('supports segmented mode, roving tabindex, and arrow navigation in ButtonGroup', async () => {
    const handleValueChange = vi.fn()
    const { container, getByText } = render(
      <StrictMode>
        <ButtonGroup segmented defaultValue="month" onValueChange={handleValueChange} aria-label="Billing frequency">
          <ButtonGroupItem value="day">Day</ButtonGroupItem>
          <ButtonGroupItem value="month">Month</ButtonGroupItem>
          <ButtonGroupItem value="year">Year</ButtonGroupItem>
        </ButtonGroup>
      </StrictMode>
    )
    const monthItem = getByText('Month')
    const yearItem = getByText('Year')
    expect(monthItem.getAttribute('role')).toBe('radio')
    expect(monthItem.getAttribute('aria-checked')).toBe('true')
    expect(monthItem.getAttribute('tabindex')).toBe('0')
    fireEvent.keyDown(monthItem, { key: 'ArrowRight' })
    expect(handleValueChange).toHaveBeenCalledWith('year')
    expect(yearItem.getAttribute('aria-checked')).toBe('true')
    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('toggles Switch state cleanly when label is clicked without double-toggle and links aria-describedby', async () => {
    let switchState = false
    let changeEventReceived: any = null
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <Switch
          label="Enable telemetry"
          description="Send anonymous crash reports"
          onCheckedChange={(val) => { switchState = val }}
          onChange={(e) => { changeEventReceived = e }}
        />
      </StrictMode>
    )
    const switchBtn = getByRole('switch')
    expect(switchBtn.getAttribute('aria-checked')).toBe('false')
    expect(switchBtn.getAttribute('aria-describedby')).toMatch(/^switch-desc-/)

    const labelText = getByText('Enable telemetry')
    fireEvent.click(labelText)
    expect(switchState).toBe(true)
    expect(switchBtn.getAttribute('aria-checked')).toBe('true')
    expect(changeEventReceived).not.toBeNull()
    expect(changeEventReceived.target.checked).toBe(true)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})

