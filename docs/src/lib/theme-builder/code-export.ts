import { ThemeConfig, BasePaletteDef } from './types'

interface TokenSet {
  light: { primary: string; primaryForeground: string }
  dark: { primary: string; primaryForeground: string }
}

export function generateCssVariables(
  theme: ThemeConfig,
  tokens: TokenSet,
  base: BasePaletteDef
): string {
  return `/* Add to your globals.css or root stylesheet */
@layer base {
  :root {
    --background: ${base.light.background};
    --foreground: ${base.light.foreground};

    --card: ${base.light.card};
    --card-foreground: ${base.light.cardForeground};

    --popover: ${base.light.popover};
    --popover-foreground: ${base.light.popoverForeground};

    --primary: ${tokens.light.primary};
    --primary-foreground: ${tokens.light.primaryForeground};

    --secondary: ${base.light.muted};
    --secondary-foreground: ${base.light.foreground};

    --muted: ${base.light.muted};
    --muted-foreground: ${base.light.mutedForeground};

    --accent: ${base.light.muted};
    --accent-foreground: ${base.light.foreground};

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: ${base.light.border};
    --input: ${base.light.input};
    --ring: ${tokens.light.primary};

    --radius: ${theme.radius};
  }

  .dark {
    --background: ${base.dark.background};
    --foreground: ${base.dark.foreground};

    --card: ${base.dark.card};
    --card-foreground: ${base.dark.cardForeground};

    --popover: ${base.dark.popover};
    --popover-foreground: ${base.dark.popoverForeground};

    --primary: ${tokens.dark.primary};
    --primary-foreground: ${tokens.dark.primaryForeground};

    --secondary: ${base.dark.muted};
    --secondary-foreground: ${base.dark.foreground};

    --muted: ${base.dark.muted};
    --muted-foreground: ${base.dark.mutedForeground};

    --accent: ${base.dark.muted};
    --accent-foreground: ${base.dark.foreground};

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: ${base.dark.border};
    --input: ${base.dark.input};
    --ring: ${tokens.dark.primary};
  }
}`
}

export function generateTailwindV3(): string {
  return `// In your tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}`
}

export function generateTailwindV4(theme: ThemeConfig, tokens: TokenSet): string {
  return `/* In your globals.css with Tailwind CSS v4 */
@import "tailwindcss";

@theme {
  --color-primary: hsl(${tokens.light.primary});
  --color-primary-foreground: hsl(${tokens.light.primaryForeground});
  --radius-sm: calc(${theme.radius} - 4px);
  --radius-md: calc(${theme.radius} - 2px);
  --radius-lg: ${theme.radius};
  --radius-xl: calc(${theme.radius} + 4px);
}`
}

export function generateJsonTokens(theme: ThemeConfig, tokens: TokenSet): string {
  return JSON.stringify(
    {
      name: theme.isCustom ? 'Custom Theme' : theme.activePresetId,
      primaryHex: theme.primaryHex,
      baseColor: theme.baseColor,
      radius: theme.radius,
      font: theme.font,
      tokens: {
        light: {
          primary: `hsl(${tokens.light.primary})`,
          primaryForeground: `hsl(${tokens.light.primaryForeground})`,
          radius: theme.radius
        },
        dark: {
          primary: `hsl(${tokens.dark.primary})`,
          primaryForeground: `hsl(${tokens.dark.primaryForeground})`,
          radius: theme.radius
        }
      }
    },
    null,
    2
  )
}

