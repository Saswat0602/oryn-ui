import packageJson from '../../../package.json'

export const siteConfig = {
  name: "ORYN",
  fullName: "ORYN UI",
  tagline: "Crafting clarity into every interface.",
  description: "A modern component library for building beautiful, accessible interfaces.",
  packageName: packageJson.name as string, // "@oryn/ui"
  version: `v${packageJson.version}`,
  rawVersion: packageJson.version,
  totalComponents: "75+",
  url: "https://oryn-ui.vercel.app",
  links: {
    github: "https://github.com/Saswat0602/oryn-ui",
    npm: `https://www.npmjs.com/package/${packageJson.name}`,
    issues: "https://github.com/Saswat0602/oryn-ui/issues",
    releases: "https://github.com/Saswat0602/oryn-ui/releases",
  },
  installCommands: {
    npm: `npm install ${packageJson.name}`,
    pnpm: `pnpm add ${packageJson.name}`,
    yarn: `yarn add ${packageJson.name}`,
    bun: `bun add ${packageJson.name}`,
  },
  cli: {
    command: `npx ${packageJson.name}`,
    add: (component: string) => `npx ${packageJson.name} add ${component}`,
    list: `npx ${packageJson.name} list`,
    init: `npx ${packageJson.name} init`,
  },
  imports: {
    root: (exportName: string) => `import { ${exportName} } from '${packageJson.name}'`,
    subpath: (exportName: string, subpath: string) => `import { ${exportName} } from '${packageJson.name}/${subpath}'`,
    styles: `import "${packageJson.name}/styles.css"`,
    theme: `@import "${packageJson.name}/theme.css";`,
    tailwindSource: `@source "../node_modules/${packageJson.name}/dist";`,
  }
} as const

export type SiteConfig = typeof siteConfig

