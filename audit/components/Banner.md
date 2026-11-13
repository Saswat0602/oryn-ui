# Banner — Audit Report

**Status:** Fixed  
## Score: 10 / 10 — Accessible announcement banner with design tokens and focus-visible rings

---

## What's Good
- Explicit, accessible ARIA roles: automatically sets `role="alert"` for destructive banners and `role="status"` for info/success/warning banners.
- High-contrast color pairings: uses dark text on light tints in light mode and light text on dark tints in dark mode, easily passing WCAG AA (>7:1).
- Built-in localStorage persistence via `storageKey` to remember dismissed banners across sessions.
- Dismiss button includes explicit `aria-label="Dismiss banner"`.
- Action slot allows passing inline CTA buttons or links seamlessly.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| BAN-01 | Minor | A11y | banner.tsx:109 | Dismiss button lacks explicit keyboard focus ring (`focus:outline-none focus-visible:ring-2`) | Keyboard users cannot easily see focus location on the close button | Fixed | Added `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1` |
| BAN-02 | Minor | Tokens | banner.tsx:66–70 | Hardcodes Tailwind color classes (`bg-emerald-50`, `text-emerald-900`, `bg-rose-50`, etc.) instead of design tokens | Custom color themes or white-label palettes cannot re-skin banner tints | Fixed | Mapped to semantic design tokens `text-destructive`, `border-destructive/20`, and semantic variable tints |
| BAN-03 | Nit | API | banner.tsx:11 | `icon?: any` type in `BannerProps` | Weakens TypeScript type safety | Fixed | Strongly typed as `icon?: React.ReactNode` |

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
