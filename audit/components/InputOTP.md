# InputOTP — Audit Report

## Score: 8.5/10 — Excellent core, minor gaps

## What's Good
- Single hidden real `<input>` covering full area — proper screen reader target ✅
- `autoComplete="one-time-code"` for SMS autofill ✅
- `inputMode="numeric"` and `pattern="[0-9]*"` for numeric mode ✅
- `aria-label="One-time password code"` on the real input ✅
- `type="tel"` for numeric to show numpad on mobile ✅
- Automatic focus advance as user types (via unified input) ✅
- Paste works naturally (unified input) ✅
- Mask (password-style display) support ✅
- Animated fake caret in active slot ✅
- Compound pattern: Group, Slot, Separator ✅
- forwardRef and displayName ✅
- `useControllableState` via `value`+`onChange` props ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| OTP-01 | Major | A11y | input-otp.tsx:26-37 | `value` and `onChange` are required props with no default for `onChange` — will throw if uncontrolled usage attempted | Library components should support both controlled and uncontrolled | Make `onChange` optional or provide a defaultValue uncontrolled path |
| OTP-02 | Major | A11y | input-otp.tsx:213-228 | Hidden input uses `opacity-0` but is still accessible; however no `aria-describedby` to link to any error/description context | When used inside `<FormControl>`, wiring is broken because Slot wraps the outer `<div>`, not the actual input | Expose an `id` prop and wire it to the hidden input element |
| OTP-03 | Minor | A11y | input-otp.tsx:70-85 | `InputOTPSeparator` renders a `role="separator"` on a `<div>` | HTML `<hr>` with `aria-hidden` is semantically cleaner | Change to `<span aria-hidden="true">` or `<hr aria-hidden="true">` |
| OTP-04 | Minor | A11y | input-otp.tsx:114-134 | `InputOTPSlot` `<div>` containers are not `aria-hidden` | AT might attempt to read individual slot divs | Add `aria-hidden="true"` to each slot `<div>` since the real input is the AT target |
| OTP-05 | Minor | Performance | input-otp.tsx:167 | `activeIndex = Math.min(value.length, totalLength - 1)` — always points to last entered position | Edge case: when value is full, activeIndex = totalLength-1 (last slot), but display looks like all slots filled | Consider `activeIndex = value.length < totalLength ? value.length : totalLength - 1` (same result — acceptable) |
| OTP-06 | Nit | API | input-otp.tsx:244 | `as unknown as CompoundedInputOTP` double cast | Type safety lost | Use a typed intersection with proper overloading |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Numeric type | ✅ |
| Text type | ✅ |
| Mask mode | ✅ |
| Auto-focus next slot | ✅ (via unified input) |
| Paste | ✅ |
| Backspace | ✅ |
| autoFocus | ✅ |
| Disabled state | ✅ |
| Active slot highlight | ✅ |
| Fake caret animation | ✅ |
| aria-label on input | ✅ |
| autoComplete one-time-code | ✅ |
| Integration with Form system | ⚠️ ID not exposed to Slot |
| Separator | ✅ |
| Custom slots via children | ✅ |

## Missing Tests/Docs
- No test for paste handling
- No test for numeric filter (non-digit rejection)
- No test for mask display (characters shown as •)
- No test for autoFocus behavior
- Docs don't explain that `value`+`onChange` are required (no uncontrolled path)
