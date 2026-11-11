---
name: oryn-ui-release
description: >-
  Use this skill whenever preparing, bumping, or publishing a new version of the
  oryn-ui package to npm.
---

# ORYN UI Release & NPM Publishing Skill

This skill documents the safe release protocol for publishing `oryn-ui` to npm, adhering to 2FA authentication, version bumping, and monorepo integrity checks.

---

## 1. Pre-Publish Checklist

Before bumping or publishing:

1. **Verify Git Working Tree**:
   - Ensure all changes are committed and no untracked experimental files remain.
2. **Version Bump**:
   - Update `"version"` in root `package.json` (e.g. `2.16.0` -> `2.16.1` or `2.17.0`).
   - NPM will reject any attempt to overwrite existing published versions (`409 Conflict`).
3. **Update Docs / Status**:
   - Update `CHANGELOG.md` with release highlights.
   - If new components are added, verify `COMPONENTS_STATUS.md`.

---

## 2. Automated Pre-Publish Verification

Run the full pre-publish verification suite defined in root `package.json`:

```bash
npm run prepublishOnly
```

This command runs:
- `npm run clean`: Purges old artifacts in `dist/`
- `npm run build`: Recompiles all ESM and DTS bundles via `tsup` and processes CSS
- `npm run typecheck`: Ensures zero TypeScript errors
- `npm run test`: Executes unit tests and accessibility tests
- `npm run check:pkg`: Publint package verification
- `npm run check:manifest`: Validates component manifest against package exports

Additionally, verify that `docs` builds without errors:
```bash
cd docs && npm run build && cd ..
```

---

## 3. NPM Publishing & 2FA Flow

1. **Authentication Token**:
   - NPM auth tokens must reside in `~/.npmrc` in your home directory (project-level tokens are ignored by npm CLI).
2. **Execute Publish**:
   ```bash
   npm publish --access public
   ```
3. **Interactive 2FA**:
   - When 2FA is enabled, npm CLI 11 provides a browser authorization URL:
     `Authenticate your account at: https://www.npmjs.com/auth/cli/<uuid>`
   - Open the link in a browser, confirm approval, and the CLI will complete the publish.
4. **Git Tag & Push**:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore(release): v<new-version>"
   git tag v<new-version>
   git push origin main --tags
   ```
