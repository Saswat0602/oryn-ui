# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.2.5] - 2026-11-13

### ♿ Radix-Grade Accessibility & WAI-ARIA Standards
- **Full 2D Grid & Composite Widget Keyboard Navigation**:
  - Implemented WAI-ARIA 2D grid roving keyboard navigation in `Calendar`, `DateRangePicker`, and `DatetimePicker` with arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`), `Home`, `End`, and `PageUp`/`PageDown`.
  - Implemented roving tabindex keyboard management loops in `Menubar`, `ContextMenu`, `Combobox`, `Command`, `Select`, `Tabs`, `RadioGroup`, and `Toggle`.
  - Added `role="combobox"`, `role="listbox"`, `role="option"`, and `aria-activedescendant` per WAI-ARIA 1.2 specifications.
  - Bound `aria-controls` on disclosure triggers pointing directly to panel IDs, and wrapped content in `role="region"` with `aria-labelledby` across `Accordion` and `Collapsible`.
- **WCAG 2.1 AA Contrast Compliance Across All Themes**:
  - Replaced filled Alert variant backgrounds with high-contrast pairs (`bg-emerald-700` and `bg-amber-700` > 5:1 contrast).
  - Adjusted `--muted-foreground` (`#64646b`, 5.34:1) and deepened `--destructive` (`#dc2626`, 4.83:1) for universal WCAG AA compliance across light, dark, and monochrome palettes.
  - 100% of 23 design-token and component color pairs pass WCAG AA and AAA thresholds.
- **Overlay Focus Trapping & Scrollbar Shift Compensation**:
  - Guarded `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, and `Modal` overlays with `useFocusTrap` to prevent Tab focus leaks.
  - Eliminated desktop body scroll jumps during overlay opening with dynamic scrollbar width padding compensation.
- **Vestibular Motion Safety (WCAG 2.3.3)**:
  - Guarded continuous spinning animations (`Spinner`, `Button`, `ToolCallCard`) with `motion-safe:animate-spin motion-reduce:animate-none`.

### 🛡️ TypeScript Safety & Polymorphism
- **Strict Typing Without Arbitrary Index Signatures**:
  - Removed unsafe `[key: string]: any` index signatures from `SliderProps`, `AccordionProps`, and `FormContextValue`.
  - Refactored all 13 typography components to `React.forwardRef` and extended standard HTML element attributes for DOM measurement and animation compatibility.
  - Standardized universal `icon?: React.ReactNode` props to ensure full cross-React 18 and React 19 compatibility.

---

### 🛡️ Decoupled `lucide-react` & Zero-Dependency Native SVGs
- **Complete Decoupling of Icons**:
  - Replaced all internal `lucide-react` imports across all 41 components with native, zero-dependency inline SVG primitives in `src/icons`.
  - Moved `lucide-react` from direct `dependencies` to `peerDependencies` (with `peerDependenciesMeta: { "lucide-react": { "optional": true } }`).
  - Consumers can use any icon library or version of Lucide without duplicate bundle sizes or TypeScript `LucideIcon` version mismatches.

### ⚡ Polymorphic `asChild` Delegation
- **Menu Item Slot Polymorphism**:
  - Added `asChild?: boolean` support with `Slot` delegation to `DropdownMenuItem`, `ContextMenuItem`, and `MenubarItem`.
  - Enables clean Next.js/React Router `<Link>` wrapping without invalid nested interactive element warnings.

### 🤖 AI Primitives Spotlight & Reorganized Taxonomy
- **AI & Agentic UI Spotlight**:
  - Created a dedicated top-level **AI & Agents** category featuring `PromptInput`, `MessageBubble`, `ReasoningDisclosure`, and `ToolCallCard`.
  - Relocated misplaced components: `Accordion` &rarr; `Layout`, `Breadcrumbs` &amp; `Tabs` &rarr; `Navigation`.
  - Clarified canonical primitives vs convenience wrappers (`Dialog` vs `Modal`, `Sonner` vs `Toast`, `Sheet` vs `Drawer`).

### 🏗️ Monorepo & Vercel Pipeline Hardening
- **Standardized Monorepo Workspace**:
  - Added `build-package` and `build:all` workspace scripts.
  - Hardened `vercel.json` with explicit `installCommand: "npm install"` and `buildCommand: "npm run build:all"`.
  - Dynamically bound docs version badges to `package.json` to eliminate version drift.
- **Tailwind v4 & Monorepo Safe Documentation**:
  - Documented precompiled CSS imports (`mad-ui-components/styles.css`), Tailwind v4 `@source` directives, and monorepo-safe `require.resolve` paths.
  - Documented HSL channel color tokens for Tailwind opacity modifier compatibility.

---

## [3.1.0] - 2026-11-02

### 🚀 New Components & AI Interface Suite
- **AI Interface Kit**:
  - `PromptInput`: Expandable AI chat input with auto-resize, submit shortcuts, and action buttons.
  - `MessageBubble`: Conversational bubble with role-based formatting (`user`, `assistant`, `system`).
  - `ReasoningDisclosure`: Expandable collapsible drawer for AI model thought processes and chains of reasoning.
  - `ToolCallCard`: Visual display card for function executions, tool invocations, inputs, and results.
- **Enterprise Form Pickers**:
  - `MultiSelect`: Searchable multi-selection dropdown with tag badges and keyboard navigation.
  - `DateRangePicker`: Calendar popover with start/end date selection and range presets.
  - `TimePicker`: Accessible standalone 12/24h time picker with scrollable hours/minutes columns.
  - `FileUpload`: Drag-and-drop file upload zone with file size validation and preview state.
- **Data & Navigation**:
  - `Stepper`: Multi-step progress workflow component with active, completed, and error states.
  - `StatCard`: KPI summary card with trend indicator, icons, and sparkline support.
  - `Timeline`: Chronological activity timeline with icon nodes and event cards.
  - `TreeView`: Recursive hierarchical tree with keyboard arrow navigation and branch expansion.

### 🎨 Authentic Monochrome (Shadcn Zinc) & Dual Theme Engine
- **Monochrome & Zinc Palette**:
  - Full migration of core controls, layout, navigation, and overlays to authentic shadcn zinc semantic tokens.
  - Dual style system: `monochrome` (black & white zinc aesthetic) and `normal` (vibrant blue primary accent) with seamless live switching via `ThemeProvider`.
- **Headless Utility Hooks**:
  - Added `useClipboard`, `useHotkeys`, and virtualizer windowing hooks under `mad-ui-components/hooks`.

### 🛠️ Ref Forwarding & Docs Stability
- Polished `React.forwardRef` across `Calendar`, `Label`, `Toast`, and core inputs.
- Enhanced `docs` build pipeline with automated stale artifact detection.

---

## [3.0.0] - 2026-10-30

### 🚀 Major Architectural Evolution: Native, Headless & Zero-Radix
- **100% Zero Third-Party UI Runtime Dependencies**:
  - Removed all `@radix-ui/*` dependencies (`@radix-ui/react-slot`, `@radix-ui/react-portal`, `@radix-ui/react-dialog`, etc.).
  - Replaced with our own lightweight, native headless primitives (`Slot`, `Portal`, `Presence`, `FocusTrap`) under `mad-ui-components/primitives`.
  - The entire library now has **0 external UI runtime overhead**, depending solely on standard utilities (`clsx`, `tailwind-merge`, and `lucide-react`).
- **Architecture-by-Layer Subpath Exports**:
  - `mad-ui-components/primitives`: Headless primitives (`Slot`, `Portal`, `Presence`, `FocusTrap`).
  - `mad-ui-components/hooks`: Custom headless hooks (`useControllableState`, `useId`, `useClickOutside`, `useVirtualizer`, etc.).
  - `mad-ui-components/theme`: Design tokens, HSL variable maps, and `ThemeProvider`.
- **Hardware-Accelerated Exit Animations**:
  - Integrated `Presence` primitive with exit transition lifecycles into `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, and `Modal`.
  - Added clean `data-state="open"|"closed"` driven animations (`animate-out`, `fade-out-0`, `zoom-out-95`, `slide-out-to-*`).

### 📝 Composable Form System (`form.tsx`)
- **Accessible, Context-Linked Form Architecture**:
  - Introduced `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormDescription>`, `<FormMessage>`, and `useFormField()`.
  - Automatic ARIA ID binding: `FormLabel[htmlFor]` automatically syncs with `FormControl[id]`.
  - Automatic `aria-describedby` wiring and automatic `aria-invalid` error state detection in `Input`, `Textarea`, `Checkbox`, `Select`, and `InputOTP`.
  - `FormMessage` auto-extracts error messages from context with accessible `role="alert"`.
  - **Dual Mode Support**: Works 100% standalone with zero dependencies, and seamlessly integrates with `react-hook-form` and schema validators (e.g. `zod`).
  - Backward compatibility: Preserved `mad-ui-components/forms/react-hook-form` as a seamless bridge.

### 📊 Advanced Semantic DataTable & Virtualizer
- **Semantic Table Markup**: Rebuilt `DataTable` on standard semantic HTML elements (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`).
- **Interactive Features**: Multi-column sorting, indeterminate "Select All" checkbox selection, real-time search filtering, and customizable pagination controls with page size selector.
- **Zero-Dependency Virtualizer (`useVirtualizer`)**:
  - High-performance windowing hook calculating dynamic slices for 60fps scrolling on datasets with thousands of rows without `@tanstack/react-virtual`.

### 🎨 Interactive Theme Builder (`/theme-builder`)
- Added dedicated top-navigation route at `/theme-builder` with live component sandbox canvas.
- 6 Curated Enterprise Color Presets: Zinc, Indigo, Emerald, Rose, Ocean, Violet.
- Custom border-radius sliders (`0px` to `Full`).
- 1-Click Code Exporter for CSS Variables (`:root` / `.dark`) and Tailwind CSS theme config.

### 📦 Smart CLI Component Adder (`npx mad-ui-components`)
- Completely upgraded CLI component distribution tool:
  - `npx mad-ui-components add <component>`: Automatically resolves internal dependencies (`primitives/`, `hooks/`, `lib/utils.ts`) and rewrites relative imports.
  - `npx mad-ui-components list`: Lists all 55 components grouped by domain.
  - Flags: `--all`, `--path <dir>`, `--dry-run`, `--overwrite`.

### 📚 Documentation & Parity Suite
- **100% Props Coverage**: Documented complete TypeScript prop specifications for all 55 components in `docs/src/lib/component-props.ts`.
- **Enterprise Templates**: Added production-grade Operations & Analytics Dashboard showcase pattern to Examples.
- **Automated Parity Suite (`tests/parity.test.ts`)**: 49 tests validating manifest-to-props parity, CLI source mappings, and zero third-party UI dependencies.

---

## [2.16.0] - 2026-10-28

### 🚀 Highlights & Breaking Fixes
- **Next.js App Router & Server Components Support**:
  - Injected `"use client";` banners into all 64 ESM distribution bundles (`dist/*.mjs`).
  - Fixed Rollup directive-stripping issue by using esbuild tree-shaking in `tsup.config.ts`.
- **Packaging & Subpath Exports**:
  - Added `./theme.css` and `./styles.css` subpath exports.
  - Automatically compile and optimize CSS (`dist/theme.css` and `dist/styles.css`) during `npm run build`.
  - Added dedicated subpath exports for `./alert` and `./layout-shell` to prevent file collision with the layout module.
  - Added root `./package.json` export.
- **Compound Component Exports**:
  - Exported all compound parts directly from package root (`src/index.ts` and `src/core.ts`):
    - `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `useDialog`
    - `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`, `useAlertDialog`
    - `HoverCardTrigger`, `HoverCardContent`
    - `CollapsibleTrigger`, `CollapsibleContent`
    - `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, etc.
    - `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
    - `RadioGroupItem`, `InputOTPGroup`, `InputOTPSlot`

### 🐛 Bug Fixes
- **Dialog & AlertDialog**:
  - Fixed trigger mounting: `children` are now always rendered, and only the modal overlay is conditional on `open`.
- **DateTimePicker**:
  - Fixed calendar days offset using `new Date(year, month, 0)`.
  - Fixed 12-hour option generation (`i + 1`).
- **InputOTP**:
  - Fixed state tracking with fixed-length array `Array.from({ length }, (_, i) => value[i] ?? "")`.
  - Fixed ref callback return type compatibility with React 19.
- **Calendar**:
  - Set day to 1 before month navigation to prevent skipping months on the 31st.
- **Navbar & Sidebar**:
  - Replaced un-scannable Tailwind template literal class names with explicit `primaryColorMap`.
  - Removed placeholder `console.log` handlers from profile menu actions.
  - Fixed `SidebarProps` to omit conflicting `onToggle` from `HTMLAttributes<HTMLDivElement>`.
- **Carousel**:
  - Supported nested `<CarouselContent>` wrapper.
  - Added initial `null` argument to `useRef` for React 19 compatibility.
  - Added `type="button"` to navigation buttons.
- **Chart**:
  - Fixed 40px bar overflow in `BarChart`.
  - Fixed division by zero when rendering empty chart datasets.
- **Toast**:
  - Reset `isExiting` state when reopening a controlled toast.
- **Theme**:
  - Replaced non-existent `zinc-850` with standard Tailwind `zinc-800`.

### 📚 Documentation
- Updated `docs/src/app/globals.css` with `@source` directive for `mad-ui-components` distribution files.
- Fixed code snippet generator to remove spaces in component import names (e.g. `import { InputOTP }` instead of `import { Input OTP }`).
- Replaced dead Dialog/AlertDialog previews with live interactive demos.
- Added comprehensive Theming & CSS Variables reference in Getting Started guide.
- Removed outdated CLI copy instructions and replaced raw emojis with clean Lucide vector icons.
