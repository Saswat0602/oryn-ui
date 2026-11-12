# Sheet — Audit Report

## Score: 8.5 / 10 — High-quality compound slide-over with focus restoration gap

---

## What's Good
- Full compound architecture (`Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`, `SheetOverlay`, `SheetPortal`).
- Accessible modal dialog semantics: `role="dialog"` and `aria-modal="true"`.
- Uses `useFocusTrap(contentRef, open)` to keep keyboard navigation contained inside the sheet.
- Clean body scroll lock with effect cleanup on close or unmount.
- Escape key listener bound to `window` with cleanup.
- Supports 4 directional positions: `top`, `bottom`, `left`, and `right` with smooth slide-in/slide-out animations.
- Close button includes both `aria-label="Close sheet"` and a visually hidden `<span className="sr-only">Close</span>`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| SHT-01 | Major | A11y | sheet.tsx:210 | Missing `aria-labelledby` and `aria-describedby` connection from `SheetContent` to `SheetTitle` and `SheetDescription` | Screen readers announce a generic dialog without identifying its purpose when opened | Generate IDs via React context and wire them to `aria-labelledby` and `aria-describedby` |
| SHT-02 | Major | A11y | sheet.tsx:188–199 | Missing focus restoration when the sheet closes | Focus drops to `document.body`, disorienting keyboard and screen reader users | Capture triggering element before opening and call `.focus()` when sheet closes |
| SHT-03 | Major | API | sheet.tsx:296–299 | `useSheet()` returns a hardcoded no-op dummy `{ open: false, setOpen: () => {} }` | Misleads consumers who try to access sheet state outside context | Connect to `useSheetContext()` or deprecate the empty stub |
| SHT-04 | Minor | Layout | sheet.tsx:179–186 | Direct `overflow: hidden` on `document.body` causes scrollbar jump on desktop browsers | Page content shifts horizontally when the sheet opens | Add scrollbar-width compensation via `document.body.style.paddingRight` |
| SHT-05 | Nit | Tokens | sheet.tsx:115 | Hardcoded `bg-black/60` overlay backdrop class | Inconsistent with theme token system | Use semantic design token for overlay background |

---

## State / Variant Matrix

| Variant / State | Focus Trap | Escape Key | Scroll Lock | Overlay | Animation | aria-labelledby |
|-----------------|------------|------------|-------------|---------|-----------|-----------------|
| right (default) | ✅ | ✅ | ✅ | ✅ | ✅ Slide from right | ❌ Missing |
| left | ✅ | ✅ | ✅ | ✅ | ✅ Slide from left | ❌ |
| top | ✅ | ✅ | ✅ | ✅ | ✅ Slide from top | ❌ |
| bottom | ✅ | ✅ | ✅ | ✅ | ✅ Slide from bottom | ❌ |
| Focus Restoration | ❌ | — | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: Trigger click opens sheet and overlay
- Unit test: Escape key and close button dismiss sheet
- Unit test: Focus restores to trigger upon closing
- Unit test: `SheetTitle` renders heading with accessible text
- Docs: Document multi-side sheet options and form integration
