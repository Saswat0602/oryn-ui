# ScrollArea — Audit Report

## Score: 8.0 / 10 — Lightweight styled scroll container with keyboard focus gap

---

## What's Good
- Zero external dependencies — relies on native browser scroll mechanics with custom Tailwind scrollbar utility styling.
- Rich variety of visual styles: `default`, `subtle`, `pill`, `minimal`, and `none` (hidden scrollbar).
- Multi-orientation support: `vertical`, `horizontal`, and `both`.
- `ScrollBar` companion subcomponent correctly marked with `aria-hidden="true"` so assistive technologies don't announce decorative scroll tracks.
- Clean compound component export pattern (`ScrollArea.ScrollBar = ScrollBar`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| SCR-01 | Minor | A11y | scroll-area.tsx:60–71 | Scrollable viewport lacks `tabIndex={0}` when containing non-interactive content | If content is plain text (e.g., terms of service), keyboard-only users cannot focus the container to scroll it using Arrow / PageUp / PageDown keys (WCAG 2.1.1 Keyboard) | Add `tabIndex={0}` and `role="region"` with an optional `aria-label` when scrollable |
| SCR-02 | Minor | Layout | scroll-area.tsx:36–51 | Relies heavily on WebKit pseudo-elements (`[&::-webkit-scrollbar]`) without standard Firefox CSS properties | Firefox users only get native OS scrollbars (except for variant="none" which sets `scrollbar-width: none`) | Add standard CSS `scrollbar-width: thin` and `scrollbar-color` rules |
| SCR-03 | Nit | Tokens | scroll-area.tsx:47 | Pill variant hardcodes `bg-primary/70` | Subtle departure from default token palette | Use standard `bg-muted-foreground/40` or explicit token variables |

---

## State / Variant Matrix

| Variant / Orientation | Vertical | Horizontal | Both | Hidden (none) | Keyboard Focusable |
|-----------------------|----------|------------|------|---------------|-------------------|
| default | ✅ | ✅ | ✅ | N/A | ⚠️ Needs child focusable |
| subtle | ✅ | ✅ | ✅ | N/A | ⚠️ |
| pill | ✅ | ✅ | ✅ | N/A | ⚠️ |
| minimal | ✅ | ✅ | ✅ | N/A | ⚠️ |
| none | ✅ | ✅ | ✅ | ✅ | ⚠️ |

---

## Missing Tests / Docs
- Unit test: Renders children inside scrollable viewport
- Unit test: Applies orientation classes (`overflow-y-auto`, `overflow-x-auto`)
- Unit test: ScrollBar renders with `aria-hidden="true"`
- Docs: Explain how to ensure accessible keyboard scrolling for non-interactive content
