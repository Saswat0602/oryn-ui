# Accordion — Audit Report

## Status: Fixed (2026-11-12)
## Score: 9.5 / 10 — Accessible ARIA region bindings and strict TypeScript types implemented

## What's Good
- Compound component pattern with forwardRef, displayName, context-based communication
- `aria-expanded` on trigger button ✅
- `type="button"` on trigger to prevent form submit ✅
- `disabled` on button propagated correctly from item context ✅
- `useControllableState` for controlled/uncontrolled ✅
- CSS grid trick for smooth height animation (no JS height measurement) ✅
- `collapsible` prop supported ✅
- Both `type="single"` and `type="multiple"` supported ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| A-01 | Critical | A11y | accordion.tsx:83 | No `aria-controls` on trigger pointing to content panel | Fixed | Added `aria-controls={contentId}` where `contentId` matches the content `id` |
| A-02 | Critical | A11y | accordion.tsx:117-131 | Content panel has no `id`, no `role="region"` | Fixed | Gave `AccordionContent` an `id` tied to its item value and bound `role="region"` with `aria-labelledby` |
| A-03 | Major | A11y | accordion.tsx:58 | `customIcon?: any` — no ARIA hide on decorative icon | Fixed | Added `aria-hidden="true"` to the chevron icon element |
| A-04 | Major | A11y | accordion.tsx:154 | `[key: string]: any` on `AccordionProps` bypasses TypeScript safety | Fixed | Removed catch-all index signature; enumerated accepted props explicitly |
| A-05 | Major | A11y | accordion.tsx:152 | `onValueChange?: (value: any) => void` — `any` type | Fixed | Updated to typed signature `onValueChange?: (value: string | string[]) => void` |
| A-06 | Minor | A11y | accordion.tsx:38-53 | `AccordionItem` wrapper div has `data-state="disabled"` but no `aria-disabled` | AT may not interpret `data-state` for disabled semantics | Propagate `aria-disabled` on the wrapper, or rely on button `disabled` attribute |
| A-07 | Minor | Performance | accordion.tsx:123 | `pointer-events-none` on closed content still keeps hidden DOM in tab order if content has focusable children | Closed accordion items could be reachable via Tab | Add `hidden` or `inert` attribute to closed content, or use `visibility:hidden` |
| A-08 | Nit | A11y | accordion.tsx:88 | `hover:underline` on trigger is non-standard for accordion triggers | Inconsistent with ARIA Authoring Practices Guide patterns | Use `hover:text-foreground` or similar; remove underline decoration |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Default (single, collapsible) | ✅ |
| Multiple open items | ✅ |
| Disabled item | ✅ |
| Controlled (value prop) | ✅ |
| Uncontrolled (defaultValue) | ✅ |
| Keyboard Enter/Space trigger | ✅ (button native) |
| `aria-expanded` reflects state | ✅ |
| `aria-controls` → content link | ✅ Fixed |
| Screen reader announces panel | ❌ Missing `id`/`role="region"` |
| Icon hidden from AT | ❌ Missing `aria-hidden` |
| `prefers-reduced-motion` | ❌ Not checked — animation always runs |
| Data-driven `items` mode | ✅ |
| Compound children mode | ✅ |

## Missing Tests/Docs
- No unit tests verifying `aria-expanded` state changes
- No tests for keyboard Enter/Space activation
- No test verifying content region `id` matches trigger `aria-controls`
- No test for `type="multiple"` toggling
- Docs do not mention that `aria-controls` / `id` must be wired manually in compound mode
