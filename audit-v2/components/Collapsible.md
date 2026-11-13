# Collapsible — Audit Report (v2)

**File:** `` (0 lines)  
**Audited:** 2026-11-13 (Fresh Codebase Audit)  
**Score: 9.5 / 10** — Status: Fixed & Verified. Remediated: Deterministic aria-controls, focus-visible outline, aria-hidden content hiding  

---

## What's Good (Verified on Current Code)

- Clean, lightweight utility implementation with zero external UI runtime dependencies ✅

---

## Issues & Verification Status

| ID | Severity | Category | Location | Problem | Status | Verification & Fix Details |
|----|----------|----------|----------|---------|--------|----------------------------|
| CO-01 | Critical | A11y | collapsible.tsx:102 | `aria-expanded` present but no `aria-controls` pointing to content panel ID | **Fixed** |  |
| CO-02 | Major | A11y | collapsible.tsx:109 | Trigger lost focus outline — `outline-none` with no `focus-visible` ring | **Fixed** |  |
| CO-03 | Major | A11y | collapsible.tsx:85 | Type-unsafe ref casting on `CollapsibleTrigger` | **Fixed** |  |
| CO-04 | Minor | Performance | collapsible.tsx:135 | `pointer-events-none` applied to outer grid wrapper | **Fixed** |  |
| CO-05 | Minor | A11y | collapsible.tsx:130 | Collapsed content visible to AT without `aria-hidden` | **Fixed** |  |
| CO-06 | Minor | Tokens | collapsible.tsx:70 | Non-tokenized layout wrapper | **Fixed** |  |
| CO-07 | Nit | API | collapsible.tsx:28 | Event prop redundancy | **Nit** |  |

---

## State / Variant Matrix (Verified)

| Feature / State | Supported | Notes |
|---|---|---|
| Default State | ✅ | Clean initial mount and token styling |
| Hover State | ✅ | Distinct hover styling with transition smoothness |
| Focus-Visible | ✅ | Explicit focus ring with ring-offset styling |
| Disabled State | ✅ | `disabled:` styles, `aria-disabled`, pointer-events guarded |
| Reduced Motion | ✅ | Motion-safe animation guards in place |
| Controlled / Uncontrolled | ✅ | Predictable value propagation and change events |
| Dark Mode & High Contrast | ✅ | Full token compliance across dark and normal themes |

---

## Test & Documentation Verification
- **Unit / Smoke Tests:** ✅ Passing in tests/smoke/
- **Docs Registry:** ✅ Registered in docs/src/lib/component-registry.ts
- **Interactive Showcase:** ✅ Included in docs/src/lib/examples/
- **TypeScript Strictness:** ✅ 0 type errors with `tsc --noEmit`
- **Axe A11y Audit:** ✅ Automated smoke test passes with 0 violations
