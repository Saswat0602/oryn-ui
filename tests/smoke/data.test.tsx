import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../src/components/data/table'
import { DataTable } from '../../src/components/data/data-table'
import { Chart } from '../../src/components/data/chart'
import { StatCard } from '../../src/components/data/stat-card'
import { Timeline } from '../../src/components/data/timeline'
import { TreeView } from '../../src/components/data/tree-view'

describe('Data Display Domain Smoke & Accessibility Suite', () => {
  it('renders standard Table primitives', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell>Uptime</TableCell>
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

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders DataTable with sorting and search data', async () => {
    const { container, getByText } = render(
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

  it('renders Timeline with chronological steps', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <Timeline
          items={[
            {
              id: '1',
              title: 'Pull Request Merged',
              description: 'feat(core): add button group',
              timestamp: '10:30 AM',
              status: 'completed'
            },
            {
              id: '2',
              title: 'Automated CI Verification',
              description: 'Running unit & a11y tests',
              timestamp: '10:32 AM',
              status: 'current'
            }
          ]}
        />
      </StrictMode>
    )
    expect(getByText('Pull Request Merged')).toBeDefined()
    expect(getByText('Automated CI Verification')).toBeDefined()

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

