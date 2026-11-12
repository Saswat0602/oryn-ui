# Typography — Audit Report

## Score: 9.0 / 10 — Semantic typography suite with ref forwarding gap

---

## What's Good
- Complete set of semantic typographic components matching Tailwind standard hierarchy: `TypographyH1`, `TypographyH2`, `TypographyH3`, `TypographyH4`, `TypographyH5`, `TypographyH6`, `TypographyP`, `TypographyBlockquote`, `TypographyCode`, `TypographyLead`, `TypographyLarge`, `TypographySmall`, `TypographyMuted`.
- Headings include `scroll-m-20` scroll margins to prevent anchor-linked headings from being obscured beneath sticky navigation headers.
- Code inline formatting (`TypographyCode`) uses monospace font with rounded muted background.
- Clean typography hierarchy following Tailwind CSS prose scale with responsive desktop adjustments (`lg:text-5xl`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| TYP-01 | Minor | API | typography.tsx:23–164 | All typography components are written as plain `React.FC` without `React.forwardRef` | Consumers cannot attach refs for DOM measurements, scroll anchors, or animation libraries (Framer Motion, GSAP) | Wrap all typography components in `React.forwardRef` with corresponding HTML element types |
| TYP-02 | Nit | API | typography.tsx:4–7 | `TypographyProps` only includes `children` and `className`, excluding standard HTML element attributes | Cannot pass `id`, `tabIndex`, `data-*`, or `aria-*` attributes without TypeScript errors | Extend `React.HTMLAttributes<HTMLHeadingElement>` etc. |

---

## State / Variant Matrix

| Component | Semantic Tag | Scroll Margin | Text Size | Responsive Scale |
|-----------|--------------|---------------|-----------|------------------|
| TypographyH1 | `<h1>` | ✅ `scroll-m-20` | 4xl | ✅ `lg:text-5xl` |
| TypographyH2 | `<h2>` | ✅ `scroll-m-20` | 3xl | Standard |
| TypographyH3 | `<h3>` | ✅ `scroll-m-20` | 2xl | Standard |
| TypographyH4 | `<h4>` | ✅ `scroll-m-20` | xl | Standard |
| TypographyH5 | `<h5>` | ✅ `scroll-m-20` | lg | Standard |
| TypographyH6 | `<h6>` | ✅ `scroll-m-20` | base | Standard |
| TypographyP | `<p>` | N/A | base | Leading-7 |
| TypographyBlockquote | `<blockquote>` | N/A | base | Italic + border-l-2 |
| TypographyCode | `<code>` | N/A | sm | Monospace |

---

## Missing Tests / Docs
- Unit test: Each component renders its corresponding semantic HTML element
- Unit test: Merges custom `className` correctly
- Docs: Provide component examples for article and documentation typography layouts
