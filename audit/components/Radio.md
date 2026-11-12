# Radio — Audit Report

**File:** `src/components/core/radio.tsx` (86 lines)  
**Score: 6 / 10** — Relies on browser-native `<input type="radio">` which limits custom styling; visual indicator overlay breaks when uncontrolled; several focus and state issues.

---

## What's Good
- Uses native `<input type="radio">` — good for form semantics and built-in radio-group behavior.
- `htmlFor` correctly links label to input via `useId`.
- `disabled:cursor-not-allowed disabled:opacity-50` on input.
- Error state applies `border-destructive`.
- `accent-primary` for native browser accent color.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| R-01 | Critical | States | radio.tsx:47 | Custom indicator overlay `{props.checked && ...}` only renders when `checked` is **explicitly passed as a prop** — in uncontrolled usage (no `checked` prop), the custom dot never appears even when the native radio is selected | Broken visual state for the most common usage pattern | Use a CSS-only custom radio (`appearance-none` + `checked:` Tailwind variant) instead of a JS-driven overlay, OR require controlled usage explicitly |
| R-02 | Major | A11y | radio.tsx:14 | `focus:outline-none focus-visible:ring-2` — uses `focus:` without `focus-visible:`, meaning `focus:outline-none` suppresses the default browser outline for all focus (including mouse clicks) | Mouse-focused radio has no visible focus indicator at all | Change `focus:outline-none` to `focus-visible:outline-none` |
| R-03 | Major | Layout | radio.tsx:33 | Wrapper `div` uses `flex items-start space-x-3` but radio is in a `h-5` centering div — when description is multi-line, the radio aligns to top of `h-5`, not to baseline of label text | Misaligned radio in multi-line label layouts | Use `items-baseline` for single-line or add proper top-padding |
| R-04 | Minor | A11y | radio.tsx:64 | Label uses `peer-disabled:cursor-not-allowed peer-disabled:opacity-70` — but the input is NOT marked with `peer` class, so this peer selector never fires | Disabled label opacity/cursor never applies | Add `peer` class to the `<input>` element |
| R-05 | Minor | Tokens | radio.tsx:70 | Error description: `text-destructive` is token-correct here (unlike Checkbox which used `text-red-500`) — ✅ — but the border on the native input may render differently across browsers | Inconsistent visual error state | Document that native input border styling is browser-dependent |
| R-06 | Nit | API | radio.tsx:47 | `props.checked` read from spread `...props` — TypeScript type is `React.InputHTMLAttributes<HTMLInputElement>` where `checked` is `boolean | undefined`; but reading it as `props.checked` after destructuring `{..., ...props}` is implicit | Fragile destructuring | Explicitly destructure `checked` from props |

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
