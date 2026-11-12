# Badge — Audit Report

## Score: 9.5 / 10 — Status: Fixed

---

## What's Good
- 9 distinct variants covering semantic states: `default`, `primary`, `secondary`, `destructive`, `outline`, `success`, `warning`, `error`, and `info`.
- 3 clean sizing scales (`sm`, `md`, `lg`) with balanced vertical and horizontal padding.
- Modern pill geometry (`rounded-full`) with subtle borders and shadows.
- Full WCAG AA color contrast across all semantic variants (warning uses `text-amber-800` in light mode, destructive uses `#dc2626` base tokens).
- Interactive mode support: adds `role="button"`, `tabIndex={0}`, and `focus-visible:` ring styling when `onClick` is provided.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| BDG-01 | Major | Color | badge.tsx:17, 21 | `destructive` and `error` variants previously used `#ef4444` yielding 3.76:1 contrast | FAILS WCAG AA Normal Text (4.5:1) | Fixed | Enforced `#dc2626` destructive design tokens (4.83:1 contrast ratio) |
| BDG-02 | Minor | Color | badge.tsx:20 | `warning` variant used `text-amber-600` on `bg-amber-500/10` in light mode (~3.12:1) | FAILS WCAG AA Normal Text (4.5:1) | Fixed | Updated to `text-amber-800 dark:text-amber-300` (>5.5:1 contrast) |
| BDG-03 | Nit | A11y | badge.tsx:9 | Static `<span>` element included focus rings unconditionally | Redundant focus classes on non-focusable element | Fixed | Switched to `focus-visible:` and added `role="button"` + `tabIndex={0}` when `onClick` is provided |

---

## State / Variant Matrix

| Variant | Light Contrast | Dark Contrast | WCAG AA Normal (4.5:1) | WCAG AA Large (3:1) |
|---------|----------------|---------------|------------------------|---------------------|
| default / primary | >15:1 | >15:1 | ✅ PASS | ✅ PASS |
| secondary | >10:1 | >10:1 | ✅ PASS | ✅ PASS |
| destructive / error | 4.83:1 | 4.83:1 | ✅ PASS | ✅ PASS |
| outline | >15:1 | >15:1 | ✅ PASS | ✅ PASS |
| success | >5.0:1 | >5.0:1 | ✅ PASS | ✅ PASS |
| warning | >5.5:1 | >6.5:1 | ✅ PASS | ✅ PASS |
| info | >10:1 | >10:1 | ✅ PASS | ✅ PASS |

---

## Missing Tests / Docs
- Unit test: Renders badge with correct variant classes
- Unit test: Passes through children and custom class names
- Docs: Document color contrast considerations for warning and destructive badges
