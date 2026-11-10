// Landing page code editor snippets and package install commands
// Extracted to keep the landing page component clean, modular, and performant.

import { siteConfig } from '@/lib/site-config'

export const installCommands = siteConfig.installCommands

export interface CodeLine {
  line: number
  text: string
  type: string
}

export const frameworkSnippets: Record<'nextjs' | 'vite' | 'manual', CodeLine[]> = {
  nextjs: [
    { line: 1, text: "'use client'", type: 'directive' },
    { line: 2, text: '', type: 'empty' },
    { line: 3, text: `import { Button, Card, Input } from '${siteConfig.packageName}'`, type: 'import' },
    { line: 4, text: '', type: 'empty' },
    { line: 5, text: 'export default function Dashboard() {', type: 'fn' },
    { line: 6, text: '  return (', type: 'plain' },
    { line: 7, text: '    <Card className="p-6 max-w-md w-full space-y-4">', type: 'jsx' },
    { line: 8, text: `      <h1 className="text-xl font-bold">${siteConfig.name} Workspace</h1>`, type: 'jsx' },
    { line: 9, text: '      <Input placeholder="Enter project name..." />', type: 'jsx' },
    { line: 10, text: '      <Button className="w-full">Deploy Application</Button>', type: 'jsx' },
    { line: 11, text: '    </Card>', type: 'jsx' },
    { line: 12, text: '  )', type: 'plain' },
    { line: 13, text: '}', type: 'close-brace' }
  ],
  vite: [
    { line: 1, text: "import React, { useState } from 'react'", type: 'import' },
    { line: 2, text: `import { Button, Card, Badge, Slider } from '${siteConfig.packageName}'`, type: 'import' },
    { line: 3, text: '', type: 'empty' },
    { line: 4, text: 'export default function App() {', type: 'fn' },
    { line: 5, text: '  const [value, setValue] = useState(50)', type: 'plain' },
    { line: 6, text: '', type: 'empty' },
    { line: 7, text: '  return (', type: 'plain' },
    { line: 8, text: '    <Card className="p-6 max-w-md w-full space-y-4">', type: 'jsx' },
    { line: 9, text: '      <Badge variant="secondary">Vite + React 19</Badge>', type: 'jsx' },
    { line: 10, text: '      <Slider value={value} onChange={setValue} />', type: 'jsx' },
    { line: 11, text: '      <Button variant="default">Save Configuration</Button>', type: 'jsx' },
    { line: 12, text: '    </Card>', type: 'jsx' },
    { line: 13, text: '  )', type: 'plain' },
    { line: 14, text: '}', type: 'close-brace' }
  ],
  manual: [
    { line: 1, text: "import React from 'react'", type: 'import' },
    { line: 2, text: `import { Button, Card, Switch } from '${siteConfig.packageName}'`, type: 'import' },
    { line: 3, text: '', type: 'empty' },
    { line: 4, text: 'export function Application() {', type: 'fn' },
    { line: 5, text: '  return (', type: 'plain' },
    { line: 6, text: '    <Card className="p-6">', type: 'jsx' },
    { line: 7, text: '      <Switch label="Dark Mode" defaultChecked />', type: 'jsx' },
    { line: 8, text: `      <Button variant="default">${siteConfig.name} Ready</Button>`, type: 'jsx' },
    { line: 9, text: '    </Card>', type: 'jsx' },
    { line: 10, text: '  )', type: 'plain' },
    { line: 11, text: '}', type: 'close-brace' }
  ]
}

export const rawCodeString: Record<'nextjs' | 'vite' | 'manual', string> = {
  nextjs: `'use client'\n\nimport { Button, Card, Input } from '${siteConfig.packageName}'\n\nexport default function Dashboard() {\n  return (\n    <Card className="p-6 max-w-md w-full space-y-4">\n      <h1 className="text-xl font-bold">${siteConfig.name} Workspace</h1>\n      <Input placeholder="Enter project name..." />\n      <Button className="w-full">Deploy Application</Button>\n    </Card>\n  )\n}`,
  vite: `import React, { useState } from 'react'\nimport { Button, Card, Badge, Slider } from '${siteConfig.packageName}'\n\nexport default function App() {\n  const [value, setValue] = useState(50)\n\n  return (\n    <Card className="p-6 max-w-md w-full space-y-4">\n      <Badge variant="secondary">Vite + React 19</Badge>\n      <Slider value={value} onChange={setValue} />\n      <Button variant="default">Save Configuration</Button>\n    </Card>\n  )\n}`,
  manual: `import React from 'react'\nimport { Button, Card, Switch } from '${siteConfig.packageName}'\n\nexport function Application() {\n  return (\n    <Card className="p-6">\n      <Switch label="Dark Mode" defaultChecked />\n      <Button variant="default">${siteConfig.name} Ready</Button>\n    </Card>\n  )\n}`
}
