# ORYN UI Component Library — Roadmap

This roadmap outlines the multi-phase engineering evolution of **ORYN UI** (`oryn-ui`).

---

## 🎯 Current Status

- ✅ **Phase 0 — Stop the Bleeding** (COMPLETED)
  - All 64 ESM bundles injected with `"use client";` for Next.js App Router & RSC compatibility.
  - Subpath exports fixed (`./theme.css`, `./styles.css`, `./layout-shell`, `./alert`).
  - Compound components exported (`Dialog*`, `AlertDialog*`, `HoverCard*`, `Collapsible*`, `ContextMenu*`, `CardHeader`...).
  - P0 bugs resolved (Dialog mounting, Slider listener cleanup, Switch props ordering, DateTimePicker calculations, InputOTP state tracking, Calendar 31st month transition, Carousel wrappers, Chart bar overflow & division-by-zero, Toast exiting state).
  - TypeScript errors in library reduced to 0 (`tsc --noEmit` clean).
  - Docs preview styling fixed with Tailwind v4 `@source` and live interactive demos.
  - Full CI workflow added, MIT LICENSE added, CHANGELOG for 2.16.0 generated, stale scripts removed.

---

## 🏗️ Phase 1: Foundation Infrastructure (IN PROGRESS)

**Goal:** Establish testing, token design system, and multi-environment packaging verification.

1. **Packaging & Packaging Linter**:
   - `publint` and `@arethetypeswrong/cli` verification.
   - Dual ESM + CJS bundle output option with sourcemaps.
   - Central component manifest to synchronize entry points, exports map, and docs registry.
2. **Testing Infrastructure**:
   - Vitest + React Testing Library + axe-core accessibility auditing.
   - Smoke tests and SSR tests (`renderToString`) for all components.
   - StrictMode verification to detect side-effects and cleanup bugs.
3. **Design Token System**:
   - Ship token CSS variables for status (`success`, `warning`, `info`), charts (`chart-1`..`chart-5`), sidebar, and z-indexes.
   - Standardize on neutral palette (`zinc`) and eliminate hardcoded color classes.
4. **Community & Contribution Standards**:
   - `.nvmrc` and `.editorconfig` (pinned Node 20).
   - `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`.

---

## 🧩 Phase 2: Primitives and API Rewrite

**Goal:** Upgrade every interactive primitive with robust accessibility and headless foundation.

1. **Headless Primitive Layer**:
   - Adopt robust headless primitives for complex interactive components (`Dialog`, `Popover`, `Select`, `Tabs`, `DropdownMenu`).
   - Shared internal utilities: `Slot`, `useControllableState`, `composeEventHandlers`, `Presence`.
2. **Rebuild Priority Queue**:
   - Group 1: Dialog, AlertDialog, Sheet, Drawer
   - Group 2: Popover, Tooltip, HoverCard
   - Group 3: DropdownMenu, ContextMenu, Menubar
   - Group 4: Select, Combobox, Command
   - Group 5: Tabs, Accordion, Collapsible
   - Group 6: Checkbox, Switch, RadioGroup, Slider, Toggle
3. **Motion & Accessibility**:
   - Cohesive animation system with `prefers-reduced-motion` compliance.
   - Full keyboard navigation and ARIA 1.2 compliance.

---

## 🚀 Phase 3: Advanced Components & Forms

**Goal:** Enterprise data handling and form validation.

1. **Forms & Validation**:
   - Composable `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` with `react-hook-form` and `zod`.
2. **Data Presentation**:
   - Virtualized `DataTable` with sorting, filtering, and row selection.
   - Accessible SVG charts with tooltips and responsive legends.

---

## 📖 Phase 4: Showcase & Developer Experience

1. Interactive theme builder & CSS token exporter.
2. Code copy tabs with CLI installer (`npx oryn-ui add <component>`).
3. Complete props API tables and keyboard shortcuts reference for every component.
