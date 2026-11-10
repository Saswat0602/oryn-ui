# ORYN UI (`@oryn/ui`)

[![npm version](https://img.shields.io/npm/v/@oryn/ui.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@oryn/ui)
[![npm downloads](https://img.shields.io/npm/dm/@oryn/ui.svg?style=flat-square&color=emerald)](https://www.npmjs.com/package/@oryn/ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg?style=flat-square)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3%20%7C%204-38bdf8.svg?style=flat-square)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **Crafting clarity into every interface.**  
> A modern component library for building beautiful, accessible interfaces. Built with **TypeScript** and **Tailwind CSS**.

Features **75+ standalone components, AI primitives, and modules** with **zero external UI runtime dependencies**, Architecture-by-Layer, full keyboard accessibility, interactive theme builder, and smart CLI distribution.

- 🌐 **Documentation & Live Showcase:** [oryn-ui.vercel.app](https://oryn-ui.vercel.app)
- 🎨 **Interactive Theme Builder:** [oryn-ui.vercel.app/theme-builder](https://oryn-ui.vercel.app/theme-builder)
- 📦 **npm Package:** [npmjs.com/package/@oryn/ui](https://www.npmjs.com/package/@oryn/ui)
- 💻 **GitHub Repository:** [github.com/Saswat0602/oryn-ui](https://github.com/Saswat0602/oryn-ui)
- 🚀 **v3 Migration Guide:** [MIGRATION_V2_TO_V3.md](./MIGRATION_V2_TO_V3.md)

---

## ✨ Features

- 🛡️ **Zero External UI Runtime Dependencies** — 100% native React primitives (`Slot`, `Portal`, `Presence`, `FocusTrap`) and zero-dependency inline SVG icons.
- 🚀 **75+ Enterprise Components & AI UI** — From core inputs, composable forms, and data tables to agentic AI primitives (`PromptInput`, `MessageBubble`, `ReasoningDisclosure`, `ToolCallCard`).
- ⚡ **Architecture-by-Layer** — Import via full package, categorized modules (`/forms`, `/layout`), headless primitives (`/primitives`), hooks (`/hooks`), or individual tree-shaken components (`/button`, `/dialog`).
- 🛠️ **Smart CLI Component Distribution** — Prefer local component ownership? Run `npx @oryn/ui add <component>` to scaffold components with all dependencies auto-resolved.
- 🎨 **Tailwind CSS Native & Theme Builder** — Seamlessly integrates with Tailwind CSS tokens and provides a real-time live preview theme builder with 1-click CSS variable export.
- 🌙 **First-Class Dark Mode** — Clean CSS variables and semantic color tokens with smooth theme switching.
- ♿ **Accessible by Design** — Built according to WAI-ARIA authoring practices with automated `aria-describedby` wiring and keyboard navigation.
- 📦 **Universal React Support** — Engineered to work smoothly across both React 18 consumers and React 19 / Next.js 16+ Turbopack applications.

---

## 🚀 Quick Start

### 1. Installation

Install `@oryn/ui` into your project:

```bash
# npm
npm install @oryn/ui

# pnpm
pnpm add @oryn/ui

# yarn
yarn add @oryn/ui

# bun
bun add @oryn/ui
```

### Alternative: Direct CLI Component Addition (shadcn-style)

If you prefer copying components directly into your codebase:

```bash
# Add components with all primitives and hooks auto-resolved:
npx @oryn/ui add button
npx @oryn/ui add dialog
npx @oryn/ui add data-table
npx @oryn/ui add form

# Explore the complete 55-component catalog:
npx @oryn/ui list
```

### 2. Configure Tailwind CSS

ORYN UI provides 3 straightforward options:

#### Option A: Self-Contained Precompiled CSS (Simplest)
Import pre-compiled styles directly in your root layout (`app/layout.tsx` or `src/main.tsx`):
```tsx
import "@oryn/ui/styles.css"
```

#### Option B: Tailwind CSS v4 (@source directive)
Add the `@source` directive in your main CSS file (`globals.css`):
```css
@import "tailwindcss";
@source "../node_modules/@oryn/ui/dist";
```

#### Option C: Tailwind v3 Monorepo & Hoisting-Safe Path
Add the resolved directory to `content` in `tailwind.config.js` (guaranteed to work across pnpm, Yarn Berry, Turborepo, and npm workspaces):
```javascript
const path = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    path.dirname(require.resolve("@oryn/ui/package.json")) + "/dist/**/*.{mjs,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Usage

Import components in your React application:

```tsx
import { Button, Card, Input } from '@oryn/ui'

export default function App() {
  return (
    <Card className="p-6 max-w-sm space-y-4">
      <h2 className="text-xl font-bold">Sign In</h2>
      <Input placeholder="name@example.com" type="email" />
      <Button className="w-full">Continue</Button>
    </Card>
  )
}
```

---

## 📦 Import Methods

ORYN UI offers 3 import levels so you can balance developer convenience with bundle size:

### 1. Full Package Import
Most convenient for standard projects:
```tsx
import { Button, Card, Input, Modal, Table } from '@oryn/ui'
```

### 2. Categorized Feature Modules
Groups related components together without loading the entire library:
```tsx
import { Form, Calendar, Tabs, DateTimePicker } from '@oryn/ui/forms'
import { Layout, Navbar, Sidebar, Drawer, Modal } from '@oryn/ui/layout'
import { Dialog, DropdownMenu, Tooltip } from '@oryn/ui/overlay'
import { Table, DataTable, Chart } from '@oryn/ui/data'
import { NavigationMenu, Menubar, Command, Combobox } from '@oryn/ui/navigation'
import { Avatar, Badge, Carousel } from '@oryn/ui/media'
import { Alert, Toast, Sonner } from '@oryn/ui/feedback'
```

### 3. Individual Component Imports
Direct tree-shaking for maximum bundle size optimization:
```tsx
import { Button } from '@oryn/ui/button'
import { Drawer } from '@oryn/ui/drawer'
import { Input } from '@oryn/ui/input'
import { Card } from '@oryn/ui/card'
```



## 📋 Component Catalog

| Category | Components Included |
| :--- | :--- |
| **Core** | `Button`, `Card`, `Checkbox`, `Input`, `Label`, `Progress`, `Radio`, `Rating`, `Select`, `Skeleton`, `Slider`, `Switch`, `Textarea` |
| **Forms** | `Accordion`, `Breadcrumbs`, `Calendar`, `DateTimePicker`, `InputOTP`, `RadioGroup`, `ReactHookForm`, `Tabs` |
| **Layout** | `Drawer`, `Layout`, `Modal`, `Navbar`, `Popover`, `Resizable`, `ScrollArea`, `Sheet`, `Sidebar`, `Tooltip` |
| **Overlay** | `AlertDialog`, `Collapsible`, `ContextMenu`, `Dialog`, `DropdownMenu`, `HoverCard`, `Separator`, `Toggle` |
| **Navigation** | `Combobox`, `Command`, `Menubar`, `NavigationMenu`, `Pagination` |
| **Data** | `Chart`, `DataTable`, `Table` |
| **Feedback** | `Alert`, `Sonner`, `Toast` |
| **Media** | `AspectRatio`, `Avatar`, `Badge`, `Carousel`, `Typography` |

For a complete status breakdown and implementation checklist, see [COMPONENTS_STATUS.md](./COMPONENTS_STATUS.md).

---

## 🛠️ Development & Monorepo Workflows

```bash
# Clone the repository
git clone https://github.com/Saswat0602/oryn-ui.git
cd mad-ui

# Install dependencies
npm install

# Build the library into /dist
npm run build

# Start documentation dev server
cd docs
npm install
npm run dev
```

For AI agents and human contributors, see [AGENTS.md](./AGENTS.md) for architecture guidelines, conventions, and review workflows.

---

## 🤝 Community & Contributing

We welcome contributions of all kinds! Please see our community guides before submitting an issue or pull request:

- **[Contributing Guidelines](./CONTRIBUTING.md)**: Development setup, branch etiquette, and pull request checklist.
- **[Code of Conduct](./CODE_OF_CONDUCT.md)**: Community pledge and standards adapted from Contributor Covenant v2.1.
- **[Security Policy](./SECURITY.md)**: Supported versions and vulnerability disclosure process.

---

## 📄 License

MIT © [Saswat Ranjan Mohanty](https://github.com/Saswat0602). Free for commercial and personal use.
