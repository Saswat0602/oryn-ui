import React, { StrictMode } from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { Alert, AlertTitle, AlertDescription } from '../../src/components/feedback/alert'
import { Banner } from '../../src/components/feedback/banner'
import { EmptyState } from '../../src/components/feedback/empty-state'
import { Spinner } from '../../src/components/feedback/spinner'
import { Toast, ToastProvider } from '../../src/components/feedback/toast'
import { Sonner } from '../../src/components/feedback/sonner'
import { MessageBubble } from '../../src/components/feedback/message-bubble'
import { ReasoningDisclosure } from '../../src/components/feedback/reasoning-disclosure'
import { ToolCallCard } from '../../src/components/feedback/tool-call-card'
import { Button } from '../../src/components/core/button'

describe('Feedback Domain Smoke & Accessibility Suite', () => {
  it('renders Alert with title, description, and passes a11y', async () => {
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <Alert variant="info">
          <AlertTitle>System Notice</AlertTitle>
          <AlertDescription>Maintenance scheduled for midnight.</AlertDescription>
        </Alert>
      </StrictMode>
    )

    expect(getByText('System Notice')).toBeDefined()
    expect(getByText('Maintenance scheduled for midnight.')).toBeDefined()
    expect(getByRole('status')).toBeDefined()

    const ssr = renderToString(
      <Alert variant="destructive">
        <AlertTitle>SSR Outage Alert</AlertTitle>
      </Alert>
    )
    expect(ssr).toContain('SSR Outage Alert')
    expect(ssr).toContain('role="alert"')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Alert with accessible dismiss and correct roles for all types', async () => {
    let closed = false
    let dismissed = false
    const { getByRole, getByLabelText, getByText, container } = render(
      <Alert
        variant="destructive"
        dismissible
        priority="critical"
        category="Security"
        tags={["Auth", "P0"]}
        loading
        onDismiss={() => { dismissed = true }}
        onClose={() => { closed = true }}
        title="Error occurred"
        message="Something went wrong"
      />
    )

    expect(getByRole('alert')).toBeDefined()
    expect(container.querySelector('[data-priority="critical"]')).toBeDefined()
    expect(container.querySelector('[data-category="Security"]')).toBeDefined()
    expect(getByText('Security')).toBeDefined()
    expect(getByText('Auth')).toBeDefined()
    expect(getByText('P0')).toBeDefined()

    const closeBtn = getByLabelText('Close alert')
    fireEvent.click(closeBtn)
    expect(closed).toBe(true)
    expect(dismissed).toBe(true)
  })

  it('renders Banner with action, handles dismiss, and passes a11y', async () => {
    let dismissed = false

    const { container, getByText, getByLabelText } = render(
      <StrictMode>
        <Banner
          variant="warning"
          title="API Maintenance"
          dismissible
          onDismiss={() => { dismissed = true }}
          action={<button type="button">Details</button>}
        >
          Planned downtime this weekend.
        </Banner>
      </StrictMode>
    )

    expect(getByText('API Maintenance')).toBeDefined()
    expect(getByText('Planned downtime this weekend.')).toBeDefined()
    expect(getByText('Details')).toBeDefined()

    const dismissBtn = getByLabelText('Dismiss banner')
    expect(dismissBtn.className).toContain('focus-visible:ring-2')
    fireEvent.click(dismissBtn)
    expect(dismissed).toBe(true)

    const ssr = renderToString(
      <Banner variant="destructive" title="SSR Banner Alert">System notice</Banner>
    )
    expect(ssr).toContain('SSR Banner Alert')
    expect(ssr).toContain('text-destructive')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders EmptyState with icon, title, description, actions, and passes a11y', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <EmptyState
          title="No projects found"
          description="Your search did not match any active projects."
          action={<Button size="sm">Create New Project</Button>}
        />
      </StrictMode>
    )

    expect(getByText('No projects found')).toBeDefined()
    expect(getByText('Your search did not match any active projects.')).toBeDefined()
    expect(getByText('Create New Project')).toBeDefined()
    const emptyStateEl = container.querySelector('[role="status"]')!
    expect(emptyStateEl).toBeDefined()
    expect(emptyStateEl.getAttribute('aria-live')).toBe('polite')

    const ssr = renderToString(
      <EmptyState
        title="SSR Title"
        description="SSR Description"
      />
    )
    expect(ssr).toContain('SSR Title')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Spinner with accessible label and passes a11y', async () => {
    const { container, getByRole, getByText } = render(
      <StrictMode>
        <Spinner size="md" label="Loading data..." />
      </StrictMode>
    )

    expect(getByRole('status')).toBeDefined()
    expect(getByText('Loading data...')).toBeDefined()

    const ssr = renderToString(<Spinner size="lg" />)
    expect(ssr).toContain('role="status"')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Toast notification within ToastProvider and passes a11y', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <ToastProvider>
          <Toast isVisible={true} title="Saved" message="Changes saved successfully" />
        </ToastProvider>
      </StrictMode>
    )

    expect(getByText('Saved')).toBeDefined()
    expect(getByText('Changes saved successfully')).toBeDefined()

    const ssr = renderToString(
      <Toast isVisible={true} title="SSR Saved" message="SSR Message" />
    )
    expect(ssr).toContain('SSR Saved')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Sonner toaster with toast items and handles dismiss', async () => {
    let dismissedId = ''
    const toasts = [
      { id: 't1', title: 'Upload complete', description: 'File saved to cloud' },
      { id: 't2', title: 'Backup created', description: 'Daily backup complete' },
      { id: 't3', title: 'Processing data', type: 'loading' as const }
    ]

    const { container, getByText, getAllByRole } = render(
      <StrictMode>
        <Sonner toasts={toasts} onDismiss={(id) => { dismissedId = id }} />
      </StrictMode>
    )

    expect(getByText('Upload complete')).toBeDefined()
    expect(getByText('File saved to cloud')).toBeDefined()
    expect(getByText('Backup created')).toBeDefined()
    expect(getByText('Processing data')).toBeDefined()
    expect(getByText('Loading')).toBeDefined()

    // Dismiss first toast
    const dismissButtons = getAllByRole('button')
    if (dismissButtons.length > 0) {
      fireEvent.click(dismissButtons[0])
      await waitFor(() => expect(dismissedId).toBe('t1'))
    }

    const ssr = renderToString(
      <Sonner toasts={toasts} onDismiss={() => {}} />
    )
    expect(ssr).toContain('Upload complete')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders MessageBubble correctly with user and assistant roles and passes a11y', async () => {
    const { container, getByText, getAllByRole } = render(
      <StrictMode>
        <MessageBubble
          role="user"
          content="What is Mad UI?"
          timestamp="12:00 PM"
        />
        <MessageBubble
          role="assistant"
          content="Mad UI is an enterprise React component library."
          timestamp="12:01 PM"
          copyable
        />
      </StrictMode>
    )

    expect(getByText('What is Mad UI?')).toBeDefined()
    expect(getByText('Mad UI is an enterprise React component library.')).toBeDefined()
    const copyBtn = getAllByRole('button', { name: /copy message/i })[0]
    expect(copyBtn).toBeDefined()
    expect(copyBtn.className).toContain('focus-visible:ring-2')

    const ssr = renderToString(
      <MessageBubble role="assistant" content="Server rendered answer" isStreaming />
    )
    expect(ssr).toContain('Server rendered answer')
    expect(ssr).toContain('aria-busy="true"')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders ReasoningDisclosure correctly with collapse/expand and passes a11y', async () => {
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <ReasoningDisclosure duration={3.8} defaultOpen={false} isStreaming>
          <span>Evaluating telemetry logs</span>
        </ReasoningDisclosure>
      </StrictMode>
    )

    expect(getByText(/reasoning process/i)).toBeDefined()
    expect(getByText('3.8s')).toBeDefined()
    const toggleBtn = getByRole('button')
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false')
    expect(toggleBtn.className).toContain('focus-visible:ring-2')
    fireEvent.click(toggleBtn)
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true')

    const statusLive = container.querySelector('[role="status"]')
    expect(statusLive).toBeDefined()
    expect(statusLive?.getAttribute('aria-live')).toBe('polite')
    expect(statusLive?.textContent).toContain('Thinking...')

    const ssr = renderToString(
      <ReasoningDisclosure duration={1.2} defaultOpen={true}>
        <span>SSR Reasoning Steps</span>
      </ReasoningDisclosure>
    )
    expect(ssr).toContain('SSR Reasoning Steps')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders ToolCallCard correctly with arguments, result, and passes a11y', async () => {
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <ToolCallCard
          toolName="query_service_health"
          status="completed"
          duration="84ms"
          args={{ cluster: 'prod-us' }}
          result={{ healthy: true, nodes: 48 }}
        />
      </StrictMode>
    )

    expect(getByText('query_service_health')).toBeDefined()
    expect(getByText('84ms')).toBeDefined()
    expect(getByText(/completed/i)).toBeDefined()

    const triggerBtn = getByRole('button')
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(triggerBtn)
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('true')

    const ssr = renderToString(
      <ToolCallCard toolName="database_backup" status="executing" />
    )
    expect(ssr).toContain('database_backup')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
