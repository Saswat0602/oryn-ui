const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '../..');
const docsDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexMjs = path.join(distDir, 'index.mjs');
const stylesCss = path.join(distDir, 'styles.css');

console.log('[build-package] Checking @oryn/ui dist status...');

const isInstalledPackage = fs.existsSync(path.join(docsDir, 'node_modules', '@oryn', 'ui', 'package.json'));

function isDistStale() {
  if (!fs.existsSync(indexMjs) || !fs.existsSync(stylesCss)) {
    return true;
  }
  try {
    const distMtime = fs.statSync(indexMjs).mtimeMs;
    const srcDir = path.join(rootDir, 'src');

    function checkDir(dir) {
      if (!fs.existsSync(dir)) return false;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (checkDir(fullPath)) return true;
        } else if (entry.isFile()) {
          if (fs.statSync(fullPath).mtimeMs > distMtime) {
            return true;
          }
        }
      }
      return false;
    }

    const triggerFiles = ['tsup.config.ts', 'package.json', 'scripts/build-css.js'];
    for (const file of triggerFiles) {
      const p = path.join(rootDir, file);
      if (fs.existsSync(p) && fs.statSync(p).mtimeMs > distMtime) {
        return true;
      }
    }

    return checkDir(srcDir);
  } catch {
    return true;
  }
}

if (!isDistStale()) {
  console.log('[build-package] Local dist/ is up to date.');
} else if (isInstalledPackage && !fs.existsSync(path.join(rootDir, 'src'))) {
  console.log('[build-package] Using installed @oryn/ui package from npm.');
} else {
  console.log('[build-package] dist/ incomplete, missing, or outdated. Building @oryn/ui from source...');
  
  // Ensure root node_modules exists (link to docs/node_modules if absent)
  const rootNodeModules = path.join(rootDir, 'node_modules');
  const docsNodeModules = path.join(docsDir, 'node_modules');
  
  if (!fs.existsSync(rootNodeModules) && fs.existsSync(docsNodeModules)) {
    console.log('[build-package] Linking docs/node_modules to root node_modules for build...');
    try {
      fs.symlinkSync(docsNodeModules, rootNodeModules, 'junction');
    } catch (err) {
      console.warn('[build-package] Symlink warning:', err.message);
    }
  }

  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  let buildSuccess = false;

  // Strategy 1: Run root build directly via npm (handles both tsup and build-css.js)
  try {
    console.log('[build-package] Attempting root npm run build...');
    execSync(`${npmCmd} run build`, {
      cwd: rootDir,
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    buildSuccess = fs.existsSync(indexMjs);
  } catch (err) {
    console.warn('[build-package] Direct npm run build failed:', err.message);
  }

  // Strategy 2: If Strategy 1 failed, locate tsup binary directly across workspaces and execute
  if (!buildSuccess) {
    console.log('[build-package] Attempting fallback binary search for tsup...');
    const candidates = [
      path.join(rootDir, 'node_modules', '.bin', 'tsup'),
      path.join(docsDir, 'node_modules', '.bin', 'tsup'),
    ];

    const tsupBin = candidates.find(p => fs.existsSync(p));
    const tsupCmd = tsupBin ? `"${tsupBin}"` : 'npx tsup';

    try {
      execSync(tsupCmd, {
        cwd: rootDir,
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
      });

      // Build CSS assets
      execSync('node scripts/build-css.js', {
        cwd: rootDir,
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
      });

      buildSuccess = fs.existsSync(indexMjs);
    } catch (fallbackErr) {
      console.error('[build-package] Binary fallback failed:', fallbackErr.message);
    }
  }

  if (buildSuccess) {
    console.log('[build-package] @oryn/ui built successfully from source!');
  } else {
    console.error('[build-package] ERROR: Failed to produce dist/index.mjs.');
    process.exit(1);
  }
}
