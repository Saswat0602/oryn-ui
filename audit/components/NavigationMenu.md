# NavigationMenu — Audit Report

## Score: 8.5 / 10 — High quality implementation with great hover UX

---

## What's Good
- Thoughtful UX design: includes a top hover-bridge pseudo-element (`before:h-3 before:absolute before:-top-3`) ensuring the cursor doesn't lose hover when traveling from trigger to floating panel.
- Clean delay debounce: configurable `delayDuration` (default 200ms) with proper timer cleanup on unmount.
- Dismiss mechanics: handles click-outside via `useClickOutside` and `Escape` key to close open panels.
- Strong ARIA relationships: `aria-expanded={isOpen}`, `aria-controls={contentId}`, and `NavigationMenuContent` has `role="region"` and `aria-labelledby={triggerId}`.
- Trigger chevron rotates 180° smoothly on open.
- Natural DOM tab order: when `usePortal={false}` (default), content sits directly after the trigger in the DOM, so pressing `Tab` naturally focuses the first link inside the panel.
- Flexible link rendering: `NavigationMenuLink` supports both `href` (renders `<a>`), button, or custom router links via `asChild`.
- Design tokens: `bg-popover`, `text-popover-foreground`, `border-border`, `hover:bg-accent`, `hover:text-accent-foreground`, `shadow-xl`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| NM-01 | Major | A11y / Tab Order | navigation-menu.tsx:377–380 | When `usePortal={true}` is enabled, tab navigation breaks (focus jumps to the next trigger rather than entering the portaled content) | Portaling content outside the `<nav>` subtree breaks native keyboard tab order without an active focus management hook | Warn against `usePortal` or implement virtual focus / focus-trap on open when `usePortal={true}` |
| NM-02 | Minor | A11y | navigation-menu.tsx:68–155 | Lacks horizontal arrow navigation (`ArrowRight`/`ArrowLeft`) across triggers in `NavigationMenuList` | WAI-ARIA navigation menu bar best practices recommend horizontal arrow navigation across top-level menu triggers | Integrate roving tabindex to enable arrow key navigation across list items |
| NM-03 | Minor | Layout | navigation-menu.tsx:340–364 | Portaled positioning calculates fixed coordinates from `triggerRect` without collision flip detection | If trigger is near right or bottom edge, portaled panel clips | Clamp coordinates to viewport boundaries |
| NM-04 | Minor | API | navigation-menu.tsx:416–450 | `NavigationMenuViewport` and `NavigationMenuIndicator` are empty placeholder divs without dynamic tracking logic | Developers expecting Radix-style sliding indicators or single shared viewports will find them non-functional | Add documentation clarifying they are structural shells, or implement sliding width/offset animations |
| NM-05 | Nit | TypeScript | navigation-menu.tsx:453–459 | Attaching compound components via monkey-patching `(NavigationMenu as any).List = ...` | `as any` removes compile-time verification | Use type intersection for compound exports |

---

## State / Variant Matrix

| State / Prop | Mouse Hover & Debounce | Keyboard Enter / Space | Keyboard Tab Flow | Escape Dismiss | Arrow Keys |
|---|---|---|---|---|---|
| Default (`usePortal=false`) | ✅ Smooth hover bridge | ✅ Opens panel | ✅ Natural tab order | ✅ Closes | ❌ Tab only |
| `usePortal={true}` | ✅ | ✅ | ❌ Tab skips portal | ✅ Closes | ❌ |
| Alignment (`start`/`center`/`end`)| ✅ Verified | ✅ | ✅ | ✅ | — |
| Controlled `value` | ✅ | ✅ | ✅ | ✅ | — |
| `NavigationMenuLink` (active) | ✅ `font-semibold bg-accent` | ✅ | ✅ | — | — |

---

## Missing Tests / Docs
- Unit test: Hovering trigger opens content after `delayDuration`.
- Unit test: Mouseleave closes content after debounce.
- Unit test: Escape key dismisses active panel.
- Unit test: `aria-expanded` and `aria-controls` properly link trigger and panel.
- Docs: Explain difference between inline and `usePortal` mode.
- Docs: Document `NavigationMenuLink` `active` state and Next.js / React Router link usage with `asChild`.
