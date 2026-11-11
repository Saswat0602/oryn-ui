import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { Accordion } from '../../src/components/forms/accordion'
import { Breadcrumbs } from '../../src/components/forms/breadcrumbs'
import { Calendar } from '../../src/components/forms/calendar'
import { DateTimePicker } from '../../src/components/forms/datetime-picker'
import { InputOTP } from '../../src/components/forms/input-otp'
import { RadioGroup, RadioGroupItem } from '../../src/components/forms/radio-group'
import { Tabs } from '../../src/components/forms/tabs'
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '../../src/components/forms/form'
import { PasswordInput } from '../../src/components/forms/password-input'
import { NumberInput } from '../../src/components/forms/number-input'
import { MultiSelect } from '../../src/components/forms/multi-select'
import { DateRangePicker } from '../../src/components/forms/date-range-picker'
import { TimePicker } from '../../src/components/forms/time-picker'
import { ColorPicker } from '../../src/components/forms/color-picker'
import { FileUpload } from '../../src/components/forms/file-upload'
import { PromptInput } from '../../src/components/forms/prompt-input'

describe('Forms Domain Smoke & Accessibility Suite', () => {
  it('renders Accordion and toggles item expansion', async () => {
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <Accordion
          items={[
            { id: 'item-1', title: 'What is Mad UI?', content: 'An enterprise React component library.' },
            { id: 'item-2', title: 'Is it accessible?', content: 'Yes, full ARIA compliance.' }
          ]}
        />
      </StrictMode>
    )
    expect(getByText('What is Mad UI?')).toBeDefined()
    const trigger = getByText('What is Mad UI?')
    fireEvent.click(trigger)
    expect(getByText('An enterprise React component library.')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Breadcrumbs and Tabs navigation', async () => {
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Settings', href: '/settings' },
            { label: 'Security' }
          ]}
        />

        <Tabs
          items={[
            { id: 'tab-overview', label: 'Overview', content: <div>Overview Content</div> },
            { id: 'tab-billing', label: 'Billing', content: <div>Billing Content</div> }
          ]}
          defaultValue="tab-overview"
        />
      </StrictMode>
    )
    expect(getByText('Security')).toBeDefined()
    expect(getByText('Overview Content')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Calendar and DateTimePicker', async () => {
    const { container } = render(
      <StrictMode>
        <Calendar 
          selectedDate={new Date(2026, 9, 31)} 
          onDateSelect={() => {}} 
        />
        <DateTimePicker 
          value={new Date(2026, 9, 31, 14, 30)} 
          onChange={() => {}} 
        />
      </StrictMode>
    )
    expect(container.firstChild).toBeDefined()

    const ssr = renderToString(<Calendar />)
    expect(ssr).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders InputOTP and RadioGroup', async () => {
    const { container, getByLabelText } = render(
      <StrictMode>
        <InputOTP length={6} value="123456" onChange={() => {}} aria-label="Verification OTP" />

        <RadioGroup defaultValue="team" aria-label="Account tier">
          <RadioGroupItem value="personal" id="radio-personal" aria-label="Personal" />
          <RadioGroupItem value="team" id="radio-team" aria-label="Team" />
        </RadioGroup>
      </StrictMode>
    )
    expect(getByLabelText('Team')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Composable Form with FormField and validation message', async () => {
    const { container, getByText, getByLabelText } = render(
      <StrictMode>
        <Form>
          <FormField name="username" error="Handle is required">
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input placeholder="Enter username" />
              </FormControl>
              <FormDescription>Choose a unique organization handle.</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </Form>
      </StrictMode>
    )
    expect(getByLabelText('Username')).toBeDefined()
    expect(getByText('Choose a unique organization handle.')).toBeDefined()
    expect(getByText('Handle is required')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders PasswordInput with strength meter and reveal toggle', async () => {
    let passwordVal = 'SuperSecret123!'
    const { container, getByPlaceholderText, getByRole } = render(
      <StrictMode>
        <PasswordInput
          placeholder="Enter secure password"
          value={passwordVal}
          onChange={(e) => { passwordVal = e.target.value }}
          strengthMeter
          strengthScore={3}
        />
      </StrictMode>
    )
    const input = getByPlaceholderText('Enter secure password') as HTMLInputElement
    expect(input.type).toBe('password')
    const toggleBtn = getByRole('button', { name: /show password/i })
    fireEvent.click(toggleBtn)
    expect(input.type).toBe('text')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders NumberInput stepper and clamp bounds', async () => {
    let count = 5
    const { container, getByRole } = render(
      <StrictMode>
        <NumberInput
          value={count}
          min={1}
          max={10}
          step={1}
          onChange={(val) => { count = val }}
          aria-label="Cluster Nodes"
        />
      </StrictMode>
    )
    const spinbutton = getByRole('spinbutton')
    expect(spinbutton).toBeDefined()
    const incBtn = getByRole('button', { name: /increment value/i })
    fireEvent.pointerDown(incBtn)
    fireEvent.pointerUp(incBtn)
    expect(count).toBe(6)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders MultiSelect with tags and selection', async () => {
    let selected = ['react', 'nextjs']
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <MultiSelect
          options={[
            { label: 'React', value: 'react' },
            { label: 'Next.js', value: 'nextjs' },
            { label: 'Tailwind CSS', value: 'tailwind' }
          ]}
          value={selected}
          onChange={(val) => { selected = val }}
          placeholder="Select technologies"
        />
      </StrictMode>
    )
    expect(getByText('React')).toBeDefined()
    expect(getByText('Next.js')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders DateRangePicker and TimePicker', async () => {
    const { container, getByLabelText } = render(
      <StrictMode>
        <DateRangePicker
          value={{ from: new Date(2026, 9, 1), to: new Date(2026, 9, 31) }}
          onChange={() => {}}
        />
        <TimePicker
          value="10:45 AM"
          format="12h"
          onChange={() => {}}
        />
      </StrictMode>
    )
    const hoursInput = getByLabelText('Hours') as HTMLInputElement
    expect(hoursInput.value).toBe('10')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders FileUpload dropzone', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <FileUpload
          maxFiles={2}
          maxSize={5 * 1024 * 1024}
          title="Upload architectural diagram"
          description="PNG or SVG files up to 5MB"
        />
      </StrictMode>
    )
    expect(getByText('Upload architectural diagram')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders PromptInput with submit and stop generation states', async () => {
    let promptSubmitted = ''
    let stopped = false
    const { container, getByPlaceholderText, getByRole, rerender } = render(
      <StrictMode>
        <PromptInput
          placeholder="Ask AI anything..."
          value="Generate dashboard code"
          onChange={() => {}}
          onSubmit={(text) => { promptSubmitted = text }}
          onStop={() => { stopped = true }}
        />
      </StrictMode>
    )
    expect(getByPlaceholderText('Ask AI anything...')).toBeDefined()
    const sendBtn = getByRole('button', { name: /send prompt/i })
    fireEvent.click(sendBtn)
    expect(promptSubmitted).toBe('Generate dashboard code')

    rerender(
      <StrictMode>
        <PromptInput
          placeholder="Ask AI anything..."
          loading={true}
          onStop={() => { stopped = true }}
        />
      </StrictMode>
    )
    const stopBtn = getByRole('button', { name: /stop generating/i })
    fireEvent.click(stopBtn)
    expect(stopped).toBe(true)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders ColorPicker trigger and supports inline mode without SSR errors', () => {
    // SSR Smoke Check
    const ssrHtml = renderToString(<ColorPicker value="#4f46e5" />)
    expect(ssrHtml).toContain('#4f46e5')

    // Client DOM Render
    let selectedColor = '#4f46e5'
    const { getByRole, getByText, rerender } = render(
      <StrictMode>
        <ColorPicker
          value={selectedColor}
          onChange={(c) => { selectedColor = c }}
        />
      </StrictMode>
    )

    expect(getByText('#4f46e5')).toBeDefined()
    const trigger = getByRole('button')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // Click trigger to open floating popover
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    // Inline mode test
    rerender(
      <StrictMode>
        <ColorPicker
          inline={true}
          value="#10b981"
          onChange={() => {}}
        />
      </StrictMode>
    )
    expect(getByText(/hex/i)).toBeDefined()
    expect(getByText(/rgb/i)).toBeDefined()
    expect(getByText(/hsl/i)).toBeDefined()
  })
})
