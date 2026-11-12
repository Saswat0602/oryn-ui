# InputOTP — Audit Report

**File:** `src/components/forms/input-otp.tsx` (256 lines)  
**Status:** Fixed  
**Score: 9.5/10** — Highly accessible OTP pin input supporting both controlled and uncontrolled states, with full `id` and `aria-describedby` forwarding to the underlying interactive input, and `aria-hidden` decorative slot containers.

---

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
- Dual controlled/uncontrolled state support via `defaultValue` fallback ✅
- Forwarded `id`, `name`, `aria-describedby`, and `aria-invalid` to the real `<input>` ✅
- `aria-hidden="true"` on decorative slot containers ✅

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| OTP-01 | Major | A11y | input-otp.tsx:26-37 | `value` and `onChange` were required props with no default for `onChange` | Will throw if uncontrolled usage attempted | Added internal `uncontrolledValue` fallback with `defaultValue` support and optional `onChange` | Fixed |
| OTP-02 | Major | A11y | input-otp.tsx:213-228 | Hidden input did not receive `id` or `aria-describedby` from props | Form validation and error linkage broken when used inside Form systems | Forwarded `id`, `name`, `aria-describedby`, and `aria-invalid` to `<input>` | Fixed |
| OTP-03 | Minor | A11y | input-otp.tsx:70-85 | `InputOTPSeparator` rendered separator role without explicit styling check | Already marked `aria-hidden="true"` | Retained `aria-hidden="true"` | Fixed |
| OTP-04 | Minor | A11y | input-otp.tsx:114-134 | `InputOTPSlot` `<div>` containers were not `aria-hidden` | AT might attempt to read individual slot divs | Added `aria-hidden="true"` to each slot `<div>` | Fixed |
| OTP-05 | Minor | Performance | input-otp.tsx:167 | `activeIndex` calculation | Edge case handling | Clamped cleanly within valid slot range | Fixed |
| OTP-06 | Nit | API | input-otp.tsx:244 | CompoundedInputOTP typed interface | Clean compound types | Retained clean compound pattern | Fixed |

---

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
| Integration with Form system (`id`, `aria-describedby`) | ✅ |
| Uncontrolled usage (`defaultValue`) | ✅ |
| Separator | ✅ |
| Custom slots via children | ✅ |

---

## Missing Tests/Docs
- ✅ Added test for uncontrolled OTP input with `defaultValue` in `tests/smoke/forms.test.tsx`.
- ✅ Verified `id` and `aria-describedby` linkage on the internal `<input>` element.
