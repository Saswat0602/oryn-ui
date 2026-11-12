# Textarea — Audit Report

**File:** `src/components/core/textarea.tsx` (39 lines)  
**Score: 8 / 10** — Lean and clean; same hardcoded success colors as Input and missing aria-invalid propagation are the only real issues.

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

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TA-01 | Major | Color | textarea.tsx:21 | `success` state: `border-emerald-500 text-emerald-900 dark:text-emerald-100` — hardcoded Tailwind color (same issue as Input) | Token system inconsistency | Add `--success` CSS token or document as intentional non-token semantic color; align with Input |
| TA-02 | Major | A11y | textarea.tsx:17-33 | `error=true` does NOT set `aria-invalid="true"` on the `<textarea>` | Screen readers cannot detect error state | Add `aria-invalid={isError ? "true" : undefined}` to the `<textarea>` |
| TA-03 | Minor | Layout | textarea.tsx:19 | `resize-x` (horizontal resize) on a `w-full` textarea will conflict — horizontally resizing a full-width element causes layout overflow | Horizontal resize breaks layout | Either disallow `resize="horizontal"` for `fullWidth=true`, or add `overflow-hidden` on a wrapper |
| TA-04 | Minor | A11y | textarea.tsx:7 | No `rows` prop guidance — default `min-h-[80px]` is about 2 rows but no rows prop is explicitly typed (it passes through via `TextareaHTMLAttributes`) | Undiscoverable prop | Document that `rows` prop is supported via HTML passthrough |
| TA-05 | Nit | API | textarea.tsx:4 | `success?: boolean` prop exists but no `aria-valid` or green checkmark visual indicator beyond border color — success state is subtle | Success state may be missed by colorblind users | Add a success icon or `aria-describedby` with success message |

---

## State / Variant Matrix

| State | default | error | success | Disabled | resize=none | resize=vertical | resize=horizontal | resize=both | fullWidth | aria-invalid |
|-------|---------|-------|---------|----------|-------------|----------------|------------------|-------------|-----------|-------------|
| Light | ✅ | ✅ visual | ✅ visual | ✅ | ✅ | ✅ | ⚠️ overflow risk | ✅ | ✅ | ❌ not set |
| Dark | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| Focus ring | ✅ | ✅ | ✅ | — | — | — | — | — | — | — |

---

## Missing Tests / Docs
- No test for `aria-invalid` being absent on error state (same gap as Input).
- No test for `resize="horizontal"` layout overflow.
- `rows` prop not documented.
- Success state accessibility not documented.
- Shared issue with Input should be tracked as a single fix.
