# TimePicker — Audit Report

## Score: 8/10 — Good spinbutton implementation, minor gap

## What's Good
- `role="group" aria-label="Time picker"` on container ✅
- Hour input: `role="spinbutton" aria-label="Hours" aria-valuenow/min/max` ✅
- Minute input: `role="spinbutton" aria-label="Minutes" aria-valuenow/min/max` ✅
- ArrowUp/Down keyboard step on both hour and minute inputs ✅
- AM/PM toggle button with `aria-label="Toggle AM/PM"` ✅
- `useControllableState` ✅
- Error state visual with `border-destructive` ✅
- `focus-within:ring-1` on container ✅
- `name` prop for form submission via hidden input ✅
- Wrapping hour/minute values (12→1 for 12h, 0→23 for 24h) ✅
- forwardRef, displayName ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TP-01 | Major | A11y | time-picker.tsx:160-173 | Hour input uses `type="text"` with `role="spinbutton"` but no `aria-invalid` even when `error=true` | AT doesn't know the field is invalid | Add `aria-invalid={error}` to both hour and minute inputs |
| TP-02 | Major | A11y | time-picker.tsx:160-173 | Hour and minute inputs have no `aria-describedby` for error messages | Cannot link to external `FormMessage` | Accept and wire `aria-describedby` prop to both inputs |
| TP-03 | Minor | A11y | time-picker.tsx:192-202 | AM/PM button has no `aria-pressed` | AT user doesn't know current AM/PM state | Add `aria-pressed={parsed.period === 'AM'}` or use `aria-label={\`Toggle AM/PM, currently \${parsed.period}\`}` |
| TP-04 | Minor | A11y | time-picker.tsx:172 | Hour input focus style: `focus:bg-accent focus:text-accent-foreground` uses `:focus` not `:focus-visible` | Triggers on mouse click as well as keyboard | Use `focus-visible:bg-accent focus-visible:text-accent-foreground` |
| TP-05 | Minor | States | time-picker.tsx:45-60 | Time parsing regex `split(/[:\s]+/)` — if `defaultValue` is `"12:00 PM"` and format is `"24h"`, the period ("PM") is parsed but `format !== "12h"` so period is ignored — but the hour will be 12 not 0 | Could display 12:00 in 24h mode when 00:00 would be correct | Normalize on mount if `defaultValue` doesn't match the expected format |
| TP-06 | Nit | A11y | time-picker.tsx:158 | Clock icon has no `aria-hidden` | Decorative icon announced by AT | Add `aria-hidden="true"` to the Clock icon |

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
| aria-invalid on error | ❌ Missing |
| aria-pressed on AM/PM | ❌ Missing |
| Sizes (sm/default/lg) | ✅ |
| Step prop for minutes | ✅ |

## Missing Tests/Docs
- No test for hour ArrowUp wrapping (12→1 in 12h mode)
- No test for minute ArrowDown wrapping (0→59)
- No test for 12h↔24h format difference in parsing
- No test for step prop affecting minute increments
- Docs should clarify string format: "HH:MM" for 24h, "HH:MM AM/PM" for 12h
