# Badge — Audit Report

## Score: 8.0 / 10 — Versatile status badge with destructive contrast gap

---

## What's Good
- 9 distinct variants covering semantic states: `default`, `primary`, `secondary`, `destructive`, `outline`, `success`, `warning`, `error`, and `info`.
- 3 clean sizing scales (`sm`, `md`, `lg`) with balanced vertical and horizontal padding.
- Modern pill geometry (`rounded-full`) with subtle borders and shadows.
- Keyboard focus ring classes included for interactive / clickable badge implementations.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| BDG-01 | Major | Color | badge.tsx:17, 21 | `destructive` and `error` variants use `bg-destructive text-destructive-foreground` (white on `#ef4444`), giving **3.76:1** contrast ratio | **FAILS WCAG AA Normal Text (4.5:1)**. At standard badge sizes (12px–14px), white text on red is low contrast | Darken destructive background in badge styling to `#dc2626` (red-600, 4.5:1+) or use subtle destructive tint with dark red text |
| BDG-02 | Minor | Color | badge.tsx:20 | `warning` variant uses `text-amber-600` on `bg-amber-500/10` in light mode, giving ~**3.12:1** contrast ratio | **FAILS WCAG AA Normal Text (4.5:1)** for small badge text | Darken amber text in light mode to `text-amber-800` or `text-amber-900` |
| BDG-03 | Nit | A11y | badge.tsx:9 | Static `<span>` element includes interactive focus classes (`focus:ring-2 focus:ring-ring`) but has no `tabIndex` or button role | Redundant focus classes on non-focusable element unless wrapped or given tabIndex | Conditionally add interactive attributes if `onClick` prop is provided |

---

## State / Variant Matrix

| Variant | Light Contrast | Dark Contrast | WCAG AA Normal (4.5:1) | WCAG AA Large (3:1) |
|---------|----------------|---------------|------------------------|---------------------|
| default / primary | >15:1 | >15:1 | ✅ PASS | ✅ PASS |
| secondary | >10:1 | >10:1 | ✅ PASS | ✅ PASS |
| destructive / error | 3.76:1 | 3.76:1 | ❌ **FAIL** (3.76:1) | ✅ PASS |
| outline | >15:1 | >15:1 | ✅ PASS | ✅ PASS |
| success | >4.5:1 | >5:1 | ✅ PASS | ✅ PASS |
| warning | ~3.12:1 | ~6.5:1 | ❌ **FAIL in light mode** | ✅ PASS |
| info | >10:1 | >10:1 | ✅ PASS | ✅ PASS |

---

## Missing Tests / Docs
- Unit test: Renders badge with correct variant classes
- Unit test: Passes through children and custom class names
- Docs: Document color contrast considerations for warning and destructive badges
