# 🚀 Migration Guide: Upgrading to ORYN UI v3

Welcome to **ORYN UI v3**! This major release transforms the library into an enterprise-grade, standalone native design system with **zero third-party UI runtime dependencies**, an accessible **Composable Form System**, an advanced **Semantic DataTable**, an **Interactive Theme Builder**, and a **Smart CLI Component Adder**.

---

## 📋 Summary of Key Upgrades

| Area | Version 2.x | Version 3.x (ORYN UI) |
| :--- | :--- | :--- |
| **UI Dependencies** | Relied on external `@radix-ui/*` packages | **Zero external UI dependencies** (pure native React primitives) |
| **Architecture** | Flat component layout | **Architecture-by-Layer** (`primitives/`, `hooks/`, `theme/`, `components/`) |
| **Forms** | Monolithic passive wrapper divs | **Composable Form Architecture** with automated ARIA ID binding |
| **Data Table** | Fixed 12-column CSS grid | **Semantic Table** with multi-sorting, indeterminate selection & virtualization |
| **Theming** | Static CSS color classes | **Dynamic CSS Tokens** + Interactive Theme Builder (`/theme-builder`) |
| **Distribution** | npm package only | npm package + **Smart CLI** (`npx oryn-ui add <component>`) |

---

## 1. Zero External UI Dependencies Standard

In v3.0, all `@radix-ui/*` packages have been completely purged and replaced with our own lightweight, native headless primitives (`Slot`, `Portal`, `Presence`, `FocusTrap`).

### What Consumers Need to Do:
If your project previously installed Radix UI peer dependencies, you can safely remove them to drastically reduce your `node_modules` size:

```bash
# Optional cleanup: uninstall any leftover Radix UI packages
npm uninstall @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-tooltip
```

Your `package.json` now only requires:
```bash
npm install oryn-ui
```

---

## 2. Upgrading to the Composable Form System

v3 introduces a composable, context-driven form architecture that handles accessible labelling, error announcement, and description linking automatically.

### Before (v2 Monolithic Pattern):
```tsx
// v2: Manual error wiring and ID management
<div className="space-y-2">
  <label htmlFor="email">Email Address</label>
  <Input 
    id="email" 
    error={errors.email ? true : false} 
    aria-describedby="email-error" 
  />
  {errors.email && (
    <p id="email-error" className="text-xs text-red-500">{errors.email}</p>
  )}
</div>
```

### After (v3 Composable Pattern):
```tsx
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage, 
  Input, 
  Button 
} from 'oryn-ui'

export function ProfileForm() {
  const [username, setUsername] = useState('')
  const [errors, setErrors] = useState<{ username?: string }>({})

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <FormField name="username" error={errors.username}>
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="alex.chen" 
            />
          </FormControl>
          <FormDescription>Your public profile handle.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit">Save Changes</Button>
    </Form>
  )
}
```

#### Why Upgrade?
- **Automated ARIA Linking**: `<FormLabel>` automatically receives `htmlFor={formItemId}`, and `<FormControl>` automatically receives `id`, `aria-describedby`, and `aria-invalid`.
- **Automatic Error Detection**: `Input`, `Textarea`, `Checkbox`, `Select`, and `InputOTP` automatically detect `aria-invalid` from `<FormControl>` and render red validation borders without extra props.
- **Dual Mode**: Works 100% standalone with React state, and integrates seamlessly with `react-hook-form` `useForm()` and `zod` validation schemas.

---

## 3. Advanced Semantic DataTable & Virtualizer

In v3, `DataTable` has been rebuilt from scratch on semantic HTML `<table>` elements with interactive capabilities:

```tsx
import { DataTable, type DataTableColumn, Badge } from 'oryn-ui'

interface UserRecord {
  id: string
  name: string
  role: string
  status: 'active' | 'offline'
}

const columns: DataTableColumn<UserRecord>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { 
    key: 'status', 
    header: 'Status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'outline'}>
        {row.status}
      </Badge>
    )
  }
]

export function TeamTable({ users }: { users: UserRecord[] }) {
  return (
    <DataTable
      data={users}
      columns={columns}
      searchable       // Real-time global search bar
      selectable       // Row checkboxes with indeterminate header
      pagination       // Pagination controls with page size selector
      pageSize={10}
      virtualized      // Opt-in 60fps windowing for 1,000+ records
    />
  )
}
```

---

## 4. Layered Subpath Imports

In addition to importing everything from `'oryn-ui'`, v3 exposes dedicated headless layers for maximum bundle optimization:

```tsx
// 1. Full Library
import { Button, Dialog, Form } from 'oryn-ui'

// 2. Primitives Layer (Zero runtime overhead)
import { Slot, Portal, Presence } from 'oryn-ui/primitives'

// 3. Headless Hooks
import { useControllableState, useId, useVirtualizer } from 'oryn-ui/hooks'

// 4. Theming & Tokens
import { ThemeProvider, useTheme } from 'oryn-ui/theme'
```

---

## 5. Local Component Ownership via Smart CLI

If you prefer copying components directly into your application codebase (shadcn-style) instead of consuming the published npm package, v3 includes a built-in CLI:

```bash
# Add components directly with dependencies (primitives, hooks, utils) resolved:
npx oryn-ui add button
npx oryn-ui add dialog
npx oryn-ui add data-table
npx oryn-ui add form

# Explore available components:
npx oryn-ui list
```

---

## 6. Need Help?

- **Documentation & Theme Builder**: [oryn-ui.vercel.app](https://oryn-ui.vercel.app)
- **GitHub Issues**: [github.com/Saswat0602/oryn-ui/issues](https://github.com/Saswat0602/oryn-ui/issues)

