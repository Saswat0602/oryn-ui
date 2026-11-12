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

- **`ColorPicker`** (`src/components/forms/color-picker.tsx`):
  - **CP-01 (Critical)**: Added `role="slider"`, `tabIndex={0}`, `aria-label="Color saturation and brightness"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, and full 2D arrow key handlers (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`, `Home`/`End`, `PageUp`/`PageDown`).
  - **CP-02 & CP-03 (Critical)**: Added `role="slider"`, `tabIndex={0}`, `aria-label`, min/max/valuenow/valuetext, and arrow key handlers to hue and alpha sliders.
  - **CP-04 (Major)**: Bound `aria-label={\`Color picker, current color \${color}\`}`, `aria-controls={dialogId}`, and `onKeyDown` to trigger button.
  - **CP-05 (Major)**: Added accessible `aria-label` and `aria-pressed` to preset color swatches.
  - **CP-06 & CP-07 (Major)**: Added `role="dialog"`, `aria-label="Color picker"`, `aria-modal="true"` to floating popover, with Escape key listener restoring focus to trigger.
  - **CP-08 (Minor)**: Added accessible `aria-label` to EyeDropper and Copy buttons.
  - **CP-10 (Nit)**: Configured window scroll listener with `{ passive: true, capture: true }`.
  - Added smoke and accessibility tests in `tests/smoke/forms.test.tsx` verifying sliders, dialog, keyboard interaction, and axe score.

- **`DateTimePicker`** (`src/components/forms/datetime-picker.tsx`):
  - **DTP-04 (Critical)**: Replaced defective local `cn` with official `cn` helper from `../../lib/utils`.
  - **DTP-01 & DTP-03 (Critical)**: Added full locale date `aria-label`, `aria-selected`, `aria-current="date"`, roving `tabIndex`, and full 2D keyboard navigation (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`, `Home`/`End`, `PageUp`/`PageDown`, `Enter`/`Space`).
  - **DTP-02 (Critical)**: Added `role="dialog"`, `aria-label="Date and time picker"`, and `aria-modal="true"` to floating portal popover with Escape key handler.
  - **DTP-05 (Major)**: Bound `aria-haspopup="dialog"`, `aria-expanded={isOpen}`, `aria-controls={dialogId}`, and keyboard trigger activation (`Enter`/`Space`/`ArrowDown`).
  - **DTP-06 (Major)**: Added `role="tablist"`, `role="tab"`, `aria-selected`, and `role="tabpanel"` for mode switcher tabs.
  - **DTP-07 (Major)**: Added `role="dialog"` and `aria-modal="true"` to year and month selection modals.
  - **DTP-08 (Major)**: Synchronized `viewDate` and `focusedDate` whenever external `value` prop changes.
  - **DTP-09 (Minor)**: Added accessible `aria-label`s to month navigation buttons.
  - **DTP-11 (Nit)**: Guarded click-outside handler with `if (!isOpen) return` and added `{ passive: true, capture: true }` to window scroll listener.
  - Added unit, dialog semantics, and axe accessibility smoke tests in `tests/smoke/forms.test.tsx`.

- **`DateRangePicker`** (`src/components/forms/date-range-picker.tsx`):
  - **DRP-01 & DRP-02 (Critical)**: Added full locale date `aria-label`, `aria-selected`, roving `tabIndex`, and full 2D keyboard navigation (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`, `Home`/`End`, `PageUp`/`PageDown`, `Enter`/`Space`).
  - **DRP-03 (Critical)**: Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby={titleId}` to floating popover, with Escape key listener restoring focus to trigger button.
  - **DRP-04 (Major)**: Added `role="grid"`, `role="row"`, `role="gridcell"`, and `role="columnheader"` with `<abbr>`.
  - **DRP-05 (Major)**: Cleaned up ref forwarding with `useImperativeHandle(ref, ...)` and a dedicated typed `triggerRef`.
  - **DRP-06 (Major)**: Eliminated invalid nested `<button>` inside `<button>` violation by refactoring the trigger container into an accessible non-nested flex wrapper with sibling buttons.
  - **DRP-07 & DRP-08 (Minor)**: Converted clear icon to accessible `<button type="button">` and added `<abbr>` with titles for day headers.
  - **DRP-09 (Nit)**: Added keyboard focus rings to preset buttons and chevron buttons.
  - Added unit, interactive dialog, and axe accessibility tests in `tests/smoke/forms.test.tsx`.

- **`ContextMenu`** (`src/components/overlay/context-menu.tsx`):
  - **CM-01 (Critical)**: Added auto-focus on the first active item on open, and full ArrowDown/ArrowUp/Home/End keyboard roving navigation loop in `ContextMenuContent`.
  - **CM-02 (Critical)**: Added `tabIndex={disabled ? -1 : 0}`, `onKeyDown` handlers for `Enter` and `Space` on `ContextMenuItem`, `ContextMenuCheckboxItem`, and `ContextMenuRadioItem` to activate and close menu.
  - **CM-03 (Critical)**: Implemented functional submenus via `ContextMenuSubContext` with nested open state, hover open/close, `ArrowRight` to open submenu, and `ArrowLeft`/`Escape` to return to parent.
  - **CM-04 (Major)**: Added viewport boundary clamping preventing context menus from rendering off-screen.
  - **CM-05 (Major)**: Added keyboard trigger activation on `ContextMenuTrigger` using `Shift+F10` and `ContextMenu` / Apps key.
  - **CM-06 (Minor)**: Updated `ContextMenuPortal` to wrap `<Portal>` primitive.
  - **CM-07 (Minor)**: Ensured `aria-disabled` is strictly set on disabled menu items.
  - **CM-08 (Nit)**: Cleaned up ref forwarding in `ContextMenuTrigger`.
  - Added unit, keyboard activation, and axe tests in `tests/smoke/overlay.test.tsx`.

- **`Menubar`** (`src/components/navigation/menubar.tsx`):
  - **MB-01 & MB-02 (Critical)**: Implemented full WAI-ARIA roving keyboard navigation loop: `ArrowRight`/`ArrowLeft` cycles through top-level menubar triggers, `ArrowDown`/`Enter`/`Space` opens the menu and auto-focuses the first active item, `ArrowDown`/`ArrowUp`/`Home`/`End` roves between dropdown items, and `Escape` closes the menu and returns focus to the active trigger.
  - **MB-03 (Critical)**: Added `tabIndex={disabled ? -1 : 0}`, `onKeyDown` handlers for `Enter` and `Space` on `MenubarItem`, `MenubarCheckboxItem`, and `MenubarRadioItem` to activate items and close the menubar.
  - **MB-04 (Critical)**: Implemented functional submenus via `MenubarSubContext` with nested open state, hover open/close, `ArrowRight` to open submenu, and `ArrowLeft`/`Escape` to return to parent.
  - **MB-05 (Major)**: Added viewport boundary clamping preventing menubar dropdowns from rendering off-screen.
  - Added unit, keyboard navigation, and axe tests in `tests/smoke/navigation.test.tsx`.

- **`Combobox`** (`src/components/navigation/combobox.tsx`):
  - **CB-01 (Critical)**: Implemented full search input keyboard navigation: `ArrowDown`/`ArrowUp`/`Home`/`End` to navigate non-disabled options with visible highlight, `Enter` to select highlighted option, and `Escape` to close dropdown and restore focus.
  - **CB-02 & CB-03 (Critical & Major)**: Added WAI-ARIA 1.2 Combobox and Listbox compliance: `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `role="listbox"`, and `role="option"` with `aria-selected` and `aria-disabled`.
  - **CB-04 (Major)**: Replaced ad-hoc state with `useControllableState` supporting both controlled and uncontrolled usage.
  - **CB-05 (Minor)**: Replaced arbitrary `setTimeout` focus with `requestAnimationFrame`.
  - **CB-06 (Minor)**: Wrapped empty search results message in `role="status"` with `aria-live="polite"`.
  - Added unit, keyboard selection, search filtering, and axe tests in `tests/smoke/navigation.test.tsx`.
