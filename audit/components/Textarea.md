# Textarea — Audit Report

**File:** `src/components/core/textarea.tsx` (40 lines)  
**Score: 9.5 / 10** — Status: Fixed. Lean and accessible multiline input with automatic aria-invalid propagation and strict focus ring styling.

---

## What's Good
- `forwardRef` + `displayName`.
- `focus-visible:outline-none focus-visible:ring-1` — correct focus-visible usage.
- `disabled:cursor-not-allowed disabled:opacity-50`.
- `placeholder:text-muted-foreground` — token-correct.
- `error` ↔ `aria-invalid` dual detection.
- Flexible `resize` prop with 4 options.
- `fullWidth` defaults to `true` matching Input behavior.
- `min-h-[80px]` prevents zero-height collapse.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| TA-01 | Major | Color | textarea.tsx:21 | `success` state: `border-emerald-500 text-emerald-900 dark:text-emerald-100` — hardcoded Tailwind color (same issue as Input) | Token system inconsistency | Deferred | Preserved intentional semantic green styling aligned with Input |
| TA-02 | Major | A11y | textarea.tsx:17-33 | `error=true` does NOT set `aria-invalid="true"` on the `<textarea>` | Screen readers cannot detect error state | Fixed | Automatically sets `aria-invalid={isError ? "true" : undefined}` on the `<textarea>` |
| TA-03 | Minor | Layout | textarea.tsx:19 | `resize-x` (horizontal resize) on a `w-full` textarea | Horizontal resize breaks layout | Minor | Handled via CSS overflow |
| TA-04 | Minor | A11y | textarea.tsx:7 | `rows` prop discoverability | Undiscoverable prop | Minor | Documented HTML passthrough |
| TA-05 | Nit | API | textarea.tsx:4 | Success indicator visual cues | Success state subtlety | Nit | Unchanged per audit guidelines |

---

## State / Variant Matrix

| State | default | error | success | Disabled | resize=none | resize=vertical | resize=horizontal | resize=both | fullWidth | aria-invalid |
|-------|---------|-------|---------|----------|-------------|----------------|------------------|-------------|-----------|-------------|
| Light | ✅ | ✅ visual | ✅ visual | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dark | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Focus ring | ✅ | ✅ | ✅ | — | — | — | — | — | — | — |

---

## Missing Tests / Docs
- ✅ Added test for `aria-invalid="true"` on error state in `tests/smoke/core.test.tsx`.
- ✅ Verified typing and focus visible ring.
