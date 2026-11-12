# AlertDialog — Audit Report

## Score: 8.5 / 10 — Good with minor gaps

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

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| AD-01 | Critical | A11y | alert-dialog.tsx:159 | No `aria-labelledby` or `aria-describedby` on the `alertdialog` element | Screen readers won't announce title/description when dialog opens | Add `aria-labelledby={titleId}` and `aria-describedby={descId}`; pass IDs through context to `AlertDialogTitle`/`AlertDialogDescription` |
| AD-02 | Major | A11y | alert-dialog.tsx:140–142 | Escape key closes AlertDialog — this is correct for a **Dialog**, but AlertDialog semantics imply "you must acknowledge"; consider blocking Escape or making it configurable | WCAG pattern for `alertdialog` discourages easy dismiss | Add `closeOnEscape?: boolean` prop (default `false` for AlertDialog) |
| AD-03 | Major | A11y | alert-dialog.tsx:70 | `ref={ref as any}` on Trigger — `any` cast bypasses TypeScript | Type safety loss | Use `React.MutableRefObject<HTMLButtonElement | null>` merge pattern |
| AD-04 | Major | A11y | alert-dialog.tsx:299–302 | `useAlertDialog()` hook always returns hardcoded `open: false` and no-op — useless for consumers | Misleading API | Remove or implement properly to read from context (or document clearly that it's decorative) |
| AD-05 | Minor | A11y | alert-dialog.tsx:123 | Focus trap activates on `open` boolean but `useFocusTrap` is not shown here — verify it sets focus to first focusable element, not just traps Tab | Focus must move INTO dialog on open | Verify `useFocusTrap` calls `element.focus()` on activation |
| AD-06 | Minor | States | alert-dialog.tsx:126–134 | Scroll lock only locks `body.style.overflow`; doesn't account for `scrollbar-gutter` or document padding shifts (layout shift on scroll-bar removal) | Layout jump on systems with visible scrollbars | Add `document.body.style.paddingRight` compensation or use `scrollbar-gutter: stable` |
| AD-07 | Nit | API | alert-dialog.tsx:249 | `ref={ref as any}` on AlertDialogAction | Type unsafe | Same fix as AD-03 |
| AD-08 | Nit | Tokens | alert-dialog.tsx:162 | Uses `bg-card text-card-foreground`; Dialog uses same — consistent, but `card` vs `popover` token choice undocumented | Minor token decision | Add a comment explaining why `card` token (vs `popover`) is used for modal bg |

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
