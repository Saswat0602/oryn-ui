# Button — Audit Report

**File:** `src/components/core/button.tsx` (120 lines)  
**Score: 9.5 / 10** — Status: Fixed. Solid and accessible foundation with motion-safe loading spinners, icon-only button labels, and clean focus rings.

---

## What's Good
- Full `forwardRef` + `displayName`.
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` — correct focus-visible usage.
- `disabled:pointer-events-none disabled:opacity-50` — proper disabled state.
- `aria-busy` + `data-loading` on loading state.
- `Slot` pattern for `asChild` polymorphism.
- Spinner has `aria-hidden="true"` and uses `shrink-0` to avoid layout shift.
- `type` defaults to `"button"` (prevents accidental form submission).
- All variants use design tokens — no hardcoded colors.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| B-01 | Major | A11y | button.tsx:39 | `icon` size requires accessible name on icon-only controls | Screen readers announce nothing meaningful | Fixed | Documented accessible name requirements and verified `aria-label` propagation on icon buttons |
| B-02 | Minor | States | button.tsx:71 | Loading opacity vs disabled opacity | Visual language consistency | Minor | Documented intentional busy state styling |
| B-03 | Minor | A11y | button.tsx:11 | Two loading props: `loading` and `isLoading` | API confusion | Fixed | Added `@deprecated Use loading instead` JSDoc to `isLoading` |
| B-04 | Minor | Performance | button.tsx:83 | `animate-spin` on spinner — no `prefers-reduced-motion` guard | Motion-sensitive users see spinning even with reduced-motion preference | Fixed | Added `motion-safe:animate-spin` |
| B-05 | Nit | API | button.tsx:14 | `fullWidth` prop layout edge cases | Layout behavior | Nit | Unchanged per audit guidelines |
| B-06 | Nit | Tokens | button.tsx:33 | `link` variant token usage | Color intent | Nit | Unchanged per audit guidelines |

---

## State / Variant Matrix

| Variant | Default size | sm | lg | icon | Disabled | Loading | Focus ring |
|---------|-------------|----|----|------|----------|---------|------------|
| default | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| destructive | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| outline | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| secondary | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ghost | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| link | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| prefers-reduced-motion | ✅ motion-safe | — | — | — | — | — | — |

---

## Missing Tests / Docs
- ✅ Unit test: Loading state disables button and sets `aria-busy="true"` in `tests/smoke/core.test.tsx`.
- ✅ Unit test: `size="icon"` with `aria-label`.
- ✅ Verified `type="button"` default behavior.
