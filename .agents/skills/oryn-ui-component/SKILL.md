---
name: oryn-ui-component
description: >-
  Use this skill whenever creating, updating, refactoring, or documenting a UI
  component in the ORYN UI library. Covers the full 10-point integration checklist
  from implementation and tree-shakable exports to docs showcase and verification.
---

# ORYN UI Component Engineering Skill

This skill guides the end-to-end workflow for adding or updating components in **ORYN UI** (`oryn-ui`), ensuring compliance with monorepo exports, bundler architecture, React 18/19 cross-compatibility, and design system standards.

---

## 1. Architecture & Design Principles

Before writing code, verify:
- **Zero Third-Party UI Foundation**: 100% native React implementation. NEVER install or import `@radix-ui/*` packages.
- **Headless Primitives (`src/primitives/`)**: Base complex interactive components on ORYN UI native primitives (`Slot`, `Portal`, `FocusTrap`, `Presence`).
- **State & Lifecycle Hooks (`src/hooks/`)**: Leverage reusable hooks (`useControllableState`, `useClickOutside`, `useFocusTrap`, `useKeyboardNavigation`, `useRovingTabIndex`, `useId`, `useVirtualizer`).
- **Styling**: Always use the `cn(...)` utility from `src/lib/utils.ts` for Tailwind class composition.
- **Universal Icons**: Always type icon props as `icon?: any;` or `React.ReactNode` (never `React.ComponentType<{ size?: number }>`) to avoid React 19 `ReactNode` / `bigint` type incompatibility.
- **Accessibility**: Include standard ARIA attributes (`aria-label`, `aria-expanded`, `aria-describedby`, `role`) and keyboard navigation (`Enter`, `Space`, `Arrow` keys, `Escape`).
- **Aesthetics**: Follow the clean dark/light palette (`zinc-900`, `zinc-950`, `zinc-50`). No emojis in components or documentation—use Lucide icons (`lucide-react`).

---

## 2. The 10-Point Integration Workflow

For any new component `<name>` in category `<category>`:

### Step 1: Component Implementation
- Create `src/components/<category>/<name>.tsx`
- Ensure compound components are attached (e.g., `Card.Header = CardHeader` or exported as named compounds)
- Reference the template in [component-template.tsx](./examples/component-template.tsx)

### Step 2: Component Tests
- Add smoke and accessibility tests in `tests/smoke.test.tsx`:
  - Client rendering in `StrictMode`
  - SSR compatibility using `renderToString`
  - Accessibility check via `axe(container)`

### Step 3: Category Module Export
- Add export in `src/modules/<category>.ts`:
  ```ts
  export * from '../components/<category>/<name>'
  ```

### Step 4: Library Index Exports
- Export in `src/components/index.ts`
- Export in `src/index.ts`
- If core, also export in `src/core.ts`

### Step 5: Individual Entry for Tree-Shaking
- Create `src/individual/<name>.ts`:
  ```ts
  export * from '../components/<category>/<name>'
  ```

### Step 6: Manifest & CLI Registration
- Add component metadata to `src/component.manifest.ts` in `componentManifest`:
  ```ts
  {
    name: '<name>',
    title: '<Title>',
    category: '<category>',
    status: 'stable',
    subpath: './<name>',
    sourceFile: 'src/components/<category>/<name>.tsx',
    exports: ['<Name>', '<Name>Props'],
    description: '<Short description>.'
  }
  ```
- Register the CLI source path in `scripts/copy-component.js` under `componentMap`:
  ```js
  '<name>': 'src/components/<category>/<name>.tsx',
  ```

### Step 7: Subpath Export in `package.json`
- Add to `"exports"` map in root `package.json` with `"default"` fallback:
  ```json
  "./<name>": {
    "types": "./dist/<name>.d.mts",
    "import": "./dist/<name>.mjs",
    "default": "./dist/<name>.mjs"
  }
  ```

### Step 8: Bundler Entry in `tsup.config.ts`
- Add `'src/individual/<name>.ts'` under the appropriate entry array in `tsup.config.ts`.
- Ensure `clean: false` remains set in `tsup.config.ts`.

### Step 9: Documentation Showcase
- Register in `docs/src/lib/component-registry.ts`:
  - Set `category`, `title`, `description`, `version`, `status: 'stable'`, and minimal `tags` (max 3-4, no spam).
- Add prop definitions in `docs/src/lib/component-props.ts`.
- Add interactive preview in `docs/src/lib/examples/<category>.tsx` (using realistic enterprise patterns).
- Update `COMPONENTS_STATUS.md`.

### Step 10: Verification
- Run the full verification pipeline:
  ```bash
  npm run build
  npm run check:manifest
  npm run test
  cd docs && npm run build && npm run lint && cd ..
  ```

See [wiring-checklist.md](./references/wiring-checklist.md) for a quick copyable checklist.
