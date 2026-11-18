const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Building optimized CSS (scoped styles, tokens, and optional preflight)...');

const rootDir = path.join(__dirname, '..');
const tailwindPath = path.join(rootDir, 'node_modules/.bin/tailwindcss');
const tailwindExists = fs.existsSync(tailwindPath);

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove CSS comments
    .replace(/\s+/g, ' ')             // Replace multiple spaces with single space
    .replace(/\s*{\s*/g, '{')         // Remove spaces around braces
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')         // Remove spaces around colons
    .replace(/\s*;\s*/g, ';')         // Remove spaces around semicolons
    .replace(/\s*,\s*/g, ',')         // Remove spaces around commas
    .trim();
}

if (tailwindExists) {
  try {
    fs.mkdirSync(path.join(rootDir, 'dist'), { recursive: true });

    // 1. Build dist/styles.css (Clean, scoped styles without Preflight)
    console.log('📦 Compiling scoped dist/styles.css (preflight: false)...');
    execSync(`"${tailwindPath}" -c tailwind.scoped.config.cjs -i src/styles.css -o dist/styles.css --minify`, {
      stdio: 'inherit',
      cwd: rootDir
    });
    let scopedCss = minifyCss(fs.readFileSync(path.join(rootDir, 'dist/styles.css'), 'utf8'));
    fs.writeFileSync(path.join(rootDir, 'dist/styles.css'), scopedCss);
    fs.writeFileSync(path.join(rootDir, 'dist/theme.css'), scopedCss);

    // 2. Build dist/preflight.css (Optional full preflight for greenfield apps)
    console.log('📦 Compiling optional dist/preflight.css (preflight: true)...');
    execSync(`"${tailwindPath}" -c tailwind.config.js -i src/styles.css -o dist/preflight.css --minify`, {
      stdio: 'inherit',
      cwd: rootDir
    });
    let preflightCss = minifyCss(fs.readFileSync(path.join(rootDir, 'dist/preflight.css'), 'utf8'));
    fs.writeFileSync(path.join(rootDir, 'dist/preflight.css'), preflightCss);

    // 3. Build dist/tokens.css (Pure HSL variables for Tailwind v4 @source users)
    console.log('📦 Generating dist/tokens.css...');
    let rawTokens = fs.readFileSync(path.join(rootDir, 'src/tokens.css'), 'utf8');
    fs.writeFileSync(path.join(rootDir, 'dist/tokens.css'), minifyCss(rawTokens));

    const stylesSize = (fs.statSync(path.join(rootDir, 'dist/styles.css')).size / 1024).toFixed(2);
    const tokensSize = (fs.statSync(path.join(rootDir, 'dist/tokens.css')).size / 1024).toFixed(2);
    const preflightSize = (fs.statSync(path.join(rootDir, 'dist/preflight.css')).size / 1024).toFixed(2);

    console.log(`✅ CSS compilation successful!`);
    console.log(`   - dist/styles.css (scoped, reset-free): ${stylesSize} KB`);
    console.log(`   - dist/tokens.css (design variables):   ${tokensSize} KB`);
    console.log(`   - dist/preflight.css (full reset):      ${preflightSize} KB`);
  } catch (error) {
    console.error('❌ Tailwind build failed:', error.message);
    process.exit(1);
  }
} else {
  console.error('❌ Tailwind CLI not found');
  process.exit(1);
}
