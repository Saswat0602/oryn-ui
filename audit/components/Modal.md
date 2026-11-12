# Modal — Audit Report

## Score: 8.5 / 10 — Solid accessible dialog with focus restoration gap

---

## What's Good
- Correct `role="dialog"` and `aria-modal="true"` on the dialog content container.
- Accessible title binding using `useId()` wired to `aria-labelledby={title ? titleId : undefined}` and `<h2>` header.
- Proper modal keyboard focus trap using `useFocusTrap(contentRef, isOpen)`.
- Body scroll lock with clean cleanup when modal is closed or unmounted.
- Escape key listener bound to `window` with cleanup and conditional `closeOnEscape` flag.
- Rendered in a `Portal` to prevent clipping and stacking context bugs, with smooth zoom-in/zoom-out animations via `Presence`.
- Close button has explicit `aria-label="Close modal"` and clear `focus:ring-2 focus:ring-ring` focus ring.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| MOD-01 | Major | A11y | modal.tsx:83–106 | Focus restoration is missing when modal closes | Focus resets to `document.body`, disorienting keyboard and screen reader users | Save `document.activeElement` on open and call `previousActiveElement.focus()` on close |
| MOD-02 | Major | A11y | modal.tsx:136 | When no `title` string is passed, dialog has no accessible name | Screen readers cannot announce the purpose of the dialog | Add `aria-label` and `aria-describedby` props to `ModalProps` and fallback to `aria-label` when `title` is omitted |
| MOD-03 | Minor | Layout | modal.tsx:84–92 | Direct `overflow: hidden` scroll lock causes desktop page scrollbar layout shift | The entire page content jumps horizontally when the modal opens/closes | Add scrollbar-width compensation via `document.body.style.paddingRight` |
| MOD-04 | Minor | A11y | modal.tsx:112–125 | Overlay `div` with `onClick` lacks `aria-hidden="true"` | Screen readers may encounter an unnamed clickable surface in the virtual cursor tree | Add `aria-hidden="true"` to the overlay element |
| MOD-05 | Nit | Tokens | modal.tsx:117 | Hardcoded `bg-black/60` overlay background class | Bypasses theme design tokens | Use semantic overlay token or CSS variable |
| MOD-06 | Nit | API | modal.tsx:129–133 | Manual ref callback splitting instead of composed ref utility | Cumbersome ref merging | Replace with standard `composeRefs` helper |

---

## State / Variant Matrix

| State / Size | Focus Trap | aria-labelledby | Escape Dismiss | Overlay Blur | Animation |
|--------------|------------|-----------------|----------------|--------------|-----------|
| sm / md / lg / xl | ✅ | ✅ (when title given) | ✅ | ✅ | ✅ Zoom + Fade |
| full (fullscreen) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Custom background/text | ✅ | ✅ | ✅ | ✅ | ✅ |
| No title provided | ✅ | ❌ Missing label | ✅ | ✅ | ✅ |
| Focus Restoration | ❌ | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: Focus restores to triggering element when modal closes
- Unit test: Title is announced via `aria-labelledby` ID match
- Unit test: Escape key dismissal when `closeOnEscape={true}` vs `{false}`
- Unit test: Clicking backdrop closes modal when `closeOnOverlayClick={true}`
- Docs: Advise consumers to always provide `title` or `aria-label` for screen reader compliance
