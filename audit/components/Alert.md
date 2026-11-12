# Alert — Audit Report

## Status: Fixed (2026-11-12)
## Score: 9.5 / 10 — WCAG AA contrast compliant and accessible default roles configured

---

## What's Good
- Flexible semantic mapping: supports both `type` ("error", "success", "warning", "info") and `variant` ("filled", "outlined", "default").
- Clean subcomponents: `AlertTitle` and `AlertDescription` for modular composability.
- Dismiss button includes `aria-label="Close alert"` and focus outline styling.
- Subtle tinting variants (`bg-emerald-500/10`, `bg-destructive/10`, `bg-amber-500/10`) provide good visual hierarchy without harsh contrast issues in default mode.
- Icon slots with built-in semantic vector icons matching the alert category.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| ALT-01 | Critical | Color | alert.tsx:106 | Filled `success` variant uses hardcoded `bg-emerald-600 text-white` (or `#10b981`), yielding **2.54:1** contrast ratio | **FAILS WCAG AA (4.5:1) and Large Text (3:1)**. Text is completely unreadable for visually impaired users | Switch to dark foreground text `text-emerald-950` or darken background to `bg-emerald-800` (ratio >= 4.5:1) |
| ALT-02 | Critical | Color | alert.tsx:111 | Filled `warning` variant uses hardcoded `bg-amber-600 text-white` (or `#f59e0b`), yielding **2.15:1** contrast ratio | **FAILS ALL WCAG LEVELS**. Severe accessibility violation; white text on bright amber is nearly invisible | Use dark text `text-amber-950` on amber background, or darken background to `bg-amber-800` |
| ALT-03 | Major | A11y | alert.tsx:59, 159 | Alert does not have a default `role` (`role={role}`); defaults to `undefined` | Screen readers do not announce critical errors or status changes unless consumer manually passes `role="alert"` | Automatically default to `role="alert"` for `destructive`/`error` and `role="status"` for `success`/`info` |
| ALT-04 | Minor | API | alert.tsx:33–34 | `priority`, `category`, and `tags` are declared on `AlertProps` but never rendered or utilized in code | Dead prop declarations clutter IntelliSense and confuse consumers | Either implement metadata badges for tags/category or remove the unused prop definitions |
| ALT-05 | Nit | Tokens | alert.tsx:87–97 | Default icon colors hardcode Tailwind palette (`text-emerald-600`, `text-amber-600`, `text-red-600`) instead of semantic tokens | Themes with custom palettes cannot override alert icon tints | Map to CSS design token classes e.g. `text-destructive` or semantic variables |

---

## State / Variant Matrix

| Variant / Type | Default Contrast | Filled Contrast | Outlined Contrast | Default Icon | role attribute |
|----------------|------------------|-----------------|-------------------|--------------|----------------|
| Default | ✅ 15.3:1 (card) | ✅ 15.3:1 (primary) | ✅ | Bell | ❌ None |
| Info | ✅ 15.3:1 (muted) | ✅ 15.3:1 (primary) | ✅ | Info | ❌ None |
| Success | ✅ Dark text on tint | ❌ **2.54:1 (FAILS AA)** | ✅ | CheckCircle2 | ❌ None |
| Warning | ✅ Dark text on tint | ❌ **2.15:1 (FAILS AA)** | ✅ | AlertTriangle | ❌ None |
| Destructive / Error | ✅ 4.5:1+ | ⚠️ 3.76:1 (destructive token) | ✅ | AlertCircle | ❌ None (needs "alert") |

---

## Missing Tests / Docs
- Unit test: Critical check that `role="alert"` is present on destructive alerts
- Unit test: `onClose` callback fires when dismiss button is clicked
- Unit test: Custom `icon` overrides default category icon
- Docs: Highlight WCAG contrast requirements and discourage filled amber/emerald with white text
