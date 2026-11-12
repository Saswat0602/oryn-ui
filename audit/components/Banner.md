# Banner — Audit Report

## Score: 8.5 / 10 — Accessible announcement banner with solid contrast and persistence

---

## What's Good
- Explicit, accessible ARIA roles: automatically sets `role="alert"` for destructive banners and `role="status"` for info/success/warning banners.
- High-contrast color pairings: uses dark text on light tints in light mode (`emerald-900` on `emerald-50`, `amber-900` on `amber-50`) and light text on dark tints in dark mode (`emerald-100` on `emerald-950`), easily passing WCAG AA (>7:1).
- Built-in localStorage persistence via `storageKey` to remember dismissed banners across sessions.
- Dismiss button includes explicit `aria-label="Dismiss banner"`.
- Action slot allows passing inline CTA buttons or links seamlessly.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| BAN-01 | Minor | A11y | banner.tsx:109 | Dismiss button lacks explicit keyboard focus ring (`focus:outline-none focus-visible:ring-2`) | Keyboard users cannot easily see focus location on the close button | Add `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` |
| BAN-02 | Minor | Tokens | banner.tsx:66–70 | Hardcodes Tailwind color classes (`bg-emerald-50`, `text-emerald-900`, `bg-rose-50`, etc.) instead of design tokens | Custom color themes or white-label palettes cannot re-skin banner tints | Map to semantic token variables or CSS color variables |
| BAN-03 | Nit | API | banner.tsx:11 | `icon?: any` type in `BannerProps` | Weakens TypeScript type safety | Type as `React.ReactNode` or `React.ComponentType<{ className?: string }>` |

---

## State / Variant Matrix

| Variant | Role | Contrast Light | Contrast Dark | Default Icon | Dismissible |
|---------|------|----------------|---------------|--------------|-------------|
| default | status | ✅ >10:1 | ✅ >10:1 | None | ✅ |
| info | status | ✅ >10:1 | ✅ >10:1 | Info | ✅ |
| success | status | ✅ >7:1 | ✅ >8:1 | CheckCircle2 | ✅ |
| warning | status | ✅ >7:1 | ✅ >8:1 | AlertTriangle | ✅ |
| destructive | alert | ✅ >7:1 | ✅ >8:1 | AlertCircle | ✅ |

---

## Missing Tests / Docs
- Unit test: Destructive variant renders `role="alert"`, others render `role="status"`
- Unit test: Dismissing banner fires `onDismiss` and persists to `localStorage`
- Unit test: When `storageKey` is present and previously dismissed, component renders `null`
- Docs: Document usage of `storageKey` for one-time promotional or announcement banners
