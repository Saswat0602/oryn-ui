# ButtonGroup — Audit Report

**File:** `src/components/core/button-group.tsx` (254 lines)  
**Score: 6.5 / 10** — Feature-rich but has critical keyboard/ARIA problems and several `any` type violations.

---

## What's Good
- Compound `ButtonGroup.Item` pattern is clean.
- Controlled + uncontrolled value management.
- `role="radiogroup"` / `role="group"` correctly assigned.
- `aria-checked` on segmented items; `aria-pressed` on regular items.
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` present.
- `disabled:pointer-events-none opacity-50` on items.

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| BG-01 | Critical | A11y | button-group.tsx:115 | `role="button"` on a `<button>` element is redundant and incorrect — when used as a pressed-toggle the right role is `button` with `aria-pressed`, but `role="button"` explicitly on a native button is a WAI-ARIA anti-pattern that may confuse ATs | Screen readers double-announce role | Remove explicit `role="button"` |
| BG-02 | Critical | A11y | button-group.tsx:224 | Segmented `role="radiogroup"` with no roving-tabindex — all items have equal tab stops, breaking keyboard UX for radio groups (should be one tab stop, arrow-key navigation) | Keyboard users tab through every item separately | Implement roving tabindex (first/active item `tabIndex=0`, rest `-1`) + ArrowLeft/Right handlers |
| BG-03 | Major | API | button-group.tsx:13 | `value?: any`, `onItemSelect?: (val: any) => void`, `defaultValue?: any`, `onValueChange?: (value: any) => void`, `internalValue: any[]` — pervasive `any` types | Zero type safety; breaks inference for callers | Use a generic type parameter `<T = string>` on `ButtonGroupProps` and `ButtonGroupContextValue` |
| BG-04 | Major | A11y | button-group.tsx:225 | `aria-orientation` only set when `segmented` — regular `role="group"` orientation is undefined even with `orientation="vertical"` | ATs cannot infer layout direction | Always set `aria-orientation` |
| BG-05 | Minor | States | button-group.tsx:101 | Disabled items use `pointer-events-none opacity-50` but lack `cursor-not-allowed` — `pointer-events-none` suppresses cursor CSS | Disabled items show default cursor | Add `cursor-not-allowed` before `pointer-events-none` |
| BG-06 | Minor | Tokens | button-group.tsx:99 | Active segmented item: `bg-background text-foreground` — in dark mode `bg-background=#09090b` on `bg-muted=#18181b` track works, but active border is `border-primary/40` which is undefined for the non-Normal theme (primary=#18181b, 40% → invisible) | Active state may not appear in default theme | Use `border-border` or `border-primary` instead |
| BG-07 | Nit | API | button-group.tsx:32-36 | `type`, `value`, `defaultValue`, `onValueChange` props use `any` — the `type` prop here clashes with `HTMLDivElement` native `type` (which doesn't exist on div but is confusing) | API surface confusion | Rename to `selectionType` |

---

## State / Variant Matrix

| Mode | Horizontal | Vertical | Attached | Segmented | Multiple | Disabled | Keyboard nav |
|------|-----------|----------|----------|-----------|----------|----------|-------------|
| Uncontrolled | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ no roving |
| Controlled | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ no roving |
| Focus ring | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| prefers-reduced-motion | ✅ no animation | | | | | | |

---

## Missing Tests / Docs
- No test for roving tabindex in segmented mode.
- No test for `multiple` selection toggle behavior.
- No test that disabled group prevents child clicks.
- Generic type parameter not documented.
- `role="button"` anti-pattern not flagged in existing docs.
