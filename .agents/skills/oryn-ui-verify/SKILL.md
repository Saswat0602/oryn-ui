---
name: oryn-ui-verify
description: >-
  Use this skill whenever validating code quality, running tests, or performing
  end-to-end build verification across the ORYN UI root library and documentation app.
---

# ORYN UI Build & Quality Verification Skill

This skill documents the complete multi-tier verification process for **ORYN UI**. Because `docs` imports directly from the compiled root package `dist/` via symlink (`oryn-ui: "file:.."`), changes in `src/` must be compiled first before verifying documentation.

---

## 1. Quick Verification Command Sequence

Run these verification steps in order:

```bash
# Phase 1: Clean build of the root library & CSS
npm run build

# Phase 2: Audit manifest vs package exports and source files
npm run check:manifest

# Phase 3: Run unit tests, SSR string rendering, and axe-core a11y tests
npm run test

# Phase 4: TypeScript compiler check without emitting
npm run typecheck

# Phase 5: Build documentation site (verifies SSR, imports, and static generation)
cd docs
npm run build

# Phase 6: Run Next.js linting
npm run lint
cd ..
```

---

## 2. Verification Checkpoints

### A. Manifest Integrity (`npm run check:manifest`)
- Ensures every component in `src/component.manifest.ts` exists on disk in `src/components/`.
- Ensures every subpath entry has a corresponding `"exports"` definition in `package.json`.

### B. Package Packaging Check (`npm run check:pkg`)
- Uses `publint` to check that exports and declaration `.d.mts` files map accurately without breaking Node.js, ESM, or bundlers.

### C. Vitest Suite (`npm run test`)
- Executes `tests/smoke.test.tsx` verifying:
  - React `StrictMode` client mounting
  - Server-Side Rendering (`renderToString`)
  - Automated accessibility compliance with `vitest-axe`

### D. Documentation Build (`cd docs && npm run build`)
- Next.js Turbopack static page generation across `/docs/components/[slug]`.
- Will fail immediately if:
  - `dist/` was not rebuilt after component changes.
  - Subpath is missing `"default": "./dist/<name>.mjs"` in `package.json`.
  - Icon props break React 19 typing.
  - Quotes in JSX are unescaped (e.g. `'` instead of `&apos;`).

---

## 3. Common Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| `Cannot find module 'oryn-ui/...'` in `docs` | `dist/` is outdated or `tsup.config.ts` had `clean: true` | Run `npm run build` at root. Ensure `clean: false` in `tsup.config.ts`. |
| `ERR_PACKAGE_PATH_NOT_EXPORTED` in Next.js SSR | Subpath in `package.json` lacks `"default"` fallback | Add `"default": "./dist/<name>.mjs"` to `package.json` under `"exports"`. |
| `Type 'bigint' is not assignable to type 'ReactNode'` | `icon` prop typed as React 18 `ComponentType` | Change icon prop interface to `icon?: any;` or `React.ReactNode`. |
| `react/no-unescaped-entities` in `docs` lint | Raw quotes in JSX strings | Replace `'` with `&apos;` and `"` with `&quot;`. |
