import React, { useState } from 'react'
import { Table, DataTable, Chart, Badge, StatCard, Timeline, TreeView } from 'oryn-ui'
import { Users, DollarSign, Activity } from 'lucide-react'

export interface ComponentExample {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}

export const dataExamples: Record<string, ComponentExample[]> = {
  table: [
    {
      title: 'Basic Table',
      description: 'A clean, responsive table with sortable columns',
      code: `import { Table } from 'oryn-ui'

export function BasicTable() {
  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'status', header: 'Status', sortable: true },
    { key: 'email', header: 'Email' }
  ]

  const data = [
    { id: '1', name: 'Alex Johnson', role: 'Developer', status: 'Active', email: 'alex@company.com' },
    { id: '2', name: 'Sarah Chen', role: 'Designer', status: 'Active', email: 'sarah@company.com' },
    { id: '3', name: 'Mike Wilson', role: 'Manager', status: 'Inactive', email: 'mike@company.com' },
    { id: '4', name: 'Emma Davis', role: 'Developer', status: 'Active', email: 'emma@company.com' }
  ]

  return (
    <Table 
      columns={columns} 
      data={data} 
      variant="outlined"
      hoverable
      size="md"
    />
  )
}`,
      preview: (
        <div className="w-full">
          <Table 
            columns={[
              { key: 'name', header: 'Name', sortable: true },
              { key: 'role', header: 'Role', sortable: true },
              { key: 'status', header: 'Status', sortable: true },
              { key: 'email', header: 'Email' }
            ]} 
            data={[
              { id: '1', name: 'Alex Johnson', role: 'Developer', status: 'Active', email: 'alex@company.com' },
              { id: '2', name: 'Sarah Chen', role: 'Designer', status: 'Active', email: 'sarah@company.com' },
              { id: '3', name: 'Mike Wilson', role: 'Manager', status: 'Inactive', email: 'mike@company.com' },
              { id: '4', name: 'Emma Davis', role: 'Developer', status: 'Active', email: 'emma@company.com' }
            ]}
            variant="outlined"
            hoverable
            size="md"
          />
        </div>
      )
    },
    {
      title: 'Advanced Table with Selection',
      description: 'Table with row selection, striped rows, and custom rendering',
      code: `import { Table, Badge } from 'oryn-ui'
import { useState } from 'react'

export function AdvancedTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const columns = [
    { key: 'name', header: 'Employee', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      render: (value: unknown) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {String(value)}
        </Badge>
      )
    },
    { key: 'salary', header: 'Salary', align: 'right' as const }
  ]

  const data = [
    { id: '1', name: 'John Smith', department: 'Engineering', status: 'Active', salary: '$85,000' },
    { id: '2', name: 'Lisa Wong', department: 'Design', status: 'Active', salary: '$78,000' },
    { id: '3', name: 'David Brown', department: 'Marketing', status: 'Inactive', salary: '$65,000' },
    { id: '4', name: 'Anna Garcia', department: 'Engineering', status: 'Active', salary: '$92,000' }
  ]

  return (
    <Table
      columns={columns}
      data={data}
      selectable
      striped
      hoverable
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      variant="elevated"
      shadow="md"
    />
  )
}`,
      preview: (
        <div className="w-full">
          <Table 
            columns={[
              { key: 'name', header: 'Employee', sortable: true },
              { key: 'department', header: 'Department', sortable: true },
              { 
                key: 'status', 
                header: 'Status', 
                render: (value: unknown) => (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    value === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {String(value)}
                  </span>
                )
              },
              { key: 'salary', header: 'Salary', align: 'right' as const }
            ]} 
            data={[
              { id: '1', name: 'John Smith', department: 'Engineering', status: 'Active', salary: '$85,000' },
              { id: '2', name: 'Lisa Wong', department: 'Design', status: 'Active', salary: '$78,000' },
              { id: '3', name: 'David Brown', department: 'Marketing', status: 'Inactive', salary: '$65,000' },
              { id: '4', name: 'Anna Garcia', department: 'Engineering', status: 'Active', salary: '$92,000' }
            ]}
            selectable
            striped
            hoverable
            selectedRows={[]}
            onSelectionChange={() => {}}
            variant="elevated"
            shadow="md"
          />
        </div>
      )
    },
    {
      title: 'Interactive Table',
      description: 'Editable table with add/delete functionality',
      code: `import { Table } from 'oryn-ui'
import { useState } from 'react'

export function InteractiveTable() {
  const [data, setData] = useState([
    { id: '1', task: 'Review code', priority: 'High', assignee: 'John' },
    { id: '2', task: 'Update docs', priority: 'Medium', assignee: 'Sarah' },
    { id: '3', task: 'Fix bug #123', priority: 'High', assignee: 'Mike' }
  ])

  const columns = [
    { key: 'task', header: 'Task', sortable: true },
    { key: 'priority', header: 'Priority', sortable: true },
    { key: 'assignee', header: 'Assignee', sortable: true }
  ]

  const handleAddRow = () => {
    const newTask = {
      id: String(Date.now()),
      task: 'New Task',
      priority: 'Medium',
      assignee: 'Unassigned'
    }
    setData([...data, newTask])
  }

  const handleDeleteRow = (row: any, index: number) => {
    setData(data.filter((_, i) => i !== index))
  }

  const handleEditCell = (row: any, column: any, value: any) => {
    setData(data.map(item => 
      item.id === row.id ? { ...item, [column]: value } : item
    ))
  }

  return (
    <Table
      columns={columns}
      data={data}
      editable
      showAddRowButton
      showDeleteRowButton
      onAddRow={handleAddRow}
      onDeleteRow={handleDeleteRow}
      onEditCell={handleEditCell}
      variant="outlined"
      hoverable
    />
  )
}`,
      preview: (
        <div className="w-full">
          <Table 
            columns={[
              { key: 'task', header: 'Task', sortable: true },
              { key: 'priority', header: 'Priority', sortable: true },
              { key: 'assignee', header: 'Assignee', sortable: true }
            ]} 
            data={[
              { id: '1', task: 'Review code', priority: 'High', assignee: 'John' },
              { id: '2', task: 'Update docs', priority: 'Medium', assignee: 'Sarah' },
              { id: '3', task: 'Fix bug #123', priority: 'High', assignee: 'Mike' }
            ]}
            editable
            showAddRowButton
            showDeleteRowButton
            onAddRow={() => console.log('Add row clicked')}
            onDeleteRow={(row, index) => console.log('Delete row:', row, index)}
            onEditCell={(row, column, value) => console.log('Edit cell:', row, column, value)}
            variant="outlined"
            hoverable
          />
        </div>
      )
    }
  ],

  'data-table': [
    {
      title: 'Advanced Data Table',
      description: 'Feature-rich table with global search, column header sorting, checkbox row selection, and pagination',
      code: `import { DataTable, Badge } from 'oryn-ui'

export function DataTableExample() {
  const columns = [
    { key: 'name', header: 'Team Member', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      cell: (item: any) => (
        <Badge variant={item.status === 'Active' ? 'success' : 'secondary'}>
          {item.status}
        </Badge>
      )
    },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'email', header: 'Contact Email' }
  ]

  const data = [
    { id: '1', name: 'Alex Johnson', role: 'Staff Engineer', status: 'Active', department: 'Core Infrastructure', email: 'alex@company.com' },
    { id: '2', name: 'Sarah Chen', role: 'Design Lead', status: 'Active', department: 'Design System', email: 'sarah@company.com' },
    { id: '3', name: 'Marcus Vance', role: 'Security Architect', status: 'Inactive', department: 'Security & Auth', email: 'marcus@company.com' },
    { id: '4', name: 'Elena Rostova', role: 'Product Manager', status: 'Active', department: 'Developer Experience', email: 'elena@company.com' },
    { id: '5', name: 'David Kim', role: 'Frontend Engineer', status: 'Active', department: 'Web Platform', email: 'david@company.com' },
    { id: '6', name: 'Rachel Green', role: 'QA Lead', status: 'Active', department: 'Test Automation', email: 'rachel@company.com' },
    { id: '7', name: 'James Wilson', role: 'DevOps Lead', status: 'Inactive', department: 'Cloud Infra', email: 'james@company.com' },
    { id: '8', name: 'Aaliyah Patel', role: 'Engineering Director', status: 'Active', department: 'Executive', email: 'aaliyah@company.com' }
  ]

  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchable
      sortable
      selectable
      pagination
      pageSize={5}
      pageSizeOptions={[5, 10, 20]}
    />
  )
}`,
      preview: <DataTableDemo />
    }
  ],

  chart: [
    {
      title: 'Area Chart - Stacked Gradient',
      description: 'Composable area chart with linear gradient fills, cubic Bézier splines, and interactive crosshair hover tooltip',
      code: `import { Chart, ChartConfig } from 'oryn-ui'

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop Visitors",
    color: "#3b82f6",
  },
  mobile: {
    label: "Mobile Visitors",
    color: "#8b5cf6",
  },
}

export function AreaChartExample() {
  return (
    <div className="w-full max-w-lg p-5 rounded-2xl border border-border/70 bg-card shadow-xs">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Monthly Active Traffic</h4>
        <p className="text-xs text-muted-foreground">Showing total visitors across devices for the last 6 months</p>
      </div>
      <Chart.Container config={chartConfig} className="h-60 w-full">
        <Chart.Area
          data={chartData}
          index="month"
          categories={["desktop", "mobile"]}
          colors={["#3b82f6", "#8b5cf6"]}
          showGrid
          showTooltip
          showLegend
        />
      </Chart.Container>
    </div>
  )
}`,
      preview: <AreaChartDemo />
    },
    {
      title: 'Bar Chart - Multiple Series',
      description: 'Clustered bar chart with rounded caps and responsive category comparison',
      code: `import { Chart, ChartConfig } from 'oryn-ui'

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "#3b82f6" },
  mobile: { label: "Mobile", color: "#8b5cf6" },
}

export function BarChartExample() {
  return (
    <Chart.Container config={chartConfig} className="h-60 w-full">
      <Chart.Bar
        data={chartData}
        index="month"
        categories={["desktop", "mobile"]}
        colors={["#3b82f6", "#8b5cf6"]}
        showGrid
        showTooltip
      />
    </Chart.Container>
  )
}`,
      preview: <BarChartDemo />
    },
    {
      title: 'Line Chart - Smooth Spline with Dots',
      description: 'Continuous spline line chart with active data points and interactive tooltip',
      code: `import { Chart, ChartConfig } from 'oryn-ui'

const telemetryData = [
  { time: "00:00", latency: 28, throughput: 140 },
  { time: "04:00", latency: 32, throughput: 160 },
  { time: "08:00", latency: 45, throughput: 280 },
  { time: "12:00", latency: 38, throughput: 310 },
  { time: "16:00", latency: 42, throughput: 290 },
  { time: "20:00", latency: 30, throughput: 180 },
]

const chartConfig: ChartConfig = {
  latency: { label: "p95 Latency (ms)", color: "#10b981" },
  throughput: { label: "Requests / sec", color: "#6366f1" },
}

export function LineChartExample() {
  return (
    <Chart.Container config={chartConfig} className="h-60 w-full">
      <Chart.Line
        data={telemetryData}
        index="time"
        categories={["latency", "throughput"]}
        colors={["#10b981", "#6366f1"]}
        showGrid
        showDots
        showTooltip
      />
    </Chart.Container>
  )
}`,
      preview: <LineChartDemo />
    },
    {
      title: 'Donut Chart - Visitor Share with Center Metric',
      description: 'Circular doughnut chart displaying categorical proportions with center KPI label and value',
      code: `import { Chart } from 'oryn-ui'

const browserData = [
  { label: "Chrome", value: 450, color: "#3b82f6" },
  { label: "Safari", value: 240, color: "#8b5cf6" },
  { label: "Firefox", value: 160, color: "#10b981" },
  { label: "Edge", value: 95, color: "#f59e0b" },
  { label: "Other", value: 55, color: "#ec4899" },
]

export function DonutChartExample() {
  return (
    <Chart.Container config={{}} className="h-64 w-full">
      <Chart.Doughnut
        data={browserData}
        centerValue="1,000"
        centerLabel="Total Users"
        showLegend
      />
    </Chart.Container>
  )
}`,
      preview: <DoughnutChartDemo />
    },
    {
      title: 'Radial Bar - Activity Gauge',
      description: 'Concentric circular activity meters with background tracks and center KPI metric',
      code: `import { Chart } from 'oryn-ui'

const quotaData = [
  { label: "Serverless CPU", value: 84, color: "#3b82f6" },
  { label: "Persistent SSD", value: 68, color: "#8b5cf6" },
  { label: "Edge Bandwidth", value: 42, color: "#10b981" },
]

export function RadialGaugeExample() {
  return (
    <Chart.Container config={{}} className="h-64 w-full">
      <Chart.Radial
        data={quotaData}
        centerValue="84%"
        centerLabel="Peak Utilization"
        showLegend
      />
    </Chart.Container>
  )
}`,
      preview: <RadialGaugeDemo />
    }
  ],

  'stat-card': [
    {
      title: 'Metrics & KPI Stat Cards',
      description: 'Overview metric cards with trend indicators, direction badges, and icon adornments',
      code: `import { StatCard } from 'oryn-ui'
import { DollarSign, Users, Activity } from 'lucide-react'

export function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <StatCard
        title="Total Revenue"
        value="$48,295"
        description="Compared to last month"
        icon={<DollarSign className="h-4 w-4" />}
        trend={{ value: "+14.2%", direction: "up" }}
      />
      <StatCard
        title="Active Users"
        value="2,420"
        description="Daily unique developers"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: "+8.1%", direction: "up" }}
      />
      <StatCard
        title="Server Latency"
        value="42ms"
        description="Average response time"
        icon={<Activity className="h-4 w-4" />}
        trend={{ value: "-3.4%", direction: "down" }}
      />
    </div>
  )
}`,
      preview: <StatCardDemo />
    }
  ],

  timeline: [
    {
      title: 'Deployment & Activity Timeline',
      description: 'Vertical chronological activity stream with status nodes, timestamps, and connecting tracks',
      code: `import { Timeline } from 'oryn-ui'

const EVENTS = [
  {
    title: "Production Release v3.0.0",
    time: "10 minutes ago",
    description: "Deployed commit 50e3b40 to production cluster across 8 edge regions.",
    status: "completed" as const
  },
  {
    title: "Database Migration",
    time: "45 minutes ago",
    description: "Applied schema migration v3_add_indices without downtime.",
    status: "completed" as const
  },
  {
    title: "End-to-End Test Suite",
    time: "1 hour ago",
    description: "All 60 automated accessibility and integration tests passed.",
    status: "completed" as const
  }
]

export function TimelineExample() {
  return (
    <div className="w-full max-w-lg p-4">
      <Timeline items={EVENTS} />
    </div>
  )
}`,
      preview: <TimelineDemo />
    }
  ],

  'tree-view': [
    {
      title: 'File Explorer Tree View',
      description: 'Collapsible hierarchical folder tree with keyboard arrow navigation and branch expansion',
      code: `import { TreeView, TreeNode } from 'oryn-ui'
import { useState } from 'react'

const FILE_TREE: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button.tsx", label: "button.tsx" },
          { id: "card.tsx", label: "card.tsx" },
          { id: "input.tsx", label: "input.tsx" }
        ]
      },
      {
        id: "hooks",
        label: "hooks",
        children: [
          { id: "use-clipboard.ts", label: "use-clipboard.ts" },
          { id: "use-hotkeys.ts", label: "use-hotkeys.ts" }
        ]
      },
      { id: "index.ts", label: "index.ts" }
    ]
  },
  { id: "package.json", label: "package.json" },
  { id: "README.md", label: "README.md" }
]

export function TreeViewExample() {
  const [selected, setSelected] = useState<string>("button.tsx")

  return (
    <div className="w-full max-w-sm rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 bg-card">
      <TreeView
        data={FILE_TREE}
        selectedId={selected}
        onSelect={(node) => setSelected(node.id)}
        defaultExpandedIds={["src", "components"]}
      />
    </div>
  )
}`,
      preview: <TreeViewDemo />
    },
    {
      title: 'Organization Directory Tree',
      description: 'Nested department and team structure with interactive node selection feedback',
      code: `import { TreeView, TreeNode } from 'oryn-ui'
import { useState } from 'react'

const ORG_DATA: TreeNode[] = [
  {
    id: "exec",
    label: "Executive Leadership",
    children: [
      { id: "ceo", label: "Chief Executive Officer" },
      { id: "cto", label: "Chief Technology Officer" }
    ]
  },
  {
    id: "engineering",
    label: "Engineering Division",
    children: [
      { id: "architect", label: "Principal Software Architect" },
      {
        id: "frontend",
        label: "Core Frontend & Design System",
        children: [
          { id: "dev-1", label: "Staff UI Engineer" },
          { id: "dev-2", label: "Accessibility Specialist" }
        ]
      },
      {
        id: "infra",
        label: "Cloud Reliability & Edge",
        children: [
          { id: "sre-1", label: "Staff SRE" },
          { id: "sre-2", label: "DevOps Engineer" }
        ]
      }
    ]
  }
]

export function OrgTreeExample() {
  const [selected, setSelected] = useState<string>("architect")

  return (
    <div className="w-full max-w-md p-4 rounded-xl border border-border/70 bg-card shadow-xs space-y-3">
      <TreeView
        data={ORG_DATA}
        selectedId={selected}
        onSelect={(node) => setSelected(node.id)}
        defaultExpandedIds={["engineering", "frontend"]}
      />
      <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
        Selected Node: <span className="font-mono text-primary font-medium">{selected}</span>
      </div>
    </div>
  )
}`,
      preview: <TreeViewOrgDemo />
    }
  ]
}

function DataTableDemo() {
  const columns = [
    { key: 'name', header: 'Team Member', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      cell: (item: any) => (
        <Badge variant={item.status === 'Active' ? 'success' : 'secondary'}>
          {item.status}
        </Badge>
      )
    },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'email', header: 'Contact Email' }
  ]

  const data = [
    { id: '1', name: 'Alex Johnson', role: 'Staff Engineer', status: 'Active', department: 'Core Infrastructure', email: 'alex@company.com' },
    { id: '2', name: 'Sarah Chen', role: 'Design Lead', status: 'Active', department: 'Design System', email: 'sarah@company.com' },
    { id: '3', name: 'Marcus Vance', role: 'Security Architect', status: 'Inactive', department: 'Security & Auth', email: 'marcus@company.com' },
    { id: '4', name: 'Elena Rostova', role: 'Product Manager', status: 'Active', department: 'Developer Experience', email: 'elena@company.com' },
    { id: '5', name: 'David Kim', role: 'Frontend Engineer', status: 'Active', department: 'Web Platform', email: 'david@company.com' },
    { id: '6', name: 'Rachel Green', role: 'QA Lead', status: 'Active', department: 'Test Automation', email: 'rachel@company.com' },
    { id: '7', name: 'James Wilson', role: 'DevOps Lead', status: 'Inactive', department: 'Cloud Infra', email: 'james@company.com' },
    { id: '8', name: 'Aaliyah Patel', role: 'Engineering Director', status: 'Active', department: 'Executive', email: 'aaliyah@company.com' }
  ]

  return (
    <div className="w-full">
      <DataTable 
        columns={columns} 
        data={data} 
        searchable
        sortable
        selectable
        pagination
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  )
}

function StatCardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <StatCard
        title="Total Revenue"
        value="$48,295"
        description="Compared to last month"
        icon={<DollarSign className="h-4 w-4" />}
        trend={{ value: "+14.2%", direction: "up" }}
      />
      <StatCard
        title="Active Users"
        value="2,420"
        description="Daily unique developers"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: "+8.1%", direction: "up" }}
      />
      <StatCard
        title="Server Latency"
        value="42ms"
        description="Average response time"
        icon={<Activity className="h-4 w-4" />}
        trend={{ value: "-3.4%", direction: "down" }}
      />
    </div>
  )
}

function TimelineDemo() {
  const events = [
    {
      title: "Production Release v3.0.0",
      time: "10m ago",
      description: "Deployed commit 50e3b40 to production cluster.",
      status: "completed" as const
    },
    {
      title: "Database Migration",
      time: "45m ago",
      description: "Applied schema migration v3_add_indices without downtime.",
      status: "completed" as const
    },
    {
      title: "End-to-End Test Suite",
      time: "1h ago",
      description: "All 60 automated accessibility and integration tests passed.",
      status: "completed" as const
    }
  ]

  return (
    <div className="w-full max-w-lg p-4">
      <Timeline items={events} />
    </div>
  )
}

function TreeViewDemo() {
  const [selected, setSelected] = useState<string>("button.tsx")
  const fileTree = [
    {
      id: "src",
      label: "src",
      children: [
        {
          id: "components",
          label: "components",
          children: [
            { id: "button.tsx", label: "button.tsx" },
            { id: "card.tsx", label: "card.tsx" },
            { id: "input.tsx", label: "input.tsx" }
          ]
        },
        {
          id: "hooks",
          label: "hooks",
          children: [
            { id: "use-clipboard.ts", label: "use-clipboard.ts" },
            { id: "use-hotkeys.ts", label: "use-hotkeys.ts" }
          ]
        },
        { id: "index.ts", label: "index.ts" }
      ]
    },
    { id: "package.json", label: "package.json" },
    { id: "README.md", label: "README.md" }
  ]

  return (
    <div className="w-full max-w-sm rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 bg-card">
      <TreeView
        data={fileTree}
        selectedId={selected}
        onSelect={(node) => setSelected(node.id)}
        defaultExpandedIds={["src", "components"]}
      />
    </div>
  )
}

function TreeViewOrgDemo() {
  const [selected, setSelected] = useState<string>("architect")
  const orgData = [
    {
      id: "exec",
      label: "Executive Leadership",
      children: [
        { id: "ceo", label: "Chief Executive Officer" },
        { id: "cto", label: "Chief Technology Officer" }
      ]
    },
    {
      id: "engineering",
      label: "Engineering Division",
      children: [
        { id: "architect", label: "Principal Software Architect" },
        {
          id: "frontend",
          label: "Core Frontend & Design System",
          children: [
            { id: "dev-1", label: "Staff UI Engineer" },
            { id: "dev-2", label: "Accessibility Specialist" }
          ]
        },
        {
          id: "infra",
          label: "Cloud Reliability & Edge",
          children: [
            { id: "sre-1", label: "Staff SRE" },
            { id: "sre-2", label: "DevOps Engineer" }
          ]
        }
      ]
    }
  ]

  return (
    <div className="w-full max-w-md p-4 rounded-xl border border-border/70 bg-card shadow-xs space-y-3">
      <div className="text-xs font-semibold text-foreground">Company Organization Directory</div>
      <TreeView
        data={orgData}
        selectedId={selected}
        onSelect={(node) => setSelected(node.id)}
        defaultExpandedIds={["engineering", "frontend"]}
      />
      <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
        Selected Node: <span className="font-mono text-primary font-medium">{selected}</span>
      </div>
    </div>
  )
}

function AreaChartDemo() {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]
  const chartConfig = {
    desktop: { label: "Desktop Visitors", color: "#3b82f6" },
    mobile: { label: "Mobile Visitors", color: "#8b5cf6" },
  }
  return (
    <div className="w-full max-w-lg p-5 rounded-2xl border border-border/70 bg-card shadow-xs">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Area Chart - Stacked Gradient</h4>
        <p className="text-xs text-muted-foreground">Showing total visitors across devices for the last 6 months</p>
      </div>
      <Chart.Container config={chartConfig} className="h-60 w-full">
        <Chart.Area
          data={chartData}
          index="month"
          categories={["desktop", "mobile"]}
          colors={["#3b82f6", "#8b5cf6"]}
          showGrid
          showTooltip
          showLegend
        />
      </Chart.Container>
    </div>
  )
}

function BarChartDemo() {
  const chartData = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Apr", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
  ]
  const chartConfig = {
    desktop: { label: "Desktop", color: "#3b82f6" },
    mobile: { label: "Mobile", color: "#8b5cf6" },
  }
  return (
    <div className="w-full max-w-lg p-5 rounded-2xl border border-border/70 bg-card shadow-xs">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Bar Chart - Multiple Categories</h4>
        <p className="text-xs text-muted-foreground">Monthly breakdown of desktop and mobile sessions</p>
      </div>
      <Chart.Container config={chartConfig} className="h-60 w-full">
        <Chart.Bar
          data={chartData}
          index="month"
          categories={["desktop", "mobile"]}
          colors={["#3b82f6", "#8b5cf6"]}
          showGrid
          showTooltip
        />
      </Chart.Container>
    </div>
  )
}

function LineChartDemo() {
  const telemetryData = [
    { time: "00:00", latency: 28, throughput: 140 },
    { time: "04:00", latency: 32, throughput: 160 },
    { time: "08:00", latency: 45, throughput: 280 },
    { time: "12:00", latency: 38, throughput: 310 },
    { time: "16:00", latency: 42, throughput: 290 },
    { time: "20:00", latency: 30, throughput: 180 },
  ]
  const chartConfig = {
    latency: { label: "p95 Latency (ms)", color: "#10b981" },
    throughput: { label: "Requests / sec", color: "#6366f1" },
  }
  return (
    <div className="w-full max-w-lg p-5 rounded-2xl border border-border/70 bg-card shadow-xs">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Line Chart - Smooth Spline with Dots</h4>
        <p className="text-xs text-muted-foreground">Real-time edge gateway latency & throughput</p>
      </div>
      <Chart.Container config={chartConfig} className="h-60 w-full">
        <Chart.Line
          data={telemetryData}
          index="time"
          categories={["latency", "throughput"]}
          colors={["#10b981", "#6366f1"]}
          showGrid
          showDots
          showTooltip
        />
      </Chart.Container>
    </div>
  )
}

function DoughnutChartDemo() {
  const browserData = [
    { label: "Chrome", value: 450, color: "#3b82f6" },
    { label: "Safari", value: 240, color: "#8b5cf6" },
    { label: "Firefox", value: 160, color: "#10b981" },
    { label: "Edge", value: 95, color: "#f59e0b" },
    { label: "Other", value: 55, color: "#ec4899" },
  ]
  return (
    <div className="w-full max-w-lg p-5 rounded-2xl border border-border/70 bg-card shadow-xs">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Donut Chart - Visitor Share</h4>
        <p className="text-xs text-muted-foreground">Browser traffic distribution with center KPI value</p>
      </div>
      <Chart.Container config={{}} className="h-64 w-full">
        <Chart.Doughnut
          data={browserData}
          centerValue="1,000"
          centerLabel="Total Users"
          showLegend
        />
      </Chart.Container>
    </div>
  )
}

function RadialGaugeDemo() {
  const quotaData = [
    { label: "Serverless CPU", value: 84, color: "#3b82f6" },
    { label: "Persistent SSD", value: 68, color: "#8b5cf6" },
    { label: "Edge Bandwidth", value: 42, color: "#10b981" },
  ]
  return (
    <div className="w-full max-w-lg p-5 rounded-2xl border border-border/70 bg-card shadow-xs">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Radial Bar - Activity Gauge</h4>
        <p className="text-xs text-muted-foreground">Concentric resource utilization meters</p>
      </div>
      <Chart.Container config={{}} className="h-64 w-full">
        <Chart.Radial
          data={quotaData}
          centerValue="84%"
          centerLabel="Peak Usage"
          showLegend
        />
      </Chart.Container>
    </div>
  )
}
