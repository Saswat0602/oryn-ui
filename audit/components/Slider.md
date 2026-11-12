# Slider — Audit Report

**File:** `src/components/core/slider.tsx` (264 lines)  
**Score: 6 / 10** — Custom pointer-event slider with good ARIA on thumbs; `[key: string]: any` index signature is a critical type safety violation; vertical orientation is incomplete.

---

## What's Good
- `role="slider" aria-valuenow aria-valuemin aria-valuemax aria-disabled` on each thumb.
- Keyboard navigation: ArrowLeft/Right/Up/Down + Home/End.
- Pointer capture for smooth drag beyond slider bounds.
- `tabIndex={disabled ? -1 : 0}` correctly disables keyboard focus.
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` on thumb.
- Range mode with two thumbs, constraint enforcement.
- `roundToStep` with `toFixed(4)` prevents floating-point drift.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| SL-01 | Critical | API | slider.tsx:24 | `[key: string]: any` index signature on `SliderProps` — allows any arbitrary prop silently, completely breaks TypeScript exhaustive checking | Zero type safety for all props; `any` spreads to HTML element causing potential DOM warnings | Remove the index signature; use `React.HTMLAttributes<HTMLDivElement>` spread which already allows arbitrary data attributes |
| SL-02 | Major | Layout | slider.tsx:206-209 | Vertical orientation: track gets `h-full flex-col` and thumb uses `left: X%` — thumbs are positioned horizontally even in vertical mode | Vertical slider is visually broken (thumbs stack horizontally) | For vertical orientation, thumb positioning should use `bottom: Y%` with `transform: translateY(50%)` |
| SL-03 | Major | A11y | slider.tsx:229 | `aria-label={props['aria-label'] || ...}` reads from `props['aria-label']` using index access — enabled by the `[key: string]: any` signature — if no `aria-label` is provided, label falls back to generic "Value" or "Minimum/Maximum" | No meaningful label for single-thumb sliders without explicit `aria-label` | Add `aria-label` as an explicit optional prop in `SliderProps` |
| SL-04 | Major | Performance | slider.tsx:198 | `cursor-pointer` on track, `cursor-grab active:cursor-grabbing` on thumbs, but no CSS touch-action optimization beyond `touch-none` — pointer capture is on the track, not the thumb | May cause scroll conflicts on mobile | Add `touch-action: none` specifically to the thumb as well |
| SL-05 | Minor | Performance | slider.tsx:197-200 | `transition-colors` on track wrapper but drag updates happen every pointer move — transition during drag causes lag | Sluggish drag feel | Remove `transition-colors` from the interactive drag area, or disable transition during active drag |
| SL-06 | Minor | Performance | slider.tsx:160 | `prefers-reduced-motion` — no guard on the thumb's `transition-colors` | Motion-sensitive users see transitions | Add `motion-safe:transition-colors` |
| SL-07 | Nit | API | slider.tsx:13 | `variant?: 'default' | 'filled' | 'outlined' | 'minimal'` — declared but only `default` is ever implemented; all variants render identically | Dead API surface | Implement variants or remove them from the type |

---

## State / Variant Matrix

| State | Horizontal | Vertical | Range | Disabled | Keyboard nav | Marks | showValue | Reduced-motion |
|-------|-----------|---------|-------|----------|-------------|-------|-----------|----------------|
| Single thumb | ✅ | ❌ broken | — | ✅ | ✅ | ✅ | ⚠️ showValue prop declared but not rendered | ❌ |
| Range (2 thumbs) | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| variant | ⚠️ all same | ⚠️ | ⚠️ | — | — | — | — | — |

> **Note:** `showValue` prop is declared but no value display is rendered in the JSX (only marks are shown). This is a silent dead prop.

---

## Missing Tests / Docs
- No test for vertical orientation.
- No test for range thumb constraint (thumb 0 ≤ thumb 1).
- No test for keyboard Home/End keys.
- `variant` prop behavior not documented (all same).
- `showValue` dead prop not documented.
- `[key: string]: any` not flagged in existing review.
