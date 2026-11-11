---
name: oryn-ui-theme
description: >-
  Use this skill whenever editing CSS styles, adjusting design tokens, modifying
  Tailwind CSS configurations, or managing dark mode themes in ORYN UI. Covers HSL color
  variables, animations, and the build-css.js pipeline.
---

# ORYN UI Theme & Styling Engineering Skill

This skill documents how to manage the design token system, CSS variables, Tailwind configurations, and the PostCSS/Tailwind build pipeline in **ORYN UI**.

---

## 1. Design Token Architecture

The design system uses HSL CSS variables configured in `src/styles.css` and mapped to Tailwind utilities in `tailwind.config.js`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --border: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --border: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

### Aesthetic Standards
- **Token Usage**: Always style components using semantic classes (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`) or standard neutral scales (`zinc-900`, `zinc-100`).
- **PROHIBITED**: Never use raw arbitrary hex values (e.g. `bg-[#123456]`), gaudy neon blur blobs, or rainbow animated orbs.
- **Animations**: Use the standard Radix keyframe transitions defined in `tailwind.config.js` (`accordion-down`, `accordion-up`, `fade-in`, `zoom-in-95`).

---

## 2. CSS Compilation Pipeline

Whenever `src/styles.css` or `tailwind.config.js` is modified:

```bash
# Compile and optimize dist/styles.css and dist/theme.css
npm run build:css
```

How [`scripts/build-css.js`](file:///home/saswatranjanmohanty/Desktop/personal%20projects/mad-ui/scripts/build-css.js) works:
1. Executes Tailwind CLI with purging: `tailwindcss -i src/styles.css -o dist/styles.css --minify`
2. Strips comments and extraneous whitespace.
3. Synchronizes `dist/styles.css` with `dist/theme.css` for consumers who import either entry point.
4. Falls back to direct copy and regex whitespace stripping if the Tailwind CLI fails.

---

## 3. Subpath Exports for CSS

Consumers import CSS in two ways:
```ts
// Full stylesheet (Tailwind utilities + theme tokens)
import 'oryn-ui/styles.css'

// Theme tokens only
import 'oryn-ui/theme.css'
```

Both paths are exposed in root `package.json` under `"exports"`:
```json
"./theme.css": "./dist/theme.css",
"./styles.css": "./dist/styles.css"
```

---

## 4. Verification Workflow

After changing styles or CSS variables:
1. Run `npm run build:css`
2. Run `npm run check:manifest` to verify export integrity
3. Run `npm run test` to ensure SSR string rendering still succeeds without style runtime errors
4. Run `cd docs && npm run build` to verify docs styles compile correctly with Tailwind v4
