# PromptInput — Audit Report

## Score: 9.5 / 10 — Status: Fixed

## What's Good
- Enter submits, Shift+Enter adds newline (IME-safe with `isComposing` check) ✅
- Auto-height textarea with min/maxRows ✅
- Loading state → Stop button with `aria-label="Stop generating"` ✅
- Submit button with `aria-label="Send prompt"` ✅
- `disabled` on submit when empty or disabled ✅
- `useControllableState` ✅
- Focus ring via `focus-within:ring-2` on container ✅
- Clears value and resets height after submit ✅
- forwardRef, displayName ✅
- startActions/endActions slots for extensibility ✅
- Explicit accessible `aria-label` automatically wired to `<textarea>` from placeholder or prop ✅
- Focus-visible ring on submit and stop actions ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| PRI-01 | Major | A11y | prompt-input.tsx:118-128 | `<textarea>` had no `id`, no `aria-label`, and no associated `<label>` | Screen readers only hear the placeholder text, not a persistent label | Fixed | Added `aria-label={props['aria-label'] \|\| placeholder \|\| 'Message prompt'}` to `<textarea>` |
| PRI-02 | Major | A11y | prompt-input.tsx:118-128 | `<textarea>` has no `aria-multiline="true"` explicitly | Implicitly multiline per HTML5 spec | Verified | Native `<textarea>` provides accessible multiline semantics across modern screen readers |
| PRI-03 | Minor | A11y | prompt-input.tsx:148-162 | Submit button `cursor-not-allowed` class visual consistency | Visual cursor feedback | Fixed | Added `disabled` attribute alongside explicit cursor classes |
| PRI-04 | Minor | A11y | prompt-input.tsx:107-117 | Outer container div has no role | Textarea inside is the real focus target | Verified | Focus is managed directly on the child `<textarea>` |
| PRI-05 | Minor | States | prompt-input.tsx:62-69 | `adjustHeight` uses 24 singleRowHeight fallback | Non-default font size fallback | Deferred | Sufficient for standard design token scale |
| PRI-06 | Nit | A11y | prompt-input.tsx:155-158 | Disabled submit state used `text-muted-foreground/50` | Low contrast on disabled text | Fixed | Used `text-muted-foreground opacity-60` and visible focus rings |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Enter submits | ✅ |
| Shift+Enter newline | ✅ |
| IME composition guard | ✅ |
| Loading state (Stop button) | ✅ |
| Auto-height expand | ✅ |
| maxRows cap | ✅ |
| Disabled state | ✅ |
| Empty → submit disabled | ✅ |
| Clears after submit | ✅ |
| Controlled value | ✅ |
| startActions slot | ✅ |
| endActions slot | ✅ |
| aria-label on textarea | ✅ Added `aria-label={placeholder}` |
| Keyboard Tab to submit button | ✅ |

## Missing Tests/Docs
- No test for Enter submit behavior
- No test for Shift+Enter newline (non-submit)
- No test for IME composition guard
- No test for auto-height calculation
- No test for loading/stop mode
- Docs should clarify keyboard shortcut (Enter vs Shift+Enter)
