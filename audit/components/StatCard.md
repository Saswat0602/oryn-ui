# StatCard — Audit Report

## Score: 8.5 / 10 — Clean metrics KPI card with strong typography and region semantics

---

## What's Good
- Accessible container semantics: sets `role="region"` and `aria-label={title}` so users navigating by landmarks can jump to KPI widgets.
- Refined metric typography: automatically scales values using font-sans bold styles (`text-xl`, `text-2xl`, `text-3xl`).
- Built-in trend indicators: supports `up` (`TrendingUp`), `down` (`TrendingDown`), and `neutral` (`Minus`) with percentage badges.
- 3 clean visual variants: `default` (card surface with subtle border), `outline` (transparent background), and `subtle` (muted background).
- Dedicated slots for icon badges, status tags, and explanatory descriptions.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| STC-01 | Minor | A11y | stat-card.tsx:90–107 | Trend badges show arrows and numbers without screen-reader direction text | Screen reader users hear "+12.5%" without an explicit announcement of whether the metric went up or down | Add `<span className="sr-only">{trend.direction === "up" ? "increased by" : "decreased by"}</span>` |
| STC-02 | Minor | Tokens | stat-card.tsx:93, 95 | Hardcoded Tailwind color classes (`bg-emerald-50 text-emerald-700`, `bg-rose-50 text-rose-700`) | Bypasses CSS color variables; cannot be styled consistently across custom themes | Use semantic design token variables or CSS classes |
| STC-03 | Nit | API | stat-card.tsx:16 | `icon?: any` type declaration | Bypasses TypeScript strict typing | Type as `React.ReactNode` or `React.ComponentType<{ className?: string }>` |

---

## State / Variant Matrix

| Variant / Size | Landmark Role | Trend Up | Trend Down | Trend Neutral | Custom Badge |
|----------------|---------------|----------|------------|---------------|--------------|
| default | ✅ role="region" | ✅ Emerald badge | ✅ Rose badge | ✅ Muted badge | ✅ |
| outline | ✅ | ✅ | ✅ | ✅ | ✅ |
| subtle | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sizes: sm, default, lg | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Missing Tests / Docs
- Unit test: Renders region landmark with correct `aria-label`
- Unit test: Trend direction renders appropriate icon and value
- Unit test: Applies sizing and variant class names
- Docs: Document dashboard KPI card layouts and metric formatting recommendations
