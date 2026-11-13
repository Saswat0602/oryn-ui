# ScrollArea — Audit Report

## Score: 10 / 10 — Lightweight styled scroll container with keyboard accessibility (Status: Fixed)

---

## What's Good
- Zero external dependencies — relies on native browser scroll mechanics with custom Tailwind scrollbar utility styling.
- Rich variety of visual styles: `default`, `subtle`, `pill`, `minimal`, and `none` (hidden scrollbar).
- Multi-orientation support: `vertical`, `horizontal`, and `both`.
- Viewport provides `tabIndex={0}` and focus ring for WCAG 2.1.1 keyboard scrolling of non-interactive text content.
- Standard cross-browser `scrollbar-width: thin` / `auto` / `none` support across Firefox and WebKit browsers.
- `ScrollBar` companion subcomponent correctly marked with `aria-hidden="true"` so assistive technologies don't announce decorative scroll tracks.
- Clean compound component export pattern (`ScrollArea.ScrollBar = ScrollBar`).

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix | Status |
|----|----------|----------|-----------|---------|----------------|-----|--------|
| SCR-01 | Minor | A11y | scroll-area.tsx:60–71 | Scrollable viewport lacks `tabIndex={0}` when containing non-interactive content | If content is plain text (e.g., terms of service), keyboard-only users cannot focus the container to scroll it using Arrow / PageUp / PageDown keys (WCAG 2.1.1 Keyboard) | Add `tabIndex={0}` and focus ring on viewport | Fixed |
| SCR-02 | Minor | Layout | scroll-area.tsx:36–51 | Relies heavily on WebKit pseudo-elements (`[&::-webkit-scrollbar]`) without standard Firefox CSS properties | Firefox users only get native OS scrollbars (except for variant="none" which sets `scrollbar-width: none`) | Add standard CSS `[scrollbar-width:thin]` and `[scrollbar-width:auto]` rules | Fixed |
| SCR-03 | Nit | Tokens | scroll-area.tsx:47 | Pill variant uses primary accent styling | Design preference | Preserved pill accent styling | Deferred (Nit) |

---

## State / Variant Matrix

| Variant / Orientation | Vertical | Horizontal | Both | Hidden (none) | Keyboard Focusable |
|-----------------------|----------|------------|------|---------------|-------------------|
| default | ✅ | ✅ | ✅ | N/A | ✅ tabIndex=0 with focus ring |
| subtle | ✅ | ✅ | ✅ | N/A | ✅ tabIndex=0 with focus ring |
| pill | ✅ | ✅ | ✅ | N/A | ✅ tabIndex=0 with focus ring |
| minimal | ✅ | ✅ | ✅ | N/A | ✅ tabIndex=0 with focus ring |
| none | ✅ | ✅ | ✅ | ✅ | ✅ tabIndex=0 with focus ring |

---

## Missing Tests / Docs
- Unit test: Renders children inside scrollable viewport
- Unit test: Applies orientation classes (`overflow-y-auto`, `overflow-x-auto`)
- Unit test: ScrollBar renders with `aria-hidden="true"`
- Docs: Explain how to ensure accessible keyboard scrolling for non-interactive content
