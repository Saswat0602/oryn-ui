# Chart — Audit Report

## Score: 8.0 / 10 — Custom vector charting engine with keyboard and screen reader accessibility gaps

---

## What's Good
- Zero external charting runtime dependencies: lightweight custom SVG charts (`AreaChart`, `BarChart`, `LineChart`) without pulling heavy charting libraries.
- CSS Variable theming: `ChartContainer` and `ChartStyle` inject scoped `--color-<key>` variables for theme-aware palettes.
- High visual craft: smooth cubic Bézier spline interpolation (`getCubicBezierSpline`), area gradient fills, and interactive crosshair hover lines.
- Modular tooltip and legend subcomponents: `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, and `ChartLegendContent`.
- Backward compatibility: supports both multi-series modern objects and legacy single-series `{ label, value }` data arrays.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| CHT-01 | Major | A11y | chart.tsx:419, 642 | Root `<svg>` elements lack `role="img"` and accessible title/description (`<title>`, `<desc>`, or `aria-label`) | Screen readers announce an unlabelled graphic and attempt to parse raw coordinates or numeric text elements out of context | Add `role="img"` and `aria-label` to `<svg>`, and include `<title>` and `<desc>` summarizing key chart trends |
| CHT-02 | Major | A11y | chart.tsx:401–412, 694–703 | Tooltip and data point inspections are mouse-only (`onMouseMove` / `onMouseEnter`) | Keyboard-only users have no way to navigate data points, inspect bar values, or view tooltips | Provide keyboard focusable points (`tabIndex={0}` on bars/dots) with arrow key navigation, or render a companion accessible data table |
| CHT-03 | Minor | Color | chart.tsx:333, 601 | Default palette hardcodes hex values `['#3b82f6', '#8b5cf6', '#10b981']` | Bypasses library theme variables and does not adapt automatically between light and dark modes | Default to theme tokens (e.g. `var(--primary)`, `var(--secondary)`) or token palette classes |
| CHT-04 | Minor | Performance | chart.tsx:99–122 | `ChartStyle` injects inline `<style>` tags via `dangerouslySetInnerHTML` inside component render tree | Causes DOM style recalculations on every config change | Scope variables via `style` property on the container div rather than injecting raw `<style>` tags |
| CHT-05 | Nit | API | chart.tsx:132, 243 | Extensive use of `any` and `any[]` in tooltip and legend payload types | Weakens TypeScript type safety | Define generic `ChartPayloadItem<T>` interfaces |

---

## State / Variant Matrix

| Chart Type | Smooth Spline | Gradient Fill | Crosshair Line | Tooltip Floating | SVG role="img" |
|------------|---------------|---------------|----------------|------------------|----------------|
| AreaChart | ✅ Monotone / Linear / Step | ✅ LinearGradient | ✅ | ✅ | ❌ Missing |
| BarChart | N/A | N/A | ✅ Column hover | ✅ | ❌ Missing |
| LineChart | ✅ Cubic Bézier | N/A | ✅ | ✅ | ❌ Missing |
| Keyboard navigation | ❌ Mouse-only | — | — | — | — |

---

## Missing Tests / Docs
- Unit test: Chart renders SVG with correct data point coordinates
- Unit test: Mouse move calculates closest data index and renders tooltip
- Unit test: Scoped color variables are applied to series lines/areas
- Docs: Explain accessible alternatives (e.g. pairing charts with `<Table>` for WCAG compliance)
