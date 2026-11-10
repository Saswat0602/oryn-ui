# AGENTS.md — Developer & AI Agent Guide for ORYN UI

Welcome to the **ORYN UI** repository. This document provides a comprehensive guide for AI agents and human contributors on project architecture, conventions, workflows, design system standards, and engineering rules.

---

## 1. Project Overview & Architectural Standards

**ORYN UI** (`@oryn/ui`) is an enterprise-grade React UI component library built with **TypeScript** and **Tailwind CSS**, featuring 57+ components and subpath modules with extensive customization, animations, accessibility, and theme support.

### Monorepo Structure:
1. **Root (`/`)**: The published npm package (`@oryn/ui`), bundled with `tsup` into ESM and `.d.mts` files in `dist/`.
2. **Documentation (`/docs`)**: A Next.js 16.4.3+ showcase and documentation application built with App Router (Turbopack), React 19, and Tailwind CSS v4. It consumes the root package directly via `"@oryn/ui": "file:.."`.

---

## 2. Directory Structure

```
mad-ui/
├── .github/workflows/ci.yml   # GitHub Actions CI workflow (build, typecheck, lint)
├── AGENTS.md                  # This guide and engineering rules
├── CHANGELOG.md               # Version changelog
├── LICENSE                    # MIT License
├── README.md                  # Root repository overview and npm instructions
├── package.json               # Root package.json (@oryn/ui)
├── tsup.config.ts             # Multi-entry build configuration for library
├── tsconfig.json              # Root TypeScript config
├── tailwind.config.js         # Library Tailwind configuration
├── dist/                      # Compiled ESM, styles, and declaration files (.mjs, .d.mts)
├── scripts/
│   └── build-css.js           # CSS processing script (builds dist/styles.css & dist/theme.css)
├── src/
│   ├── index.ts               # Primary bundle entry point (exports all components + compounds)
│   ├── core.ts                # Core bundle entry point
│   ├── components/            # Component source files categorized by domain
│   │   ├── core/              # Button, Card, Input, Checkbox, Select, Slider, etc.
│   │   ├── forms/             # Accordion, Calendar, Breadcrumbs, Tabs, etc.
│   │   ├── layout/            # Navbar, Sidebar, Modal, Drawer, Sheet, etc.
│   │   ├── overlay/           # Dialog, AlertDialog, DropdownMenu, Tooltip, etc.
│   │   ├── navigation/        # NavigationMenu, Menubar, Command, Combobox, Pagination
│   │   ├── data/              # Table, DataTable, Chart
│   │   ├── media/             # Avatar, Badge, Carousel, AspectRatio, Typography
│   │   └── feedback/          # Alert, Toast, Sonner
│   ├── modules/               # Sub-bundle entry points (forms.ts, layout.ts, etc.)
│   ├── individual/            # Individual entry points for tree-shaking
│   ├── primitives/            # Headless foundation primitives (slot, portal, focus-trap, presence)
│   ├── hooks/                 # Reusable custom hooks (useControllableState, useClickOutside, etc.)
│   ├── theme/                 # Design tokens, ColorScheme, and ThemeProvider
│   ├── lib/
│   │   ├── utils.ts           # clsx + tailwind-merge (cn helper)
│   │   └── compose-event-handlers.ts # Event handler composition helper
│   └── icons/                 # Shared icon components
└── docs/                      # Next.js 16 showcase & documentation site
    ├── package.json           # Docs dependencies (Next.js, React 19, Lucide, Framer Motion)
    ├── next.config.ts         # Next.js configuration with MDX support
    ├── public/                # Static assets, SVG logos, and favicons
    └── src/
        ├── app/
        │   ├── page.tsx                           # Modern landing page with live component demos
        │   ├── layout.tsx                         # Root docs layout with ThemeProvider & 56px header
        │   ├── components/page.tsx                # Interactive Drawer & Accordion playground
        │   └── docs/
        │       ├── layout.tsx                     # Sticky sidebar documentation layout
        │       ├── components/[[...slug]]/page.tsx # Clean component catalog & dynamic page handler
        │       ├── getting-started/page.tsx        # Overview & quickstart guide
        │       ├── installation/page.tsx           # Framework guides (Next.js, Vite, Manual, CLI)
        │       └── examples/page.tsx               # Real-world usage examples
        ├── components/        # Docs UI (DocsSidebar, ComponentPreview, PropsTable, CodeBlock)
        └── lib/
            ├── component-registry.ts # Single source of truth for component metadata
            ├── component-props.ts    # Prop documentation table data
            └── examples/             # Modular interactive component demos and snippets
```

---

## 3. Strict Design & Aesthetic Rules (Senior-Developer Standard)

All UI contributions must reflect senior-level engineering quality:

1. **Clean, Refined Color Palette**:
   - Use crisp neutral darks (`#09090b`, `#18181b`, `#27272a`) and clean lights (`#ffffff`, `#f4f4f5`, `#e4e4e7`).
   - Use subtle, semantic primary accents (`blue-500`, `indigo-500`) with modest opacity.
   - Always declare `color-scheme: dark;` on `.dark` and `color-scheme: light;` on `:root` to ensure browsers render native scrollbars and controls in the correct theme.
   - Provide sleek, custom scrollbars (`scrollbar-thin` with transparent track and subtle `var(--border)` thumb) to eliminate clunky, white native OS scrollbars.
   - **PROHIBITED**: Gaudy rainbow animated floating orbs, loud fluorescent pink/green blur blobs, and oversaturated neon gradients ("vibe coding").
2. **No Tag Bloat or Repetitive Version Spam**:
   - Do NOT display 5+ tags on every component card or header.
   - Do NOT repeat version strings (e.g. `v2.12.0`, `v1.0.0`) on component cards.
   - Component cards must be compact, minimal, and scannable with clear typography and subtle hover states.
3. **No Childish Emojis in Professional UI**:
   - Navigation tabs, buttons, and badges must use clean, semantic Lucide vector icons (`Eye`, `Code2`, `Terminal`, `BookOpen`), NEVER raw emojis (`🎨`, `📝`, `⚡`, `💡`).
4. **Header & Navigation Layout**:
   - Header must be sleek (`h-14` / 56px), with sticky positioning, backdrop-blur, and crisp bottom border.
   - Header must feature direct links to the official GitHub repository (`https://github.com/Saswat0602/oryn-ui`) and npm package (`https://www.npmjs.com/package/@oryn/ui`).
   - Documentation must always feature a persistent, sticky left sidebar (`w-64`) with category grouping and instant component search.

---

## 4. Cross-React Version Compatibility (React 18 & 19)

1. **Universal Icon Types**:
   - When declaring `icon` props in component interfaces (e.g., `navbar.tsx`, `sidebar.tsx`), use `icon?: any;` or flexible `React.ReactNode` instead of restrictive types like `React.ComponentType<{ size?: number }>`.
   - Hardcoded `ComponentType` types break when consumer projects (like Next.js 15 / React 19) pass icons from `lucide-react`, because React 19's `ReactNode` includes `bigint` which is not assignable to React 18 types.
2. **Peer Dependencies**:
   - Keep `"react": ">=18.0.0"` and `"react-dom": ">=18.0.0"` in root `package.json` under `peerDependencies`.
3. **JSX Escaping**:
   - Always escape quotes and apostrophes in JSX text (use `&quot;`, `&apos;`, `&amp;`) to maintain strict ESLint compliance in Next.js builds.

---

## 5. Build & Verification Workflows

Before committing any changes or concluding a task, run the following verification pipeline:

```bash
# 1. Build the root library (must succeed with 0 errors)
npm run build

# 2. Build the documentation site (must succeed with 0 errors and generate all static pages)
cd docs
npm run build
cd ..

# 3. Check for lint errors in docs
cd docs
npm run lint
cd ..
```

> **IMPORTANT**: The `docs` application imports directly from `dist/` of the root package via symlink. Whenever you edit components in `src/`, you **must** run `npm run build` in root for the changes to reflect in `docs`.

---

## 6. Phase-wise Git Commit Protocol

When executing multi-phase updates:
1. Complete each phase cleanly (code changes, styling, and tests).
2. Verify that `npm run build` passes in both root and `docs`.
3. Make a targeted git commit for that phase with a descriptive message (e.g., `feat(docs): add sticky sidebar layout and clean component cards`).
4. Never leave broken build states or uncommitted experimental scratch code in working branches.

---

## 7. Adding a New Component Checklist

When adding a new component to the library, follow this strict checklist:

1. **Implementation**:
   - Place component in `src/components/<category>/<component-name>.tsx`.
   - Use `cn()` from `src/lib/utils.ts` for Tailwind class composition.
   - For overlays, modals, and dropdowns, use foundational primitives (`src/primitives/overlay-stack.ts`, `src/hooks/use-floating-position.ts`, `src/primitives/visually-hidden-input.tsx`).
   - Include ARIA attributes (`aria-label`, `aria-expanded`, `role`) and keyboard navigation support (`src/hooks/use-roving-tabindex.ts`).
2. **Exports**:
   - Re-export in `src/components/index.ts`.
   - Re-export in `src/index.ts`.
   - Add to category module in `src/modules/<category>.ts`.
   - Create individual entry in `src/individual/<component-name>.ts`.
   - Add subpath export in root `package.json` under `"exports"`.
   - Add entry in `tsup.config.ts`.
3. **Documentation**:
   - Register the component in `docs/src/lib/component-registry.ts` with title, category, status, and description.
   - Add live interactive examples in `docs/src/lib/examples/<category>.tsx`.
   - Add prop descriptions in `docs/src/lib/component-props.ts`.
   - Update `COMPONENTS_STATUS.md`.
4. **Verification**:
   - Run `npm run build` in root to verify ESM and `.d.mts` bundling.
   - Run `npm run build` in `docs` to ensure static page generation succeeds.

---

## 8. Package Dependencies & Consumer Installation Standards

1. **Zero Redundant Package Installs**:
   - `clsx`, `tailwind-merge`, and `lucide-react` are declared as direct `dependencies` in root `package.json`.
   - **RULE**: NEVER instruct consumers to install `npm install @oryn/ui lucide-react clsx tailwind-merge`.
   - Consumers only need:
     ```bash
     npm install @oryn/ui
     ```
   - Documentation, quickstart guides, and README must only mention installing `@oryn/ui`.

---

## 9. Next.js Dev Server & Bundler Stability

1. **`clean: false` in `tsup.config.ts`**:
   - `tsup.config.ts` must maintain `clean: false`. Enabling `clean: true` deletes `dist/` on every rebuild, which breaks file-handle watches in Next.js Turbopack and triggers an infinite recompilation loop (`Module not found: Can't resolve '@oryn/ui'`).
2. **Subpath `"default"` Export Fallback**:
   - Every subpath export in root `package.json` must include `"default": "./dist/<name>.mjs"`:
     ```json
     "./button": {
       "types": "./dist/button.d.mts",
       "import": "./dist/button.mjs",
       "default": "./dist/button.mjs"
     }
     ```
   - This prevents Node/Next.js SSR from throwing `ERR_PACKAGE_PATH_NOT_EXPORTED`.
3. **No Direct Symlinks to `src/` in Docs `tsconfig.json`**:
   - Do NOT alias `@oryn/ui` directly to `../src` in `docs/tsconfig.json`. React 19's typing for `cloneElement` conflicts with React 18 component definitions in `src/`. `docs` must consume the pre-bundled ESM/DTS in `dist/`.

---

## 10. NPM Release & 2FA Publishing Protocol

1. **Strict Version Bumping**:
   - Before publishing, always bump the `version` field in root `package.json` (e.g. `2.15.15` -> `2.15.16`). NPM rejects attempts to republish or overwrite existing versions (`npm error 409 Conflict`).
2. **Auth Token Security (`~/.npmrc`)**:
   - NPM CLI deliberately ignores authentication tokens (`_authToken`) in project-level `.npmrc` files for security reasons. Auth tokens must reside in the user's home directory (`~/.npmrc`).
3. **Interactive 2FA Web Authorization**:
   - When 2FA is active on the npm account, npm CLI 11 prompts with an authentication URL:
     `Authenticate your account at: https://www.npmjs.com/auth/cli/<uuid>`
   - The user authorizes the request in their logged-in browser, after which npm immediately completes the upload and outputs `+ @oryn/ui@<version>`.

---

## 11. Code Showcase & Real-World Example Standards

1. **No "Box-in-Box" Nested Wireframes**:
   - Never wrap component demos in multiple nested cards or dashed outline boxes (`border-2 border-dashed border-border`).
   - Use clean, seamless preview frames with subtle dot-grid canvases (`bg-zinc-50/80` in light mode, `#0c0d12` in dark mode).
2. **Segmented Preview / Code Toggle**:
   - All example cards must feature segmented toggle buttons (`[Eye Preview] [Code2 Code]`) and a 1-click copy button.
   - Code blocks must use Monaco-style styling with macOS traffic light chrome, line numbers, and clean token highlighting.
3. **Authentic Enterprise Patterns**:
   - Example cards must demonstrate realistic, production-tested enterprise flows (SSO authentication, Security preferences, Team member access, Billing portals), NOT toy examples with emojis.
