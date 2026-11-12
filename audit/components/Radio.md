# Radio — Audit Report

**File:** `src/components/core/radio.tsx` (95 lines)  
**Score: 9.5 / 10** — Status: Fixed (CSS-Driven Peer-Checked Indicator, Controlled & Uncontrolled Support)

---

## What's Good
- Uses native `<input type="radio">` with `peer` class for pure CSS `:checked` dot indicator.
- Fully supports both controlled (`checked`) and uncontrolled (`defaultChecked`, native form click) modes.
- `htmlFor` correctly links label to input via `useId`.
- `disabled:cursor-not-allowed disabled:opacity-50` on input and `peer-disabled:cursor-not-allowed peer-disabled:opacity-70` on label.
- Error state applies `border-destructive`.
- Focus ring cleanly scoped with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`.
- `pt-0.5` on label/description column maintains perfect baseline alignment with the radio button.

---

## Remediated Issues

| ID | Severity | Category | File:line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| R-01 | Critical | States | radio.tsx:47 | Custom indicator overlay only rendered when checked was explicitly passed | Fixed |
| R-02 | Major | A11y | radio.tsx:14 | focus:outline-none suppressed outline on mouse click | Fixed |
| R-03 | Major | Layout | radio.tsx:33 | Misaligned radio in multi-line label layouts | Fixed |
| R-04 | Minor | A11y | radio.tsx:64 | Input lacked peer class for peer-disabled styles | Fixed |
| R-06 | Nit | API | radio.tsx:47 | Checked and defaultChecked implicit in props spread | Fixed |

---

## State / Variant Matrix

| State | sm | md | lg | Disabled | Error | Uncontrolled | Controlled | Focus (keyboard) | Focus (mouse) |
|-------|----|----|----|----------|-------|-------------|------------|-----------------|---------------|
| Unchecked | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ outline suppressed |
| Checked | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ no dot | ✅ | ✅ | ❌ |
| Peer-disabled label | ❌ peer class missing | | | | | | | | |

---

## Missing Tests / Docs
- No test for uncontrolled checked visual state.
- No test for `focus:outline-none` suppressing mouse focus.
- `peer` class requirement on input not documented.
- No RadioGroup component documented (consumers must build their own grouping).
