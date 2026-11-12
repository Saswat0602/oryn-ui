# NumberInput — Audit Report

## Score: 8.5/10 — Excellent spinbutton implementation

## What's Good
- Correct `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` ✅
- ArrowUp/Down keyboard step, Home/End jump to min/max ✅
- Stepper buttons with `aria-label` ("Increment value" / "Decrement value") ✅
- Stepper buttons `tabIndex={-1}` (not in tab order — correct for spinbutton pattern) ✅
- Auto-repeat on hold with `onPointerDown` → timeout/interval ✅
- Clamp on blur option ✅
- `precision` rounding ✅
- `hideStepper` prop ✅
- Error state via `border-destructive` + `aria-invalid` passthrough ✅
- Controlled/uncontrolled ✅
- forwardRef, displayName ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| NI-01 | Major | A11y | number-input.tsx:82-83 | `timeoutRef` and `intervalRef` typed as `useRef<any>` | Loses timer type (`ReturnType<typeof setTimeout>`) | Type as `React.useRef<ReturnType<typeof setTimeout> | null>` |
| NI-02 | Major | A11y | number-input.tsx:148 | `isError` reads `props["aria-invalid"] === true || props["aria-invalid"] === "true"` after destructuring `...props` | If `aria-invalid` is passed via props spread it is both consumed here AND spread to the input, resulting in duplicate; also `true` boolean from `aria-invalid` on the input element should come from the controlled `error` prop alone | Don't spread `aria-invalid` from props; compute it only from `error` prop |
| NI-03 | Minor | A11y | number-input.tsx:156-157 | `aria-valuenow` is `undefined` when input is empty string | AT announces no value instead of empty | Use `aria-valuenow={currentValue === '' ? undefined : Number(currentValue)}` — already done, but `undefined` attributes are dropped cleanly ✅ — acceptable |
| NI-04 | Minor | A11y | number-input.tsx:167 | `focus-visible:ring-2` applied but `focus-visible:outline-none` precedes it — Tailwind order matters | If specificity resolves incorrectly, ring may not appear | Verify correct class order: `focus-visible:outline-none focus-visible:ring-2` |
| NI-05 | Nit | Performance | number-input.tsx:98-100 | Cleanup `useEffect` for hold timers doesn't pass deps — would re-subscribe on every render | Unnecessary but benign | Acceptable since `() => stopHolding()` is stable |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Controlled | ✅ |
| Uncontrolled | ✅ |
| Step up/down keyboard | ✅ |
| Home/End keys | ✅ |
| Hold to repeat | ✅ |
| Clamp on blur | ✅ |
| Precision rounding | ✅ |
| Error state | ✅ |
| Disabled | ✅ |
| readOnly | ✅ |
| hideStepper | ✅ |
| aria-valuenow | ✅ |
| aria-valuemin/max | ✅ |
| Sizes (sm/default/lg) | ✅ |
| Stepper disabled at bounds | ✅ |

## Missing Tests/Docs
- No test for auto-repeat hold behavior
- No test for precision rounding edge cases (floating point)
- No test for Home/End key behavior when min/max undefined
- No test for clamp-on-blur
- Docs should clarify that `inputSize` is different from the standard HTML `size` attribute
