---
name: oryn-ui-docs
description: >-
  Use this skill whenever creating, updating, or debugging pages, component showcases,
  live previews, props tables, or navigation in the ORYN UI documentation app (docs/).
  Covers Next.js 16 App Router, React 19 Turbopack rules, anti-patterns, and aesthetic standards.
---

# ORYN UI Documentation & Showcase Engineering Skill

This skill details how to author, maintain, and debug documentation pages, live component previews, and props tables in the **ORYN UI** Next.js 16 documentation site (`docs/`).

---

## 1. Architecture & Monorepo Linkage

- **Next.js 16 + React 19**: The `docs` site runs Next.js 16.4.3+ with React 19, Turbopack, and Tailwind CSS v4.
- **Root Package Dependency**: `docs/package.json` specifies `"oryn-ui": "file:.."`, consuming the pre-compiled ESM bundle in `dist/`.
- **CRITICAL RULE**: NEVER import components from `../../../src/` or alias `oryn-ui` to `../src` in `docs/tsconfig.json`. React 19's typing for `cloneElement` and `ReactNode` conflicts with React 18 source definitions. Always run `npm run build` at root and import from `'oryn-ui'` or subpaths like `'oryn-ui/button'`.

---

## 2. Strict Senior-Developer Aesthetic Standards

All documentation examples must meet enterprise-level UI quality:

1. **NO "Box-in-Box" Nested Wireframes**:
   - Never wrap component demos in nested cards or dashed outline boxes (`border-2 border-dashed border-border`).
   - Use clean, seamless preview canvases with subtle dot-grids (`bg-zinc-50/80` in light mode, `#0c0d12` in dark mode).
2. **NO Childish Emojis**:
   - Navigation tabs, buttons, alerts, and badges must use Lucide icons (`Eye`, `Code2`, `Check`, `Terminal`, `BookOpen`), NEVER raw emojis (`🎨`, `⚡`, `📝`, `💡`).
3. **Clean Component Metadata**:
   - Maximum 3–4 semantic tags per component card.
   - Never repeat version strings (`v2.12.0`, `v1.0.0`) on component cards or headers.
4. **Segmented Preview / Code Toggle**:
   - All interactive showcases must provide a segmented toggle (`[Eye Preview] [Code2 Code]`) and a 1-click copy button.
   - Code blocks must use clean token highlighting with line numbers.
5. **Authentic Enterprise Patterns**:
   - Create realistic, production-grade workflows (SSO authentication, Security preferences, Team member access, Billing portals, System status tables), not toy examples.

---

## 3. Registering & Documenting Components

When adding or updating docs for `<component-name>`:

### Step 1: Component Registry (`docs/src/lib/component-registry.ts`)
Add entry to `COMPONENT_REGISTRY`:
```ts
'<component-name>': {
  category: '<Category>' as ComponentCategory,
  title: '<Title>',
  description: '<Concise enterprise description>',
  version: '2.16.0',
  status: 'stable' as const,
  tags: ['<tag1>', '<tag2>', '<tag3>'] // Max 3-4 relevant tags
},
```

### Step 2: Component Props (`docs/src/lib/component-props.ts`)
Document each prop with its type, default value, and description:
```ts
'<component-name>': [
  {
    name: 'variant',
    type: "'default' | 'primary' | 'outline' | 'subtle'",
    defaultValue: "'default'",
    description: 'The visual style variant of the component'
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the component is interactive'
  }
],
```

### Step 3: Interactive Example (`docs/src/lib/examples/<category>.tsx`)
Create a modular demo and export the component along with its code snippet string:
- Make the code snippet clean and self-contained.
- **RULE**: In the code snippet, ONLY import `oryn-ui`. Never show imports for `clsx` or `tailwind-merge` as consumers do not need to install them.

---

## 4. Next.js & Turbopack Verification

Before finalizing any docs updates:

```bash
# 1. Compile root package first so docs consumes fresh artifacts
npm run build

# 2. Build Next.js documentation (checks static generation and SSR)
cd docs
npm run build

# 3. Check for ESLint errors (JSX unescaped entities, unused vars)
npm run lint
cd ..
```

### Common Next.js Gotchas
- **Unescaped JSX Entities**: Use `&apos;` for `'`, `&quot;` for `"`, and `&amp;` for `&` in JSX text.
- **Client vs Server**: Mark interactive preview components with `'use client';` at the top of the file.
- **Stale Previews**: If changes do not appear in `docs`, run `npm run build` at the root directory.

---

## 5. Theme Builder & CLI Integration

### A. Theme Builder (`/theme-builder`)
- **Route**: `docs/src/app/theme-builder/page.tsx`
- **Features**: Live component canvas responding dynamically to 6 curated enterprise color presets (Zinc, Indigo, Emerald, Rose, Ocean, Violet) and border-radius sliders.
- **Export**: Generates clean zero-runtime `:root` / `.dark` CSS custom properties or Tailwind CSS configuration snippets.

### B. CLI Component Distribution (`npx oryn-ui`)
- **CLI Adder**: `npx oryn-ui add <component>` copies component source code along with required primitives (`primitives/`), hooks (`hooks/`), and utilities (`lib/utils.ts`) automatically resolved.
- **Listing**: `npx oryn-ui list` shows all 55 components by domain.
- **Custom Dir**: Supports `--path <dir>` (default: `components/ui/oryn-ui`).
