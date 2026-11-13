// Getting started snippets and installation commands
// Extracted to keep page component clean, declarative, and maintainable.

import { siteConfig } from '@/lib/site-config'

export const installCommands = siteConfig.installCommands

export const tailwindConfig = `const path = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Monorepo & hoisting-safe resolution
    path.dirname(require.resolve("${siteConfig.packageName}/package.json")) + "/dist/**/*.{mjs,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

export const tailwindV4Config = `@import "tailwindcss";
@source "../node_modules/${siteConfig.packageName}/dist";`

export const cssImport = `// In your root layout or main entry:
import "${siteConfig.packageName}/styles.css"`

export const usage = `import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  Input, 
  Label 
} from '${siteConfig.packageName}'

export function LoginCard() {
  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your corporate credentials to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" placeholder="name@example.com" type="email" />
        </div>
        <Button className="w-full">Continue</Button>
      </CardContent>
    </Card>
  )
}`
