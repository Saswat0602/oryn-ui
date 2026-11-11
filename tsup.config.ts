import { defineConfig } from 'tsup'

// Shared base options for all bundles
const sharedOptions = {
  format: ['esm'] as const,
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false, // MUST stay false — clean:true breaks Next.js Turbopack file-handle watches
  external: ['react', 'react-dom', 'clsx', 'tailwind-merge', 'lucide-react'],
  esbuildOptions(options: any) {
    options.jsx = 'automatic'
    options.keepNames = true    // Needed for React DevTools component names
    options.treeShaking = true
    // DO NOT set: minifyIdentifiers, drop, mangleProps, ignoreAnnotations
    // Libraries ship readable code; consumers do their own minification
  },
  minify: false,   // Consumers minify; we ship readable code + sourcemaps
  target: 'es2020' as const,
  platform: 'browser' as const,
  outDir: 'dist',
  outExtension: () => ({ js: '.mjs' }),
  // Inject "use client" at the top of every built file so components work
  // in Next.js App Router Server Components
  banner: { js: '"use client";' },
}

export default defineConfig([
  // Main entry point
  {
    ...sharedOptions,
    entry: ['src/index.ts'],
  },
  // Core components (most commonly used)
  {
    ...sharedOptions,
    entry: ['src/core.ts'],
  },
  // Module groups
  {
    ...sharedOptions,
    entry: [
      'src/modules/forms.ts',
      'src/modules/overlay.ts',
      'src/modules/layout.ts',
      'src/modules/data.ts',
      'src/modules/feedback.ts',
      'src/modules/navigation.ts',
      'src/modules/media.ts',
    ],
  },
  // Architecture Layer: Primitives, Hooks, and Theme
  {
    ...sharedOptions,
    entry: {
      primitives: 'src/primitives/index.ts',
      hooks: 'src/hooks/index.ts',
      theme: 'src/theme/index.ts',
    },
  },
  // Individual components — batch 1: core inputs
  {
    ...sharedOptions,
    entry: [
      'src/individual/button.ts',
      'src/individual/input.ts',
      'src/individual/label.ts',
      'src/individual/textarea.ts',
      'src/individual/select.ts',
      'src/individual/checkbox.ts',
      'src/individual/radio.ts',
      'src/individual/switch.ts',
      'src/individual/slider.ts',
      'src/individual/rating.ts',
      'src/individual/progress.ts',
      'src/individual/button-group.ts',
      'src/individual/input-group.ts',
    ],
  },
  // Individual components — batch 2: forms
  {
    ...sharedOptions,
    entry: [
      'src/individual/card.ts',
      'src/individual/form.ts',
      'src/individual/accordion.ts',
      'src/individual/tabs.ts',
      'src/individual/breadcrumbs.ts',
      'src/individual/input-otp.ts',
      'src/individual/radio-group.ts',
      'src/individual/calendar.ts',
      'src/individual/datetime-picker.ts',
      'src/individual/password-input.ts',
      'src/individual/number-input.ts',
      'src/individual/multi-select.ts',
      'src/individual/date-range-picker.ts',
      'src/individual/time-picker.ts',
      'src/individual/color-picker.ts',
      'src/individual/file-upload.ts',
      'src/individual/prompt-input.ts',
    ],
  },
  // Individual components — batch 3: overlays
  {
    ...sharedOptions,
    entry: [
      'src/individual/context-menu.ts',
      'src/individual/dropdown-menu.ts',
      'src/individual/hover-card.ts',
      'src/individual/tooltip.ts',
      'src/individual/popover.ts',
      'src/individual/alert-dialog.ts',
      'src/individual/dialog.ts',
      'src/individual/modal.ts',
      'src/individual/drawer.ts',
      'src/individual/sheet.ts',
    ],
  },
  // Individual components — batch 4: layout
  {
    ...sharedOptions,
    entry: [
      // NOTE: src/individual/layout.ts renamed to layout-shell to avoid
      // overwriting dist/layout.mjs produced by src/modules/layout.ts
      'src/individual/layout-shell.ts',
      'src/individual/sidebar.ts',
      'src/individual/navbar.ts',
      'src/individual/resizable.ts',
      'src/individual/scroll-area.ts',
      'src/individual/separator.ts',
      'src/individual/collapsible.ts',
      'src/individual/toggle.ts',
    ],
  },
  // Individual components — batch 5: data/navigation
  {
    ...sharedOptions,
    entry: [
      'src/individual/table.ts',
      'src/individual/data-table.ts',
      'src/individual/chart.ts',
      'src/individual/pagination.ts',
      'src/individual/command.ts',
      'src/individual/combobox.ts',
      'src/individual/navigation-menu.ts',
      'src/individual/menubar.ts',
      'src/individual/stepper.ts',
      'src/individual/stat-card.ts',
      'src/individual/timeline.ts',
      'src/individual/tree-view.ts',
    ],
  },
  // Individual components — batch 6: media/feedback
  {
    ...sharedOptions,
    entry: [
      'src/individual/avatar.ts',
      'src/individual/badge.ts',
      'src/individual/aspect-ratio.ts',
      'src/individual/typography.ts',
      'src/individual/carousel.ts',
      'src/individual/skeleton.ts',
      'src/individual/alert.ts',
      'src/individual/toast.ts',
      'src/individual/sonner.ts',
      'src/individual/spinner.ts',
      'src/individual/empty-state.ts',
      'src/individual/banner.ts',
      'src/individual/message-bubble.ts',
      'src/individual/reasoning-disclosure.ts',
      'src/individual/tool-call-card.ts',
      'src/individual/kbd.ts',
    ],
  },
])
