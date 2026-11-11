# 🚀 Mad UI — Engineering Work Progress Tracker

> **Current Version**: `3.0.0`  
> **Repository**: [oryn-ui](https://github.com/Saswat0602/oryn-ui) (`oryn-ui`)  
> **Last Updated**: October 2026  
> **Status**: **Phase 0 (100% Completed)** · **Phase 1 (100% Completed)** · **Phase 2 (100% Completed)** · **Phase 3 (100% Completed)** · **Phase 4 (100% Completed)** · **Phase 5 (100% Completed)**  

---

## 📊 Phase Overview & Status| Phase | Title | Target Scope | Status | Completion |
| :--- | :--- | :--- | :---: | :---: |
| **Phase 0** | **Stop the Bleeding** | P0 bug fixes, `"use client"`, packaging exports, docs preview, hygiene | 🟢 **COMPLETED** | **100%** |
| **Phase 1** | **Foundation Infrastructure** | Vitest testing, axe a11y, Changesets, tokens, manifest, root ESLint, CI, zinc migration | 🟢 **COMPLETED** | **100%** |
| **Phase 2** | **Primitives & Headless Rewrite** | Standalone headless primitives, unified motion system, keyboard a11y maps | 🟢 **COMPLETED** | **100%** |
| **Phase 3** | **Advanced Components & Forms** | Composable form system (zod + react-hook-form compatible), advanced virtualized DataTable | 🟢 **COMPLETED** | **100%** |
| **Phase 4** | **Showcase Platform & DX** | Interactive theme builder, CLI component adder, props documentation | 🟢 **COMPLETED** | **100%** |
| **Phase 5** | **Release & Community** | NPM 3.0 release, migration guides, automated release provenance | 🟢 **COMPLETED** | **100%** |
| **Phase 6A** | **Essential Micro-Components** | Kbd, Spinner, PasswordInput, NumberInput, ButtonGroup, InputGroup, EmptyState | 🟢 **COMPLETED** | **100%** |
| **Phase 6B** | **Advanced Inputs & Navigation** | MultiSelect, DateRangePicker, TimePicker, Stepper, FileUpload | 🟢 **COMPLETED** | **100%** |
| **Phase 6C** | **Display, Feedback & Custom Hooks** | StatCard, Timeline, Banner, TreeView, hooks (useClipboard, useHotkeys...) | 🟢 **COMPLETED** | **100%** |
| **Phase 6D** | **AI Interface Kit & Docs Showcase** | PromptInput, MessageBubble, ReasoningDisclosure, ToolCallCard, /docs/hooks | 🟢 **COMPLETED** | **100%** |

---

## 🟢 Phase 0 — Stop the Bleeding (Week 1) — [COMPLETED]

**Goal**: Ensure nothing documented or exported is broken. Bring the library to a clean, stable state with 0 TypeScript errors, working Next.js App Router support, working docs previews, and clean repository hygiene.

- [x] **Next.js App Router & Server Components**:
  - Injected `"use client";` banners into all 64 distribution bundles (`dist/*.mjs`).
  - Switched from Rollup directive-stripping to esbuild tree-shaking in `tsup.config.ts`.
- [x] **Packaging & Subpath Exports**:
  - Added `./theme.css`, `./styles.css`, `./layout-shell`, `./alert`, and root `./package.json` to `package.json#exports`.
  - Re-exported all compound component parts (`Dialog*`, `AlertDialog*`, `HoverCard*`, `Collapsible*`, `ContextMenu*`, `CardHeader`...).
  - Deleted broken barrel `src/components/index.ts`.
- [x] **P0 Component Bug Fixes**:
  - `Dialog` & `AlertDialog`: Always mount children so `DialogTrigger` works.
  - `Slider`: Cleaned up mouse/touch event listeners on unmount; removed drag state leaks.
  - `Switch`: Preserved consumer `onChange` handler composition.
  - `DateTimePicker`: Fixed month offset calculation and 12-hour option generation.
  - `InputOTP`: Fixed state indexing with fixed-length array tracking.
  - `Calendar`: Fixed 31st-day month navigation skip.
  - `Carousel`: Supported nested `<CarouselContent>` wrapper structure.
  - `Chart`: Fixed 40px bar overflow and division-by-zero on empty datasets.
  - `Toast`: Reset exiting state on reopen; eliminated DOM attribute leaks.
  - Replaced non-existent `zinc-850` with standard `zinc-800`.
- [x] **Documentation Site Previews**:
  - Configured `@source` for Tailwind v4 in `docs/src/app/globals.css`.
  - Fixed multi-word component import generation (`import { InputOTP }`).
  - Added live interactive demos for Dialog, AlertDialog, and Calendar.
  - Removed outdated CLI instructions, false claims ("analytics", "drag-and-drop"), and raw emojis.
- [x] **Repository Hygiene**:
  - Added MIT `LICENSE` matching `package.json`.
  - Added `CHANGELOG.md` with full notes for version 2.16.0.
  - Secured auth tokens into `~/.npmrc` (removed from project root).
  - Deleted stale scripts (`fix-imports.sh`, `update-exports.sh`, `COMPLETE_GUIDE.md`, `QUICK_REFERENCE.md`, `extra/`).

---

## 🟢 Phase 1 — Foundation Infrastructure (Weeks 2–4) — [COMPLETED]

**Goal**: Establish the testing, token design system, neutral scale standardization, and multi-environment packaging verification that makes every future change safe.

### Completed Milestones
- [x] **Automated Testing Suite (Vitest)**:
  - Configured `vitest.config.mts` with `jsdom` environment and setup cleanup in `tests/setup.ts`.
  - Wrote 21 unit, smoke, and SSR tests in `tests/smoke.test.tsx` running under `<React.StrictMode>`.
- [x] **Automated Accessibility Testing (`axe-core`)**:
  - Configured `vitest-axe` with matchers and automated a11y tests for component primitives.
- [x] **Behavior Test Checklist**:
  - Authored standard 9-point verification template in `tests/BEHAVIOR_CHECKLIST.md`.
- [x] **Component Manifest & Verification**:
  - Created single source of truth `src/component.manifest.ts` registering all 55 components.
  - Created `scripts/verify-manifest.js` (`npm run check:manifest`) validating source files and exports map.
- [x] **Packaging Linter (`publint`)**:
  - Integrated `publint` into `npm run check:pkg` and CI (validating all 64 subpaths with 0 errors).
- [x] **Root ESLint Configuration**:
  - Configured `eslint.config.mjs` with `typescript-eslint`; `npm run lint` exits with 0 errors.
- [x] **Changesets Setup**:
  - Initialized `.changeset/config.json` and added scripts (`npm run changeset`, `npm run version-packages`).
- [x] **Extended Design Tokens**:
  - Expanded `src/styles.css` with semantic tokens for status (`success`, `warning`, `info`), charts (`chart-1`–`5`), sidebar variables, radius scale, and z-indexes.
  - Quoted path escaping in `scripts/build-css.js` for space-safe Tailwind CLI compilation (65.64 KB).
- [x] **Opt-in Base Styles**:
  - Scoped global body restyling in `src/styles.css` to `.oryn-ui-base, body[data-oryn-ui-theme]`.
- [x] **Neutral Scale (`zinc`) Standardization & Palette Migration**:
  - Standardized all 55 components on the `zinc` neutral palette.
  - Completely eliminated inconsistent `gray-` and `slate-` color classes in `accordion.tsx`, `typography.tsx`, `tabs.tsx`, `slider.tsx`, `layout.tsx`, `navbar.tsx`, `sidebar.tsx`, `calendar.tsx`, and `datetime-picker.tsx`.
  - Replaced remaining raw emojis with clean Lucide icons (`CalendarIcon`).
- [x] **Monorepo Workspace Configuration**:
  - Added `"workspaces": ["docs"]` to root `package.json` for native monorepo workspace resolution.
- [x] **Community Files**:
  - Added `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `.nvmrc` (Node 20), `.editorconfig`.
- [x] **CI Pipeline**:
  - Configured `.github/workflows/ci.yml` running `typecheck`, `build`, `test`, `check:pkg`, `check:manifest`, and `docs` build/lint across Node 18 & 20.

---

## 🟢 Phase 2 — Primitives & Headless Rewrite (Weeks 4–10) — [COMPLETED]

**Goal**: Build 100% pure standalone, native React interactive primitives with zero external UI dependencies (0 `@radix-ui/*` packages). Every interactive component provides full WAI-ARIA roles, roving focus, portal mounting, focus trapping, Pointer Events, and smooth animations without breaking backwards compatibility.

### Completed Milestones
- [x] **Zero Third-Party UI Foundation (100% Pure Standalone Mad UI)**:
  - Completely uninstalled all 24 `@radix-ui/*` packages from root `package.json`.
  - Created native `src/lib/slot.tsx` implementing `Slot` and `Slottable` for `asChild` support.
  - Created native `src/lib/use-controllable-state.ts` for dual controlled/uncontrolled state management.
  - Created native `src/lib/use-click-outside.ts` for click-outside backdrop dismissal.
  - Native `Portal` (`src/lib/portal.tsx`), focus trapping (`src/lib/focus.ts`), keyboard navigation (`src/lib/keyboard.ts`), and event chaining (`src/lib/compose-event-handlers.ts`).
- [x] **Group 1 — Modal & Overlay Layer**:
  - `Dialog`: Native portal mounting, focus trap, body scroll lock, backdrop blur, and Escape dismiss.
  - `AlertDialog`: Destructive confirmation overlay with explicit action/cancel triggers and focus management.
  - `Sheet`: Multi-directional slide-out drawer (`top`, `bottom`, `left`, `right`) with smooth animations.
  - `Drawer` & `Modal`: Standalone accessible overlays with customizable dimensions and header/footer slots.
- [x] **Group 2 — Floating Primitives**:
  - `Popover`: Standalone floating panel anchored to trigger bounding rect supporting both compound and convenience `trigger` prop.
  - `Tooltip`: Standalone hover/focus tooltip with `TooltipProvider` and delay configuration.
  - `HoverCard`: Standalone preview card with hover intent delays.
- [x] **Group 3 — Menu Primitives**:
  - `DropdownMenu`: Native menu with submenus, checkboxes, radios, shortcuts, and click-outside dismissal.
  - `ContextMenu`: Desktop right-click context menu positioning dynamically at pointer coordinates.
  - `Menubar`: Horizontal application menubar with active menu hover switching.
- [x] **Group 4 — Selection & Command**:
  - `Select`: Native listbox with `role="listbox"`, item selection, trigger value display, and check indicators.
  - `Combobox`: Searchable filter input with native popover dropdown.
  - `Command`: Fast command palette with `CommandDialog` and `CommandShortcut`.
- [x] **Group 5 — Navigation & Disclosure**:
  - `Tabs`: Native tablist with roving keyboard navigation and dual compound + `items` API.
  - `Accordion`: Native animated collapsible panels with single/multiple modes and dual compound + `items` API.
  - `Collapsible`: Standalone collapsible section with smooth grid transitions.
  - `NavigationMenu`: Full native context architecture supporting sibling `NavigationMenuTrigger` & `NavigationMenuContent` in `NavigationMenuItem`, hover intent delays, keyboard navigation, and `asChild` support.
- [x] **Group 6 — Form Controls**:
  - `Checkbox`: Accessible `role="checkbox"` with checked/unchecked/indeterminate states and label association.
  - `Switch`: Accessible `role="switch"` with sliding thumb animation and synthetic event support.
  - `RadioGroup`: Accessible `role="radiogroup"` with keyboard arrow selection and label click targeting.
  - `Slider`: Pure Pointer Events slider with multi-thumb range support, touch capture, and zero listener leaks.
  - `Toggle` & `ToggleGroup`: Single and multi-selection toggle buttons.
- [x] **Group 7 — Layout & Media Primitives**:
  - `ScrollArea`: Native scrollable container with customized scrollbar styling.
  - `Separator`: Accessible separator with orientation and decorative modes.
  - `Avatar`: Standalone avatar with image error detection and fallback initials.
  - `AspectRatio`: Ratio-preserving container with `forwardRef`.
- [x] **Animated Unmounting Transitions (`Presence`)**:
  - Integrated `Presence` primitive with exit transition delays into `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, and `Modal`.
  - Added `data-state="open"|"closed"` driven GPU-accelerated CSS exit animations (`animate-out`, `fade-out-0`, `zoom-out-95`, `slide-out-to-*`).
- [x] **Automated Testing & Accessibility Expansion**:
  - Expanded test suite to 41 comprehensive tests in `tests/smoke.test.tsx` (StrictMode, SSR renderToString, axe-core audits, and Standalone Headless Primitives & Hooks suite).
  - Next.js 16.4.3 documentation build verified across all 64 static routes with 0 errors.
  - Package manifest and `publint` audits verified.

---

## 🟢 Phase 3 — Advanced Components & Forms (Weeks 10–16) — [COMPLETED]

**Goal**: Deliver an accessible context-driven Composable Form System (supporting both native standalone React and `react-hook-form` + `zod` schemas) and an advanced interactive `DataTable` (semantic table foundation, multi-column sorting, search filtering, row selection, pagination, and high-performance virtualization).

### Completed Milestones
- [x] **Composable Form System (`src/components/forms/form.tsx`)**:
  - Implemented `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, and `useFormField()`.
  - Automatic accessibility linking: `FormLabel[htmlFor]` automatically matches `FormControl[id]`.
  - Automatic ARIA descriptors: `FormControl` receives `aria-describedby` referencing both description and error IDs, plus `aria-invalid={true}` on error.
  - Error announcements: `FormMessage` renders with `role="alert"` and auto-extracts error strings from context.
  - Dual Mode compatibility: Works completely zero-dependency standalone, and seamlessly integrates with `react-hook-form` `control` and `zod` resolvers.
  - Backward compatibility: `src/components/forms/react-hook-form.tsx` re-exports all modern form components.
- [x] **Zero-Dependency Virtual Scroll Hook (`src/hooks/use-virtualizer.ts`)**:
  - Authored lightweight virtual scrolling calculation hook for 60fps rendering of thousands of records without external dependencies.
- [x] **Advanced Semantic DataTable (`src/components/data/data-table.tsx`)**:
  - Built on semantic `Table`, `TableHeader`, `TableBody`, `TableHead`, `TableRow`, `TableCell` components.
  - Checkbox multi-selection with indeterminate "Select All" header state, selected row counter, and customizable bulk action triggers.
  - Multi-column sorting with interactive direction indicators (`ArrowUp`, `ArrowDown`, `ArrowUpDown`).
  - Global text search across columns with real-time filtering.
  - Flexible pagination controls with page size selector (`10`, `20`, `50`, `100`), jump buttons, and range indicators.
  - Integrated `virtualized?: boolean` mode using `useVirtualizer`.
  - Polished loading skeleton rows and minimal empty-state graphics.
- [x] **Agent Skills Updates & Authoring (`.agents/skills/`)**:
  - Updated `oryn-ui-component/SKILL.md`: Purged obsolete `@radix-ui/*` references and established the **Architecture-by-Layer** pattern.
  - Authored new `oryn-ui-forms/SKILL.md`: Comprehensive guide for composable forms, dual-mode usage, ARIA ID wiring, and custom input controls.
- [x] **Documentation Showcases (`docs/src/lib/examples/`)**:
  - Upgraded `forms.tsx` with an interactive Profile Settings Form featuring real-time validation and helper descriptions.
  - Upgraded `data.tsx` with a live enterprise Team Members DataTable featuring search, sorting, checkbox row selection, status badges, and pagination.

---

## 🟢 Phase 4 — Showcase Platform & DX — [COMPLETED]

**Goal**: Deliver an interactive theme customizer, full props documentation across all 55 components, an intelligent CLI component adder for local source ownership, and authentic enterprise showcase patterns.

### Completed Milestones
- [x] **Interactive Theme Builder (`docs/src/app/theme-builder/page.tsx`)**:
  - Dedicated route with real-time component sandbox canvas.
  - 6 Curated Enterprise Color Presets: Zinc, Indigo, Emerald, Rose, Ocean, Violet.
  - Custom border-radius sliders (`0px` to `Full`).
  - 1-Click Code Exporter for `:root` / `.dark` CSS custom properties and Tailwind CSS theme configs.
- [x] **100% Comprehensive Component Props Tables (`docs/src/lib/component-props.ts`)**:
  - Documented complete TypeScript prop specifications for all 55 components in the manifest.
  - Normalized kebab-case and unhyphenated registry slugs for seamless navigation.
- [x] **Smart CLI Component Adder (`scripts/copy-component.js`)**:
  - `npx oryn-ui add <component>`: Automatically resolves internal dependencies (`primitives/`, `hooks/`, `lib/utils.ts`) and rewrites relative imports.
  - `npx oryn-ui list`: Lists all 55 components grouped by domain.
  - Flags: `--all`, `--path <dir>`, `--dry-run`, `--overwrite`.
- [x] **Real-World Application Patterns (`docs/src/app/docs/examples/page.tsx`)**:
  - Added enterprise Operations & Analytics Dashboard showcase pattern combining metrics cards with the semantic `DataTable`.
- [x] **Automated Parity & Dependency Suite (`tests/parity.test.ts`)**:
  - Verified manifest-to-props parity, CLI source paths, CLI dry-run execution, and zero third-party UI dependencies.

---

## 🟢 Phase 5 — Release & Community (v3.0.0) — [COMPLETED]

**Goal**: Execute the official v3.0.0 production release with clean semver bumping, comprehensive changelog, consumer migration guides, repository alignment, and pre-publish verification.

### Completed Milestones
- [x] **Major Version Bump (`v3.0.0`)**: Bumped root `package.json` and `docs/package.json` to `3.0.0`.
- [x] **Comprehensive Changelog (`CHANGELOG.md`)**: Detailed all major architectural evolutions across Phases 2, 3, and 4.
- [x] **Migration Guide (`MIGRATION_V2_TO_V3.md`)**: Full upgrade documentation for consumers migrating from 2.x to 3.0.0.
- [x] **Ecosystem Parity**: Updated `README.md`, aligned all 55 components to `version: '3.0.0'` in `component-registry.ts`, and updated `COMPONENTS_STATUS.md`.
- [x] **Pre-Publish Gate Verification**: Ran `npm run prepublishOnly` and Next.js Turbopack docs build.

---

## 🟢 Phase 6A — Essential Micro-Components & Core Inputs — [COMPLETED]

**Goal**: Deliver essential micro-components and form inputs requested in the roadmap (`Kbd`, `Spinner`, `PasswordInput`, `NumberInput`, `ButtonGroup`, `InputGroup`, `EmptyState`) adhering to the 10-point integration checklist, 0 third-party UI dependencies, and strict accessibility.

### Completed Milestones
- [x] **`Kbd` (`src/components/media/kbd.tsx`)**:
  - Semantic `<kbd>` component with automatic cross-platform key symbol formatting (Mac `⌘`, `⌥`, `⇧` vs Windows `Ctrl`, `Alt`, `Shift`).
  - Variants: `default`, `outline`, `subtle`.
- [x] **`Spinner` (`src/components/feedback/spinner.tsx`)**:
  - Indeterminate SVG spinner with `role="status"` and accessible screen reader announcement.
  - Configurable sizes (`xs`–`xl`) and semantic color tokens.
- [x] **`PasswordInput` (`src/components/forms/password-input.tsx`)**:
  - Secure password field with reveal eye toggle, caps-lock detection, and optional 4-tier strength score meter.
- [x] **`NumberInput` (`src/components/forms/number-input.tsx`)**:
  - Numeric stepper input with auto-repeat on hold, arrow key incrementing, min/max clamp, and `role="spinbutton"`.
- [x] **`ButtonGroup` (`src/components/core/button-group.tsx`)**:
  - Visual button container with border collapsing, focus ring elevation, and horizontal/vertical layout.
- [x] **`InputGroup` (`src/components/core/input-group.tsx`)**:
  - Composite input wrapper with prefix/suffix text and icon addons.
- [x] **`EmptyState` (`src/components/feedback/empty-state.tsx`)**:
  - Minimal zero-data graphic container with title, description, and action button slots.
- [x] **Verification & Documentation Parity**:
  - All 7 components registered in `component.manifest.ts` (now 62 components).
  - Subpath exports added to `package.json#exports` and `tsup.config.ts`.
  - Props tables documented in `docs/src/lib/component-props.ts`.
  - Interactive demos added in `docs/src/lib/examples/`.
  - Tests expanded to 55 / 55 passing with 0 axe-core violations.

---

## 🟢 Phase 6B — Advanced Inputs & Workflow Navigation — [COMPLETED]

**Goal**: Implement the 5 missing enterprise-grade form controls and sequential workflow navigation components without any third-party UI dependencies.

- [x] **`MultiSelect` (`src/components/forms/multi-select.tsx`)**:
  - Searchable multi-tag selector with keyboard tags, pill removal, clear button, max badges, and ARIA combobox/listbox integration.
- [x] **`DateRangePicker` (`src/components/forms/date-range-picker.tsx`)**:
  - Calendar date range picker with fast preset shortcuts (Today, Yesterday, Last 7/30 days, Month to date), dual month view, and min/max constraints.
- [x] **`TimePicker` (`src/components/forms/time-picker.tsx`)**:
  - Segmented time selector supporting 12-hour AM/PM and 24-hour formats with minute step controls and spinbutton accessibility.
- [x] **`FileUpload` (`src/components/forms/file-upload.tsx`)**:
  - Drag-and-drop file upload dropzone with preview cards, size validation, formatBytes utility, and file removal triggers.
- [x] **`Stepper` (`src/components/navigation/stepper.tsx`)**:
  - Multi-step workflow wizard indicator supporting horizontal and vertical orientations with active/completed step state tracking.
- [x] **Verification & Documentation Parity**:
  - All 5 components registered in `component.manifest.ts` (now 67 components).
  - CLI distributor updated in `scripts/copy-component.js` with aliases.
  - Subpath exports added to `package.json#exports` and `tsup.config.ts`.
  - Props tables documented in `docs/src/lib/component-props.ts`.
  - Interactive live demos added in `docs/src/lib/examples/forms.tsx` and `navigation.tsx`.
  - Unit tests and accessibility audits passing with 0 axe violations (60/60 tests).
  - Next.js 16.4.3 docs build generating 77/77 static pages.

---

## 🟢 Phase 6C — Display, Feedback & Custom Utility Hooks — [COMPLETED]

**Goal**: Deliver 4 rich data/feedback components and 4 essential headless utility hooks with full TypeScript declarations, SSR safety, and documentation parity.

- [x] **`StatCard` (`src/components/data/stat-card.tsx`)**:
  - Metric display card with percentage change trend indicators, direction pills (up/down/neutral), icon slots, and description captions.
- [x] **`Timeline` (`src/components/data/timeline.tsx`)**:
  - Vertical chronological activity tracker with status nodes (`completed`, `current`, `upcoming`, `error`), timestamps, and connecting line tracks.
- [x] **`Banner` (`src/components/feedback/banner.tsx`)**:
  - Full-width announcement banner supporting semantic variants (`info`, `success`, `warning`, `destructive`), action buttons, dismiss triggers, and localStorage dismissal persistence.
- [x] **`TreeView` (`src/components/data/tree-view.tsx`)**:
  - Hierarchical folder/file tree viewer with branch collapse/expand, keyboard arrow roving navigation, and custom node selection.
- [x] **4 Headless Utility Hooks (`src/hooks/`)**:
  - `useClipboard`: One-click copy with timeout feedback and legacy fallback.
  - `useHotkeys`: Multi-key combination shortcut listener (`mod+k`, `ctrl+shift+p`).
  - `useDebounce` & `useDebouncedCallback`: Value and callback rate-limiter.
  - `useLocalStorage`: SSR-safe state synchronized across browser tabs.
- [x] **Verification & Documentation Parity**:
  - All 4 components registered in `component.manifest.ts` (now 71 components).
  - CLI distributor updated in `scripts/copy-component.js` with aliases (`statcard`, `treeview`).
  - Subpath exports added to `package.json#exports` and `tsup.config.ts`.
  - Props tables documented in `docs/src/lib/component-props.ts`.
  - Interactive live demos added in `docs/src/lib/examples/data.tsx` and `feedback.tsx`.
  - Unit tests and accessibility audits passing with 0 axe violations (65/65 tests).
  - Next.js 16.4.3 docs build generating 81/81 static pages.

---

## 🟢 Phase 6D — AI Interface Kit & Complete Documentation Showcase — [COMPLETED]

**Goal**: Deliver the specialized AI Interface Kit (PromptInput, MessageBubble, ReasoningDisclosure, ToolCallCard) and ensure 100% of the library's 75 components, 10 custom hooks, and architectural features are comprehensively showcased in the Next.js documentation application.

- [x] **`PromptInput` (`src/components/forms/prompt-input.tsx`)**:
  - Auto-expanding multiline prompt input with send/stop action buttons, streaming indicators, start/end action slots, token counters, and Enter submission.
- [x] **`MessageBubble` (`src/components/feedback/message-bubble.tsx`)**:
  - Chat message bubble for user and AI agent responses with formatted content, avatars, timestamps, and 1-click copy action.
- [x] **`ReasoningDisclosure` (`src/components/feedback/reasoning-disclosure.tsx`)**:
  - Collapsible chain-of-thought card showing AI model thinking steps, duration badge, and streaming animation.
- [x] **`ToolCallCard` (`src/components/feedback/tool-call-card.tsx`)**:
  - Structured card displaying AI agent tool invocations, arguments, runtime duration, execution status badges (`pending`, `executing`, `completed`, `failed`), and expandable result payloads.
- [x] **Comprehensive Documentation Showcase & Parity**:
  - All 75 components registered in `component.manifest.ts` and `docs/src/lib/component-registry.ts`.
  - Canonical kebab-case slug resolution and aliases across registry, examples, and subpath exports.
  - Interactive live demos authored for all 75 components in `docs/src/lib/examples/`.
  - Props tables documented for all 75 components in `docs/src/lib/component-props.ts`.
  - Dedicated Headless Hooks documentation page created at `docs/src/app/docs/hooks/page.tsx` with live interactive playgrounds for `useClipboard`, `useHotkeys`, `useDebounce`, and `useLocalStorage`.
  - Autonomous AI Agent pattern added to `docs/src/app/docs/examples/page.tsx` demonstrating real-world conversational workflows.
  - Docs sidebar updated with Headless Hooks link and updated counts.
  - Landing page, hero badge, and overview statistics updated to reflect 75+ production components and version 3.0.0.
  - Unit tests, SSR renderToString tests, and axe-core accessibility checks expanded to 69/69 passing tests.
  - Next.js 16.4.3 Turbopack build generating 86/86 static pages with 0 errors.

---

## 🧪 Verification Matrix

| Check / Tool | Target | Status | Result |
| :--- | :--- | :---: | :--- |
| **TypeScript Typecheck** | `tsc --noEmit` | ✅ Passing | 0 errors |
| **Unit & Parity Tests** | `vitest run` (`parity.test.ts` & `smoke.test.tsx`) | ✅ Passing | 69 / 69 tests passing |
| **Accessibility Audits** | `vitest-axe` (`axe-core`) | ✅ Passing | 0 violations |
| **Package Linter** | `publint` (`npm run check:pkg`) | ✅ Passing | 84 / 84 subpaths valid |
| **Manifest Audit** | `node scripts/verify-manifest.js` | ✅ Passing | 75 / 75 components verified |
| **Root Linter** | `eslint src tests` | ✅ Passing | 0 errors |
| **Core Build** | `tsup && node scripts/build-css.js` | ✅ Passing | 87 bundles + 75.54 KB CSS |
| **Documentation Build** | `next build` (Next.js 16.4.3 Turbopack) | ✅ Passing | 86 / 86 static pages generated |
| **Documentation Linter** | `npm --prefix docs run lint` | ✅ Passing | 0 errors, 0 warnings |


---

## 📜 Git Commit History for this Upgrade

```
9bd4759 feat(phase-1): add component manifest, Changesets, axe-core testing, and behavior checklist
695b8c7 docs(audit): include comprehensive library audit, benchmarks, and architectural roadmap
03a92ae chore(lint): configure root ESLint with typescript-eslint, add publint packaging check, and resolve code style issues
0341b37 feat(test): set up Vitest test suite, expand design tokens, and fix path escaping in CSS build
e975363 docs(community): add CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, and update roadmap
5af43a4 chore(infra): add CI workflow, MIT license, CHANGELOG for 2.16.0, and clean stale files
50c3f14 docs: resolve false claims, fix demo interactivity, and add theming guide
1c0259e fix(core): resolve P0 component bugs, add use client banners, and fix packaging exports
```
