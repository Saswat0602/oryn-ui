# Checkbox — Audit Report

**File:** `src/components/core/checkbox.tsx` (195 lines)  
**Score: 9.5 / 10** — Robust accessible checkbox with semantic design tokens, clean label integration, and typed event handling.
**Status: Fixed**

---

## What's Good
- `role="checkbox"` + `aria-checked="mixed"` for indeterminate — correct WAI-ARIA.
- `aria-disabled` + native `disabled` both set.
- Hidden `<input type="checkbox">` for form submission when `name` is provided.
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
- `useControllableState` for proper controlled/uncontrolled management.
- `useId` for auto-generated stable IDs.
- Space and Enter keyboard activation.
- Semantic tokens `text-destructive` used on error descriptions.
- Label click correctly delegates to form control without double-toggle regressions.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CB-01 | Major | Color | checkbox.tsx:182 | `error && 'text-red-500 dark:text-red-400'` — hardcoded Tailwind color instead of `text-destructive` token | Fixed | Replaced with semantic token `text-destructive` |
| CB-02 | Major | A11y | checkbox.tsx:162-169 | Label `onClick` calls `setChecked()` directly in addition to the `htmlFor` link — the button's native click also fires, causing double-toggle | Fixed | Removed redundant `onClick` from `<label>`; native `htmlFor` reliably toggles button exactly once |
| CB-03 | Major | API | checkbox.tsx:22 | `onChange?: (e: any) => void` — synthetic event object is hand-crafted with partial fields | Fixed | Defined typed `CheckboxChangeEvent` interface with typed target/currentTarget properties |
| CB-04 | Minor | A11y | checkbox.tsx:136 | `cursor-pointer` applied unconditionally, then `disabled:cursor-not-allowed` overrides — but `pointer-events-none` from disabled makes the cursor irrelevant on the button itself; label still shows pointer on disabled | Disabled state visual inconsistency | Fixed | Cleaned conditional cursor classes `disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'` on both button and label |
| CB-05 | Minor | States | checkbox.tsx:68 | `isIndeterminate` checks both `checked === 'indeterminate'` and `indeterminate` prop — if `indeterminate` prop is true but `checked=false`, the internal state starts as `indeterminate` but clicking immediately sets to `true` skipping `false` | Unexpected state transition from indeterminate | Documented | Standard W3C tri-state cycle: indeterminate -> checked (true) -> unchecked (false) |
| CB-06 | Nit | API | checkbox.tsx:11 | `CheckboxProps` extends `ButtonHTMLAttributes<HTMLButtonElement>` but the visible element is a `<button>` while form input is a hidden `<input>`. The `name`/`value` props could confuse consumers | Mixed element semantics | Add JSDoc clarifying that `name` and `value` are for the hidden form input, not the button |

---

## State / Variant Matrix

| State | sm | md | lg | Disabled | Error | Indeterminate | Focus ring | Form submit |
|-------|----|----|----|----------|-------|---------------|------------|-------------|
| Unchecked | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| Checked | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| Indeterminate | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ input=false |
| Label click double-toggle | ✅ Fixed | ✅ Fixed | ✅ Fixed | — | — | — | — | — |

---

## Missing Tests / Docs
- No test for label-click double-toggle regression.
- No test for indeterminate → true transition.
- No test for `onChange` synthetic event shape.
- `indeterminate` prop vs `checked='indeterminate'` interaction undocumented.
