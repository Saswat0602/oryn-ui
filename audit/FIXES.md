# ORYN UI — Audit Fixes Changelog

Tracking remediation of all issues identified in `audit/REPORT.md`.

## Shared & Foundational Fixes
- **`theme`**:
  - Light mode `muted-foreground` updated from `#71717a` to `#64646b` (contrast ratio increased from 4.40:1 to 5.34:1, passing WCAG AA Normal Text).
  - Light and dark mode `destructive` updated from `#ef4444` to `#dc2626` (contrast ratio with white increased from 3.76:1 to 4.83:1, passing WCAG AA Normal Text).
  - Normal-dark `primary` updated from `#3b82f6` to `#2563eb` (contrast ratio with white increased from 3.68:1 to 5.17:1, passing WCAG AA Normal Text).
  - Synchronized across `docs/src/app/globals.css`, `src/theme/colors.ts`, and `audit/scripts/contrast_check.py`.

## Component Fixes
- **`Alert`** (`src/components/feedback/alert.tsx`):
  - **ALT-01 (Critical)**: Updated filled `success` variant from `bg-emerald-600 text-white` (2.54:1) to `bg-emerald-700 text-white` (5.48:1, passing WCAG AA).
  - **ALT-02 (Critical)**: Updated filled `warning` variant from `bg-amber-600 text-white` (2.15:1) to `bg-amber-700 text-white` (5.02:1, passing WCAG AA).
  - **ALT-03 (Major)**: Automatically configure accessible default `role`: `role="alert"` for `destructive`/`error` variants and `role="status"` for `success`/`info`/`warning`.
  - Added unit and a11y tests in `tests/smoke/feedback.test.tsx` for accessible dismiss, automatic roles, and axe verification.

- **`Accordion`** (`src/components/forms/accordion.tsx`):
  - **A-01 (Critical)**: Added deterministic `id` and `aria-controls` on `AccordionTrigger` pointing directly to content panel ID.
  - **A-02 (Critical)**: Bound `id`, `role="region"`, `aria-labelledby`, and `aria-hidden` on `AccordionContent` for screen reader landmarks.
  - **A-03 (Major)**: Added `aria-hidden="true"` to decorative chevron vector icon.
  - **A-04 (Major)**: Removed catch-all `[key: string]: any` index signature from `AccordionProps` to restore strict TypeScript checking.
  - **A-05 (Major)**: Added typed signature `onValueChange?: (value: string | string[]) => void`.
  - Added automated tests in `tests/smoke/forms.test.tsx` verifying `aria-controls`, `aria-expanded`, and `role="region"`.

- **`AlertDialog`** (`src/components/overlay/alert-dialog.tsx`):
  - **AD-01 (Critical)**: Implemented automatic `titleId` and `descriptionId` generation in `AlertDialog` root provider, auto-wiring `aria-labelledby` and `aria-describedby` on `AlertDialogContent` to `AlertDialogTitle` and `AlertDialogDescription`.
  - **AD-03 & AD-07 (Major/Nit)**: Cleaned ref forwarding without unsafe `(ref as any)` casts.
  - **AD-04 (Major)**: Updated `useAlertDialog()` hook to safely read active state and `onOpenChange` handler from `AlertDialogContext`.
  - Added automated test in `tests/smoke/overlay.test.tsx` asserting `aria-labelledby` binds directly to title ID.


- **`Calendar`** (`src/components/forms/calendar.tsx`):
  - **C-01 (Critical)**: Configured input trigger with `role="combobox"`, `aria-haspopup="dialog"`, `aria-expanded={isOpen}`, and keyboard activation (`Enter`, `Space`, `ArrowDown`).
  - **C-02 (Critical)**: Day buttons now feature full locale date `aria-label` (e.g. `Thursday, October 15, 2026`), `aria-selected`, and `aria-current="date"`.
  - **C-03 (Critical)**: Calendar popup dialog configured with `role="dialog"`, `aria-modal="true"`, `aria-labelledby={titleId}`, with Escape key listener restoring focus to trigger.
  - **C-04 (Critical)**: Replaced raw text month/year navigation buttons with vector `ChevronLeft` and `ChevronRight` icons having explicit `aria-label`s.
  - **C-05 (Critical)**: Implemented 2D WAI-ARIA roving keyboard navigation in date grid (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`, `Home`/`End`, `PageUp`/`PageDown`, `Enter`/`Space`).
  - **C-06 (Major)**: Replaced broken CSS variables with standard design tokens (`--card`, `--border`, `--foreground`, `--popover`).
  - **C-07 & C-08 (Major)**: Added semantic table/grid roles: `role="grid"`, `role="row"`, `role="columnheader"` with `<abbr>`, and `role="gridcell"`.
  - **C-09 (Major)**: Derived date from controlled props (`value` / `selectedDate`) or internal state without duplicate state sync loops.
  - **C-10 (Minor)**: Added `aria-hidden="true"` to trigger icon.
  - **C-11 (Minor)**: Added `{ passive: true, capture: true }` to window scroll listener.
  - Added smoke and a11y tests in `tests/smoke/forms.test.tsx` for full keyboard navigation and axe verification.
