# Input — Audit Report

**File:** `src/components/core/input.tsx` (77 lines)  
**Score: 7.5 / 10** — Clean and lean; hardcoded success colors and missing aria-invalid propagation are the main gaps.

---

## What's Good
- `forwardRef` + `displayName`.
- `focus-visible:outline-none focus-visible:ring-1` — correct focus-visible usage.
- `disabled:cursor-not-allowed disabled:opacity-50`.
- `placeholder:text-muted-foreground` — token-correct.
- `error` ↔ `aria-invalid` dual detection.
- Responsive `fullWidth` defaulting to `true`.
- Icon wrapper uses `pointer-events-none` position with `text-muted-foreground`.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| I-01 | Major | Color | input.tsx:18 | `success` state: `border-emerald-500 text-emerald-900 dark:text-emerald-100` — hardcoded Tailwind color outside token system | Theme inconsistency; no semantic token for success exists | Either add a `--success` CSS token or use `border-green-600` consistently and document it as intentional non-token |
| I-02 | Major | A11y | input.tsx:26-72 | When `error=true`, component does NOT set `aria-invalid="true"` on the `<input>` itself | Screen readers cannot announce the error state | Add `aria-invalid={isError ? "true" : undefined}` to both `<input>` renders |
| I-03 | Minor | A11y | input.tsx:34-37 | `leftIcon` / `rightIcon` wrappers are plain `<div>` with no `aria-hidden` — if icons are decorative, ATs may read icon content | Noisy screen reader announcements | Add `aria-hidden="true"` to icon wrapper divs |
| I-04 | Minor | Layout | input.tsx:33 | Wrapper `<div>` has `relative` but no `min-w-0` — in flex containers the icon wrapper can overflow | Overflow in flex layouts | Add `min-w-0` to wrapper div |
| I-05 | Nit | API | input.tsx:7-9 | `leftIcon` / `rightIcon` are `React.ReactNode` but no size guidance — consumers may pass different-sized icons causing misalignment | Inconsistent icon sizing | Document expected icon size (e.g. `h-4 w-4`) in JSDoc |

---

## State / Variant Matrix

| State | With leftIcon | With rightIcon | Both icons | Disabled | Error | Success | aria-invalid propagated |
|-------|--------------|----------------|------------|----------|-------|---------|------------------------|
| default | ✅ | ✅ | ✅ | ✅ | ✅ visual | ✅ visual | ❌ |
| error | ✅ | ✅ | ✅ | ✅ | ✅ | — | ❌ missing aria-invalid |
| success | ✅ | ✅ | ✅ | ✅ | — | ✅ | ❌ |
| focus ring | ✅ | ✅ | ✅ | — | ✅ | ✅ | — |

---

## Missing Tests / Docs
- No test for `aria-invalid` being absent on error state.
- No test for icon overflow in flex containers.
- Success color tokens not documented.
- Icon size guidance missing from props documentation.
