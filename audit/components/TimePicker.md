# TimePicker — Audit Report

## Score: 9.5/10 — Status: Fixed. Accessible spinbutton time input with aria-invalid, aria-describedby, and labelled AM/PM controls

## What's Good
- `role="group" aria-label="Time picker"` on container ✅
- Hour input: `role="spinbutton" aria-label="Hours" aria-valuenow/min/max` ✅
- Minute input: `role="spinbutton" aria-label="Minutes" aria-valuenow/min/max` ✅
- ArrowUp/Down keyboard step on both hour and minute inputs ✅
- AM/PM toggle button with descriptive state in aria-label ✅
- `useControllableState` ✅
- Error state visual with `border-destructive` ✅
- `focus-within:ring-1` on container ✅
- `name` prop for form submission via hidden input ✅
- Wrapping hour/minute values (12→1 for 12h, 0→23 for 24h) ✅
- forwardRef, displayName ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| TP-01 | Major | A11y | time-picker.tsx:160-173 | Hour and minute inputs had no `aria-invalid` when `error=true` | AT doesn't know the field is invalid | Fixed | Added `aria-invalid={error \|\| props["aria-invalid"] ? "true" : undefined}` to both hour and minute inputs |
| TP-02 | Major | A11y | time-picker.tsx:160-173 | Hour and minute inputs had no `aria-describedby` for error messages | Cannot link to external `FormMessage` | Fixed | Wired `aria-describedby={props["aria-describedby"]}` to both inputs |
| TP-03 | Minor | A11y | time-picker.tsx:192-202 | AM/PM button lacked descriptive state announcement | AT user doesn't know current AM/PM state | Fixed | Updated to `aria-label={\`Toggle AM/PM, currently \${parsed.period}\`}` |
| TP-04 | Minor | A11y | time-picker.tsx:172 | Hour/minute input focus style used `:focus` instead of `:focus-visible` | Styling triggered on mouse clicks | Fixed | Replaced with `focus-visible:bg-accent focus-visible:text-accent-foreground` |
| TP-05 | Minor | States | time-picker.tsx:45-60 | Time parsing regex edge case for defaultValue mismatch | Display normalization | Minor | Documented string formats |
| TP-06 | Nit | A11y | time-picker.tsx:158 | Clock icon has no `aria-hidden` | Decorative icon announced by AT | Fixed | Added `aria-hidden="true"` to Clock icon |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| 12h format | ✅ |
| 24h format | ✅ |
| ArrowUp/Down hour | ✅ |
| ArrowUp/Down minute | ✅ |
| AM/PM toggle | ✅ |
| Hour wrapping | ✅ |
| Minute wrapping | ✅ |
| Disabled state | ✅ |
| Error state visual | ✅ |
| Controlled value | ✅ |
| Uncontrolled defaultValue | ✅ |
| Form name submission | ✅ |
| aria-invalid on error | ✅ |
| aria-describedby linkage | ✅ |
| Sizes (sm/default/lg) | ✅ |
| Step prop for minutes | ✅ |

## Missing Tests/Docs
- ✅ Unit test: Hour and minute inputs propagate `aria-invalid="true"` on error state.
- ✅ Unit test: Both inputs bind external `aria-describedby` error descriptor ID.
- ✅ Verified 12h AM/PM toggle and accessible label in `tests/smoke/forms.test.tsx`.
