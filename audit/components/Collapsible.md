# Collapsible — Audit Report

## Score: 7.5 / 10 — Solid but missing ARIA wiring

---

## What's Good
- Clean compound-component pattern with context.
- Full controlled/uncontrolled via `useControllableState`.
- `aria-expanded` on the trigger button — correct boolean.
- Disabled state passed through context, blocks toggle on click.
- CSS grid trick (`grid-rows-[1fr]/[0fr]`) for height animation avoids JS-measured heights.
- `pointer-events-none` on collapsed content prevents accidental interaction.
- `forwardRef` + `displayName` on all parts.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CO-01 | Critical | A11y | collapsible.tsx:100 | `aria-expanded` present but no `aria-controls` pointing to the content panel ID | Screen readers cannot associate button with the content it controls | Generate IDs (useId), set `aria-controls={contentId}` on trigger, `id={contentId}` on content |
| CO-02 | Major | A11y | collapsible.tsx:104–107 | Trigger loses focus outline — className has `outline-none` with no `focus-visible` alternative | Keyboard users cannot see focus indicator | Replace `outline-none` with `focus-visible:ring-2 focus-visible:ring-ring` |
| CO-03 | Major | A11y | collapsible.tsx:97–98 | `ref={ref as any}` on CollapsibleTrigger | Type unsafe | Use proper typed merge ref |
| CO-04 | Minor | Performance | collapsible.tsx:128–130 | Animation uses `opacity-0` when collapsed, but `pointer-events-none` is not on the outer wrapper — the inner `overflow-hidden` div may still receive events briefly | Minor interaction issue on slow transitions | Move `pointer-events-none` to the outer grid div when closed |
| CO-05 | Minor | A11y | collapsible.tsx:124–137 | Content div has no `role` or `hidden` attribute when collapsed — `pointer-events-none` does not hide from AT | Screen readers may read collapsed content | Add `hidden` boolean or `aria-hidden={!open}` to `CollapsibleContent` |
| CO-06 | Minor | Tokens | collapsible.tsx:69 | `className="w-full"` hardcoded on root — no token, but non-tokenized layout can conflict with consumer wrappers | Minor layout issue | Document or make it overridable (it already takes `className`, so OK if noted) |
| CO-07 | Nit | API | collapsible.tsx:28–29 | `onToggle` and `onExpand`/`onCollapse` are redundant with `onOpenChange` | API surface bloat | Consolidate into `onOpenChange` or at least note deprecation direction |

---

## State / Variant Matrix

| State | aria-expanded | aria-controls | Focus ring | Animation | Disabled |
|-------|--------------|---------------|------------|-----------|----------|
| Closed (default) | ✅ false | ❌ Missing | ❌ Missing | ✅ | — |
| Open | ✅ true | ❌ Missing | ❌ Missing | ✅ | — |
| Disabled | ✅ | ❌ | ❌ | ✅ | ✅ blocks click |
| Controlled open | ✅ | ❌ | ❌ | ✅ | — |

---

## Missing Tests / Docs
- Unit test: `aria-controls` links trigger to content
- Unit test: `aria-expanded` toggles on click
- Unit test: Collapsed content is hidden from AT (`aria-hidden` or `hidden`)
- Unit test: Keyboard Enter/Space activates trigger (inherits from `<button>` natively, but confirm)
- Docs: No example of nested collapsibles or animations in docs
