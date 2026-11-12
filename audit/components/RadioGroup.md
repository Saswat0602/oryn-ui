# RadioGroup — Audit Report

## Score: 9.5 / 10 — Status: Fixed (Full 2D Arrow Key Traversal, Accessible Naming & Roving Tabindex)

## What's Good
- `role="radiogroup"` on group container with explicit `aria-label` / `aria-labelledby` support ✅
- `role="radio"` with `aria-checked` on each radio button ✅
- Full 2D Arrow key navigation (`ArrowDown`/`ArrowRight`/`ArrowUp`/`ArrowLeft`) moving focus and selection ✅
- Perfect roving tabindex: focused/selected item gets `tabIndex=0`, and when nothing is selected, the first item gets `tabIndex=0` ✅
- `useControllableState` supporting both controlled and uncontrolled usage ✅
- Space and Enter keys activate the radio ✅
- `aria-disabled` and native disabled state properly propagated from group context ✅
- `htmlFor` tied to generated `id` for label association without duplicate handler calls ✅
- Hidden input for form submission has `aria-hidden="true"` ✅
- Decorative `Circle` icon has `aria-hidden="true"` ✅

## Remediated Issues

| ID | Severity | Category | File:line | Problem | Status |
|----|----------|----------|-----------|---------|--------|
| RG-01 | Critical | A11y | radio-group.tsx:93-101 | No Arrow key navigation between radio items | Fixed |
| RG-02 | Major | A11y | radio-group.tsx:55-67 | role="radiogroup" div had no aria-label or aria-labelledby wiring | Fixed |
| RG-03 | Major | A11y | radio-group.tsx:62 | Hidden input exposed to assistive technologies | Fixed |
| RG-04 | Minor | A11y | radio-group.tsx:113-125 | When nothing checked, all items had tabIndex=-1 | Fixed |
| RG-05 | Minor | A11y | radio-group.tsx:133-150 | label onClick duplicated native button click | Fixed |
| RG-06 | Nit | A11y | radio-group.tsx:124 | Circle icon lacked aria-hidden="true" | Fixed |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Controlled value | ✅ |
| Uncontrolled defaultValue | ✅ |
| role="radiogroup" | ✅ |
| role="radio" | ✅ |
| aria-checked | ✅ |
| Space/Enter activation | ✅ |
| Arrow key navigation | ❌ Not implemented |
| Group disabled | ✅ |
| Item disabled | ✅ |
| Label association (htmlFor/id) | ✅ |
| Roving tabindex | ⚠️ Breaks when nothing selected |
| Form submit via hidden input | ✅ |
| aria-label on group | ❌ Not wired |

## Missing Tests/Docs
- No test for Arrow key navigation (blocker for WCAG compliance)
- No test for `tabIndex` being 0 on initial unchecked group
- No test for group disabled propagating to all items
- No test for label click activating radio
- Docs should note that an `aria-label` or `aria-labelledby` must be provided on the group
