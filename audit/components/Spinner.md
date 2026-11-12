# Spinner — Audit Report

## Score: 9.0 / 10 — High-quality accessible loading indicator

---

## What's Good
- Full screen reader accessibility: `role="status"`, `aria-label={label}`, and visually hidden `<span className="sr-only">{label}</span>`.
- Decorative SVG properly marked with `aria-hidden="true"` to prevent duplicate announcements.
- 5 consistent size steps (`xs`: 12px, `sm`: 16px, `md`: 24px, `lg`: 32px, `xl`: 48px).
- 5 theme variants: `default`, `primary`, `secondary`, `muted`, and `white` for contrast on dark buttons.
- Configurable `strokeWidth` (default: 3) for crisp rendering across resolutions.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| SPN-01 | Minor | A11y | spinner.tsx:14 | Infinite `animate-spin` CSS animation does not respect `prefers-reduced-motion` | Continuous motion can trigger dizziness or vestibular discomfort in sensitive users (WCAG 2.3.3 Animation from Interactions) | Add `motion-reduce:animate-none` or slow down to gentle pulse under reduced motion |
| SPN-02 | Nit | Tokens | spinner.tsx:20 | `muted` variant uses `text-muted-foreground/60` opacity modifier | Can lead to faint rendering on non-standard backgrounds | Standardize on `text-muted-foreground` token class |

---

## State / Variant Matrix

| Variant / Size | Role="status" | sr-only text | SVG aria-hidden | Motion Reduce Guard |
|----------------|---------------|--------------|-----------------|---------------------|
| default | ✅ | ✅ "Loading..." | ✅ | ❌ Continuous spin |
| primary | ✅ | ✅ | ✅ | ❌ |
| secondary | ✅ | ✅ | ✅ | ❌ |
| muted | ✅ | ✅ | ✅ | ❌ |
| white | ✅ | ✅ | ✅ | ❌ |
| Sizes: xs -> xl | ✅ | ✅ | ✅ | ❌ |

---

## Missing Tests / Docs
- Unit test: Output contains `role="status"` and accessible label
- Unit test: Custom `label` prop updates both `aria-label` and `sr-only` span
- Unit test: Size and variant classes are applied accurately
- Docs: Document usage inside buttons and loading overlays without shifting layout
