#!/usr/bin/env node
/**
 * Automated Integration Test Suite for oryn-ui
 * 
 * Verifies that the packed library tarball integrates cleanly into:
 * 1. CSS Isolation (zero Preflight reset pollution)
 * 2. Package exports & types (publint)
 * 3. Node CommonJS require()
 * 4. Node ESM SSR renderToString()
 * 5. Fresh Next.js App Router (React 19 + Tailwind v4 / v3)
 * 6. Fresh Vite + React (TypeScript)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const TEST_DIR = path.join('/tmp', 'oryn-automated-integration-suite');
fs.mkdirSync(TEST_DIR, { recursive: true });

console.log('🚀 Running ORYN UI Automated Integration Test Suite...\n');

let failedTests = 0;

function runStep(name, fn) {
  process.stdout.write(`  ▶ ${name}... `);
  const start = Date.now();
  try {
    fn();
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`✅ PASS (${elapsed}s)`);
  } catch (err) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`❌ FAIL (${elapsed}s)`);
    console.error(`     Error: ${err.message}`);
    if (err.stdout) console.error(`     stdout: ${err.stdout.toString().slice(-400)}`);
    if (err.stderr) console.error(`     stderr: ${err.stderr.toString().slice(-400)}`);
    failedTests++;
  }
}

// 1. Pack tarball
let tarballPath = '';
runStep('Pack library tarball with npm pack', () => {
  const packOutput = execSync('npm pack --pack-destination ' + TEST_DIR, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
  const tarballName = packOutput.split('\n').pop().trim();
  tarballPath = path.join(TEST_DIR, tarballName);
  if (!fs.existsSync(tarballPath)) {
    throw new Error('Tarball not found at ' + tarballPath);
  }
});

// 2. CSS Isolation Verification
runStep('Verify CSS Isolation & Zero Preflight Reset Pollution', () => {
  const stylesCss = fs.readFileSync(path.join(ROOT_DIR, 'dist/styles.css'), 'utf8');
  const tokensCss = fs.readFileSync(path.join(ROOT_DIR, 'dist/tokens.css'), 'utf8');

  // Must NOT contain Preflight resets
  if (stylesCss.includes('button,input:where([type=button])') || stylesCss.includes('button, input:where([type=button])')) {
    throw new Error('Preflight button reset detected in dist/styles.css');
  }
  if (stylesCss.includes('h1,h2,h3,h4,h5,h6{font-size:inherit')) {
    throw new Error('Preflight heading reset detected in dist/styles.css');
  }

  // Must contain design tokens and utility classes
  if (!stylesCss.includes('--background:') || !stylesCss.includes('--primary:')) {
    throw new Error('CSS variables missing from dist/styles.css');
  }
  if (!stylesCss.includes('.bg-primary')) {
    throw new Error('Utility classes missing from dist/styles.css');
  }
  if (!tokensCss.includes('--primary:')) {
    throw new Error('Design tokens missing from dist/tokens.css');
  }
});

// 3. Publint Packaging Check
runStep('Verify Package Exports & Types (publint)', () => {
  const publintOutput = execSync(`npx --yes publint ${tarballPath}`, { cwd: ROOT_DIR, encoding: 'utf8' });
  if (publintOutput.includes('Errors:')) {
    throw new Error('publint reported packaging errors:\n' + publintOutput);
  }
});

// 4. Install tarball into a scratch Node app for runtime checks
const scratchAppDir = path.join(TEST_DIR, 'scratch-runtime-app');
runStep('Install packed tarball into scratch runtime app', () => {
  fs.rmSync(scratchAppDir, { recursive: true, force: true });
  fs.mkdirSync(scratchAppDir, { recursive: true });

  fs.writeFileSync(path.join(scratchAppDir, 'package.json'), JSON.stringify({
    name: 'scratch-runtime-app',
    private: true,
    type: 'module',
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      'oryn-ui': `file:${tarballPath}`
    }
  }, null, 2));

  execSync('npm install --no-audit --silent', { cwd: scratchAppDir, stdio: 'pipe' });
});

// 5. CommonJS require() Resolution
runStep('Verify Node.js CommonJS require() across root & subpaths', () => {
  const cjsTestScript = `
    const { Button } = require('oryn-ui');
    const { Input } = require('oryn-ui/input');
    const { Dialog } = require('oryn-ui/dialog');
    if (!Button) throw new Error('Button failed to load in CJS');
    if (!Input) throw new Error('Input failed to load in CJS');
    if (!Dialog) throw new Error('Dialog failed to load in CJS');
  `;
  execSync(`node --no-experimental-require-module -e "${cjsTestScript}"`, {
    cwd: scratchAppDir,
    encoding: 'utf8'
  });
});

// 6. Node.js ESM SSR renderToString()
runStep('Verify Node.js ESM SSR renderToString()', () => {
  fs.writeFileSync(path.join(scratchAppDir, 'ssr-verify.mjs'), `
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import { Button, Input, Dialog, Select, Tooltip } from 'oryn-ui';

    const html = renderToString(
      React.createElement('div', null,
        React.createElement(Button, { variant: 'default' }, 'SSR Button'),
        React.createElement(Input, { placeholder: 'SSR Input' }),
        React.createElement(Dialog, null, 'SSR Dialog'),
        React.createElement(Select, null, 'SSR Select'),
        React.createElement(Tooltip, null, 'SSR Tooltip')
      )
    );
    if (!html || html.length < 100) throw new Error('SSR produced invalid HTML');
    console.log('SSR HTML verified (bytes): ' + html.length);
  `);
  execSync('node ssr-verify.mjs', { cwd: scratchAppDir, encoding: 'utf8' });
});

// 7. Fresh Next.js App Router Verification
runStep('Verify Fresh Next.js App Router build with packed tarball', () => {
  const nextAppDir = path.join(TEST_DIR, 'next-app-verify');
  fs.rmSync(nextAppDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(nextAppDir, 'app'), { recursive: true });

  fs.writeFileSync(path.join(nextAppDir, 'package.json'), JSON.stringify({
    name: 'next-app-verify',
    private: true,
    scripts: { build: 'next build' },
    dependencies: {
      next: '^15.2.0',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      'oryn-ui': `file:${tarballPath}`
    },
    devDependencies: {
      '@types/node': '^22.0.0',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      typescript: '^5.7.0'
    }
  }, null, 2));

  fs.writeFileSync(path.join(nextAppDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      lib: ['dom', 'dom.iterable', 'esnext'],
      skipLibCheck: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      jsx: 'preserve'
    },
    include: ['**/*.ts', '**/*.tsx']
  }, null, 2));

  fs.writeFileSync(path.join(nextAppDir, 'app', 'layout.tsx'), `
    import 'oryn-ui/styles.css';
    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return <html><body>{children}</body></html>;
    }
  `);

  fs.writeFileSync(path.join(nextAppDir, 'app', 'page.tsx'), `
    'use client';
    import { Button } from 'oryn-ui/button';
    import { Input } from 'oryn-ui/input';
    import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from 'oryn-ui/dialog';

    export default function Page() {
      return (
        <main>
          <Button variant="default">Button</Button>
          <Input placeholder="Input" />
          <Dialog>
            <DialogTrigger><Button>Open</Button></DialogTrigger>
            <DialogContent><DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader></DialogContent>
          </Dialog>
        </main>
      );
    }
  `);

  execSync('npm install --no-audit --silent', { cwd: nextAppDir, stdio: 'pipe' });
  execSync('npm run build', { cwd: nextAppDir, stdio: 'pipe' });
});

// 8. Fresh Vite React TypeScript Verification
runStep('Verify Fresh Vite + React build with packed tarball', () => {
  const viteAppDir = path.join(TEST_DIR, 'vite-app-verify');
  fs.rmSync(viteAppDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(viteAppDir, 'src'), { recursive: true });

  fs.writeFileSync(path.join(viteAppDir, 'package.json'), JSON.stringify({
    name: 'vite-app-verify',
    private: true,
    type: 'module',
    scripts: { build: 'tsc && vite build' },
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      'oryn-ui': `file:${tarballPath}`
    },
    devDependencies: {
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      '@vitejs/plugin-react': '^4.3.4',
      typescript: '^5.7.0',
      vite: '^6.2.0'
    }
  }, null, 2));

  fs.writeFileSync(path.join(viteAppDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      useDefineForClassFields: true,
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      strict: true
    },
    include: ['src']
  }, null, 2));

  fs.writeFileSync(path.join(viteAppDir, 'vite.config.ts'), `
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    export default defineConfig({ plugins: [react()] });
  `);

  fs.writeFileSync(path.join(viteAppDir, 'index.html'), `
    <!doctype html>
    <html lang="en">
      <head><meta charset="UTF-8" /><title>Vite App</title></head>
      <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
    </html>
  `);

  fs.writeFileSync(path.join(viteAppDir, 'src', 'main.tsx'), `
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import 'oryn-ui/styles.css';
    import { Button } from 'oryn-ui/button';
    import { Input } from 'oryn-ui/input';

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Button variant="default">Button</Button>
        <Input placeholder="Input" />
      </React.StrictMode>
    );
  `);

  execSync('npm install --no-audit --silent', { cwd: viteAppDir, stdio: 'pipe' });
  execSync('npm run build', { cwd: viteAppDir, stdio: 'pipe' });
});

console.log('\n========================================');
if (failedTests === 0) {
  console.log('🎉 ALL INTEGRATION TESTS PASSED CLEANLY (8/8)!');
  console.log('========================================\n');
  process.exit(0);
} else {
  console.error(`💥 INTEGRATION TESTS FAILED: ${failedTests} step(s) failed!`);
  console.log('========================================\n');
  process.exit(1);
}
