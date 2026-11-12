# Card — Audit Report

**File:** `src/components/core/card.tsx` (101 lines)  
**Score: 8.5 / 10** — Clean, token-correct component; minor a11y and interactive-state gaps.

---

## What's Good
- All sub-components use `forwardRef` + `displayName`.
- Pure design-token usage — no hardcoded colors.
- `text-card-foreground` / `text-muted-foreground` correctly applied to sub-parts.
- `createVariants` for clean variant API.
- `dark:shadow-black/40` on elevated variant for dark-mode shadow correction.
- Transition durations consistent (`duration-200`).

---

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| C-01 | Major | A11y | card.tsx:32 | `clickable` prop adds `cursor-pointer` and `active:scale` but no `role`, `tabIndex`, `onKeyDown`, or `aria-*` — a `div` is not keyboard-accessible | Keyboard-only users cannot interact with clickable cards | Either render as `<button>` / `<a>` when `clickable`, or add `role="button" tabIndex={0}` + `onKeyDown` handler |
| C-02 | Minor | States | card.tsx:31 | `hoverable` adds `hover:shadow-lg hover:-translate-y-0.5` but no `prefers-reduced-motion` guard | Motion-sensitive users see layout shift | Use `motion-safe:hover:-translate-y-0.5` |
| C-03 | Minor | A11y | card.tsx:52-63 | `CardTitle` renders as `<h3>` unconditionally — if cards are nested or used outside a section context, heading level is wrong | Broken heading hierarchy | Accept `as?: "h1"|"h2"|"h3"|"h4"` prop or document that consumers must manage heading level |
| C-04 | Minor | Layout | card.tsx:88 | `CardFooter` has `text-muted-foreground` as default — footer often contains action buttons which need `text-foreground` | Action buttons inside footer inherit dim color | Remove default `text-muted-foreground` from `CardFooter`; leave coloring to children |
| C-05 | Nit | API | card.tsx:26 | `hoverable` and `clickable` are both props but neither is documented as mutually exclusive; using both creates duplicate transition classes | Merged transitions can flicker | Add a guard: when `clickable`, skip `hoverable` shadow behavior or merge intentionally |

---

## State / Variant Matrix

| Variant | Light | Dark | Hoverable | Clickable | Keyboard-clickable | Reduced-motion |
|---------|-------|------|-----------|-----------|-------------------|----------------|
| default | ✅ | ✅ | ✅ | ⚠️ no keyboard | ❌ | ⚠️ translate animates |
| elevated | ✅ | ✅ | ✅ | ⚠️ | ❌ | ⚠️ |
| outlined | ✅ | ✅ | ✅ | ⚠️ | ❌ | ⚠️ |
| ghost | ✅ | ✅ | ✅ | ⚠️ | ❌ | ⚠️ |

---

## Missing Tests / Docs
- No test for `clickable` keyboard interaction.
- No test for `hoverable` reduced-motion.
- `CardTitle` heading level not documented.
- `CardFooter` color inheritance side-effects not documented.
