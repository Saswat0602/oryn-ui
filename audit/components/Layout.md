# Layout — Audit Report

## Score: 7.5 / 10 — Functional layout shell with landmark and responsiveness gaps

---

## What's Good
- Clean orchestrator component coordinating `<Navbar>`, `<Sidebar>`, and `<main>` content areas.
- Uses semantic `<main>` tag for primary content container.
- Smooth transition states (`transition-all duration-300 ease-in-out`) when sidebar collapses or expands.
- Flexible styling options: `contentPadding`, `contentMaxWidth`, `fullHeight`, and fixed positioning flags.
- Dual controlled/uncontrolled state for sidebar collapse (`sidebarCollapsed` + `onSidebarCollapsedChange`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| LAY-01 | Major | A11y | layout.tsx:78 | Missing Skip to Content link before navbar/sidebar | Keyboard and screen reader users must tab through dozens of navigation links before reaching main page content (WCAG 2.4.1 Bypass Blocks) | Add an accessible `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>` |
| LAY-02 | Major | Layout | layout.tsx:125–129 | Fixed inline offset calculation (`marginLeft: sidebarOffset`, `width: calc(100% - sidebarOffset)`) ignores `overlaySidebar` prop | On mobile or overlay mode, content is squished or misplaced rather than floating underneath | Conditionally set `marginLeft` to 0 when `overlaySidebar` or mobile mode is active |
| LAY-03 | Minor | Performance | layout.tsx:57–64 | Window `resize` event listener fires continuously without debounce or `matchMedia` | Triggers excessive re-renders during window resizing | Replace window resize listener with `window.matchMedia(`(max-width: ${mobileBreakpoint}px)`)` listener |
| LAY-04 | Minor | A11y | layout.tsx:118 | `<main>` lacks an `id="main-content"` target | Skip links and deep-links cannot target the main content area | Add `id="main-content"` or configurable `mainId` prop to `<main>` |
| LAY-05 | Nit | Tokens | layout.tsx:96, 112 | Inline hardcoded z-index values (`zIndex: 60`, `zIndex: 50`) | Violates token layer consistency | Standardize on Tailwind z-index token classes (`z-50`, `z-40`) |

---

## State / Variant Matrix

| State / Prop | Navbar Fixed | Sidebar Fixed | Mobile View | Overlay Mode | Skip Link |
|--------------|--------------|---------------|-------------|--------------|-----------|
| Default | ✅ Fixed | ✅ Fixed | ⚠️ Resize lag | ❌ Broken margin | ❌ Missing |
| Static navbar | ✅ Correct offset | ✅ | ⚠️ | ❌ | ❌ |
| Collapsed sidebar | ✅ | ✅ Width updates | ⚠️ | ❌ | ❌ |
| Custom padding/max-w | ✅ | ✅ | ✅ | ❌ | ❌ |

---

## Missing Tests / Docs
- Unit test: Renders navbar, sidebar, and main landmarks
- Unit test: Sidebar toggle callback propagates correctly
- Unit test: Mobile breakpoint triggers responsive collapsed state
- Docs: Document layout composition with responsive viewports and overlay mode
