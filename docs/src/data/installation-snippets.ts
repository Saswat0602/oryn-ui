// Framework installation commands and configuration snippets
// Extracted to keep the installation page clean, declarative, and maintainable.

import { siteConfig } from '@/lib/site-config'

export type PkgManager = 'npm' | 'pnpm' | 'yarn' | 'bun'
export type FrameworkKey = 'nextjs' | 'vite' | 'astro' | 'manual'
export type ThemeStyle = 'monochrome' | 'normal'

export const pkgCommands = siteConfig.installCommands

export const getInitCommand = (pm: PkgManager, style: ThemeStyle = 'monochrome') => {
  const flag = style === 'normal' ? ' --style normal' : ' --style monochrome'
  switch (pm) {
    case 'pnpm':
      return `pnpm dlx ${siteConfig.cli.command} init${flag}`
    case 'yarn':
      return `yarn dlx ${siteConfig.cli.command} init${flag}`
    case 'bun':
      return `bunx ${siteConfig.cli.command} init${flag}`
    default:
      return `npx ${siteConfig.cli.command} init${flag}`
  }
}

export const getInstallCommand = (pm: PkgManager, pkg = siteConfig.packageName) => {
  switch (pm) {
    case 'pnpm':
      return `pnpm add ${pkg}`
    case 'yarn':
      return `yarn add ${pkg}`
    case 'bun':
      return `bun add ${pkg}`
    default:
      return `npm install ${pkg}`
  }
}

export const getCreateAppCommand = (framework: 'nextjs' | 'vite' | 'astro', pm: PkgManager) => {
  switch (framework) {
    case 'nextjs':
      switch (pm) {
        case 'pnpm':
          return 'pnpm create next-app@latest my-app --typescript --tailwind --eslint --app'
        case 'yarn':
          return 'yarn create next-app my-app --typescript --tailwind --eslint --app'
        case 'bun':
          return 'bun create next-app my-app --typescript --tailwind --eslint --app'
        default:
          return 'npx create-next-app@latest my-app --typescript --tailwind --eslint --app'
      }
    case 'vite':
      switch (pm) {
        case 'pnpm':
          return 'pnpm create vite my-app --template react-ts'
        case 'yarn':
          return 'yarn create vite my-app --template react-ts'
        case 'bun':
          return 'bun create vite my-app --template react-ts'
        default:
          return 'npm create vite@latest my-app -- --template react-ts'
      }
    case 'astro':
      switch (pm) {
        case 'pnpm':
          return 'pnpm create astro@latest my-app --template minimal'
        case 'yarn':
          return 'yarn create astro my-app --template minimal'
        case 'bun':
          return 'bun create astro@latest my-app --template minimal'
        default:
          return 'npm create astro@latest my-app -- --template minimal'
      }
  }
}

export const getAstroIntegrationsCommand = (pm: PkgManager) => {
  switch (pm) {
    case 'pnpm':
      return 'pnpm astro add react tailwind'
    case 'yarn':
      return 'yarn astro add react tailwind'
    case 'bun':
      return 'bunx astro add react tailwind'
    default:
      return 'npx astro add react tailwind'
  }
}

export const nextjs = {
  createApp: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app",
  install: siteConfig.installCommands.npm,
  methodCss: `// app/layout.tsx (Method 1: Zero-config precompiled CSS)
import "${siteConfig.packageName}/styles.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My ORYN UI App",
  description: "Built with Next.js and ORYN UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}`,
  methodTailwindV4: `/* app/globals.css (Method 2: Tailwind CSS v4) */
@import "tailwindcss";
@source "../node_modules/${siteConfig.packageName}/dist";`,
  tailwindConfig: `// tailwind.config.js (Method 3: Tailwind v3 Monorepo & Workspaces Safe)
const path = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Resolves accurately across Turborepo, pnpm workspaces, and standard node_modules
    path.dirname(require.resolve("${siteConfig.packageName}/package.json")) + "/dist/**/*.{mjs,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
  themeProvider: `// components/theme-provider.tsx (Optional Dark/Light Theme Switching)
'use client'

import * as React from 'react'
import { ThemeProvider as OrynThemeProvider } from '${siteConfig.packageName}'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <OrynThemeProvider defaultTheme="dark" storageKey="app-theme">
      {children}
    </OrynThemeProvider>
  )
}`,
  pageUsage: `'use client'

import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Badge } from '${siteConfig.packageName}'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-md w-full p-6 space-y-4 shadow-lg border-border">
        <div className="flex items-center justify-between">
          <Badge variant="primary">Next.js 16 + React 19</Badge>
          <span className="text-xs text-muted-foreground">Ready</span>
        </div>
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold">Welcome to ${siteConfig.fullName}</CardTitle>
          <CardDescription>
            Zero external dependencies, accessible, high-craft UI components.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-3 pt-2">
          <Input placeholder="Enter your email" type="email" />
          <Button variant="default" className="w-full">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}`
}

export const vite = {
  createApp: "npm create vite@latest my-app -- --template react-ts",
  installTailwind: (pm: PkgManager) => {
    switch (pm) {
      case 'pnpm':
        return 'pnpm add -D tailwindcss postcss autoprefixer\npnpm dlx tailwindcss init -p'
      case 'yarn':
        return 'yarn add -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p'
      case 'bun':
        return 'bun add -d tailwindcss postcss autoprefixer\nbunx tailwindcss init -p'
      default:
        return 'npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p'
    }
  },
  tailwindConfig: `// tailwind.config.js (Vite + React)
import path from "path"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    path.dirname(require.resolve("${siteConfig.packageName}/package.json")) + "/dist/**/*.{mjs,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
  indexCss: `/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import ORYN UI styles */
@import "${siteConfig.packageName}/styles.css";`,
  mainTsx: `// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '${siteConfig.packageName}/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
  appUsage: `import { Button, Card, Badge, Input } from '${siteConfig.packageName}'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="p-6 space-y-4 max-w-sm w-full border border-border">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Vite + React 19</Badge>
          <span className="text-xs text-muted-foreground font-mono">v3.2</span>
        </div>
        <h2 className="text-lg font-bold">Fast &amp; Modern UI</h2>
        <p className="text-xs text-muted-foreground">
          Lightning-fast HMR with zero external UI runtime bloat.
        </p>
        <Input placeholder="Search components..." />
        <Button variant="default" className="w-full">
          Explore Library
        </Button>
      </Card>
    </div>
  )
}

export default App`
}

export const astro = {
  createApp: "npm create astro@latest my-app -- --template minimal",
  addIntegrations: "npx astro add react tailwind",
  astroConfig: `// astro.config.mjs
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})`,
  layoutAstro: `---
// src/layouts/Layout.astro
import '${siteConfig.packageName}/styles.css'

interface Props {
  title?: string
}

const { title = "${siteConfig.fullName} + Astro" } = Astro.props
---

<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
    <slot />
  </body>
</html>`,
  pageAstro: `---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro'
import { Button, Card, Badge, Input } from '${siteConfig.packageName}'
---

<Layout title="ORYN UI in Astro">
  <main class="min-h-screen flex items-center justify-center p-6">
    <Card className="max-w-md w-full p-6 space-y-4 border border-border">
      <div class="flex items-center justify-between">
        <Badge variant="primary">Astro Islands</Badge>
        <span class="text-xs text-muted-foreground font-mono">Zero JS Default</span>
      </div>
      <h1 class="text-xl font-bold">Astro + ORYN UI</h1>
      <p class="text-xs text-muted-foreground leading-relaxed">
        Server-rendered HTML by default. Hydrate interactive components on demand with client:* directives.
      </p>
      
      <Input placeholder="Static rendered input" />
      
      {/* Interactive client-hydrated button */}
      <Button client:load variant="default" className="w-full">
        Interactive Hydrated Button
      </Button>
    </Card>
  </main>
</Layout>`
}

export const manual = {
  install: (pm: PkgManager) => {
    switch (pm) {
      case 'pnpm':
        return `pnpm add react react-dom ${siteConfig.packageName}`
      case 'yarn':
        return `yarn add react react-dom ${siteConfig.packageName}`
      case 'bun':
        return `bun add react react-dom ${siteConfig.packageName}`
      default:
        return `npm install react react-dom ${siteConfig.packageName}`
    }
  },
  css: `/* Primary CSS Entry (e.g., src/index.css or src/globals.css) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import ORYN UI bundled styles (includes all component styles + animations) */
@import "${siteConfig.packageName}/styles.css";`,
  appUsage: `import React from 'react'
import { Button, Card, Badge } from '${siteConfig.packageName}'
import '${siteConfig.packageName}/styles.css'

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex items-center justify-center">
      <Card className="p-6 space-y-3 max-w-sm border border-border">
        <Badge variant="outline">Manual React Setup</Badge>
        <h2 className="text-base font-semibold">Ready to Build</h2>
        <p className="text-xs text-muted-foreground">
          Import any of the 75+ components directly into your view tree.
        </p>
        <Button variant="default">Confirm</Button>
      </Card>
    </div>
  )
}`
}

export const getNextLayoutSnippet = (style: ThemeStyle = 'monochrome') => `// app/layout.tsx (Method 1: Zero-config precompiled CSS)
import "${siteConfig.packageName}/styles.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My ORYN UI App",
  description: "Built with Next.js and ORYN UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" data-style="${style}">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}`

export const getNextThemeProviderSnippet = (style: ThemeStyle = 'monochrome') => `// components/theme-provider.tsx (Optional Dark/Light Theme Switching)
'use client'

import * as React from 'react'
import { ThemeProvider as OrynThemeProvider } from '${siteConfig.packageName}'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <OrynThemeProvider defaultTheme="dark" defaultStyle="${style}" storageKey="app-theme">
      {children}
    </OrynThemeProvider>
  )
}`

export const getAstroLayoutSnippet = (style: ThemeStyle = 'monochrome') => `---
// src/layouts/Layout.astro
import '${siteConfig.packageName}/styles.css'

interface Props {
  title?: string
}

const { title = "${siteConfig.fullName} + Astro" } = Astro.props
---

<!doctype html>
<html lang="en" class="dark" data-style="${style}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
    <slot />
  </body>
</html>`

export const getThemeVariables = (style: ThemeStyle = 'monochrome') => {
  if (style === 'normal') {
    return `/* ORYN UI Theme: Normal (Vibrant Blue) */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 221.2 83.2% 53.3%;          /* Vibrant Royal Blue */
    --primary-foreground: 210 40% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 210 40% 96.1%;             /* Soft Ice Blue Accent */
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 217.2 91.2% 59.8%;          /* Electric Blue in Dark */
    --primary-foreground: 0 0% 100%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 217.2 91.2% 59.8%;
  }
}`
  }

  return `/* ORYN UI Theme: B&W / Monochrome (Shadcn Zinc Default) */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;              /* Deep Black/Zinc in Light */
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;             /* Subtle Zinc Accent */
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;                  /* Crisp White in Dark */
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}`
}

export const themeVariables = getThemeVariables('monochrome')

export const cli = {
  copyCommand: `${siteConfig.cli.command} add button card input`
}
