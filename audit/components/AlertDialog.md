# AlertDialog — Audit Report

## Status: Fixed (2026-11-12)
## Score: 9.5 / 10 — Automatic aria-labelledby/describedby wiring and safe context reader implemented

---

## What's Good
- Correct `role="alertdialog"` and `aria-modal="true"` on the content panel.
- `useFocusTrap` applied to the content ref — focus is trapped inside the modal.
- Body scroll-lock via `overflow: hidden` on `document.body`.
- Escape key dismisses the dialog (`window` keydown listener, cleaned up on unmount).
- Uses `Portal` → content renders outside the DOM tree; correct z-index layering.
- `Presence` wrapper allows exit animations before unmounting.
- Full controlled/uncontrolled support via `useControllableState`.
- `AlertDialogAction` and `AlertDialogCancel` both have proper focus rings (`focus:ring-2 focus:ring-ring focus:ring-offset-2`).
- `AlertDialogTrigger` passes through `onClick` correctly and uses `Slot` for `asChild`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Status | Fix |
|----|----------|----------|-----------|---------|----------------|--------|-----|
| AD-01 | Critical | A11y | alert-dialog.tsx:159 | No `aria-labelledby` or `aria-describedby` on the `alertdialog` element | Accessible names missing | Fixed | Added `titleId` and `descriptionId` in `AlertDialog` root provider, auto-wiring `aria-labelledby` and `aria-describedby` on `AlertDialogContent` |
| AD-02 | Major | A11y | alert-dialog.tsx:140–142 | Escape key closes AlertDialog unconditionally | WCAG pattern for `alertdialog` discourages easy accidental dismiss | Fixed | Added `closeOnEscape?: boolean` prop (default `true`, configurable to `false` for mandatory confirmation) |
| AD-03 | Major | A11y | alert-dialog.tsx:70 | `ref={ref as any}` on Trigger — `any` cast bypasses TypeScript | Type safety loss | Fixed | Cleaned trigger ref types |
| AD-04 | Major | A11y | alert-dialog.tsx:299–302 | `useAlertDialog()` hook always returned hardcoded `open: false` | Misleading API | Fixed | Connected to `AlertDialogContext` to return live `open` and `onOpenChange` |
| AD-05 | Minor | A11y | alert-dialog.tsx:123 | Focus trap activates on `open` boolean | Focus must move INTO dialog on open | Verified | `useFocusTrap` activates and traps focus inside dialog on mount |
| AD-06 | Minor | States | alert-dialog.tsx:126–134 | Scroll lock only locks `body.style.overflow` | Layout jump on systems with visible scrollbars | Deferred | Document `scrollbar-gutter: stable` recommendation |
| AD-07 | Nit | API | alert-dialog.tsx:249 | `ref={ref as any}` on AlertDialogAction | Type unsafe | Fixed | Cleaned ref types |
| AD-08 | Nit | Tokens | alert-dialog.tsx:162 | Uses `bg-card text-card-foreground` | Minor token decision | Verified | Consistent with modal dialog surface design |

---

## State / Variant Matrix

| State | Focus Trap | Escape Dismiss | Scroll Lock | Overlay | Animation | Portal |
|-------|------------|----------------|-------------|---------|-----------|--------|
| Closed | — | — | — | ✅ Absent | ✅ Exit anim | ✅ |
| Open | ✅ | ✅ (should be ⚠️ for alertdialog) | ✅ | ✅ | ✅ Enter anim | ✅ |
| Open + disabled action | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Controlled open | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `asChild` trigger | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**aria-labelledby / aria-describedby wiring**: ❌ Missing

---

## Missing Tests / Docs
- Unit test: Focus is trapped (Tab cycles within content)
- Unit test: Focus restores to trigger on close
- Unit test: `aria-modal="true"` present
- Unit test: Escape *does not* close (or is configurable)
- Unit test: `alertdialog` role present
- Docs: No explicit note that `AlertDialogTitle` + `AlertDialogDescription` are required for accessibility
- Docs: `useAlertDialog` hook purpose / expected behavior undocumented
