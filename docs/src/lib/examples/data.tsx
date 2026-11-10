import React, { useState } from 'react'
import { Table, DataTable, Chart, Badge, StatCard, Timeline, TreeView } from '@oryn/ui'
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
      code: `import { Table } from '@oryn/ui'

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
      code: `import { Table, Badge } from '@oryn/ui'
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
      code: `import { Table } from '@oryn/ui'
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
      code: `import { DataTable, Badge } from '@oryn/ui'

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
      title: 'Basic Chart',
      description: 'A simple chart component',
      code: `import { Chart } from '@oryn/ui'

export function ChartExample() {
  const data = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 200 },
    { label: 'Apr', value: 180 }
  ]

  return <Chart data={data} type="line" />
}`,
      preview: (
        <div className="w-full max-w-md">
          <Chart 
            data={[
              { label: 'Jan', value: 100 },
              { label: 'Feb', value: 150 },
              { label: 'Mar', value: 200 },
              { label: 'Apr', value: 180 }
            ]} 
            type="line" 
          />
        </div>
      )
    }
  ],

  'stat-card': [
    {
      title: 'Metrics & KPI Stat Cards',
      description: 'Overview metric cards with trend indicators, direction badges, and icon adornments',
      code: `import { StatCard } from '@oryn/ui'
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
      code: `import { Timeline } from '@oryn/ui'

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
      code: `import { TreeView, TreeNode } from '@oryn/ui'
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
