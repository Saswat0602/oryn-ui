"use client"

import React from 'react'
import { Badge } from '@oryn/ui/badge'
import { Tabs } from '@oryn/ui/tabs'
import { CodeBlock } from '@/components/CodeBlock'
import { siteConfig } from '@/lib/site-config'

interface ComponentDocLayoutProps {
  name: string
  description: string
  category: string
  children: React.ReactNode
}

interface CopyCodeBlockProps {
  code: string
  filename: string
  language?: string
}

export const CopyCodeBlock: React.FC<CopyCodeBlockProps> = ({ code, filename, language = 'tsx' }) => {
  return (
    <CodeBlock
      code={code}
      filename={filename}
      language={language}
      showLineNumbers={false}
    />
  )
}

export const LivePreview: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium">{title}</h4>
    <div className="flex min-h-[200px] w-full items-center justify-center rounded-lg border-2 border-dashed border-border p-8 bg-card">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {children}
      </div>
    </div>
  </div>
)

export const ComponentDocLayout: React.FC<ComponentDocLayoutProps> = ({
  name,
  description,
  category,
  children
}) => {
  const installationCode = siteConfig.installCommands.npm
  const importCode = siteConfig.imports.subpath(name, name.toLowerCase())

  const tabItems = [
    {
      id: 'preview',
      label: 'Preview',
      content: (
        <div className="space-y-8">
          {children}
        </div>
      )
    },
    {
      id: 'code',
      label: 'Code',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Installation</h3>
            <CopyCodeBlock
              filename="Terminal"
              language="bash"
              code={installationCode}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Import</h3>
            <CopyCodeBlock
              filename="component.tsx"
              code={importCode}
            />
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Tabs */}
      <Tabs items={tabItems} defaultActiveTab="preview" className="w-full" />
    </div>
  )
}
