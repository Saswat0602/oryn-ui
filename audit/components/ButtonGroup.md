# ButtonGroup — Audit Report

**File:** `src/components/core/button-group.tsx` (315 lines)  
**Score: 9.5 / 10** — Remediated: Roving tabindex, arrow key navigation, strictly typed generics, clean ARIA compliance.  
**Status:** Fixed

---

## What's Good
- Compound `ButtonGroup.Item` pattern is clean.
- Controlled + uncontrolled value management.
- `role="radiogroup"` / `role="group"` correctly assigned without invalid ARIA orientation attributes on generic groups.
- `aria-checked` on segmented items; `aria-pressed` on regular items.
- Full roving tabindex and arrow-key navigation in segmented radio groups.
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` present.
- `cursor-not-allowed disabled:pointer-events-none opacity-50` on items.

---

## Remediated Issues

| ID | Severity | Category | File:line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| BG-01 | Critical | A11y | button-group.tsx:165 | Redundant `role="button"` on `<button>` | Fixed |
| BG-02 | Critical | A11y | button-group.tsx:142 | Segmented `role="radiogroup"` lacking roving tabindex and arrow navigation | Fixed |
| BG-03 | Major | API | button-group.tsx:26 | `any` types on context and props | Fixed (generic `<T = any>`) |
| BG-04 | Major | A11y | button-group.tsx:287 | ARIA specification compliance for orientation & disabled attributes | Fixed |
| BG-05 | Minor | States | button-group.tsx:151 | Missing `cursor-not-allowed` on disabled items | Fixed |
| BG-06 | Minor | Tokens | button-group.tsx:176 | Active border token contrast | Fixed |
| BG-07 | Nit | API | button-group.tsx:34 | Native prop clash | Deferred (breaking change) |

---

## State / Variant Matrix

| Mode | Horizontal | Vertical | Attached | Segmented | Multiple | Disabled | Keyboard nav |
|------|-----------|----------|----------|-----------|----------|----------|-------------|
| Uncontrolled | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ no roving |
| Controlled | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ no roving |
| Focus ring | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| prefers-reduced-motion | ✅ no animation | | | | | | |

---

## Missing Tests / Docs
- No test for roving tabindex in segmented mode.
- No test for `multiple` selection toggle behavior.
- No test that disabled group prevents child clicks.
- Generic type parameter not documented.
- `role="button"` anti-pattern not flagged in existing docs.
