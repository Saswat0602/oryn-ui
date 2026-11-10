#!/usr/bin/env node

/**
 * ORYN Smart Component Distributor CLI
 * Usage:
 *   npx @oryn/ui add <component-name> [--path <dir>] [--overwrite] [--dry-run]
 *   npx @oryn/ui list
 *   npx @oryn/ui add --all
 */

const fs = require('fs');
const path = require('path');

// 75 Core Components mapped to source files
const COMPONENT_REGISTRY = {
  // Core
  'button': { path: 'src/components/core/button.tsx', category: 'Core', description: 'Interactive button with multiple semantic variants and sizes.' },
  'card': { path: 'src/components/core/card.tsx', category: 'Core', description: 'Structured container for grouping content and actions.' },
  'input': { path: 'src/components/core/input.tsx', category: 'Core', description: 'Single-line text input field supporting validation and icons.' },
  'label': { path: 'src/components/core/label.tsx', category: 'Core', description: 'Accessible form field label associated with form controls.' },
  'checkbox': { path: 'src/components/core/checkbox.tsx', category: 'Core', description: 'Two-state or indeterminate toggle checkbox control.' },
  'radio': { path: 'src/components/core/radio.tsx', category: 'Core', description: 'Single-selection radio button option.' },
  'select': { path: 'src/components/core/select.tsx', category: 'Core', description: 'Accessible dropdown select menu.' },
  'switch': { path: 'src/components/core/switch.tsx', category: 'Core', description: 'Toggle switch control for binary settings.' },
  'progress': { path: 'src/components/core/progress.tsx', category: 'Core', description: 'Horizontal progress bar indicator with smooth transitions.' },
  'slider': { path: 'src/components/core/slider.tsx', category: 'Core', description: 'Range slider with single or dual-thumb support.' },
  'rating': { path: 'src/components/core/rating.tsx', category: 'Core', description: 'Interactive or read-only star rating component.' },
  'skeleton': { path: 'src/components/core/skeleton.tsx', category: 'Core', description: 'Placeholder loading shimmer effect for content loading.' },
  'textarea': { path: 'src/components/core/textarea.tsx', category: 'Core', description: 'Multi-line text area supporting validation states.' },
  'button-group': { path: 'src/components/core/button-group.tsx', category: 'Core', description: 'Container for grouping adjacent buttons with border collapse.' },
  'input-group': { path: 'src/components/core/input-group.tsx', category: 'Core', description: 'Input container with prefix and suffix addons.' },

  // Forms
  'accordion': { path: 'src/components/forms/accordion.tsx', category: 'Forms', description: 'Collapsible content panels with smooth height transitions.' },
  'breadcrumbs': { path: 'src/components/forms/breadcrumbs.tsx', category: 'Forms', description: 'Navigational trail linking hierarchy levels.' },
  'calendar': { path: 'src/components/forms/calendar.tsx', category: 'Forms', description: 'Accessible date grid picker with single/range selection.' },
  'datetime-picker': { path: 'src/components/forms/datetime-picker.tsx', category: 'Forms', description: 'Unified date and time selector popup.' },
  'input-otp': { path: 'src/components/forms/input-otp.tsx', category: 'Forms', description: 'Multi-slot verification pin and one-time password input.' },
  'radio-group': { path: 'src/components/forms/radio-group.tsx', category: 'Forms', description: 'Radio button group container with keyboard navigation.' },
  'form': { path: 'src/components/forms/form.tsx', category: 'Forms', description: 'Composable form context linking labels, controls, and error alerts.' },
  'tabs': { path: 'src/components/forms/tabs.tsx', category: 'Forms', description: 'Tabbed panel switcher with accessible keyboard roving focus.' },
  'password-input': { path: 'src/components/forms/password-input.tsx', category: 'Forms', description: 'Password input with integrated reveal toggle and caps-lock detection.' },
  'number-input': { path: 'src/components/forms/number-input.tsx', category: 'Forms', description: 'Numeric stepper input with clamp bounds and arrow keys.' },
  'multi-select': { path: 'src/components/forms/multi-select.tsx', category: 'Forms', description: 'Searchable multi-tag selector with keyboard tags and max badges.' },
  'date-range-picker': { path: 'src/components/forms/date-range-picker.tsx', category: 'Forms', description: 'Dual-calendar date range picker with fast preset ranges.' },
  'time-picker': { path: 'src/components/forms/time-picker.tsx', category: 'Forms', description: 'Segmented time selector with 12h/24h and arrow step controls.' },
  'file-upload': { path: 'src/components/forms/file-upload.tsx', category: 'Forms', description: 'Drag-and-drop file upload dropzone with preview cards and size validation.' },
  'prompt-input': { path: 'src/components/forms/prompt-input.tsx', category: 'Forms', description: 'Auto-resizing chat prompt input with action slots, submit triggers, and stop buttons.' },

  // Layout
  'drawer': { path: 'src/components/layout/drawer.tsx', category: 'Layout', description: 'Edge slide-out sheet modal.' },
  'layout-shell': { path: 'src/components/layout/layout.tsx', category: 'Layout', description: 'App layout framework with header, sidebar, and content canvas.' },
  'modal': { path: 'src/components/layout/modal.tsx', category: 'Layout', description: 'Centered dialog modal overlay.' },
  'navbar': { path: 'src/components/layout/navbar.tsx', category: 'Layout', description: 'Top navigation bar with brand, link list, and actions.' },
  'popover': { path: 'src/components/layout/popover.tsx', category: 'Layout', description: 'Anchored floating popover card.' },
  'resizable': { path: 'src/components/layout/resizable.tsx', category: 'Layout', description: 'Draggable resizable split pane layout.' },
  'scroll-area': { path: 'src/components/layout/scroll-area.tsx', category: 'Layout', description: 'Custom styled scrollable viewport container.' },
  'sheet': { path: 'src/components/layout/sheet.tsx', category: 'Layout', description: 'Slide-in sheet panel from any viewport edge.' },
  'sidebar': { path: 'src/components/layout/sidebar.tsx', category: 'Layout', description: 'Collapsible application sidebar with item hierarchy.' },

  // Overlay
  'dialog': { path: 'src/components/overlay/dialog.tsx', category: 'Overlay', description: 'Accessible modal dialog with backdrop blur.' },
  'alert-dialog': { path: 'src/components/overlay/alert-dialog.tsx', category: 'Overlay', description: 'Confirmation alert dialog requiring explicit user response.' },
  'dropdown-menu': { path: 'src/components/overlay/dropdown-menu.tsx', category: 'Overlay', description: 'Dropdown action menu anchored to trigger button.' },
  'context-menu': { path: 'src/components/overlay/context-menu.tsx', category: 'Overlay', description: 'Right-click contextual menu.' },
  'hover-card': { path: 'src/components/overlay/hover-card.tsx', category: 'Overlay', description: 'Hover preview popover with configurable delay.' },
  'tooltip': { path: 'src/components/layout/tooltip.tsx', category: 'Overlay', description: 'Informative hover tooltip bubble.' },
  'collapsible': { path: 'src/components/overlay/collapsible.tsx', category: 'Overlay', description: 'Expandable/collapsible content disclosure element.' },
  'separator': { path: 'src/components/overlay/separator.tsx', category: 'Overlay', description: 'Visual dividing rule separating layout elements.' },
  'toggle': { path: 'src/components/overlay/toggle.tsx', category: 'Overlay', description: 'Two-state interactive button.' },

  // Navigation
  'combobox': { path: 'src/components/navigation/combobox.tsx', category: 'Navigation', description: 'Autocomplete search combobox.' },
  'command': { path: 'src/components/navigation/command.tsx', category: 'Navigation', description: 'Command palette with fast keyboard-driven search.' },
  'menubar': { path: 'src/components/navigation/menubar.tsx', category: 'Navigation', description: 'Desktop application menubar system with submenus.' },
  'navigation-menu': { path: 'src/components/navigation/navigation-menu.tsx', category: 'Navigation', description: 'Navigation bar with responsive dropdown panels.' },
  'pagination': { path: 'src/components/navigation/pagination.tsx', category: 'Navigation', description: 'Page navigation controls with sibling pagination.' },
  'stepper': { path: 'src/components/navigation/stepper.tsx', category: 'Navigation', description: 'Multi-step workflow wizard indicator with horizontal and vertical layouts.' },

  // Data
  'table': { path: 'src/components/data/table.tsx', category: 'Data', description: 'Semantic HTML table structure with hover and stripe styles.' },
  'data-table': { path: 'src/components/data/data-table.tsx', category: 'Data', description: 'Advanced table with multi-sorting, selection, search, and pagination.' },
  'chart': { path: 'src/components/data/chart.tsx', category: 'Data', description: 'Data visualization chart component.' },
  'stat-card': { path: 'src/components/data/stat-card.tsx', category: 'Data', description: 'Metric card displaying KPI numbers, trend badges, and icons.' },
  'timeline': { path: 'src/components/data/timeline.tsx', category: 'Data', description: 'Vertical chronological activity stream and event sequence tracker.' },
  'tree-view': { path: 'src/components/data/tree-view.tsx', category: 'Data', description: 'Hierarchical navigation tree with branch expansion and keyboard control.' },

  // Feedback
  'alert': { path: 'src/components/feedback/alert.tsx', category: 'Feedback', description: 'Callout banner with semantic variants and dismiss.' },
  'toast': { path: 'src/components/feedback/toast.tsx', category: 'Feedback', description: 'Temporary toast alert notification.' },
  'sonner': { path: 'src/components/feedback/sonner.tsx', category: 'Feedback', description: 'Stacked toast notification stream.' },
  'spinner': { path: 'src/components/feedback/spinner.tsx', category: 'Feedback', description: 'Animated indeterminate loading spinner.' },
  'empty-state': { path: 'src/components/feedback/empty-state.tsx', category: 'Feedback', description: 'Zero-data placeholder graphic and action container.' },
  'banner': { path: 'src/components/feedback/banner.tsx', category: 'Feedback', description: 'Full-width top-level announcement banner with action and dismiss controls.' },
  'message-bubble': { path: 'src/components/feedback/message-bubble.tsx', category: 'Feedback', description: 'Conversational chat message card with avatar, author, timestamp, and copy action.' },
  'reasoning-disclosure': { path: 'src/components/feedback/reasoning-disclosure.tsx', category: 'Feedback', description: 'Collapsible AI thinking and reasoning trace widget with streaming pulse indicators.' },
  'tool-call-card': { path: 'src/components/feedback/tool-call-card.tsx', category: 'Feedback', description: 'Interactive agent tool execution card with parameter inspection and status badges.' },

  // Media
  'avatar': { path: 'src/components/media/avatar.tsx', category: 'Media', description: 'User image avatar with fallback initials.' },
  'badge': { path: 'src/components/media/badge.tsx', category: 'Media', description: 'Status pill badge with semantic styles.' },
  'aspect-ratio': { path: 'src/components/media/aspect-ratio.tsx', category: 'Media', description: 'Aspect ratio container maintaining proportional width and height.' },
  'carousel': { path: 'src/components/media/carousel.tsx', category: 'Media', description: 'Slide carousel with autoplay, touch gestures, and pagination.' },
  'typography': { path: 'src/components/media/typography.tsx', category: 'Media', description: 'Type scale components with semantic HTML elements.' },
  'kbd': { path: 'src/components/media/kbd.tsx', category: 'Media', description: 'Keyboard shortcut indicator badge.' }
};

// Aliases for user convenience (e.g. datatable -> data-table)
const ALIASES = {
  'inputotp': 'input-otp',
  'radiogroup': 'radio-group',
  'datetimepicker': 'datetime-picker',
  'date-picker': 'datetime-picker',
  'datepicker': 'datetime-picker',
  'layout': 'layout-shell',
  'scrollarea': 'scroll-area',
  'datatable': 'data-table',
  'navigationmenu': 'navigation-menu',
  'alertdialog': 'alert-dialog',
  'dropdownmenu': 'dropdown-menu',
  'contextmenu': 'context-menu',
  'hovercard': 'hover-card',
  'aspectratio': 'aspect-ratio',
  'buttongroup': 'button-group',
  'inputgroup': 'input-group',
  'passwordinput': 'password-input',
  'numberinput': 'number-input',
  'emptystate': 'empty-state',
  'multiselect': 'multi-select',
  'daterangepicker': 'date-range-picker',
  'timepicker': 'time-picker',
  'fileupload': 'file-upload',
  'statcard': 'stat-card',
  'treeview': 'tree-view',
  'promptinput': 'prompt-input',
  'messagebubble': 'message-bubble',
  'reasoningdisclosure': 'reasoning-disclosure',
  'toolcallcard': 'tool-call-card'
};

function normalizeName(name) {
  const lower = name.toLowerCase().trim();
  if (COMPONENT_REGISTRY[lower]) return lower;
  if (ALIASES[lower]) return ALIASES[lower];
  const withoutHyphens = lower.replace(/-/g, '');
  if (ALIASES[withoutHyphens]) return ALIASES[withoutHyphens];
  for (const key of Object.keys(COMPONENT_REGISTRY)) {
    if (key.replace(/-/g, '') === withoutHyphens) return key;
  }
  return null;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    command: null,
    targetComponent: null,
    targetDir: path.join(process.cwd(), 'components', 'ui', 'oryn'),
    all: false,
    dryRun: false,
    overwrite: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === 'init') {
      options.command = 'init';
    } else if (arg === '--help' || arg === '-h') {
      options.command = 'help';
    } else if (arg === 'list') {
      options.command = 'list';
    } else if (arg === 'add') {
      options.command = 'add';
      if (args[i + 1] && !args[i + 1].startsWith('-')) {
        options.targetComponent = args[++i];
      }
    } else if (arg === '--all') {
      options.all = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--overwrite') {
      options.overwrite = true;
    } else if (arg === '--copy') {
      // Explicit copy flag
      options.copy = true;
    } else if (arg === '--path' || arg === '-p') {
      if (args[i + 1]) {
        options.targetDir = path.resolve(process.cwd(), args[++i]);
      }
    } else if (!arg.startsWith('-') && !options.targetComponent && !options.command) {
      options.command = 'add';
      options.targetComponent = arg;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
ORYN Component CLI (@oryn/ui)

Commands:
  npx @oryn/ui init                   Initialize project with styles and utils
  npx @oryn/ui list                   List all 75 components by category
  npx @oryn/ui add <component>       Copy component and its dependencies
  npx @oryn/ui add --all             Copy all 75 components

Options:
  --copy              Explicitly copy source code into project (default behavior)
  --path, -p <dir>    Custom destination directory (default: components/ui/oryn)
  --overwrite         Overwrite files if they already exist
  --dry-run           Preview which files would be copied without writing to disk
`);
}

function listComponents() {
  console.log('\n📦 Mad UI Available Components (75 Total):\n');
  const categories = {};
  for (const [name, info] of Object.entries(COMPONENT_REGISTRY)) {
    if (!categories[info.category]) categories[info.category] = [];
    categories[info.category].push({ name, desc: info.description });
  }

  for (const [cat, list] of Object.entries(categories)) {
    console.log(`  \x1b[1m\x1b[34m${cat}\x1b[0m (${list.length} components):`);
    for (const item of list) {
      console.log(`    \x1b[32m${item.name.padEnd(20)}\x1b[0m ${item.desc}`);
    }
    console.log('');
  }
}

// Inspect a source file and extract internal primitives, hooks, utils dependencies
function resolveDependencies(sourceFilePath, rootDir) {
  const content = fs.readFileSync(sourceFilePath, 'utf8');
  const dependencies = {
    primitives: new Set(),
    hooks: new Set(),
    utils: false,
    colors: false,
    icons: false,
    peerComponents: new Set()
  };

  // Check primitive imports
  const primMatches = content.matchAll(/from ['"](?:\.\.\/)+primitives\/([a-z-]+)['"]/g);
  for (const m of primMatches) dependencies.primitives.add(m[1]);

  // Check hook imports
  const hookMatches = content.matchAll(/from ['"](?:\.\.\/)+hooks\/([a-z-]+)['"]/g);
  for (const m of hookMatches) dependencies.hooks.add(m[1]);

  // Check direct hooks module import
  if (content.includes("from '../../hooks'") || content.includes("from '../hooks'")) {
    dependencies.hooks.add('use-controllable-state');
    dependencies.hooks.add('use-id');
  }

  // Check direct primitives module import
  if (content.includes("from '../../primitives'") || content.includes("from '../primitives'")) {
    dependencies.primitives.add('slot');
  }

  // Check utils / colors
  if (content.includes('/lib/utils') || content.includes("from '../../lib/utils'")) {
    dependencies.utils = true;
  }
  if (content.includes('/lib/colors')) {
    dependencies.colors = true;
  }
  if (content.includes('/icons')) {
    dependencies.icons = true;
  }

  // Check peer component dependencies (e.g., select trigger, table rows)
  for (const compName of Object.keys(COMPONENT_REGISTRY)) {
    const regex = new RegExp(`from ['"](?:\\.\\.\\/)+[a-z]+\\/${compName}['"]`, 'g');
    if (regex.test(content) && path.basename(sourceFilePath, path.extname(sourceFilePath)) !== compName) {
      dependencies.peerComponents.add(compName);
    }
  }

  return dependencies;
}

// Rewrite relative imports so copied component resolves internal files cleanly in targetDir
function rewriteComponentImports(content) {
  return content
    .replace(/from ['"](?:\.\.\/)+primitives\/([a-z-]+)['"]/g, "from './primitives/$1'")
    .replace(/from ['"](?:\.\.\/)+primitives['"]/g, "from './primitives'")
    .replace(/from ['"](?:\.\.\/)+hooks\/([a-z-]+)['"]/g, "from './hooks/$1'")
    .replace(/from ['"](?:\.\.\/)+hooks['"]/g, "from './hooks'")
    .replace(/from ['"](?:\.\.\/)+lib\/utils['"]/g, "from './lib/utils'")
    .replace(/from ['"](?:\.\.\/)+lib\/colors['"]/g, "from './lib/colors'")
    .replace(/from ['"](?:\.\.\/)+icons['"]/g, "from './icons'")
    .replace(/from ['"](?:\.\.\/)+[a-z]+\/([a-z-]+)['"]/g, "from './$1'");
}

function copyFileSafe(src, dest, overwrite, dryRun, transform = null) {
  if (fs.existsSync(dest) && !overwrite) {
    return { status: 'skipped', reason: 'exists' };
  }

  if (dryRun) {
    return { status: 'would_copy' };
  }

  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (transform) {
    const content = fs.readFileSync(src, 'utf8');
    const transformed = transform(content);
    fs.writeFileSync(dest, transformed, 'utf8');
  } else {
    fs.copyFileSync(src, dest);
  }

  return { status: 'copied' };
}

function initProject(options, rootDir) {
  console.log('\n🚀 Initializing Mad UI in your project...\n');
  const cwd = process.cwd();

  // 1. Ensure lib/utils.ts exists
  const utilsDir = path.join(cwd, 'lib');
  const utilsPath = path.join(utilsDir, 'utils.ts');
  if (!fs.existsSync(utilsPath)) {
    fs.mkdirSync(utilsDir, { recursive: true });
    const templateUtils = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'utils.ts'), 'utf8');
    fs.writeFileSync(utilsPath, templateUtils, 'utf8');
    console.log('  ✓ Created lib/utils.ts');
  } else {
    console.log('  - lib/utils.ts already exists');
  }

  // 2. Ensure components/ui directory exists
  const componentsUiDir = path.join(cwd, 'components', 'ui');
  if (!fs.existsSync(componentsUiDir)) {
    fs.mkdirSync(componentsUiDir, { recursive: true });
    console.log('  ✓ Created components/ui directory');
  }

  console.log('\n🎉 Mad UI initialized successfully!');
  console.log('\nNext steps:');
  console.log('  1. Add theme styles to your globals.css:');
  console.log('     @import "mad-ui-components/theme.css";');
  console.log('  2. For Tailwind v4, add to your CSS:');
  console.log('     @source "../node_modules/mad-ui-components/dist";');
  console.log('  3. Add components to your project:');
  console.log('     npx mad-ui-components add button\n');
}

function main() {
  const options = parseArgs();
  const rootDir = path.resolve(__dirname, '..');

  if (options.command === 'help') {
    printHelp();
    process.exit(0);
  }

  if (options.command === 'init') {
    initProject(options, rootDir);
    process.exit(0);
  }

  if (options.command === 'list') {
    listComponents();
    process.exit(0);
  }

  if (options.all) {
    console.log(`\n🚀 Copying all 75 components to ${options.targetDir}...\n`);
    const components = Object.keys(COMPONENT_REGISTRY);
    let successCount = 0;

    for (const comp of components) {
      const result = copyComponentWithDeps(comp, options, rootDir);
      if (result) successCount++;
    }

    console.log(`\n🎉 Successfully installed ${successCount} components to ${options.targetDir}!\n`);
    process.exit(0);
  }

  if (!options.targetComponent) {
    printHelp();
    process.exit(1);
  }

  const normalized = normalizeName(options.targetComponent);
  if (!normalized) {
    console.error(`\n❌ Component "${options.targetComponent}" not found.`);
    console.log(`Run "npx mad-ui-components list" to view all available components.\n`);
    process.exit(1);
  }

  console.log(`\n📦 Installing \x1b[1m${normalized}\x1b[0m to ${options.targetDir}...`);
  if (options.dryRun) {
    console.log(`   [DRY RUN MODE — No files will be written]\n`);
  }

  const success = copyComponentWithDeps(normalized, options, rootDir);
  if (success) {
    console.log(`\n🎉 Installation complete!`);
    console.log(`Usage:`);
    console.log(`  import { ${capitalize(toCamelCase(normalized))} } from './${path.relative(process.cwd(), options.targetDir)}/${normalized}'\n`);
  }
}

function copyComponentWithDeps(componentKey, options, rootDir) {
  const meta = COMPONENT_REGISTRY[componentKey];
  const srcPath = path.join(rootDir, meta.path);

  if (!fs.existsSync(srcPath)) {
    console.error(`❌ Source file missing: ${srcPath}`);
    return false;
  }

  const targetFile = path.join(options.targetDir, `${componentKey}.tsx`);
  const deps = resolveDependencies(srcPath, rootDir);

  // 1. Copy main component
  const res = copyFileSafe(srcPath, targetFile, options.overwrite, options.dryRun, rewriteComponentImports);
  if (res.status === 'copied') {
    console.log(`  ✓ Created ${path.relative(process.cwd(), targetFile)}`);
  } else if (res.status === 'would_copy') {
    console.log(`  [dry-run] Would create ${path.relative(process.cwd(), targetFile)}`);
  } else {
    console.log(`  - Skipped ${path.relative(process.cwd(), targetFile)} (already exists, use --overwrite)`);
  }

  // 2. Copy resolved primitives
  for (const prim of deps.primitives) {
    const primSrc = path.join(rootDir, 'src', 'primitives', `${prim}.tsx`);
    const primDest = path.join(options.targetDir, 'primitives', `${prim}.tsx`);
    if (fs.existsSync(primSrc)) {
      copyFileSafe(primSrc, primDest, options.overwrite, options.dryRun, (c) => {
        return c.replace(/from ['"]\.\.\/lib\/utils['"]/g, "from '../lib/utils'");
      });
      console.log(`    + Primitive: primitives/${prim}.tsx`);
    }
  }

  // 3. Copy resolved hooks
  for (const hook of deps.hooks) {
    const hookSrc = path.join(rootDir, 'src', 'hooks', `${hook}.ts`);
    const hookDest = path.join(options.targetDir, 'hooks', `${hook}.ts`);
    if (fs.existsSync(hookSrc)) {
      copyFileSafe(hookSrc, hookDest, options.overwrite, options.dryRun);
      console.log(`    + Hook: hooks/${hook}.ts`);
    }
  }

  // 4. Copy utils if needed
  if (deps.utils) {
    const utilsSrc = path.join(rootDir, 'src', 'lib', 'utils.ts');
    const utilsDest = path.join(options.targetDir, 'lib', 'utils.ts');
    if (fs.existsSync(utilsSrc)) {
      copyFileSafe(utilsSrc, utilsDest, options.overwrite, options.dryRun);
      console.log(`    + Utility: lib/utils.ts`);
    }
  }

  // 5. Copy colors if needed
  if (deps.colors) {
    const colorsSrc = path.join(rootDir, 'src', 'lib', 'colors.ts');
    const colorsDest = path.join(options.targetDir, 'lib', 'colors.ts');
    if (fs.existsSync(colorsSrc)) {
      copyFileSafe(colorsSrc, colorsDest, options.overwrite, options.dryRun);
      console.log(`    + Utility: lib/colors.ts`);
    }
  }

  // 6. Copy icons if needed
  if (deps.icons) {
    const iconsSrc = path.join(rootDir, 'src', 'icons', 'index.tsx');
    const iconsDest = path.join(options.targetDir, 'icons', 'index.tsx');
    if (fs.existsSync(iconsSrc)) {
      copyFileSafe(iconsSrc, iconsDest, options.overwrite, options.dryRun);
      console.log(`    + Icons: icons/index.tsx`);
    }
  }

  return true;
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

main();
