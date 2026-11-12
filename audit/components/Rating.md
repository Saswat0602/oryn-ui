# Rating — Audit Report

**File:** `src/components/core/rating.tsx` (190 lines)  
**Score: 6.5 / 10** — Innovative half-star implementation; hardcoded amber colors, broken individual star keyboard focus, and misleading ARIA roles are the main issues.

---

## What's Good
- `role="radiogroup"` on container + keyboard arrow navigation.
- `aria-label` on container.
- `useControllableState` for controlled/uncontrolled.
- `tabIndex` correctly set to `-1` on individual star buttons (single tab stop on group).
- `disabled` applies `opacity-50 pointer-events-none`.
- `readOnly` mode disables interaction cleanly.
- `clearable` toggle: clicking current value resets to 0.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| RA-01 | Critical | A11y | rating.tsx:125 | Star buttons have `tabIndex={-1}` making them keyboard-unreachable — keyboard navigation is only on the wrapper `div` via `onKeyDown`, but the wrapper's `tabIndex={isInteractive ? 0 : undefined}` skips `readOnly` mode; `readOnly` users cannot focus the widget at all | readOnly rating is completely keyboard-inaccessible | Add `tabIndex={readOnly ? 0 : undefined}` on the outer div even in readOnly, so AT users can read the current value |
| RA-02 | Major | Color | rating.tsx:143-148 | `text-amber-400 fill-amber-400` — hardcoded Tailwind utility color for filled stars | Not in token system; cannot be themed | Add `--rating-active-color` CSS token or accept `activeColor` prop |
| RA-03 | Major | Color | rating.tsx:137-138 | `text-muted-foreground/30 fill-muted/30` — `/30` opacity applied to muted token; `fill-muted/30` may not resolve correctly in all Tailwind configs (fill uses `bg-*` color table, not `text-*`) | Empty stars may render incorrectly | Use `fill-current` with `text-muted-foreground/30` or use `fill-muted-foreground/30` |
| RA-04 | Major | A11y | rating.tsx:170 | `role="radiogroup"` on container but no `role="radio"` on individual buttons (they have no role) — `role="radiogroup"` requires `role="radio"` children per WAI-ARIA spec | ARIA structure is invalid; ATs may misinterpret | Add `role="radio"` and `aria-checked={isFull || isHalf}` to each star button, or switch container to `role="slider"` for a single-thumb widget |
| RA-05 | Minor | A11y | rating.tsx:134 | `aria-label={`Rate ${index} of ${max}`}` — when keyboard navigation changes value via arrow keys, the button labels remain static; active value is not announced | Keyboard users don't get feedback on current selection | Add `aria-valuenow` / `aria-valuetext` to the container since it's the focused element, and announce hover value changes via `aria-live` |
| RA-06 | Minor | Performance | rating.tsx:131 | `hover:scale-110 active:scale-95` — no `prefers-reduced-motion` guard | Motion-sensitive users see scaling animations | Use `motion-safe:hover:scale-110 motion-safe:active:scale-95` |
| RA-07 | Nit | API | rating.tsx:21 | `icon?: React.ReactNode` / `emptyIcon?: React.ReactNode` — when providing custom icons, the wrapper `<span>` still applies `text-amber-400 fill-amber-400` classes which may conflict with custom icon colors | Custom icon coloring overridden | Apply color classes only when using default Star icons |

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
