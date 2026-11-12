import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../../src/components/data/table'
import { DataTable } from '../../src/components/data/data-table'
import { Chart } from '../../src/components/data/chart'
import { StatCard } from '../../src/components/data/stat-card'
import { Timeline } from '../../src/components/data/timeline'
import { TreeView } from '../../src/components/data/tree-view'

describe('Data Display Domain Smoke & Accessibility Suite', () => {
  it('renders standard Table primitives with accessible scope', async () => {
    const { container, getByText, getAllByRole } = render(
      <StrictMode>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Uptime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>API Gateway</TableCell>
              <TableCell>99.98%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StrictMode>
    )
    expect(getByText('API Gateway')).toBeDefined()
    expect(getByText('99.98%')).toBeDefined()

    const colHeaders = getAllByRole('columnheader')
    expect(colHeaders.length).toBe(2)
    expect(colHeaders[0].getAttribute('scope')).toBe('col')
    expect(colHeaders[1].getAttribute('scope')).toBe('col')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders high-level Table with sorting and row selection', async () => {
    const testData = [
      { id: '1', service: 'Redis Cache', latency: 2 },
      { id: '2', service: 'Postgres DB', latency: 15 }
    ]
    const { container, getByText, getAllByRole, getByLabelText } = render(
      <StrictMode>
        <Table
          data={testData}
          columns={[
            { key: 'service', header: 'Service Name', sortable: true },
            { key: 'latency', header: 'Latency (ms)', sortable: true }
          ]}
          sortable
          selectable
        />
      </StrictMode>
    )
    expect(getByText('Redis Cache')).toBeDefined()
    expect(getByText('Postgres DB')).toBeDefined()

    // Assert scope and aria-sort
    const headers = getAllByRole('columnheader')
    expect(headers[0].getAttribute('scope')).toBe('col') // Select all checkbox header
    expect(headers[1].getAttribute('aria-sort')).toBe('none')

    // Click to sort by service name
    fireEvent.click(getByText('Service Name'))
    expect(headers[1].getAttribute('aria-sort')).toBe('ascending')

    // Verify row checkboxes have accessible labels
    const selectAllCheckbox = getByLabelText('Select all rows')
    expect(selectAllCheckbox).toBeDefined()
    const row1Checkbox = getByLabelText('Select row 1')
    expect(row1Checkbox).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders DataTable with sorting and search data', async () => {
    const { container, getByText, getAllByRole, getByLabelText } = render(
      <StrictMode>
        <DataTable
          data={[
            { id: '1', name: 'Auth Pod', latency: '12ms' },
            { id: '2', name: 'Database Replica', latency: '4ms' }
          ]}
          columns={[
            { key: 'name', header: 'Service' },
            { key: 'latency', header: 'Latency' }
          ]}
        />
      </StrictMode>
    )
    expect(getByText('Auth Pod')).toBeDefined()
    expect(getByText('12ms')).toBeDefined()

    const headers = getAllByRole('columnheader')
    expect(headers[0].getAttribute('scope')).toBe('col')
    expect(headers[0].getAttribute('aria-sort')).toBe('none')

    // Find sort button by aria-label
    const sortBtn = getByLabelText('Sort by Service in ascending order')
    expect(sortBtn).toBeDefined()
    fireEvent.click(sortBtn)

    expect(headers[0].getAttribute('aria-sort')).toBe('ascending')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Chart component', async () => {
    const { container } = render(
      <StrictMode>
        <Chart
          data={[
            { label: 'Jan', value: 100 },
            { label: 'Feb', value: 180 }
          ]}
        />
      </StrictMode>
    )
    expect(container.firstChild).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders StatCard with trend indicators and values', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <StatCard
          title="Monthly Recurring Revenue"
          value="$48,250"
          trend={{ direction: 'up', value: '+14.2%', label: 'vs last month' }}
          description="Gross SaaS subscriptions"
        />
      </StrictMode>
    )
    expect(getByText('Monthly Recurring Revenue')).toBeDefined()
    expect(getByText('$48,250')).toBeDefined()
    expect(getByText('+14.2%')).toBeDefined()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Timeline with chronological steps and passes a11y', async () => {
    const { container, getByText, getByRole, getAllByRole } = render(
      <StrictMode>
        <Timeline
          items={[
            {
              id: '1',
              title: 'Pull Request Merged',
              description: 'feat(core): add button group',
              time: '10:30 AM',
              status: 'completed'
            },
            {
              id: '2',
              title: 'Automated CI Verification',
              description: 'Running unit & a11y tests',
              time: '10:32 AM',
              status: 'current'
            },
            {
              id: '3',
              title: 'Deployment Failed',
              description: 'Container health check failed',
              time: '10:35 AM',
              status: 'error'
            }
          ]}
        />
      </StrictMode>
    )
    expect(getByText('Pull Request Merged')).toBeDefined()
    expect(getByText('Automated CI Verification')).toBeDefined()
    expect(getByText('Deployment Failed')).toBeDefined()
    expect(getByRole('list')).toBeDefined()
    expect(getAllByRole('listitem').length).toBe(3)

    const ssr = renderToString(
      <Timeline items={[{ title: 'SSR Step', status: 'error' }]} />
    )
    expect(ssr).toContain('SSR Step')
    expect(ssr).toContain('bg-destructive')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders TreeView with branch expansion', async () => {
    const { container, getByText, getAllByRole } = render(
      <StrictMode>
        <TreeView
          data={[
            {
              id: 'folder-1',
              label: 'src',
              children: [
                { id: 'file-1', label: 'index.ts' },
                { id: 'file-2', label: 'core.ts' }
              ]
            }
          ]}
          defaultExpandedIds={['folder-1']}
        />
      </StrictMode>
    )
    expect(getByText('src')).toBeDefined()
    expect(getByText('index.ts')).toBeDefined()

    const treeitems = getAllByRole('treeitem')
    expect(treeitems.length).toBe(3)
    expect(treeitems[0].getAttribute('tabindex')).toBe('0')
    expect(treeitems[1].getAttribute('tabindex')).toBe('-1')

    // Navigate down with ArrowDown
    fireEvent.keyDown(treeitems[0], { key: 'ArrowDown' })

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})

