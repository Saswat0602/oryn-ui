const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Import manifest (transpiled or read via basic parsing)
const manifestContent = fs.readFileSync(path.join(rootDir, 'src/component.manifest.ts'), 'utf8');

console.log('🔍 Auditing component manifest integrity...');

// Extract component names and subpaths from manifest
const nameMatches = [...manifestContent.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const subpathMatches = [...manifestContent.matchAll(/subpath:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const sourceMatches = [...manifestContent.matchAll(/sourceFile:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

let errors = 0;

console.log(`Found ${nameMatches.length} registered components in manifest.`);

sourceMatches.forEach((sourceRel, index) => {
  const fullPath = path.join(rootDir, sourceRel);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Source file does not exist: ${sourceRel}`);
    errors++;
  }
});

subpathMatches.forEach((subpath) => {
  if (!pkg.exports[subpath]) {
    console.error(`❌ Missing exports map entry in package.json: "${subpath}"`);
    errors++;
  }
});

if (errors > 0) {
  console.error(`\n💥 Manifest audit failed with ${errors} error(s)!`);
  process.exit(1);
} else {
  console.log(`\n✅ Manifest check passed! All ${nameMatches.length} components verified against exports and filesystem.`);
}
