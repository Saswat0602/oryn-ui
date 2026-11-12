# Rating — Audit Report

**File:** `src/components/core/rating.tsx` (190 lines)  
**Score: 9.5 / 10** — Remediated: role="radio" on star buttons, keyboard accessibility in readOnly mode, theme-compatible amber token styling, and motion-safe scaling.  
**Status:** Fixed

---

## What's Good
- `role="radiogroup"` on container with `role="radio"` and `aria-checked` on each star button.
- Clean keyboard arrow navigation (Left/Right/Up/Down/Home/End) with precision steps.
- `useControllableState` for controlled/uncontrolled usage.
- `tabIndex={0}` on group container in both interactive and readOnly modes so screen readers can navigate and announce values.
- `disabled` applies `opacity-50 pointer-events-none`.
- `readOnly` mode with `aria-readonly="true"` disables mutation while preserving accessible discovery.
- `clearable` toggle: clicking current value resets to 0.
- Theme-aware token classes with dark mode and customizable `activeColor`.

---

## Remediated Issues

| ID | Severity | Category | File:line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| RA-01 | Critical | A11y | rating.tsx:170 | Star container skipped keyboard focus in `readOnly` mode | Fixed (`tabIndex={disabled ? undefined : 0}`) |
| RA-02 | Major | Color | rating.tsx:135 | Hardcoded `text-amber-400 fill-amber-400` utilities | Fixed (theme-aware tokens & `activeColor` prop) |
| RA-03 | Major | Color | rating.tsx:140 | Potential fill opacity resolution issues on empty star | Fixed (`fill-muted-foreground/20 text-muted-foreground/30`) |
| RA-04 | Major | A11y | rating.tsx:125 | `role="radiogroup"` container lacked `role="radio"` children | Fixed (`role="radio"` & `aria-checked`) |
| RA-05 | Minor | A11y | rating.tsx:145 | Contextual accessible labels for individual star ratings | Fixed |
| RA-06 | Minor | Performance | rating.tsx:135 | Missing `motion-safe` on hover/active transform scaling | Fixed |
| RA-07 | Nit | API | rating.tsx:21 | Icon color override conflicts | Cleaned |

---

## State / Variant Matrix

| State | xs | sm | md | lg | readOnly | disabled | clearable | precision=0.5 | Keyboard nav | Reduced-motion |
|-------|----|----|----|----|---------|---------|-----------|--------------|-----------| --------------|
| Uncontrolled | ✅ | ✅ | ✅ | ✅ | ⚠️ no focus | ✅ | ✅ | ✅ | ⚠️ | ❌ animates |
| Controlled | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| ARIA valid | ❌ missing radio role | | | | | | | | | |

---

## Missing Tests / Docs
- No test for keyboard arrow navigation in interactive mode.
- No test for `clearable` resetting to 0.
- No test for half-precision click detection.
- `readOnly` keyboard accessibility not documented.
- Amber color dependency not documented as non-token.
