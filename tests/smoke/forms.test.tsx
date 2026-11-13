import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect, vi } from 'vitest'
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
    const trigger = getByText('What is Mad UI?').closest('button')!
    expect(trigger.getAttribute('aria-controls')).toBe('accordion-content-item-1')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    const regionBefore = container.querySelector('#accordion-content-item-1') as HTMLElement
    expect(regionBefore?.getAttribute('aria-hidden')).toBe('true')
    expect(regionBefore?.style.visibility).toBe('hidden')

    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(getByText('An enterprise React component library.')).toBeDefined()
    const region = container.querySelector('#accordion-content-item-1') as HTMLElement
    expect(region).toBeDefined()
    expect(region?.getAttribute('role')).toBe('region')
    expect(region?.style.visibility).toBe('')

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
    const securityPage = getByText('Security')
    expect(securityPage).toBeDefined()
    expect(securityPage.getAttribute('aria-current')).toBe('page')
    expect(securityPage.getAttribute('role')).toBeNull()
    expect(getByText('Overview Content')).toBeDefined()

    // Verify Tabs aria-controls and aria-labelledby linkage
    const overviewTab = getByRole('tab', { name: 'Overview' })
    const billingTab = getByRole('tab', { name: 'Billing' })
    const controlsId = overviewTab.getAttribute('aria-controls')
    expect(controlsId).toBeDefined()
    expect(controlsId).toContain('panel-tab-overview')

    // Navigate to Billing using arrow key
    fireEvent.keyDown(overviewTab, { key: 'ArrowRight' })
    expect(billingTab.getAttribute('aria-selected')).toBe('true')
    expect(getByText('Billing Content')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Calendar and DateTimePicker with full keyboard and dialog accessibility', async () => {
    const handleSelect = vi.fn()
    const { container, getByRole } = render(
      <StrictMode>
        <Calendar 
          selectedDate={new Date(2026, 9, 15)} 
          onDateSelect={handleSelect} 
        />
        <DateTimePicker 
          value={new Date(2026, 9, 31, 14, 30)} 
          onChange={() => {}} 
        />
      </StrictMode>
    )
    expect(container.firstChild).toBeDefined()

    const trigger = getByRole('combobox')
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // Open calendar dialog
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeDefined()
    expect(dialog?.getAttribute('aria-modal')).toBe('true')

    // Day 15 should be selected with full accessible label
    const day15Button = document.querySelector('button[aria-label="Thursday, October 15, 2026"]')
    expect(day15Button).toBeDefined()
    expect(day15Button?.getAttribute('aria-selected')).toBe('true')

    // Test arrow key navigation from day 15 to day 16
    if (day15Button) {
      fireEvent.keyDown(day15Button, { key: 'ArrowRight' })
      const day16Button = document.querySelector('button[aria-label="Friday, October 16, 2026"]')
      expect(day16Button?.getAttribute('tabIndex')).toBe('0')
    }

    // Press Escape closes dialog
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    const ssr = renderToString(<Calendar />)
    expect(ssr).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders DateTimePicker with full dialog semantics and mode tabs', async () => {
    const handleDateTimeChange = vi.fn()
    const { container, getByRole } = render(
      <StrictMode>
        <DateTimePicker 
          value={new Date(2026, 9, 31, 14, 30)} 
          onChange={handleDateTimeChange} 
        />
      </StrictMode>
    )

    const trigger = getByRole('button')
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // Open DateTimePicker dialog
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeDefined()
    expect(dialog?.getAttribute('aria-modal')).toBe('true')

    // Tabs should be present in mode="both"
    const tablist = document.querySelector('[role="tablist"]')
    expect(tablist).toBeDefined()

    const dateTab = document.querySelector('[role="tab"][aria-selected="true"]')
    expect(dateTab).toBeDefined()

    // Escape closes dialog
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    const ssr = renderToString(<DateTimePicker value={new Date(2026, 9, 31, 14, 30)} />)
    expect(ssr).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders InputOTP and RadioGroup with arrow navigation', async () => {
    const handleValueChange = vi.fn()
    const { container, getByLabelText } = render(
      <StrictMode>
        <InputOTP
          id="verification-otp"
          length={6}
          defaultValue="1234"
          aria-label="Verification OTP"
          aria-describedby="otp-help"
        />

        <RadioGroup defaultValue="team" aria-label="Account tier" onValueChange={handleValueChange}>
          <RadioGroupItem value="personal" id="radio-personal" aria-label="Personal" />
          <RadioGroupItem value="team" id="radio-team" aria-label="Team" />
          <RadioGroupItem value="enterprise" id="radio-enterprise" aria-label="Enterprise" />
        </RadioGroup>
      </StrictMode>
    )
    const otpInput = getByLabelText('Verification OTP') as HTMLInputElement
    expect(otpInput).toBeDefined()
    expect(otpInput.id).toBe('verification-otp')
    expect(otpInput.getAttribute('aria-describedby')).toBe('otp-help')
    expect(otpInput.value).toBe('1234')

    fireEvent.change(otpInput, { target: { value: '123456' } })
    expect(otpInput.value).toBe('123456')

    const teamRadio = getByLabelText('Team')
    const enterpriseRadio = getByLabelText('Enterprise')
    expect(teamRadio).toBeDefined()
    expect(teamRadio.getAttribute('aria-checked')).toBe('true')

    // Arrow down moves to next
    fireEvent.keyDown(teamRadio, { key: 'ArrowDown' })
    expect(handleValueChange).toHaveBeenCalledWith('enterprise')
    expect(enterpriseRadio.getAttribute('aria-checked')).toBe('true')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Composable Form with FormField and validation message', async () => {
    const handleSetValue = vi.fn()
    const handleTrigger = vi.fn()
    const { container, getByText, getByLabelText } = render(
      <StrictMode>
        <Form>
          <FormField name="username" error="Handle is required">
            <FormItem>
              <FormLabel required>Username</FormLabel>
              <FormControl>
                <input placeholder="Enter username" />
              </FormControl>
              <FormDescription>Choose a unique organization handle.</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            name="agree"
            control={{
              _formValues: { agree: false },
              setValue: handleSetValue,
              trigger: handleTrigger,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agree to terms</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-label="Agree to terms"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      </StrictMode>
    )
    const input = getByLabelText(/Username/i)
    expect(input).toBeDefined()
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(getByText('*')).toBeDefined()
    expect(getByText('Choose a unique organization handle.')).toBeDefined()
    expect(getByText('Handle is required')).toBeDefined()

    const checkbox = getByLabelText('Agree to terms') as HTMLInputElement
    fireEvent.click(checkbox)
    expect(handleSetValue).toHaveBeenCalledWith('agree', true, { shouldValidate: true, shouldDirty: true })
    fireEvent.blur(checkbox)
    expect(handleTrigger).toHaveBeenCalledWith('agree')

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
          showRequirements
        />
      </StrictMode>
    )
    const input = getByPlaceholderText('Enter secure password') as HTMLInputElement
    expect(input.type).toBe('password')
    const toggleBtn = getByRole('button', { name: /show password/i })
    fireEvent.click(toggleBtn)
    expect(input.type).toBe('text')

    // Test meter role and attributes
    const meter = getByRole('meter', { name: 'Password strength' })
    expect(meter.getAttribute('aria-valuenow')).toBe('3')
    expect(meter.getAttribute('aria-valuetext')).toBe('Good')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders NumberInput stepper and clamp bounds', async () => {
    let count = 5
    const { container, getByRole, getAllByRole, getByLabelText } = render(
      <StrictMode>
        <NumberInput
          value={count}
          min={1}
          max={10}
          step={1}
          onChange={(val) => { count = val }}
          aria-label="Cluster Nodes"
        />
        <NumberInput
          error
          defaultValue={1}
          aria-label="Error Nodes"
        />
      </StrictMode>
    )
    const spinbutton = getByRole('spinbutton', { name: 'Cluster Nodes' })
    expect(spinbutton).toBeDefined()
    const incBtn = getAllByRole('button', { name: /increment value/i })[0]
    fireEvent.pointerDown(incBtn)
    fireEvent.pointerUp(incBtn)
    expect(count).toBe(6)

    const errorInput = getByLabelText('Error Nodes')
    expect(errorInput.getAttribute('aria-invalid')).toBe('true')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders MultiSelect with tags and selection', async () => {
    const handleChange = vi.fn()
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <MultiSelect
          options={[
            { label: 'React', value: 'react' },
            { label: 'Next.js', value: 'nextjs' },
            { label: 'Tailwind CSS', value: 'tailwind' }
          ]}
          defaultValue={['react', 'nextjs']}
          onChange={handleChange}
          placeholder="Select technologies"
        />
      </StrictMode>
    )
    expect(getByText('React')).toBeDefined()
    expect(getByText('Next.js')).toBeDefined()

    const combobox = getByRole('combobox')
    expect(combobox.getAttribute('aria-expanded')).toBe('false')

    // ArrowDown opens dropdown
    fireEvent.keyDown(combobox, { key: 'ArrowDown' })
    expect(combobox.getAttribute('aria-expanded')).toBe('true')

    // Navigate and select with Enter
    fireEvent.keyDown(combobox, { key: 'ArrowDown' })
    fireEvent.keyDown(combobox, { key: 'Enter' })

    // Backspace removes last item
    fireEvent.keyDown(combobox, { key: 'Escape' })
    fireEvent.keyDown(combobox, { key: 'Backspace' })
    expect(handleChange).toHaveBeenCalledWith(['react'])

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders DateRangePicker and TimePicker', async () => {
    const handleRangeChange = vi.fn()
    const { container, getByLabelText, getByRole } = render(
      <StrictMode>
        <DateRangePicker
          value={{ from: new Date(2026, 9, 1), to: new Date(2026, 9, 31) }}
          onChange={handleRangeChange}
        />
        <TimePicker
          value="10:45 AM"
          format="12h"
          error
          aria-describedby="time-error-msg"
          onChange={() => {}}
        />
      </StrictMode>
    )
    const hoursInput = getByLabelText('Hours') as HTMLInputElement
    expect(hoursInput.value).toBe('10')
    expect(hoursInput.getAttribute('aria-invalid')).toBe('true')
    expect(hoursInput.getAttribute('aria-describedby')).toBe('time-error-msg')

    const minutesInput = getByLabelText('Minutes') as HTMLInputElement
    expect(minutesInput.value).toBe('45')
    expect(minutesInput.getAttribute('aria-invalid')).toBe('true')
    expect(minutesInput.getAttribute('aria-describedby')).toBe('time-error-msg')

    const trigger = getByRole('button', { name: /date range picker/i })
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    // Open popup
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeDefined()
    expect(dialog?.getAttribute('aria-modal')).toBe('true')

    // Verify day buttons have accessible labels
    const day1Btn = document.querySelector('button[aria-label="Thursday, October 1, 2026"]')
    expect(day1Btn).toBeDefined()
    expect(day1Btn?.getAttribute('aria-selected')).toBe('true')

    // Escape closes popup
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders FileUpload dropzone', async () => {
    const { container, getByText, getByRole } = render(
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
    const dropzone = getByRole('button', { name: /upload files/i })
    expect(dropzone).toBeDefined()
    expect(dropzone.getAttribute('tabIndex')).toBe('0')

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
    const textarea = getByPlaceholderText('Ask AI anything...')
    expect(textarea).toBeDefined()
    expect(textarea.getAttribute('aria-label')).toBe('Ask AI anything...')
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

  it('renders ColorPicker trigger and supports inline mode without SSR errors', async () => {
    // SSR Smoke Check
    const ssrHtml = renderToString(<ColorPicker value="#4f46e5" />)
    expect(ssrHtml).toContain('#4f46e5')

    // Client DOM Render
    let selectedColor = '#4f46e5'
    const { container, getByRole, getByText, rerender } = render(
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
    expect(trigger.getAttribute('aria-label')).toContain('Color picker')

    // Click trigger to open floating popover
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeDefined()
    expect(dialog?.getAttribute('aria-modal')).toBe('true')

    // Verify saturation & hue sliders have role="slider"
    const satSlider = document.querySelector('[aria-label="Color saturation and brightness"]')
    expect(satSlider?.getAttribute('role')).toBe('slider')
    expect(satSlider?.getAttribute('tabIndex')).toBe('0')

    const hueSlider = document.querySelector('[aria-label="Hue"]')
    expect(hueSlider?.getAttribute('role')).toBe('slider')
    expect(hueSlider?.getAttribute('tabIndex')).toBe('0')

    // Test arrow key on hue slider
    if (hueSlider) {
      fireEvent.keyDown(hueSlider, { key: 'ArrowRight' })
    }

    // Escape key closes popover
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

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

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
