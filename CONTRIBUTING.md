# Contributing to ORYN UI

Thank you for your interest in contributing to **ORYN UI** (`oryn-ui`)!

This guide outlines the local development setup, code quality standards, and Pull Request (PR) workflow to ensure smooth collaboration.

---

## 1. Prerequisites

- **Node.js**: >= 18.0.0 (Node 20 LTS recommended, see `.nvmrc`)
- **npm**: >= 9.0.0
- **Git**

---

## 2. Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Saswat0602/oryn-ui.git
cd oryn-ui

# 2. Install dependencies
npm install
cd docs && npm install && cd ..

# 3. Build the core library
npm run build

# 4. Start the documentation preview site
cd docs
npm run dev
# The docs playground will run on http://localhost:3000
```

---

## 3. Project Structure

- **`/src`**: Core library source code (components, utilities, module entry points).
- **`/docs`**: Next.js 16.4.3+ showcase and documentation application. Consumes the root library directly via `"oryn-ui": "file:.."`.
- **`/dist`**: Compiled ESM bundles and TypeScript definitions output by `tsup`.

> **Note**: Because `/docs` consumes the compiled output in `dist/`, run `npm run build` at root whenever you modify code in `src/` so changes reflect in the docs app.

---

## 4. Engineering & Aesthetic Standards

Please adhere to the strict engineering guidelines detailed in [AGENTS.md](AGENTS.md):

1. **Universal Icon Types**:
   When declaring icon props in component interfaces, use `React.ReactNode` or `any` rather than restrictive types like `React.ComponentType<{ size?: number }>` to ensure seamless React 18 & 19 cross-compatibility.
2. **Refined Design Aesthetics**:
   Use neutral darks and lights with subtle semantic accents (`blue-500`, `indigo-500`). Avoid loud neon gradients, gaudy blur blobs, and raw emojis in production UI code.
3. **No Direct Symlinks to `src/` in Docs**:
   The documentation site must consume the pre-bundled `dist/` ESM/DTS packages.
4. **Zero Redundant Package Installs**:
   `clsx`, `tailwind-merge`, and `lucide-react` are direct dependencies of `oryn-ui`. Do not instruct users to install them separately.

---

## 5. Verification Checklist Before Opening a PR

Before submitting your Pull Request, ensure that every step of the verification pipeline passes with 0 errors:

```bash
# 1. Typecheck the root library
npm run typecheck

# 2. Build the root library and compile CSS
npm run build

# 3. Build the documentation site
cd docs
npm run build

# 4. Lint the documentation site
npm run lint
cd ..
```

---

## 6. Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat(...)`: A new feature or component
- `fix(...)`: A bug fix
- `docs(...)`: Documentation improvements or example updates
- `chore(...)`: Maintenance, build script updates, or dependency bumps
- `refactor(...)`: Code refactoring without behavioral changes

---

## 7. Reporting Security Issues

Please refer to our [Security Policy](SECURITY.md) to report vulnerabilities privately.
