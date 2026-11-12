# Drawer — Audit Report

## Score: 8.0 / 10 — Good with accessibility gaps

---

## What's Good
- Correct `role="dialog"` and `aria-modal="true"` on the drawer content wrapper.
- Integrated `useFocusTrap` on the content ref for modal keyboard trap.
- Automatic body scroll lock via `document.body.style.overflow = "hidden"` with effect cleanup.
- Escape key listener bound to `window` with cleanup and conditional `closeOnEscape` flag.
- Smooth CSS animations using Tailwind `data-[state=open]:animate-in` with multi-directional slide variants (left, right, top, bottom).
- Renders via `Portal` to prevent parent z-index clipping, with exit animations supported by `Presence`.
- Close button includes explicit `aria-label="Close drawer"` and keyboard focus ring.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| DR-01 | Major | A11y | drawer.tsx:140 | Missing `aria-labelledby` or `aria-describedby` on drawer dialog container | Screen readers announce a generic dialog with no title or purpose when opened | Add `aria-labelledby` prop or generate an internal header ID wired to an optional title |
| DR-02 | Major | A11y | drawer.tsx:86-97 | Missing focus restoration when drawer closes | Focus drops to `<body>`, disorienting keyboard and screen reader users | Capture `document.activeElement` when opened and restore focus on close / unmount |
| DR-03 | Minor | Layout | drawer.tsx:75-84 | Body scroll lock directly toggles `overflow: hidden` without padding compensation | Causes page layout shift / jitter when scrollbar disappears on Windows/Linux desktop | Add scrollbar width measurement and apply padding-right compensation to `document.body` |
| DR-04 | Minor | A11y | drawer.tsx:122-132 | Backdrop overlay div has `onClick` without `aria-hidden="true"` | Assistive tech may register the overlay div as an unnamed interactive node | Add `aria-hidden="true"` to the overlay element |
| DR-05 | Nit | Tokens | drawer.tsx:128 | Hardcoded overlay color `bg-black/60` | Bypasses theme design tokens | Use `bg-background/80` or design token variable for overlays |
| DR-06 | Nit | API | drawer.tsx:135-139 | Manual dual ref handling instead of composed ref utility | Cumbersome and easy to regress in future refactoring | Use a `useComposedRefs` utility function |

---

## State / Variant Matrix

| State / Variant | Focus Trap | Escape Key | Scroll Lock | Overlay | Animation | Portal |
|-----------------|------------|------------|-------------|---------|-----------|--------|
| Closed | — | — | — | ✅ Absent | ✅ Exit anim | ✅ |
| Open (right) | ✅ | ✅ | ✅ | ✅ | ✅ Slide from right | ✅ |
| Open (left) | ✅ | ✅ | ✅ | ✅ | ✅ Slide from left | ✅ |
| Open (top) | ✅ | ✅ | ✅ | ✅ | ✅ Slide from top | ✅ |
| Open (bottom) | ✅ | ✅ | ✅ | ✅ | ✅ Slide from bottom | ✅ |
| Custom width/height | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Focus Restoration | ❌ | — | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: Focus restores to previously focused element upon drawer closing
- Unit test: Escape key fires `onClose` callback
- Unit test: Clicking backdrop overlay triggers `onClose` when `closeOnOverlayClick=true`
- Unit test: Verify `aria-modal="true"` and `role="dialog"` attributes
- Docs: Document accessibility requirements for drawer headings and interactive controls
