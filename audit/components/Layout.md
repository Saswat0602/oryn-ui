# Layout — Audit Report

**File:** `src/components/layout/layout.tsx` (160 lines)  
**Status:** Fixed  
**Score: 9.5 / 10** — Enterprise application layout shell with accessible keyboard skip link, matchMedia responsive breakpoint tracking, and overlay-safe content offset calculations.

---

## What's Good
- Clean orchestrator component coordinating `<Navbar>`, `<Sidebar>`, and `<main>` content areas.
- Accessible `<a href="#main-content">Skip to content</a>` link for keyboard users (WCAG 2.4.1 Bypass Blocks).
- `<main id="main-content">` landmark target for accessible navigation.
- Efficient `window.matchMedia` responsive listener replacing continuous resize handlers.
- Dynamic layout offset calculation respecting `overlaySidebar` and `isMobile` states.
- Smooth transition states (`transition-all duration-300 ease-in-out`) when sidebar collapses or expands.
- Flexible styling options: `contentPadding`, `contentMaxWidth`, `fullHeight`, and fixed positioning flags.
- Dual controlled/uncontrolled state for sidebar collapse (`sidebarCollapsed` + `onSidebarCollapsedChange`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| LAY-01 | Major | A11y | layout.tsx:78 | Missing Skip to Content link before navbar/sidebar | Keyboard and screen reader users must tab through dozens of navigation links before reaching main page content | Added accessible `<a href="#main-content">Skip to content</a>` link | Fixed |
| LAY-02 | Major | Layout | layout.tsx:125–129 | Fixed inline offset calculation ignored `overlaySidebar` and mobile mode | On mobile or overlay mode, content was misaligned | Added condition to zero `sidebarOffset` when overlay or mobile mode is active | Fixed |
| LAY-03 | Minor | Performance | layout.tsx:57–64 | Window resize event listener fired continuously | Excessive re-renders during resizing | Replaced with `window.matchMedia` change listener | Fixed |
| LAY-04 | Minor | A11y | layout.tsx:118 | `<main>` lacked an `id="main-content"` target | Skip links cannot target the main content area | Added `id={mainId || "main-content"}` to `<main>` | Fixed |
| LAY-05 | Nit | Tokens | layout.tsx:96, 112 | Z-index coordination | Layer consistency | Managed z-index hierarchy between navbar, sidebar, and skip link | Fixed |

---

## State / Variant Matrix

| State / Prop | Navbar Fixed | Sidebar Fixed | Mobile View | Overlay Mode | Skip Link |
|--------------|--------------|---------------|-------------|--------------|-----------|
| Default | ✅ Fixed | ✅ Fixed | ✅ matchMedia | ✅ Zero margin offset | ✅ Present & Functional |
| Static navbar | ✅ Correct offset | ✅ | ✅ | ✅ | ✅ |
| Collapsed sidebar | ✅ | ✅ Width updates | ✅ | ✅ | ✅ |
| Custom padding/max-w | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Missing Tests / Docs
- ✅ Added smoke test verifying Skip to Content link and `<main id="main-content">` target in `tests/smoke/layout.test.tsx`.
