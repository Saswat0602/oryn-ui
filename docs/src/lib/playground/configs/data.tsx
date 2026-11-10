import React from 'react'
import {
  StatCard,
  Chart,
  Table,
  DataTable
} from 'mad-ui-components'
import { PlaygroundConfig } from '@/components/playground/types'

export const dataPlaygrounds: Record<string, PlaygroundConfig> = {
  'stat-card': {
    slug: 'stat-card',
    title: 'StatCard',
    componentName: 'StatCard',
    defaultProps: {
      title: 'Total Monthly Active Requests',
      value: '2.4M',
      variant: 'default',
      size: 'default'
    },
    controls: [
      {
        name: 'title',
        label: 'Stat Title',
        type: 'text',
        defaultValue: 'Total Monthly Active Requests',
        category: 'content',
        description: 'Metric heading'
      },
      {
        name: 'value',
        label: 'Metric Value',
        type: 'text',
        defaultValue: '2.4M',
        category: 'content',
        description: 'Large hero statistic'
      },
      {
        name: 'variant',
        label: 'Card Variant',
        type: 'segmented',
        defaultValue: 'default',
        options: ['default', 'outline', 'subtle'],
        category: 'appearance',
        description: 'Surface styling'
      },
      {
        name: 'size',
        label: 'Card Size',
        type: 'segmented',
        defaultValue: 'default',
        options: ['sm', 'default', 'lg'],
        category: 'size',
        description: 'Padding and font scale'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-xs">
        <StatCard
          title={props.title}
          value={props.value}
          variant={props.variant}
          size={props.size}
          trend={{ value: '+14.2%', direction: 'up', label: 'vs last month' }}
          description="Edge network requests processed."
        />
      </div>
    )
  },

  chart: {
    slug: 'chart',
    title: 'Chart',
    componentName: 'Chart',
    defaultProps: {
      type: 'bar',
      height: 180
    },
    controls: [
      {
        name: 'type',
        label: 'Chart Type',
        type: 'segmented',
        defaultValue: 'bar',
        options: ['bar', 'pie', 'doughnut'],
        category: 'appearance',
        description: 'Visualization format'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-sm p-4 rounded-xl border border-border/60 bg-card shadow-xs">
        <Chart
          type={props.type}
          height={props.height}
          data={[
            { label: 'Jan', value: 45 },
            { label: 'Feb', value: 72 },
            { label: 'Mar', value: 90 },
            { label: 'Apr', value: 65 }
          ]}
        />
      </div>
    )
  },

  table: {
    slug: 'table',
    title: 'Table',
    componentName: 'Table',
    defaultProps: {
      striped: true
    },
    controls: [
      {
        name: 'striped',
        label: 'Striped Alternating Rows',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Zebra stripe background on even rows'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-md rounded-xl border border-border/60 overflow-hidden shadow-xs">
        <Table
          striped={props.striped}
          columns={[
            { key: 'region', header: 'Region' },
            { key: 'latency', header: 'Latency (p95)' },
            { key: 'status', header: 'Status' }
          ]}
          data={[
            { region: 'US East (iad1)', latency: '18ms', status: 'Healthy' },
            { region: 'US West (sfo1)', latency: '24ms', status: 'Healthy' },
            { region: 'Europe (fra1)', latency: '32ms', status: 'Healthy' }
          ]}
        />
      </div>
    )
  },

  'data-table': {
    slug: 'data-table',
    title: 'DataTable',
    componentName: 'DataTable',
    defaultProps: {
      pagination: true,
      searchable: true
    },
    controls: [
      {
        name: 'pagination',
        label: 'Enable Pagination',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Pagination footer with page selector'
      },
      {
        name: 'searchable',
        label: 'Search Filter Input',
        type: 'boolean',
        defaultValue: true,
        category: 'options',
        description: 'Filter input above table'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-lg">
        <DataTable
          pagination={props.pagination}
          searchable={props.searchable}
          columns={[
            { key: 'deployment', header: 'Deployment' },
            { key: 'environment', header: 'Env' },
            { key: 'status', header: 'Status' }
          ]}
          data={[
            { deployment: 'prj_prod_01', environment: 'Production', status: 'Active' },
            { deployment: 'prj_stage_02', environment: 'Preview', status: 'Building' },
            { deployment: 'prj_dev_03', environment: 'Development', status: 'Completed' }
          ]}
        />
      </div>
    )
  }
}
