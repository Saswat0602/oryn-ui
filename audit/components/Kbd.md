# Kbd — Audit Report

## Score: 9.0 / 10 — Semantic keyboard shortcut badge with comprehensive glyph mapping

---

## What's Good
- Uses semantic HTML `<kbd>` tag for all rendered keyboard shortcut elements.
- Automatic symbol translation via `formatKeySymbol`: converts strings like `"command"`, `"ctrl"`, `"alt"`, `"shift"`, `"enter"`, `"escape"`, and arrow names to standard typographic glyphs (⌘, ⌃, ⌥, ⇧, ↵, ⎋, ↑, ↓, etc.).
- Convenient multi-key array prop (`keys={["command", "k"]}`) that renders spaced sequence pills.
- 3 visual variants: `default` (raised with border and 2xs shadow), `outline` (transparent background), and `subtle` (borderless muted).
- 3 sizes: `xs`, `sm`, and `md`.

---

## Issues

| ID | Severity | Category | File:Line | Problem | Why It Matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| KBD-01 | Minor | A11y | kbd.tsx:80, 93 | Unicode shortcut glyphs (⌘, ⌥, ⇧) are often ignored or pronounced as "symbol" by screen readers | Blind users do not hear clear shortcut keys like "Command" or "Option" | Add an accessible label e.g. `aria-label={keyName}` on the `<kbd>` element when rendering special symbols |
| KBD-02 | Nit | Tokens | kbd.tsx:15 | Default variant uses `shadow-2xs` | Functional, but subtle shadow could use configurable token | Ensure consistent elevation token |

---

## State / Variant Matrix

| Variant / Size | Semantic `<kbd>` | Auto Glyph Map | Multi-key Array | Focusable |
|----------------|------------------|----------------|-----------------|-----------|
| default | ✅ | ✅ "command" -> ⌘ | ✅ Spaced pills | Static |
| outline | ✅ | ✅ | ✅ | Static |
| subtle | ✅ | ✅ | ✅ | Static |
| Sizes: xs, sm, md | ✅ | ✅ | ✅ | Static |

---

## Missing Tests / Docs
- Unit test: `formatKeySymbol` maps "command" to "⌘" and "shift" to "⇧"
- Unit test: Renders multiple keys from `keys` prop array
- Unit test: Ref forwards to primary element
- Docs: Document keyboard symbol mapping dictionary
