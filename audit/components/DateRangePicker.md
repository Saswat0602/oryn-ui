# DateRangePicker — Audit Report

## Score: 6/10 — Functional but serious a11y gaps

## What's Good
- Controlled/uncontrolled via `useControllableState` ✅
- Two-step range selection (from → to) with auto-swap if from > to ✅
- `role="dialog" aria-label="Date range calendar"` on popup ✅
- `aria-label` on prev/next month buttons ✅
- `aria-expanded` and `aria-haspopup="dialog"` on trigger ✅
- Portal-based popover with flip logic ✅
- Preset ranges with clean UX ✅
- Error state visual on trigger ✅
- Clear range button with `aria-label` ✅
- forwardRef, displayName ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| DRP-01 | Critical | A11y | date-range-picker.tsx:336-353 | Day buttons have no `aria-label` with full date | AT user cannot determine which date they are selecting | Add `aria-label={date.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}` |
| DRP-02 | Critical | A11y | date-range-picker.tsx:322-355 | No keyboard Arrow navigation in calendar grid | WCAG requires keyboard date grid navigation | Implement ArrowLeft/Right/Up/Down/Home/End/PageUp/PageDown handlers |
| DRP-03 | Critical | A11y | date-range-picker.tsx:267-269 | `role="dialog"` popup has no focus trap | Focus escapes popup on Tab | Use focus-trap-primitive or implement onKeyDown Escape + focus management |
| DRP-04 | Major | A11y | date-range-picker.tsx:329-344 | Day buttons have no `aria-pressed` or `aria-selected` for range start/end/in-between | Screen reader cannot communicate selection state | Add `aria-pressed={isStart || isEnd}` or use `aria-selected` within `role="gridcell"` |
| DRP-05 | Major | A11y | date-range-picker.tsx:222-224 | Trigger is `ref={ref as any}` — unsafe cast | TypeScript safety lost; parent may pass wrong ref type | Use separate `containerRef` for position and native `forwardRef` for button |
| DRP-06 | Major | A11y | date-range-picker.tsx:262 | Popup conditionally renders `{open && triggerRect &&}` — if triggerRect is null, popup never renders even when open | On first open before rect measured, popup is invisible | Decouple: show popup when open, skip positioning until rect is ready |
| DRP-07 | Minor | A11y | date-range-picker.tsx:312 | Day header abbreviations ("Su","Mo"...) are plain text in `<span>` | Should be `<abbr title="Sunday">` in `<th scope="col">` | Restructure day grid as proper `<table>` with `<thead>` |
| DRP-08 | Minor | States | date-range-picker.tsx:249-260 | Clear button is `<span role="button">` not a `<button>` | Spans with role="button" don't natively support keyboard activation | Change to `<button type="button">` |
| DRP-09 | Nit | A11y | date-range-picker.tsx:281-283 | Preset buttons have no keyboard focus ring styles | Keyboard users cannot see focus | Add `focus-visible:ring-2 focus-visible:ring-ring` |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Open/close trigger | ✅ |
| Range start selection | ✅ |
| Range end selection | ✅ |
| Auto-swap from/to | ✅ |
| Clear range | ✅ |
| minDate/maxDate constraints | ✅ |
| Error state styling | ✅ |
| Preset ranges | ✅ |
| Keyboard Arrow navigation | ❌ Not implemented |
| Keyboard Escape to close | ❌ Not implemented |
| Focus trap | ❌ Not implemented |
| Day label for screen reader | ❌ No aria-label on day buttons |
| Controlled value | ✅ |
| Flip on viewport edge | ✅ |
| Disabled state | ✅ |

## Missing Tests/Docs
- No tests for two-step range selection
- No tests for keyboard navigation
- No test for minDate/maxDate boundary enforcement
- `triggerRect` guard prevents popup on first render — no documented workaround
