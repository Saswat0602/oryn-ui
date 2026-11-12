# PromptInput — Audit Report

## Score: 8/10 — Clean AI prompt UI, minor a11y gaps

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

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| PRI-01 | Major | A11y | prompt-input.tsx:118-128 | `<textarea>` has no `id`, no `aria-label`, and no associated `<label>` | Screen readers only hear the placeholder text, not a persistent label | Add `aria-label={placeholder}` or accept a `label` prop and render `<label>` |
| PRI-02 | Major | A11y | prompt-input.tsx:118-128 | `<textarea>` has no `aria-multiline="true"` explicitly | Some AT may not recognize textarea as multiline without explicit role | Technically `<textarea>` is implicitly multiline; acceptable, but `role="textbox" aria-multiline="true"` can be added for explicit clarity |
| PRI-03 | Minor | A11y | prompt-input.tsx:148-162 | Submit button `cursor-not-allowed` class is only applied when `!canSubmit` but `disabled` attribute also prevents click — `cursor-not-allowed` does not show on disabled buttons due to browser default | Visual cursor feedback may be inconsistent cross-browser | Add `cursor-not-allowed` explicitly or rely on the `disabled` attribute alone |
| PRI-04 | Minor | A11y | prompt-input.tsx:107-117 | Outer container div has no `role` despite acting as a composite input widget | AT doesn't announce this as an interactive region | Acceptable since textarea inside is the real focus target |
| PRI-05 | Minor | States | prompt-input.tsx:62-69 | `adjustHeight` uses hardcoded `24` for `singleRowHeight` — may be wrong for different font sizes or line-heights | Height miscalculation for non-default typography | Measure actual `lineHeight` from the textarea's computed style |
| PRI-06 | Nit | A11y | prompt-input.tsx:155-158 | Disabled submit state uses `text-muted-foreground/50` (50% opacity on muted) | Very low contrast; may fail WCAG 1.4.3 | Use `text-muted-foreground` (without opacity modifier) or at least `opacity-70` |

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
| aria-label on textarea | ❌ Missing |
| Keyboard Tab to submit button | ✅ |

## Missing Tests/Docs
- No test for Enter submit behavior
- No test for Shift+Enter newline (non-submit)
- No test for IME composition guard
- No test for auto-height calculation
- No test for loading/stop mode
- Docs should clarify keyboard shortcut (Enter vs Shift+Enter)
