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
  - **AD-02 (Major)**: Added configurable `closeOnEscape?: boolean` prop (default `true`) allowing developers to disable Escape key dismissal on critical/destructive acknowledgment dialogs.
  - **AD-03 & AD-07 (Major/Nit)**: Cleaned ref forwarding without unsafe `(ref as any)` casts.
  - **AD-04 (Major)**: Updated `useAlertDialog()` hook to safely read active state and `onOpenChange` handler from `AlertDialogContext`.
  - Added automated tests in `tests/smoke/overlay.test.tsx` asserting `aria-labelledby` binds directly to title ID and `closeOnEscape={false}` blocks Escape dismissal.


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

- **`Command`** (`src/components/navigation/command.tsx`):
  - **CMD-01 (Critical)**: Implemented full palette keyboard engine with roving keyboard navigation (`ArrowDown`/`ArrowUp`/`Home`/`End`) from `CommandInput` into items, auto-scrolling highlighted items into view.
  - **CMD-02 (Critical)**: Added full WAI-ARIA combobox/listbox accessibility: `role="combobox"`, `role="listbox"`, `role="option"`, `role="group"`, `aria-activedescendant`, `aria-autocomplete="list"`, and `aria-selected`.
  - **CMD-03 (Major)**: Changed `CommandItem` to `tabIndex={-1}` with virtual focus management via `aria-activedescendant`, eliminating keyboard tab-stop spam.
  - **CMD-04 (Major)**: Bound `role="status"` and `aria-live="polite"` to `CommandEmpty`.
  - **CMD-06 (Nit)**: Enforced strict TypeScript `CommandComponent` compound typing, eliminating unsafe monkey-patching.
  - Added unit, arrow key navigation, enter execution, and axe tests in `tests/smoke/navigation.test.tsx`.

- **`DropdownMenu`** (`src/components/overlay/dropdown-menu.tsx`):
  - **DM-01 (Critical)**: Implemented functional nested submenus (`DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`) with hover open/close, `ArrowRight` to expand submenu, and `ArrowLeft`/`Escape` to return to parent menu.
  - **DM-02 (Major)**: Added keyboard `onKeyDown` handlers for Enter and Space to `DropdownMenuCheckboxItem` and `DropdownMenuRadioItem`, enabling keyboard selection.
  - **DM-03 & DM-04 (Major)**: Added trigger measurement fallback for programmatic/controlled `open={true}`, scroll/resize reposition listeners, and viewport boundary clamping.
  - **DM-05 (Minor)**: Removed invalid `onClick?.(e as any)` call inside `DropdownMenuItem.handleKeyDown`.
  - Added unit, keyboard checkbox/radio toggle, submenus, and axe tests in `tests/smoke/overlay.test.tsx`.

- **`Radio`** (`src/components/core/radio.tsx`):
  - **R-01 (Critical)**: Replaced JS-only `{props.checked && ...}` indicator with a CSS-driven `peer-checked:flex` dot indicator, making the selected dot reliably render in both uncontrolled and controlled modes.
  - **R-02 (Major)**: Changed `focus:outline-none` to `focus-visible:outline-none`, restoring natural focus visibility.
  - **R-03 (Major)**: Added `pt-0.5` to label/description column for vertical baseline alignment with multi-line text.
  - **R-04 (Minor)**: Added `peer` class to native `<input>` element, activating `peer-disabled:` styling on labels.
  - Added unit, click toggle, and axe tests in `tests/smoke/core.test.tsx`.

- **`RadioGroup`** (`src/components/forms/radio-group.tsx`):
  - **RG-01 (Critical)**: Implemented full 2D Arrow key navigation (`ArrowDown`/`ArrowRight`/`ArrowUp`/`ArrowLeft`) across radio items, shifting focus and updating selection automatically.
  - **RG-02 (Major)**: Bound `aria-label` and `aria-labelledby` directly to the `role="radiogroup"` element.
  - **RG-03 (Major)**: Added `aria-hidden="true"` to form submission hidden input.
  - **RG-04 (Minor)**: Resolved roving tabindex initial state by assigning `tabIndex={0}` to the first radio item when no option is selected.
  - **RG-05 (Minor)**: Removed redundant label `onClick` handler, allowing native `htmlFor` activation to function without duplicate state calls.
  - **RG-06 (Nit)**: Added `aria-hidden="true"` to decorative `Circle` radio indicator.
  - Added unit, arrow key navigation, and axe tests in `tests/smoke/forms.test.tsx`.

- **`ButtonGroup`** (`src/components/core/button-group.tsx`):
  - **BG-01 (Critical)**: Removed redundant `role="button"` on native button elements to eliminate screen reader double-announcement.
  - **BG-02 (Critical)**: Implemented full roving tabindex and 2D Arrow key navigation (`ArrowDown`/`ArrowRight`/`ArrowUp`/`ArrowLeft`) for segmented `role="radiogroup"` items.
  - **BG-03 (Major)**: Added strict generic type parameter `<T = any>` to `ButtonGroupProps`, `ButtonGroupItemProps`, and `ButtonGroupContextValue`, removing pervasive `any` types.
  - **BG-04 (Major)**: Fixed ARIA attributes compliance so `aria-orientation` is only rendered on supported `role="radiogroup"` containers, avoiding critical axe `aria-allowed-attr` violations on `role="group"`.
  - **BG-05 (Minor)**: Added `cursor-not-allowed` to disabled button group items.
  - **BG-06 (Minor)**: Updated active border token to `border-primary` for consistent contrast across dark and light themes.
  - Added unit, roving tabindex, arrow navigation, and axe tests in `tests/smoke/core.test.tsx`.

- **`HoverCard`** (`src/components/overlay/hover-card.tsx`):
  - **HC-01 (Critical)**: Added `onFocus` and `onBlur` listeners to `HoverCardTrigger`, enabling keyboard users to open and navigate hover cards.
  - **HC-02 (Critical)**: Added global and element-level `Escape` key handlers satisfying WCAG 1.4.13 dismissibility requirements.
  - **HC-03 (Major)**: Added accessible linkage between trigger and dialog content via `aria-describedby` and `data-state` without violating role-allowed attribute constraints on non-button elements.
  - **HC-04 (Major)**: Added automatic viewport boundary collision detection to flip placement from `bottom` to `top` when screen space is constrained.
  - **HC-05 (Major)**: Refactored internal state to `useControllableState` primitive.
  - **HC-06 (Minor)**: Added auto-measurement effect to calculate trigger dimensions during programmatic / controlled `open={true}` and on window resize/scroll.
  - Added unit, keyboard focus, Escape dismissal, and axe tests in `tests/smoke/overlay.test.tsx`.

- **`Collapsible`** (`src/components/overlay/collapsible.tsx`):
  - **CO-01 (Critical)**: Implemented deterministic `aria-controls` on `CollapsibleTrigger` mapped directly to the generated `id` on `CollapsibleContent`.
  - **CO-02 (Major)**: Replaced raw `outline-none` with accessible `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` styling on trigger.
  - **CO-03 (Major)**: Fixed typed ref forwarding on `CollapsibleTrigger` removing unsafe `as any`.
  - **CO-04 & CO-05 (Minor)**: Added `aria-hidden={!open}` and `pointer-events-none` on collapsed content to ensure screen readers and pointers ignore hidden content.
  - Added unit, aria-controls linkage, toggle click, and axe tests in `tests/smoke/overlay.test.tsx`.

- **`Slider`** (`src/components/core/slider.tsx`):
  - **SL-01 (Critical)**: Removed unsafe `[key: string]: any` index signature from `SliderProps`, restoring full TypeScript type safety while preserving standard HTML attribute spreading.
  - **SL-02 (Major)**: Implemented full vertical orientation positioning (`bottom: Y%`, `transform: translate(-50%, 50%)`, vertical active range height, and min-height track styling).
  - **SL-03 (Major)**: Bound `aria-orientation={orientation}` and explicit `aria-label`/`aria-labelledby` directly on slider thumbs.
  - **SL-04 (Major)**: Added `touch-none` directly to thumbs to prevent mobile touch conflict during dragging.
  - **SL-06 (Minor)**: Added `motion-safe:transition-colors` adhering to user motion preferences.
  - Added unit, vertical slider, range slider constraint, keyboard navigation (Home/End), and axe tests in `tests/smoke/core.test.tsx`.

- **`MultiSelect`** (`src/components/forms/multi-select.tsx`):
  - **MS-01 & MS-02 (Critical)**: Implemented full keyboard listbox navigation with `ArrowDown`/`ArrowUp`/`Enter`/`Space`, `focusedIndex` state, option auto-scrolling, `tabIndex={-1}`, and `aria-activedescendant`.
  - **MS-03 (Major)**: Added keyboard focus and Enter/Space handlers to individual tag remove buttons.
  - **MS-04 (Major)**: Marked empty placeholder span with `aria-hidden="true"`.
  - **MS-05 (Major)**: Added screen reader live region (`role="status"` with `aria-live="polite"`) announcing item additions and removals.
  - **MS-06 & MS-07 (Minor)**: Added `focus-visible:ring-2` to combobox trigger and bound `aria-controls` unconditionally to the listbox ID.
  - **MS-08 (Nit)**: Replaced `icon?: any` with `React.ReactNode`.
  - Added unit, arrow key listbox navigation, backspace removal, and axe tests in `tests/smoke/forms.test.tsx`.

- **`Pagination`** (`src/components/navigation/pagination.tsx`):
  - **PG-01 (Critical)**: Bound `aria-current="page"` to the active page button in both automated and declarative modes.
  - **PG-02 (Major)**: Fixed HTML list semantics (WCAG 1.3.1) by ensuring `PaginationContent` (`<ul>`) renders `PaginationItem` (`<li>`) wrappers for all buttons and ellipses.
  - **PG-03 (Minor)**: Added descriptive screen reader labels (`aria-label="Current page, page X"` and `"Go to page X"`).
  - **PG-04 (Minor)**: Enforced accessible minimum touch targets across pagination items.
  - **PG-05 (Nit)**: Implemented strict `PaginationComponent` compound typing, eliminating monkey-patching.
  - Added unit, automated mode, compound mode, and axe tests in `tests/smoke/navigation.test.tsx`.

- **`Rating`** (`src/components/core/rating.tsx`):
  - **RA-01 (Critical)**: Fixed keyboard accessibility by ensuring the container maintains `tabIndex={0}` in both interactive and `readOnly` modes so screen readers and keyboard users can discover ratings.
  - **RA-04 (Major)**: Added explicit `role="radio"` and `aria-checked` to each individual star button within `role="radiogroup"`, satisfying WAI-ARIA parent-child role specifications.
  - **RA-02 & RA-03 (Major)**: Migrated hardcoded colors to theme-compatible tokens with dark mode support (`text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400`) and customizable `activeColor` prop.
  - **RA-05 (Minor)**: Added contextual `aria-label` per star button.
  - **RA-06 (Minor)**: Added `motion-safe:` prefixes on hover and active scale animations.
  - Added unit, role=radio validation, and axe tests in `tests/smoke/core.test.tsx`.

- **`Select`** (`src/components/core/select.tsx`):
  - **SE-01 & SE-02 (Critical)**: Implemented full keyboard roving listbox navigation (`ArrowDown`/`ArrowUp`/`Home`/`End`/`Enter`/`Space`), `focusedValue` state, option auto-scrolling, `tabIndex={-1}`, and `aria-activedescendant` on both trigger and listbox.
  - **SE-03 (Major)**: Added `Tab` and `Escape` focus restoration to `triggerRef.current?.focus()`, closing listbox and retaining proper focus flow.
  - **SE-04 (Major)**: Replaced raw `focus:ring-1` with accessible `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1`.
  - **SE-05 (Major)**: Implemented label registry map ref (`registerOptionLabel`) and direct `options` fallback, eliminating stale label resets during programmatic value changes.
  - **SE-06 (Minor)**: Added `SelectGroupContext` with deterministic `labelId` auto-wiring `aria-labelledby` on `SelectGroup`.
  - **SE-07 (Minor)**: Added `motion-safe:` prefixes on enter/exit animations.
  - Added unit, dropdown selection, keyboard navigation, and axe tests in `tests/smoke/core.test.tsx`.

- **`Dialog`** (`src/components/overlay/dialog.tsx`):
  - **DG-01 (Major)**: Preserved `triggerRef` in `DialogContext` and automatically restored focus to the trigger upon modal close.
  - **DG-02 (Major)**: Implemented deterministic `titleId` and `descriptionId` in root provider, automatically linking `aria-labelledby` and `aria-describedby` on `DialogContent` to `DialogTitle` and `DialogDescription`.
  - **DG-03 (Major)**: Implemented `useDialog()` and `useDialogContext()` to safely read active state and `onOpenChange` handler from `DialogContext`.
  - **DG-06 (Nit)**: Cleaned typed ref forwarding without unsafe `(ref as any)` casts.
  - Added unit, dialog `aria-labelledby` validation, and axe tests in `tests/smoke/overlay.test.tsx`.

- **`Checkbox`** (`src/components/core/checkbox.tsx`):
  - **CB-01 (Major)**: Replaced hardcoded `text-red-500 dark:text-red-400` with semantic token `text-destructive`.
  - **CB-02 (Major)**: Removed redundant `onClick` handler on `<label htmlFor={checkboxId}>`, eliminating double-toggle regressions on label clicks.
  - **CB-03 (Major)**: Added typed `CheckboxChangeEvent` interface for `onChange` callback.
  - Added unit, label single-toggle regression, and axe tests in `tests/smoke/core.test.tsx`.

- **`Form`** (`src/components/forms/form.tsx`):
  - **FM-01 (Major)**: Replaced hardcoded `text-red-500` error label styling with semantic token `text-destructive`.
  - **FM-02 (Major)**: Mapped `FormMessage` error variant to `text-destructive`, success to `text-emerald-700 dark:text-emerald-400`, and warning to `text-amber-700 dark:text-amber-400`.
  - **FM-03 & FM-07 (Major/Nit)**: Removed unsafe `[key: string]: any` catch-all index signatures from `FormContextValue` and `FormFieldError`.
  - **FM-05 (Minor)**: Added `required` prop on `FormLabel` with accessible visual asterisk indicator.
  - **FM-06 (Minor)**: Cleaned typed ref forwarding and eliminated redundant `aria-invalid` on fallback div wrappers.
  - Added unit, required indicator, aria-invalid, and axe tests in `tests/smoke/forms.test.tsx`.

- **`Popover`** (`src/components/layout/popover.tsx`):
  - **POP-01 (Major)**: Implemented automatic initial focus on open and focus restoration to `triggerRef` on dismiss.
  - **POP-02 (Major)**: Added deterministic `contentId` and linked `aria-controls={open ? contentId : undefined}` on `PopoverTrigger`.
  - **POP-03 (Major)**: Connected `usePopover()` directly to `PopoverContext` to read active state.
  - **POP-04 (Minor)**: Added viewport boundary collision detection with vertical auto-flipping.
  - **POP-05 (Nit)**: Removed `[key: string]: any` from `PopoverProps` and typed refs strictly without `any` casts.
  - Added unit, aria-controls linkage, Escape dismissal, and axe tests in `tests/smoke/layout.test.tsx`.

- **`FileUpload`** (`src/components/forms/file-upload.tsx`):
  - **FU-01 (Major)**: Replaced hardcoded `text-red-600 dark:text-red-400` with semantic design token `text-destructive`.
  - **FU-02 (Major)**: Added `role="button"` and `aria-label="Upload files. Click or drag and drop."` to dropzone container, and made the hidden file input a non-nested sibling to avoid axe `nested-interactive` violations.
  - **FU-03 (Major)**: Added `role="alert"` to error message container for screen reader announcements.
  - **FU-04 & FU-05 (Minor)**: Added `aria-disabled={disabled}` to dropzone and `tabIndex={-1} aria-hidden="true"` to hidden file input.
  - Added unit, accessible dropzone role, and axe tests in `tests/smoke/forms.test.tsx`.

- **`Progress`** (`src/components/core/progress.tsx`):
  - **PR-01 (Major)**: Enforced semantic design classes across success, warning, and destructive variants.
  - **PR-02 & PR-05 (Major/Minor)**: Added `motion-safe:` prefixes on indicator transitions and indeterminate pulsing animations.
  - **PR-03 (Major)**: Added accessible `aria-valuetext="Loading..."` during indeterminate loading and percentage readout during determinate progress.
  - **PR-04 (Minor)**: Added `barRef` prop to allow direct ref attachment to the progressbar element in labeled mode.
  - Added unit, aria-valuenow/aria-valuetext validation, and axe tests in `tests/smoke/core.test.tsx`.

- **`Navbar`** (`src/components/layout/navbar.tsx`):
  - **NAV-01 (Major)**: Added `aria-expanded={isMobileMenuOpen}` and `aria-controls="navbar-mobile-menu"` on mobile hamburger button and `id="navbar-mobile-menu"` on mobile menu container.
  - **NAV-02 (Major)**: Added `aria-haspopup="menu"`, `aria-expanded={isDropdownOpen}`, `aria-controls`, `role="menu"`, and roving ArrowDown/ArrowUp keyboard navigation with Escape return to nav item dropdowns.
  - **NAV-03 (Major)**: Implemented Escape key dismissal with focus restoration to trigger and outside click handling for notification and profile dropdowns.
  - **NAV-04 (Minor)**: Added accessible screen reader context to notification count badge.
  - **NAV-05 (Minor)**: Replaced hardcoded `text-red-500` with semantic token `text-destructive`.
  - Added unit, mobile menu toggle, notification dialog, and axe tests in `tests/smoke/layout.test.tsx`.

- **`PasswordInput`** (`src/components/forms/password-input.tsx`):
  - **PI-01 (Major)**: Derived `currentValue` reliably from `value`, `internalValue`, and `defaultValue`, ensuring controlled strength calculation stays synchronized.
  - **PI-02 & PI-03 (Major)**: Replaced hardcoded `bg-red-500` with semantic design token `bg-destructive` and standardized emerald tokens across strength meter and requirement indicators.
  - **PI-04 & PI-07 (Minor/Nit)**: Added `role="meter"`, `aria-label="Password strength"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` to the strength meter container.
  - **PI-05 & PI-06 (Minor)**: Added `aria-live="polite"` to the requirements checklist and `role="status"` with `aria-live="assertive"` to the CapsLock detection badge.
  - Added unit, meter attributes validation, and axe tests in `tests/smoke/forms.test.tsx`.

- **`Card`** (`src/components/core/card.tsx`):
  - **C-01 (Major)**: Added automatic `role="button"`, `tabIndex={0}`, keyboard Enter/Space activation, and `focus-visible:ring-2` to clickable cards.
  - **C-02 (Minor)**: Added `motion-safe:hover:-translate-y-0.5` guard to hoverable cards.
  - **C-03 (Minor)**: Supported polymorphic `as` prop on `CardTitle` (defaulting to `"h3"`).
  - **C-04 (Minor)**: Updated `CardFooter` text style to `text-card-foreground` so nested buttons retain proper contrast.
  - Added unit, clickable card role and keyboard activation, and axe tests in `tests/smoke/core.test.tsx`.

- **`Carousel`** (`src/components/media/carousel.tsx`):
  - **CAR-01 (Major)**: Paused autoplay slideshow timer whenever the carousel container is hovered (`onMouseEnter`/`onMouseLeave`) or keyboard focused (`onFocus`/`onBlur`) satisfying WCAG 2.1 SC 2.2.2.
  - **CAR-03 (Minor)**: Supported bubbling keyboard navigation from within focused child controls.
  - Added unit, keyboard arrow navigation, hover/focus events, and axe tests in `tests/smoke/media.test.tsx`.

- **`Breadcrumbs`** (`src/components/forms/breadcrumbs.tsx`):
  - **B-01 (Major)**: Removed misleading `role="link"` and `aria-disabled="true"` on non-navigable `BreadcrumbPage`, adhering to WAI-ARIA breadcrumb guidelines with `aria-current="page"`.
  - **B-02 (Minor)**: Added `focus-visible:ring-2 focus-visible:ring-ring` and `disabled:pointer-events-none` to action button breadcrumb items.
  - Added unit, aria-current="page" validation, role=link exclusion, and axe tests in `tests/smoke/forms.test.tsx`.

- **`Toggle`** (`src/components/overlay/toggle.tsx`):
  - **TG-01 (Major)**: Replaced `any` types on `ToggleGroupProps`, `value`, `defaultValue`, and `onValueChange` with strict `string | string[]` union typing.
  - **TG-02 (Minor)**: Implemented 2D arrow key roving navigation (`ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`, `Home`/`End`) across group items.
  - **TG-03 (Minor)**: Added square `icon` size preset (`h-9 w-9 p-0`).
  - Added unit, arrow key roving navigation, and axe tests in `tests/smoke/overlay.test.tsx`.

- **`TreeView`** (`src/components/data/tree-view.tsx`):
  - **TRV-01 & TRV-02 (Major/Minor)**: Implemented full roving tabindex with dynamic visible node tracking, ArrowUp/ArrowDown vertical navigation, and Home/End jumping across visible tree nodes.
  - **TRV-03 (Minor)**: Marked chevron toggle wrapper with `aria-hidden="true"` and added `focus-visible:ring-2` to tree items.
  - Added unit, roving tabindex validation, ArrowDown navigation, and axe tests in `tests/smoke/data.test.tsx`.

- **`Sonner`** (`src/components/feedback/sonner.tsx`):
  - **SON-01 (Major)**: Added accessible `<span className="sr-only">Loading</span>` to `Loader2` spinner container and `motion-safe:animate-spin` on loading toast items.
  - **SON-02 (Minor)**: Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` on action and dismiss buttons.
  - Added unit tests for loading state toast with accessible sr-only text in `tests/smoke/feedback.test.tsx`.

- **`Timeline`** (`src/components/data/timeline.tsx`):
  - **TIM-01 (Major)**: Replaced hardcoded `bg-rose-600 text-white border-rose-600 ring-4 ring-rose-50 dark:ring-rose-950/40` with semantic design tokens `bg-destructive text-destructive-foreground border-destructive ring-4 ring-destructive/20`.
  - **TIM-02 (Minor)**: Added `motion-safe:animate-pulse` to the current status node to respect reduced motion settings.
  - Added unit, error status, and axe tests in `tests/smoke/data.test.tsx`.

- **`Badge`** (`src/components/media/badge.tsx`):
  - **BDG-01 (Major)**: Enforced `#dc2626` base destructive design tokens guaranteeing >= 4.8:1 contrast ratio across `destructive` and `error` badges.
  - **BDG-02 (Minor)**: Updated `warning` variant to `text-amber-800 dark:text-amber-300` achieving >= 5.5:1 contrast ratio against subtle tinted backgrounds.
  - **BDG-03 (Nit)**: Added interactive `role="button"` and `tabIndex={0}` when `onClick` is provided, alongside `focus-visible:` styling.
  - Added unit, all variant rendering, clickable badge interaction, and axe tests in `tests/smoke/media.test.tsx`.

- **`PromptInput`** (`src/components/forms/prompt-input.tsx`):
  - **PRI-01 (Major)**: Added accessible `aria-label={props['aria-label'] || placeholder || 'Message prompt'}` to the internal `<textarea>`.
  - **PRI-06 (Nit)**: Replaced low-contrast `text-muted-foreground/50` on disabled submit button with `text-muted-foreground opacity-60` and added `focus-visible:` focus rings.
  - Added unit, textarea aria-label verification, and axe tests in `tests/smoke/forms.test.tsx`.

- **`Sheet`** (`src/components/layout/sheet.tsx`):
  - **SHT-01 (Major)**: Generated unique `titleId` and `descriptionId` via `SheetContext` and auto-wired `aria-labelledby` and `aria-describedby` on `SheetContent`.
  - **SHT-02 (Major)**: Implemented focus restoration capturing `SheetTrigger` and restoring keyboard focus on sheet dismissal.
  - **SHT-03 (Major)**: Connected `useSheet()` directly to `SheetContext` to return live `open` state and `setOpen` callback.
  - Added unit, automatic aria-labelledby linkage, and axe tests in `tests/smoke/layout.test.tsx`.

- **`Sidebar`** (`src/components/layout/sidebar.tsx`):
  - **SIB-01 (Major)**: Added `aria-expanded` and `aria-controls="sidebar-navigation"` on `SidebarTrigger` and collapse/expand toggle buttons, with `id="sidebar-navigation"` on `<aside>`.
  - **SIB-02 (Major)**: Added `group-focus-visible:flex` to collapsed-mode tooltip popovers ensuring keyboard users can inspect navigation item labels.
  - Added unit, aria-expanded/controls validation, and axe tests in `tests/smoke/layout.test.tsx`.

- **`Skeleton`** (`src/components/core/skeleton.tsx`):
  - **SK-01 (Major)**: Added `role="status"`, `aria-label="Loading..."`, `aria-busy="true"`, and a hidden `<span className="sr-only">Loading...</span>` landmark for screen readers.
  - **SK-02 (Major)**: Forwarded `ref` and native `{...props}` to the outer wrapper element on multi-line skeletons (`lines > 1`).
  - **SK-03 (Minor)**: Guarded animations with `motion-safe:animate-pulse` to respect user motion preferences.
  - Added unit, multi-line ref forwarding, role=status, and axe tests in `tests/smoke/core.test.tsx`.

- **`Stepper`** (`src/components/navigation/stepper.tsx`):
  - **ST-01 (Major)**: Implemented full visual rendering for `dots` (compact indicators with halo rings) and `progress` (segmented horizontal progress bars).
  - **ST-04 (Nit)**: Added support for `optional?: boolean` on `StepItem` rendering `(Optional)` tags and appending to accessible `aria-label`.
  - Added unit, dots/progress variants, optional step readout, and axe tests in `tests/smoke/navigation.test.tsx`.

- **`Switch`** (`src/components/core/switch.tsx`):
  - **SW-01 (Major)**: Exported strongly typed `SwitchChangeEvent` interface and typed `onChange?: (e: SwitchChangeEvent) => void`.
  - **SW-02 (Major)**: Removed redundant `onClick` handler from label element, eliminating double-toggle bug caused by native `htmlFor` click synthesis on buttons.
  - **SW-03 (Minor)**: Added `motion-safe:transition-transform` on thumb element to respect reduced-motion settings.
  - **SW-05 (Minor)**: Linked `aria-describedby` on the switch button to description paragraph element ID.
  - Added unit test in `tests/smoke/core.test.tsx` asserting label click toggles state cleanly without double-toggle and binds `aria-describedby`.

- **`Table`** (`src/components/data/table.tsx`):
  - **TAB-01 (Major)**: Added `scope="col"` by default to `TableHead` primitive and all column `<th>` elements in data-driven table mode.
  - **TAB-02 (Major)**: Added `aria-sort` (`"ascending"`, `"descending"`, or `"none"`) to sortable column headers.
  - **TAB-03 (Minor)**: Added accessible `aria-label` attributes (`"Select all rows"` and `"Select row X"`) to row selection checkboxes.
  - **TAB-05 (Nit)**: Typed `value: unknown` on `onEditCell` callback for strict typing.
  - Added unit tests in `tests/smoke/data.test.tsx` asserting `scope="col"`, `aria-sort` toggling, and accessible selection checkboxes.

- **`DataTable`** (`src/components/data/data-table.tsx`):
  - **DTT-01 (Major)**: Added `aria-sort` (`"ascending"`, `"descending"`, or `"none"`) to sortable `TableHead` elements.
  - **DTT-02 (Major)**: Added accessible descriptive `aria-label` to column header sort buttons (`Sort by X in ascending/descending order`).
  - **DTT-03 (Minor)**: Explicitly passed `scope="col"` on header cells.
  - Added unit test in `tests/smoke/data.test.tsx` asserting `scope="col"`, sort button `aria-label`, and `aria-sort` toggling.

- **`Tabs`** (`src/components/forms/tabs.tsx`):
  - **TB-01 & TB-03 (Major)**: Preserved inactive panels in the DOM with `hidden` attribute and matching `id` so `aria-controls` targets always resolve for assistive technologies.
  - **TB-02 (Major)**: Automatically wired `aria-controls` on `TabsTrigger` pointing directly to the corresponding `TabsContent` panel ID.
  - **TB-04 (Minor)**: Bound `aria-labelledby` on `TabsContent` pointing to the matching `TabsTrigger` ID.
  - Added unit and keyboard tests in `tests/smoke/forms.test.tsx` verifying arrow navigation and `aria-controls`/`aria-labelledby` IDs.

- **`Textarea`** (`src/components/core/textarea.tsx`):
  - **TA-02 (Major)**: Automatically propagate `aria-invalid={isError ? "true" : undefined}` when `error` prop is set so assistive technologies announce invalid input states.
  - Added unit test in `tests/smoke/core.test.tsx` asserting `aria-invalid="true"` on error state.

- **`TimePicker`** (`src/components/forms/time-picker.tsx`):
  - **TP-01 (Major)**: Added `aria-invalid={error || props["aria-invalid"] ? "true" : undefined}` to both hour and minute spinbutton inputs.
  - **TP-02 (Major)**: Wired `aria-describedby` to both spinbutton inputs for form validation error linkage.
  - **TP-03 (Minor)**: Updated AM/PM button `aria-label` to dynamically announce current period (`Toggle AM/PM, currently X`).
  - **TP-04 & TP-06 (Minor/Nit)**: Replaced `:focus` with `:focus-visible` styling on numeric inputs and added `aria-hidden="true"` to decorative clock icon.
  - Added unit test in `tests/smoke/forms.test.tsx` asserting `aria-invalid="true"` and `aria-describedby` linkage on hour and minute inputs.

- **`Tooltip`** (`src/components/layout/tooltip.tsx`):
  - **TLT-01 (Major)**: Removed `pointer-events-none` on `TooltipContent` and added enter/leave delay buffers allowing users to hover over tooltip content per WCAG 2.1 SC 1.4.13.
  - **TLT-02 (Major)**: Added global `keydown` event listener to dismiss open tooltip when `Escape` key is pressed.
  - **TLT-03 (Major)**: Connected `useTooltip()` hook to `TooltipContext` so it returns live `open` and `setOpen` values.
  - **TLT-05 (Nit)**: Strongly typed timer refs with `ReturnType<typeof setTimeout> | null`.
  - Added unit tests in `tests/smoke/layout.test.tsx` asserting Escape dismissal and hoverable content.

- **`Chart`** (`src/components/data/chart.tsx`):
  - **CHT-01 (Major)**: Added `role="img"` and descriptive `aria-label` across all vector chart SVG elements (`AreaChart`, `BarChart`, `LineChart`, `PieChart`, and `RadialBarChart`).
  - Added unit test in `tests/smoke/data.test.tsx` asserting `role="img"` and `aria-label` on SVG chart graphics.

- **`Button`** (`src/components/core/button.tsx`):
  - **B-01 (Major)**: Enforced accessible naming conventions and verified `aria-label` propagation on icon-only buttons (`size="icon"`).
  - **B-03 (Minor)**: Added `@deprecated Use loading instead` JSDoc annotation to legacy `isLoading` prop.
  - **B-04 (Minor)**: Added `motion-safe:animate-spin` on loading spinner SVG to respect user reduced-motion preferences.
  - Added unit tests in `tests/smoke/core.test.tsx` asserting `loading` disabled behavior, `aria-busy`, and icon button `aria-label`.

- **`Input`** (`src/components/core/input.tsx`):
  - **I-02 (Major)**: Automatically set `aria-invalid={ariaInvalid}` on the rendered `<input>` element whenever `error` or `props["aria-invalid"]` is active.
  - **I-03 (Minor)**: Added `aria-hidden="true"` and `pointer-events-none` to `leftIcon` and `rightIcon` wrapper containers so decorative icons don't pollute screen reader output.
  - **I-04 (Minor)**: Added `min-w-0` to the icon wrapper container `<div>` to eliminate overflow when placed in flexbox layouts.
  - Added unit test in `tests/smoke/core.test.tsx` asserting `aria-invalid="true"` propagation on error state.

- **`InputGroup`** (`src/components/core/input-group.tsx`):
  - **IG-01 (Major)**: Wired `size` prop ("sm" | "default" | "lg") via `InputGroupContext` so padding and font size adjust automatically on `InputGroupAddon`.
  - **IG-02 (Major)**: Added semantic default `role="group"` on `InputGroup` container to establish accessible control grouping for screen readers.
  - Added unit test in `tests/smoke/core.test.tsx` verifying `role="group"` and `data-size` propagation.

- **`InputOTP`** (`src/components/forms/input-otp.tsx`):
  - **OTP-01 (Major)**: Added support for uncontrolled mode with `defaultValue` and optional `onChange` callback, preventing runtime exceptions when uncontrolled.
  - **OTP-02 (Major)**: Forwarded `id`, `name`, `aria-describedby`, and `aria-invalid` props directly to the interactive hidden `<input>` element so Form validation and helper text link accurately.
  - **OTP-04 (Minor)**: Added `aria-hidden="true"` to each `InputOTPSlot` container div to prevent screen readers from announcing duplicate visual slot elements.
  - Added unit test in `tests/smoke/forms.test.tsx` asserting uncontrolled state, value change, and `id`/`aria-describedby` forwarding.

- **`NumberInput`** (`src/components/forms/number-input.tsx`):
  - **NI-01 (Major)**: Strongly typed `timeoutRef` and `intervalRef` as `ReturnType<typeof setTimeout> | null` and `ReturnType<typeof setInterval> | null` to preserve TypeScript type safety.
  - **NI-02 (Major)**: Automatically set `aria-invalid={ariaInvalid}` on the spinbutton `<input>` element whenever `error` or `props["aria-invalid"]` is active.
  - Added unit test in `tests/smoke/forms.test.tsx` verifying error state and `aria-invalid="true"` propagation.

- **`Modal`** (`src/components/layout/modal.tsx`):
  - **MOD-01 (Major)**: Implemented `previousActiveElement` focus tracking and automatic focus restoration on modal close and unmount to prevent keyboard focus dropping to `document.body`.
  - **MOD-02 (Major)**: Added accessible name fallback (`aria-labelledby` or `aria-label="Dialog"`) when `title` is omitted so assistive technologies can always announce the dialog purpose.
  - **MOD-04 (Minor)**: Added `aria-hidden="true"` to the modal backdrop overlay element and close button icon.
  - Added unit test in `tests/smoke/layout.test.tsx` verifying `role="dialog"`, accessible name, and close action.

- **`Drawer`** (`src/components/layout/drawer.tsx`):
  - **DR-01 (Major)**: Added `title` prop with auto-generated `titleId` wired to `aria-labelledby`, plus `aria-label="Drawer"` fallback so screen readers announce dialog purpose.
  - **DR-02 (Major)**: Implemented `previousActiveElement` focus tracking and restoration upon drawer close and unmount.
  - **DR-04 (Minor)**: Added `aria-hidden="true"` to the drawer backdrop overlay element and close button vector icon.
  - Added unit test in `tests/smoke/layout.test.tsx` verifying `role="dialog"`, `aria-modal="true"`, title linkage, and close button action.

- **`Layout`** (`src/components/layout/layout.tsx`):
  - **LAY-01 (Major)**: Added accessible `<a href="#main-content">Skip to content</a>` link at the root of the layout shell for keyboard and screen reader bypass navigation per WCAG 2.4.1.
  - **LAY-02 (Major)**: Zeroed `sidebarOffset` when `overlaySidebar` or `isMobile` is active to prevent content from being squished or overflowing the viewport.
  - **LAY-03 (Minor)**: Replaced unthrottled window resize event with `window.matchMedia` change listener to eliminate re-render churn during window resizing.
  - **LAY-04 (Minor)**: Configured default `id="main-content"` on the primary `<main>` landmark element.
  - Added unit test in `tests/smoke/layout.test.tsx` verifying the Skip to Content link and `<main id="main-content">` element.

- **`NavigationMenu`** (`src/components/navigation/navigation-menu.tsx`):
  - **NM-01 (Major)**: Implemented keyboard tab delegation from `NavigationMenuTrigger` into `NavigationMenuContent` and Shift+Tab return flow to ensure accessible tab order regardless of whether content is rendered inline or portaled.
  - **NM-05 (Nit)**: Replaced untyped monkey-patched compound exports with typed `CompoundedNavigationMenu` interface for complete TypeScript safety.
  - Added unit test in `tests/smoke/navigation.test.tsx` asserting trigger click, `aria-expanded` toggling, and Escape key dismissal.

- **`Form`** (`src/components/forms/form.tsx`):
  - **FM-04 (Major)**: Enhanced `FormField` controller adapter to support checkboxes (`checked`), custom objects, validation triggers, and dirty state updates during render-prop execution.
  - Added unit test in `tests/smoke/forms.test.tsx` asserting both standalone error propagation and RHF render-prop/control callback handling.

- **`Accordion`** (`src/components/forms/accordion.tsx`):
  - **A-06 (Minor)**: Propagated `aria-disabled={disabled ? 'true' : undefined}` on the item container wrapper to explicitly communicate disabled state to assistive technology.
  - **A-07 (Minor)**: Added `style={{ visibility: open ? undefined : 'hidden' }}` and `aria-hidden={!open}` on `AccordionContent` to ensure inactive accordion panels and any nested focusable controls are completely excluded from the keyboard Tab order when closed.
  - Added unit test assertion in `tests/smoke/forms.test.tsx` verifying `visibility: hidden` and `aria-hidden="true"` when collapsed.

- **`Alert`** (`src/components/feedback/alert.tsx`):
  - **ALT-04 (Minor)**: Activated previously unused `priority`, `category`, `tags`, `loading`, `dismissible`, and `onDismiss` props. Added `data-priority` and `data-category` attributes, rendered tag/category badges when provided, integrated spinning `Loader2` indicator when `loading=true`, and hooked up dismissible event callbacks.
  - Added unit test assertion in `tests/smoke/feedback.test.tsx` verifying metadata attributes, tags, loading state, and dismiss handling.

- **`Avatar`** (`src/components/media/avatar.tsx`):
  - **AVA-01 (Minor)**: Removed generic default `alt="Avatar"` string in `AvatarImage`, defaulting to `alt=""` or user-supplied name to avoid confusing screen reader announcements.
  - **AVA-02 (Minor)**: Added `role="status"` and accessible `aria-label={`${hiddenCount} more members`}` with visually hidden text on `AvatarGroup` overflow badge indicator.
  - **AVA-03 (Nit)**: Added `rtl:space-x-reverse` on `AvatarGroup` for right-to-left layout compatibility.
  - Added unit test assertion in `tests/smoke/media.test.tsx` validating accessible label on group overflow badge.

- **`Banner`** (`src/components/feedback/banner.tsx`):
  - **BAN-01 (Minor)**: Added `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` on dismiss button for clear keyboard focus indication.
  - **BAN-02 (Minor)**: Applied semantic design tokens `text-destructive`, `border-destructive/20`, and semantic variable tints to support custom themes.
  - **BAN-03 (Nit)**: Strongly typed `icon?: React.ReactNode` in `BannerProps`.
  - Added unit test assertion in `tests/smoke/feedback.test.tsx` verifying focus-visible rings and destructive token classes.

- **`Checkbox`** (`src/components/core/checkbox.tsx`):
  - **CB-04 (Minor)**: Standardized conditional cursor class resolution (`disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'`) on both checkbox control and associated label for visual state consistency.
  - **CB-05 (Minor)**: Clarified tri-state indeterminate transition cycle adhering to W3C specification.

- **`Dialog`** (`src/components/overlay/dialog.tsx`):
  - **DG-04 (Minor)**: Added scrollbar width calculation and padding compensation to `document.body` during scroll lock to eliminate horizontal layout shifts on desktop browsers.
  - **DG-05 (Minor)**: Documented standard overlay scrim styling and customizable `className` override support.

- **`EmptyState`** (`src/components/feedback/empty-state.tsx`):
  - **EMP-01 (Minor)**: Added default `role="status"` and `aria-live="polite"` to proactively announce empty search/filter result states to assistive technology.
  - **EMP-02 (Nit)**: Strongly typed `icon?: React.ReactNode | React.ComponentType<{ className?: string }>` in `EmptyStateProps` and `EmptyStateIconProps`.
  - Added unit test assertion in `tests/smoke/feedback.test.tsx` verifying status role and live region.

- **`FileUpload`** (`src/components/forms/file-upload.tsx`):
  - **FU-06 (Minor)**: Implemented file type and extension validation against the `accept` prop (supporting extensions, MIME types, and wildcards) with descriptive error announcements.
  - Added unit test assertion in `tests/smoke/forms.test.tsx` verifying file type filtering.

- **`Kbd`** (`src/components/media/kbd.tsx`):
  - **KBD-01 (Minor)**: Added `aria-label` and visually hidden fallback text mapping shortcut symbols (e.g. ⌘ to "Command", ⌥ to "Option", ↵ to "Enter") so assistive technologies clearly announce shortcut keys.
  - Added unit test assertion in `tests/smoke/media.test.tsx` verifying accessible labels on formatted key symbols.
