// Real-world application pattern snippets for Docs Examples page
// Extracted to keep the page component clean, declarative, and maintainable.

export const auth = `import React, { useState } from 'react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label, Checkbox } from 'oryn-ui'
import { Mail, Lock, Eye, EyeOff, Github, Globe } from 'lucide-react'

export function AuthenticationCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-xs">
          Sign in to access your enterprise dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Social SSO */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full text-xs" leftIcon={<Github className="h-4 w-4" />}>
            GitHub
          </Button>
          <Button variant="outline" size="sm" className="w-full text-xs" leftIcon={<Globe className="h-4 w-4" />}>
            Google SSO
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-border w-full" />
          <span className="bg-card px-2 text-[11px] text-muted-foreground uppercase font-mono absolute">
            Or continue with
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium">Work Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="alex@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-3.5 w-3.5" />}
              required 
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-primary hover:underline font-medium text-[11px]">Forgot password?</a>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-3.5 w-3.5" />}
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox 
              id="remember" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)}
              label="Remember this device for 30 days" 
            />
          </div>

          <Button type="submit" className="w-full mt-2 font-medium" loading={loading}>
            Sign In to Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}`

export const settings = `import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Switch, Slider, Progress, Rating, Button, Badge } from 'oryn-ui'
import { ShieldCheck, Bell, Clock } from 'lucide-react'

export function WorkspaceSettings() {
  const [twoFactor, setTwoFactor] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState(45)
  const [ratingScore, setRatingScore] = useState(5)

  return (
    <Card className="w-full max-w-lg mx-auto shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Security &amp; Preferences</CardTitle>
          <Badge variant="success" className="text-[10px]">Verified Account</Badge>
        </div>
        <CardDescription className="text-xs">
          Manage your enterprise security protocols and notification triggers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Two-Factor Authentication
              </span>
              <span className="text-[11px] text-muted-foreground block">
                Enforce hardware key or TOTP code upon login
              </span>
            </div>
            <Switch checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} />
          </div>

          <div className="border-t border-border/40 pt-3 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Bell className="h-3.5 w-3.5 text-primary" />
                Security Incident Alerts
              </span>
              <span className="text-[11px] text-muted-foreground block">
                Instant SMS and webhook notices on unauthorized attempts
              </span>
            </div>
            <Switch checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
          </div>

          <div className="border-t border-border/40 pt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Session Idle Inactivity Timeout
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">{sessionTimeout}m</Badge>
            </div>
            <Slider 
              value={sessionTimeout} 
              onChange={(val) => setSessionTimeout(Array.isArray(val) ? val[0] : val)}
              min={15} 
              max={120} 
              step={5} 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">Profile Setup Completion</span>
            <span className="font-mono text-xs font-semibold text-primary">85%</span>
          </div>
          <Progress value={85} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t border-border/40 pt-3">
        <Button variant="outline" size="sm" className="text-xs">Cancel</Button>
        <Button size="sm" className="text-xs">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}`

export const billing = `import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label, Switch, Button, Badge } from 'oryn-ui'
import { CreditCard, CheckCircle2 } from 'lucide-react'

export function BillingPortal() {
  const [autoRenew, setAutoRenew] = useState(true)

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Billing &amp; Payment</CardTitle>
          <Badge variant="secondary" className="font-mono text-[10px]">Tier 3 • Enterprise</Badge>
        </div>
        <CardDescription className="text-xs">
          Manage payment details and active subscription tier.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 rounded-lg border border-border/60 bg-muted/20 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-foreground block">Active Plan: Enterprise Pro</span>
            <span className="text-[11px] text-muted-foreground">$249 / month • Renews in 18 days</span>
          </div>
          <Badge variant="success" className="text-[10px]">Current</Badge>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="card-name" className="text-xs">Cardholder Name</Label>
            <Input id="card-name" defaultValue="Alex Chen" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="card-num" className="text-xs">Card Number</Label>
            <Input 
              id="card-num" 
              defaultValue="4242 •••• •••• 4242" 
              leftIcon={<CreditCard className="h-3.5 w-3.5" />} 
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label htmlFor="card-exp" className="text-xs">Expiration</Label>
              <Input id="card-exp" defaultValue="12 / 28" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="card-cvc" className="text-xs">CVC Code</Label>
              <Input id="card-cvc" defaultValue="982" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
          <div className="space-y-0.5">
            <span className="font-semibold text-foreground block">Automatic Invoicing</span>
            <span className="text-[11px] text-muted-foreground">Charge primary payment method</span>
          </div>
          <Switch checked={autoRenew} onChange={(e) => setAutoRenew(e.target.checked)} />
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/40 pt-3 flex justify-between">
        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          PCI-DSS Level 1 Compliant
        </span>
        <Button size="sm" className="text-xs">Update Method</Button>
      </CardFooter>
    </Card>
  )
}`

export const team = `import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Button, Badge, Avatar } from 'oryn-ui'
import { Users, Mail } from 'lucide-react'

export function TeamAccessPanel() {
  const members = [
    { name: 'Sarah Lin', email: 'sarah@enterprise.io', role: 'Owner', avatar: 'SL' },
    { name: 'Marcus Vance', email: 'marcus@enterprise.io', role: 'Engineer', avatar: 'MV' },
    { name: 'Elena Rostova', email: 'elena@enterprise.io', role: 'Designer', avatar: 'ER' },
  ]

  return (
    <Card className="w-full max-w-lg mx-auto shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>Organization Members</span>
          </CardTitle>
          <Badge variant="outline" className="font-mono text-[10px]">3 Seats Active</Badge>
        </div>
        <CardDescription className="text-xs">
          Invite teammates and grant scoped role permissions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="colleague@enterprise.io" 
            leftIcon={<Mail className="h-3.5 w-3.5" />}
            className="text-xs"
          />
          <Button size="sm" className="text-xs shrink-0">Send Invite</Button>
        </div>

        <div className="space-y-2 pt-2 border-t border-border/40">
          {members.map((m, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2.5">
                <Avatar fallback={m.avatar} className="h-8 w-8 text-xs font-semibold bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-foreground block">{m.name}</span>
                  <span className="text-[11px] text-muted-foreground block">{m.email}</span>
                </div>
              </div>
              <Badge variant={m.role === 'Owner' ? 'default' : 'secondary'} className="text-[10px]">
                {m.role}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}`

export const dashboard = `import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, DataTable, DataTableColumn } from 'oryn-ui'

interface ServiceRecord {
  id: string
  name: string
  region: string
  status: 'operational' | 'degraded' | 'maintenance'
  latency: string
  uptime: string
}

const services: ServiceRecord[] = [
  { id: '1', name: 'Authentication API', region: 'us-east-1', status: 'operational', latency: '18ms', uptime: '99.99%' },
  { id: '2', name: 'PostgreSQL Primary', region: 'us-east-1', status: 'operational', latency: '4ms', uptime: '100%' },
  { id: '3', name: 'Edge CDN Workers', region: 'global', status: 'operational', latency: '12ms', uptime: '99.95%' },
  { id: '4', name: 'Background Job Queue', region: 'eu-west-1', status: 'degraded', latency: '142ms', uptime: '98.50%' },
  { id: '5', name: 'Analytics Pipeline', region: 'us-west-2', status: 'maintenance', latency: '—', uptime: '99.20%' },
]

export function OperationsDashboard() {
  const columns: DataTableColumn<ServiceRecord>[] = [
    { key: 'name', header: 'Service', sortable: true },
    { key: 'region', header: 'Region', sortable: true },
    { 
      key: 'status', 
      header: 'Health', 
      cell: (row) => (
        <Badge variant={row.status === 'operational' ? 'success' : row.status === 'degraded' ? 'warning' : 'outline'}>
          {row.status}
        </Badge>
      )
    },
    { key: 'latency', header: 'Latency', sortable: true },
    { key: 'uptime', header: 'Uptime (30d)', sortable: true }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cluster Infrastructure</CardTitle>
          <CardDescription>Live health metrics across distributed nodes.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={services} columns={columns} searchable selectable pagination />
        </CardContent>
      </Card>
    </div>
  )
}`
