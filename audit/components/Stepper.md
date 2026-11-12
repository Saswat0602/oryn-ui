# Stepper — Audit Report

## Score: 8.5 / 10 — High quality progress navigation; unhandled `variant` prop

---

## What's Good
- Full WAI-ARIA progress compliance: sets `aria-current="step"` on active step, with `role="navigation"` and `aria-label="Progress steps"`.
- Excellent screen-reader feedback: announces status in `aria-label` (`"Step title (completed)"`) and includes `.sr-only` text for completed checkmarks.
- Dual orientation support: works in both `horizontal` and `vertical` orientations with responsive collapsing (`hidden sm:inline` for long descriptions).
- Visual progress line: connecting bars dynamically transition from `bg-border/80` to `bg-primary` as steps complete.
- Complete state control: supports controlled `activeStep` (and legacy `currentStep`), defaultStep, and `onStepChange` / `onStepClick`.
- Context hook: exports a fully functional `useStepper()` hook exposing `{ activeStep, orientation, clickable, goToStep }`.
- Design tokens: `bg-primary`, `text-primary-foreground`, `ring-primary/15`, `border-border/80`, `bg-muted/40`, `text-muted-foreground`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| ST-01 | Major | API | stepper.tsx:25, 47–60 | `variant?: "default" | "dots" | "progress"` is declared in `StepperProps` but completely ignored in implementation | Passing `variant="dots"` or `variant="progress"` does nothing; props fall through to the root div as unhandled DOM attributes | Either implement the `dots` and `progress` visual variants or remove them from the interface until implemented |
| ST-02 | Minor | HTML Semantics | stepper.tsx:193–204 | In horizontal layout, the `<button>` is nested inside an outer clickable `<div>` that also calls `goToStep` | Nested interactive elements can cause accessibility tree confusion; title text is not part of the keyboard focus target | Include the title inside the `<button>` element or associate it via `aria-labelledby` |
| ST-03 | Minor | TypeScript | stepper.tsx:11 | `StepItem.icon?: any` | Violates strict zero-any TypeScript rule | Type as `icon?: React.ReactNode` |
| ST-04 | Nit | A11y | stepper.tsx:12 | `StepItem.optional?: boolean` is defined but never rendered or announced to screen readers | Users cannot distinguish required vs optional steps | Render an optional badge/text and add `(Optional)` to `aria-label` when `optional: true` |

---

## State / Variant Matrix

| State / Orientation | Active (`aria-current="step"`) | Completed (Check Icon) | Upcoming | Clickable Navigation | Connecting Line Color |
|---|---|---|---|---|---|
| Horizontal | ✅ Primary ring & bold | ✅ Check icon + primary bg | ✅ Muted border | ✅ `goToStep(idx)` | ✅ Active = primary |
| Vertical | ✅ Continuous layout | ✅ | ✅ | ✅ | ✅ Continuous vertical bar |
| `clickable={false}` | ✅ Display only | ✅ | ✅ | ✅ Disabled cursor & clicks | ✅ |
| `variant="dots"` | ❌ Ignored (Renders default) | ❌ | ❌ | ❌ | ❌ |
| `variant="progress"` | ❌ Ignored (Renders default) | ❌ | ❌ | ❌ | ❌ |

---

## Missing Tests / Docs
- Unit test: Sets `aria-current="step"` on the active step.
- Unit test: Completed steps render the Check icon with sr-only "(Completed)" label.
- Unit test: Clicking step calls `onStepChange` when `clickable={true}`.
- Unit test: Steps are not clickable when `clickable={false}`.
- Unit test: Connecting line color is `bg-primary` for completed indices.
- Docs: Remove or document `variant` prop status.
- Docs: Document `useStepper` context hook and vertical stepper usage.
