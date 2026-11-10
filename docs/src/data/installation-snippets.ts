// Framework installation commands and configuration snippets
// Extracted to keep the installation page clean, declarative, and maintainable.

import { siteConfig } from '@/lib/site-config'

export const pkgCommands = siteConfig.installCommands

export const nextjs = {
  createApp: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app",
  install: siteConfig.installCommands.npm,
  methodCss: `// app/layout.tsx (Method 1: Zero-config precompiled CSS)
import "${siteConfig.packageName}/styles.css"`,
  methodTailwindV4: `/* app/globals.css (Method 2: Tailwind CSS v4) */
@import "tailwindcss";
@source "../node_modules/${siteConfig.packageName}/dist";`,
  tailwindConfig: `// tailwind.config.js (Method 3: Tailwind v3 Monorepo-Safe)
const path = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Monorepo-safe path: resolves accurately in Turborepo, pnpm workspaces, and standard apps
    path.dirname(require.resolve("${siteConfig.packageName}/package.json")) + "/dist/**/*.{mjs,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
  pageUsage: `'use client'

import { Button, Card, Input } from '${siteConfig.packageName}'

export default function Home() {
  return (
    <main className="p-8 max-w-md mx-auto space-y-4">
      <Card className="p-6 space-y-4">
        <h1 className="text-xl font-bold">Welcome to ${siteConfig.fullName}</h1>
        <Input placeholder="Enter your email" />
        <Button className="w-full">Get Started</Button>
      </Card>
    </main>
  )
}`
}

export const vite = {
  createApp: "npm create vite@latest my-app -- --template react-ts",
  install: `npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p\n${siteConfig.installCommands.npm}`,
  tailwindConfig: `// tailwind.config.js (Monorepo & Vite safe)
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
  appUsage: `import { Button, Card, Badge } from '${siteConfig.packageName}'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="p-6 space-y-4 max-w-sm">
        <Badge variant="secondary">Vite + React</Badge>
        <h2 className="text-lg font-bold">Fast & Modern UI</h2>
        <Button variant="default">Click Me</Button>
      </Card>
    </div>
  )
}

export default App`
}

export const manual = {
  install: `npm install react react-dom ${siteConfig.packageName}`,
  css: `@tailwind base;\n@tailwind components;\n@tailwind utilities;`
}

export const themeVariables = `/* HSL Channel Tokens (enables Tailwind opacity modifiers like bg-primary/80) */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
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
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
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
    --ring: 217.2 91.2% 59.8%;
  }
}`

export const cli = {
  copyCommand: `${siteConfig.cli.command} add button card input`
}
