# ColorPicker — Audit Report

## Score: 6/10 — Sophisticated but major keyboard/a11y gaps

## What's Good
- Rich color conversion utilities (HSV↔RGB↔HEX↔HSL) fully self-contained ✅
- Touch support on saturation and hue sliders ✅
- Controlled/uncontrolled via `useControllableState` ✅
- Hue preservation when S or V = 0 ✅
- EyeDropper API integration with graceful fallback ✅
- Clipboard copy with confirmation state ✅
- Portal-based popover with flip logic ✅
- Preset swatches with selection indicator ✅
- `useClickOutside` to close popover ✅
- forwardRef, displayName ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CP-01 | Critical | A11y | color-picker.tsx:461-481 | Saturation/value area (`div`) has no keyboard interaction | Keyboard-only users cannot change saturation/value | Add `role="slider"` with `aria-label`, `aria-valuenow`, arrow key handlers for S and V axes |
| CP-02 | Critical | A11y | color-picker.tsx:502-515 | Hue slider `div` has no keyboard interaction | Hue cannot be set by keyboard | Add `role="slider" aria-label="Hue" aria-valuenow={hsv.h} aria-valuemin={0} aria-valuemax={360}` and arrow key handler |
| CP-03 | Critical | A11y | color-picker.tsx:518-543 | Alpha slider `div` has no keyboard interaction | Alpha cannot be set by keyboard | Add `role="slider"` with appropriate ARIA and keyboard support |
| CP-04 | Major | A11y | color-picker.tsx:760-798 | Trigger button has no `aria-label` describing the current color | "Choose color" is not communicated; current selected color not conveyed | Add `aria-label={\`Color picker, selected color \${color}\`}` |
| CP-05 | Major | A11y | color-picker.tsx:688-712 | Preset swatch buttons have only `title` for label (tooltip-only) | `title` is not accessible to all AT; screen reader users don't know what preset is selected | Add `aria-label={presetHex}` and `aria-pressed={isSelected}` |
| CP-06 | Major | A11y | color-picker.tsx:452-456 | Picker panel `div` has no focus management when popover opens | Focus stays on trigger; keyboard user cannot access picker | Auto-focus hex input or saturation area on popover open |
| CP-07 | Major | A11y | color-picker.tsx:801-806 | Popover has no `role="dialog"` and no focus trap | Keyboard focus escapes picker | Add `role="dialog" aria-label="Color picker" aria-modal="true"` and use focus-trap primitive |
| CP-08 | Minor | A11y | color-picker.tsx:571-579 | EyeDropper button has only `title` attribute | Not consistently exposed by AT | Add `aria-label="Pick color from screen"` to the button |
| CP-09 | Minor | Tokens | color-picker.tsx:489-495 | Hardcoded `#ccc` in checkerboard pattern style | Not token-based; will not adapt to design system changes | Acceptable for transparency visualization, but document the exception |
| CP-10 | Nit | Performance | color-picker.tsx:346-375 | `window.addEventListener("mousemove", ...)` without `passive: true` | Passive event violation warning in browser dev tools | Add `{ passive: false }` explicitly (drag must be preventable) or document intentionally non-passive |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Default trigger mode | ✅ |
| Inline mode | ✅ |
| Hex format input | ✅ |
| RGB format input | ✅ |
| HSL format input | ✅ |
| Alpha slider (showAlpha) | ✅ |
| Preset swatches | ✅ |
| EyeDropper (supported browser) | ✅ |
| Copy to clipboard | ✅ |
| Controlled value | ✅ |
| Disabled state | ✅ |
| Keyboard saturation/hue | ❌ Not implemented |
| Keyboard navigation in picker | ❌ No focus management |
| Focus trap in popover | ❌ Not implemented |
| Screen reader color announcement | ❌ No descriptive aria-label |
| Flip on viewport edge | ✅ |

## Missing Tests/Docs
- No tests for color conversion accuracy edge cases
- No tests for keyboard interactions
- No test for EyeDropper API unavailability fallback
- Docs don't describe keyboard usage expectations
- No test for controlled value sync when external `value` changes
