# Component 10-Point Wiring Checklist

When adding `<name>` (category: `<category>`):

- [ ] 1. **Component**: `src/components/<category>/<name>.tsx`
- [ ] 2. **Tests**: `tests/smoke.test.tsx` (StrictMode + SSR + vitest-axe)
- [ ] 3. **Category Module**: `src/modules/<category>.ts` (`export * from '../components/<category>/<name>'`)
- [ ] 4. **Index Exports**:
  - `src/components/index.ts`
  - `src/index.ts`
  - `src/core.ts` (if core)
- [ ] 5. **Individual Tree-Shaking Entry**: `src/individual/<name>.ts`
- [ ] 6. **Manifest & CLI**:
  - `src/component.manifest.ts` (name, subpath, sourceFile, exports)
  - `scripts/copy-component.js` (`componentMap` entry for CLI copying)
- [ ] 7. **Package Exports**: Root `package.json` (`./<name>` with `types`, `import`, and `default`)
- [ ] 8. **Bundler Entry**: `tsup.config.ts` (`src/individual/<name>.ts`)
- [ ] 9. **Documentation**:
  - `docs/src/lib/component-registry.ts`
  - `docs/src/lib/component-props.ts`
  - `docs/src/lib/examples/<category>.tsx`
  - `COMPONENTS_STATUS.md`
- [ ] 10. **Build & Quality Verification**:
  - `npm run build`
  - `npm run check:manifest`
  - `npm run test`
  - `npm run typecheck`
  - `cd docs && npm run build && npm run lint`
