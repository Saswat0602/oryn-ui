import React from 'react'
import {
  StatCard,
  Chart,
  Table,
  DataTable
} from 'oryn-ui'
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
      type: 'area',
      showGrid: true
    },
    controls: [
      {
        name: 'type',
        label: 'Chart Variety',
        type: 'select',
        defaultValue: 'area',
        options: [
          { label: 'Area Chart (Gradient)', value: 'area' },
          { label: 'Bar Chart (Multi-Series)', value: 'bar' },
          { label: 'Line Chart (Spline)', value: 'line' },
          { label: 'Donut Chart (With KPI)', value: 'doughnut' },
          { label: 'Pie Chart', value: 'pie' },
          { label: 'Radial Bar (Activity Ring)', value: 'radial' }
        ],
        category: 'appearance',
        description: 'Composable chart visualization format'
      },
      {
        name: 'showGrid',
        label: 'Show Cartesian Grid',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Renders subtle dashed background guide lines'
      },
      {
        name: 'curved',
        label: 'Smooth Spline Curves',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Cubic monotonic spline vs straight linear segments'
      }
    ],
    render: (props) => {
      const timeSeriesData = [
        { month: 'Jan', desktop: 186, mobile: 80 },
        { month: 'Feb', desktop: 305, mobile: 200 },
        { month: 'Mar', desktop: 237, mobile: 120 },
        { month: 'Apr', desktop: 273, mobile: 190 },
        { month: 'May', desktop: 309, mobile: 230 },
        { month: 'Jun', desktop: 384, mobile: 290 }
      ]

      const categoryData = [
        { label: 'Chrome', value: 275, color: '#3b82f6' },
        { label: 'Safari', value: 200, color: '#8b5cf6' },
        { label: 'Firefox', value: 187, color: '#10b981' },
        { label: 'Edge', value: 173, color: '#f59e0b' },
        { label: 'Other', value: 90, color: '#ec4899' }
      ]

      const radialData = [
        { label: 'Compute', value: 85, color: '#3b82f6' },
        { label: 'Storage', value: 68, color: '#8b5cf6' },
        { label: 'Bandwidth', value: 42, color: '#10b981' }
      ]

      const config = {
        desktop: { label: 'Desktop Clients', color: '#3b82f6' },
        mobile: { label: 'Mobile Visitors', color: '#8b5cf6' }
      }

      return (
        <div className="w-full max-w-lg p-4 rounded-2xl border border-border/80 bg-card shadow-xs">
          <div className="mb-3">
            <h4 className="font-semibold text-xs text-foreground">Traffic Performance</h4>
            <p className="text-[10px] text-muted-foreground">Real-time edge metrics and breakdown</p>
          </div>
          <Chart.Container config={config} className="h-56 w-full">
            {props.type === 'area' && (
              <Chart.Area
                data={timeSeriesData}
                index="month"
                categories={['desktop', 'mobile']}
                colors={['#3b82f6', '#8b5cf6']}
                showGrid={props.showGrid}
                showTooltip={true}
                showLegend={true}
              />
            )}
            {props.type === 'bar' && (
              <Chart.Bar
                data={timeSeriesData}
                index="month"
                categories={['desktop', 'mobile']}
                colors={['#3b82f6', '#8b5cf6']}
                showGrid={props.showGrid}
                showTooltip={true}
              />
            )}
            {props.type === 'line' && (
              <Chart.Line
                data={timeSeriesData}
                index="month"
                categories={['desktop', 'mobile']}
                colors={['#3b82f6', '#8b5cf6']}
                showGrid={props.showGrid}
                showTooltip={true}
                showDots={true}
              />
            )}
            {props.type === 'doughnut' && (
              <Chart.Doughnut
                data={categoryData}
                centerValue="925"
                centerLabel="Total Visitors"
                showLegend={true}
              />
            )}
            {props.type === 'pie' && (
              <Chart.Pie
                data={categoryData}
                showLegend={true}
              />
            )}
            {props.type === 'radial' && (
              <Chart.Radial
                data={radialData}
                centerValue="85%"
                centerLabel="Cluster Load"
                showLegend={true}
              />
            )}
          </Chart.Container>
        </div>
      )
    },
    generateCode: (props) => {
      if (props.type === 'area') {
        return `import { Chart, ChartConfig } from 'oryn-ui'

const chartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 309, mobile: 230 },
  { month: 'Jun', desktop: 384, mobile: 290 },
]

const chartConfig: ChartConfig = {
  desktop: { label: 'Desktop Clients', color: '#3b82f6' },
  mobile: { label: 'Mobile Visitors', color: '#8b5cf6' },
}

export default function AreaChartDemo() {
  return (
    <Chart.Container config={chartConfig} className="h-60 w-full">
      <Chart.Area
        data={chartData}
        index="month"
        categories={['desktop', 'mobile']}
        colors={['#3b82f6', '#8b5cf6']}
        showGrid={${props.showGrid}}
        showTooltip
        showLegend
      />
    </Chart.Container>
  )
}`
      }
      if (props.type === 'bar') {
        return `import { Chart, ChartConfig } from 'oryn-ui'

const chartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 309, mobile: 230 },
  { month: 'Jun', desktop: 384, mobile: 290 },
]

const chartConfig: ChartConfig = {
  desktop: { label: 'Desktop Clients', color: '#3b82f6' },
  mobile: { label: 'Mobile Visitors', color: '#8b5cf6' },
}

export default function BarChartDemo() {
  return (
    <Chart.Container config={chartConfig} className="h-60 w-full">
      <Chart.Bar
        data={chartData}
        index="month"
        categories={['desktop', 'mobile']}
        colors={['#3b82f6', '#8b5cf6']}
        showGrid={${props.showGrid}}
        showTooltip
      />
    </Chart.Container>
  )
}`
      }
      if (props.type === 'line') {
        return `import { Chart, ChartConfig } from 'oryn-ui'

const chartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 309, mobile: 230 },
  { month: 'Jun', desktop: 384, mobile: 290 },
]

const chartConfig: ChartConfig = {
  desktop: { label: 'Desktop Clients', color: '#3b82f6' },
  mobile: { label: 'Mobile Visitors', color: '#8b5cf6' },
}

export default function LineChartDemo() {
  return (
    <Chart.Container config={chartConfig} className="h-60 w-full">
      <Chart.Line
        data={chartData}
        index="month"
        categories={['desktop', 'mobile']}
        colors={['#3b82f6', '#8b5cf6']}
        showGrid={${props.showGrid}}
        showDots
        showTooltip
      />
    </Chart.Container>
  )
}`
      }
      if (props.type === 'doughnut') {
        return `import { Chart } from 'oryn-ui'

const browserData = [
  { label: 'Chrome', value: 275, color: '#3b82f6' },
  { label: 'Safari', value: 200, color: '#8b5cf6' },
  { label: 'Firefox', value: 187, color: '#10b981' },
  { label: 'Edge', value: 173, color: '#f59e0b' },
  { label: 'Other', value: 90, color: '#ec4899' },
]

export default function DoughnutChartDemo() {
  return (
    <Chart.Container config={{}} className="h-64 w-full">
      <Chart.Doughnut
        data={browserData}
        centerValue="925"
        centerLabel="Total Visitors"
        showLegend
      />
    </Chart.Container>
  )
}`
      }
      if (props.type === 'pie') {
        return `import { Chart } from 'oryn-ui'

const categoryData = [
  { label: 'Chrome', value: 275, color: '#3b82f6' },
  { label: 'Safari', value: 200, color: '#8b5cf6' },
  { label: 'Firefox', value: 187, color: '#10b981' },
  { label: 'Edge', value: 173, color: '#f59e0b' },
  { label: 'Other', value: 90, color: '#ec4899' },
]

export default function PieChartDemo() {
  return (
    <Chart.Container config={{}} className="h-64 w-full">
      <Chart.Pie data={categoryData} showLegend />
    </Chart.Container>
  )
}`
      }
      return `import { Chart } from 'oryn-ui'

const quotaData = [
  { label: 'Compute', value: 85, color: '#3b82f6' },
  { label: 'Storage', value: 68, color: '#8b5cf6' },
  { label: 'Bandwidth', value: 42, color: '#10b981' },
]

export default function RadialChartDemo() {
  return (
    <Chart.Container config={{}} className="h-64 w-full">
      <Chart.Radial
        data={quotaData}
        centerValue="85%"
        centerLabel="Cluster Load"
        showLegend
      />
    </Chart.Container>
  )
}`
    }
  },

  table: {
    slug: 'table',
    title: 'Table',
    componentName: 'Table',
    defaultProps: {
      striped: true,
      hoverable: true,
      bordered: true,
      compact: false
    },
    controls: [
      {
        name: 'striped',
        label: 'Striped Alternating Rows',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Zebra stripe background on even rows'
      },
      {
        name: 'hoverable',
        label: 'Hover Row Highlights',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Highlights row background on hover'
      },
      {
        name: 'bordered',
        label: 'Border Outline',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Wraps table with boundary borders'
      },
      {
        name: 'compact',
        label: 'Compact Density',
        type: 'boolean',
        defaultValue: false,
        category: 'size',
        description: 'Condenses cell vertical padding'
      }
    ],
    render: (props) => (
      <div className={`w-full max-w-md rounded-xl overflow-hidden shadow-xs ${props.bordered ? 'border border-border/80' : ''}`}>
        <Table
          striped={props.striped}
          hoverable={props.hoverable}
          compact={props.compact}
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
    ),
    generateCode: (props) => `import { Table } from 'oryn-ui'

const columns = [
  { key: 'region', header: 'Region' },
  { key: 'latency', header: 'Latency (p95)' },
  { key: 'status', header: 'Status' }
]

const data = [
  { region: 'US East (iad1)', latency: '18ms', status: 'Healthy' },
  { region: 'US West (sfo1)', latency: '24ms', status: 'Healthy' },
  { region: 'Europe (fra1)', latency: '32ms', status: 'Healthy' }
]

export default function TableDemo() {
  return (
    <Table
      striped={${props.striped}}
      hoverable={${props.hoverable}}
      compact={${props.compact}}
      columns={columns}
      data={data}
    />
  )
}`
  },

  'data-table': {
    slug: 'data-table',
    title: 'DataTable',
    componentName: 'DataTable',
    defaultProps: {
      pagination: true,
      searchable: true,
      striped: false,
      hoverable: true
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
      },
      {
        name: 'striped',
        label: 'Zebra Striping',
        type: 'boolean',
        defaultValue: false,
        category: 'appearance',
        description: 'Alternating row background colors'
      },
      {
        name: 'hoverable',
        label: 'Row Hover Highlight',
        type: 'boolean',
        defaultValue: true,
        category: 'appearance',
        description: 'Highlights hovered row'
      }
    ],
    render: (props) => (
      <div className="w-full max-w-lg">
        <DataTable
          pagination={props.pagination}
          searchable={props.searchable}
          striped={props.striped}
          hoverable={props.hoverable}
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
    ),
    generateCode: (props) => `import { DataTable } from 'oryn-ui'

const columns = [
  { key: 'deployment', header: 'Deployment' },
  { key: 'environment', header: 'Env' },
  { key: 'status', header: 'Status' }
]

const data = [
  { deployment: 'prj_prod_01', environment: 'Production', status: 'Active' },
  { deployment: 'prj_stage_02', environment: 'Preview', status: 'Building' },
  { deployment: 'prj_dev_03', environment: 'Development', status: 'Completed' }
]

export default function DataTableDemo() {
  return (
    <DataTable
      pagination={${props.pagination}}
      searchable={${props.searchable}}
      striped={${props.striped}}
      hoverable={${props.hoverable}}
      columns={columns}
      data={data}
    />
  )
}`
  }
}
