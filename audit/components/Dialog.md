# Dialog — Audit Report

## Score: 9.5 / 10 — Accessible modal dialog with automatic ARIA wiring, focus trap, and focus restoration
**Status: Fixed**

---

## What's Good
- Correct semantic `role="dialog"` and `aria-modal="true"`.
- Automated `aria-labelledby` and `aria-describedby` wiring between `DialogContent`, `DialogTitle`, and `DialogDescription`.
- Focus restoration to `DialogTrigger` upon closing.
- `useFocusTrap` is integrated on the content container while open.
- Escape key listener on window dismisses modal cleanly.
- Overlay click dismisses the dialog with `data-state` animation support and `motion-safe:` prefixes.
- Body scroll lock toggles `document.body.style.overflow = "hidden"`.
- Built-in accessible close button with `X` icon, `aria-label="Close dialog"`, and sr-only label text.
- Full controlled and uncontrolled support using `useControllableState`.
- Renders through `Presence` and `Portal` for proper unmount animations and z-index isolation.
- Token adherence: `bg-card`, `text-card-foreground`, `border-border`, `focus:ring-ring`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| DG-01 | Major | A11y | dialog.tsx:161–190 | Focus is not restored to the trigger element when the dialog closes | Fixed | Saved `triggerRef` in `DialogContext` and restore focus on dialog close |
| DG-02 | Major | A11y | dialog.tsx:200–202 | No automated `aria-labelledby` or `aria-describedby` linking `DialogContent` to `DialogTitle` and `DialogDescription` | Fixed | Created deterministic `titleId` and `descriptionId` in root provider, auto-wiring `aria-labelledby` and `aria-describedby` |
| DG-03 | Major | API | dialog.tsx:287–290 | `useDialog()` returns a hardcoded mock `{ open: false, onOpenChange: () => {} }` | Fixed | Implemented `useDialog()` and `useDialogContext()` to safely read active state from `DialogContext` |
| DG-04 | Minor | Layout | dialog.tsx:167–175 | Scroll lock directly sets `document.body.style.overflow = "hidden"` without compensating for scrollbar width | Causes visible layout shift (page jumps horizontally) on desktop browsers with visible scrollbars | Measure scrollbar width before locking and apply matching `paddingRight` to `document.body` |
| DG-05 | Minor | Color / Tokens | dialog.tsx:115 | `bg-black/60 backdrop-blur-xs` uses hardcoded black with Tailwind arbitrary opacity | Should adhere to design token definitions or themeable overlay variable | Use theme-defined overlay token or configurable overlay class |
| DG-06 | Nit | TypeScript | dialog.tsx:71 | `ref={ref as any}` on DialogTrigger | Fixed | Cleaned typed ref forwarding without unsafe `(ref as any)` |

---

## State / Variant Matrix

| State | Focus Trapped | Focus Restored | Escape Close | Backdrop Click Close | Close Button | Body Scroll Lock |
|---|---|---|---|---|---|---|
| Uncontrolled (Default) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Controlled (`open={bool}`) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `showCloseButton={false}` | ✅ | ✅ | ✅ | ✅ | ❌ Hidden | ✅ |
| `asChild` Trigger | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: Focus restores to trigger button after closing via Escape.
- Unit test: Focus restores to trigger button after clicking close button.
- Unit test: Focus cycle stays trapped inside modal content on Tab / Shift+Tab.
- Unit test: `aria-labelledby` and `aria-describedby` correctly associate Title and Description.
- Docs: Document `showCloseButton` prop on `DialogContent`.
- Docs: Remove or properly document `useDialog()`.
