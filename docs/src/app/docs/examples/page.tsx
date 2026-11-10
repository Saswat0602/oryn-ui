"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter,
  Badge, 
  Input, 
  Label, 
  Checkbox, 
  Switch, 
  Progress, 
  Slider, 
  Rating, 
  Textarea,
  Avatar,
  Select,
  DataTable,
  type DataTableColumn,
  PromptInput,
  MessageBubble,
  ReasoningDisclosure,
  ToolCallCard
} from 'oryn-ui'
import { 
  Copy, 
  Check, 
  Eye, 
  Code2, 
  Mail, 
  Lock, 
  EyeOff, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Send, 
  Github, 
  Globe, 
  ArrowRight,
  Bell,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import * as snippets from '@/data/example-snippets'
import { CodeBlock } from '@/components/CodeBlock'


interface ExamplePattern {
  id: string
  title: string
  category: 'dashboard' | 'auth' | 'settings' | 'billing' | 'team' | 'ai'
  description: string
  code: string
  component: React.ReactNode
}

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'dashboard' | 'auth' | 'settings' | 'billing' | 'team' | 'ai'>('all')
  const [viewModes, setViewModes] = useState<Record<string, 'preview' | 'code'>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Interactive state for Login Form
  const [loginEmail, setLoginEmail] = useState('alex.chen@enterprise.io')
  const [loginPassword, setLoginPassword] = useState('••••••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loginLoading, setLoginLoading] = useState(false)

  // Interactive state for Settings Panel
  const [twoFactor, setTwoFactor] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState(45)
  const [ratingScore, setRatingScore] = useState(5)
  const [profileProgress, setProfileProgress] = useState(85)

  // Interactive state for Billing
  const [cardName, setCardName] = useState('Alex Chen')
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242')
  const [autoRenew, setAutoRenew] = useState(true)

  // Interactive state for Team
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')

  const toggleViewMode = (id: string, mode: 'preview' | 'code') => {
    setViewModes(prev => ({ ...prev, [id]: mode }))
  }

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const examples: ExamplePattern[] = [
    {
      id: 'cluster-dashboard',
      title: 'Infrastructure & Service Health Dashboard',
      category: 'dashboard',
      description: 'Mission-critical distributed operations view with real-time health stats, sorting, search filtering, and paginated incident logs.',
      code: snippets.dashboard,
      component: (
        <div className="space-y-5 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-4 border-border/80">
              <span className="text-xs font-medium text-muted-foreground">Cluster Health</span>
              <p className="text-2xl font-bold text-emerald-500 mt-1">99.98%</p>
              <span className="text-[11px] text-muted-foreground">30-day trailing uptime</span>
            </Card>
            <Card className="p-4 border-border/80">
              <span className="text-xs font-medium text-muted-foreground">Average Latency</span>
              <p className="text-2xl font-bold text-foreground mt-1">18ms</p>
              <span className="text-[11px] text-muted-foreground">Across 48 edge nodes</span>
            </Card>
            <Card className="p-4 border-border/80">
              <span className="text-xs font-medium text-muted-foreground">Active Workloads</span>
              <p className="text-2xl font-bold text-foreground mt-1">342</p>
              <span className="text-[11px] text-muted-foreground">Kubernetes deployments</span>
            </Card>
          </div>

          <Card className="shadow-xs border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Service Health Matrix</CardTitle>
              <CardDescription className="text-xs">
                Real-time latency metrics and deployment states across production regions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={[
                  { id: '1', name: 'Authentication API', region: 'us-east-1', status: 'operational', latency: '18ms', uptime: '99.99%' },
                  { id: '2', name: 'PostgreSQL Primary', region: 'us-east-1', status: 'operational', latency: '4ms', uptime: '100%' },
                  { id: '3', name: 'Edge CDN Workers', region: 'global', status: 'operational', latency: '12ms', uptime: '99.95%' },
                  { id: '4', name: 'Background Job Queue', region: 'eu-west-1', status: 'degraded', latency: '142ms', uptime: '98.50%' },
                  { id: '5', name: 'Analytics Pipeline', region: 'us-west-2', status: 'maintenance', latency: '—', uptime: '99.20%' },
                ]}
                columns={[
                  { key: 'name', header: 'Service', sortable: true },
                  { key: 'region', header: 'Region', sortable: true },
                  { 
                    key: 'status', 
                    header: 'Health', 
                    cell: (row: any) => (
                      <Badge variant={row.status === 'operational' ? 'success' : row.status === 'degraded' ? 'warning' : 'outline'} className="text-[10px]">
                        {row.status}
                      </Badge>
                    )
                  },
                  { key: 'latency', header: 'Latency', sortable: true },
                  { key: 'uptime', header: 'Uptime', sortable: true }
                ]}
                searchable
                selectable
                pagination
                pageSize={5}
              />
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'auth-login',
      title: 'Enterprise Authentication & SSO',
      category: 'auth',
      description: 'Production sign-in card with social SSO providers, password visibility toggle, and accessibility compliance.',
      code: snippets.auth,
      component: (
        <Card className="w-full max-w-md mx-auto shadow-sm border border-border/80">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-xs">
              Sign in to access your enterprise dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full text-xs" leftIcon={<Github className="h-4 w-4" />}>
                GitHub
              </Button>
              <Button variant="outline" size="sm" className="w-full text-xs" leftIcon={<Globe className="h-4 w-4" />}>
                Google SSO
              </Button>
            </div>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-border w-full" />
              <span className="bg-card px-2 text-[10px] text-muted-foreground uppercase font-mono absolute">
                Or with work email
              </span>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault()
                setLoginLoading(true)
                setTimeout(() => setLoginLoading(false), 1200)
              }} 
              className="space-y-3"
            >
              <div className="space-y-1.5">
                <Label htmlFor="demo-login-email" className="text-xs font-medium">Work Email</Label>
                <Input 
                  id="demo-login-email" 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  leftIcon={<Mail className="h-3.5 w-3.5" />}
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <Label htmlFor="demo-login-pwd">Password</Label>
                  <span className="text-primary hover:underline cursor-pointer font-medium text-[11px]">Forgot password?</span>
                </div>
                <div className="relative">
                  <Input 
                    id="demo-login-pwd" 
                    type={showPassword ? 'text' : 'password'} 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    leftIcon={<Lock className="h-3.5 w-3.5" />}
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <Checkbox 
                  id="demo-remember" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label="Remember this device for 30 days" 
                />
              </div>

              <Button type="submit" className="w-full mt-2 font-medium" loading={loginLoading}>
                Sign In to Account
              </Button>
            </form>
          </CardContent>
        </Card>
      )
    },
    {
      id: 'settings-preferences',
      title: 'Workspace Preferences & Security',
      category: 'settings',
      description: 'Account settings panel featuring precision sliders, toggle switches, rating components, and completion telemetry.',
      code: snippets.settings,
      component: (
        <Card className="w-full max-w-lg mx-auto shadow-sm border border-border/80">
          <CardHeader className="pb-3">
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
                    Session Idle Timeout
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px]">{sessionTimeout}m</Badge>
                </div>
                <Slider 
                  value={sessionTimeout} 
                  onChange={(val: any) => setSessionTimeout(Array.isArray(val) ? val[0] : val)}
                  min={15} 

                  max={120} 
                  step={5} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Profile Setup Completion</span>
                <span className="font-mono text-xs font-semibold text-primary">{profileProgress}%</span>
              </div>
              <Progress value={profileProgress} />
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="font-medium text-muted-foreground">Admin Experience Rating</span>
              <Rating value={ratingScore} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t border-border/40 pt-3">
            <Button variant="outline" size="sm" className="text-xs">Cancel</Button>
            <Button size="sm" className="text-xs">Save Changes</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 'billing-payment',
      title: 'Payment Method & Subscription',
      category: 'billing',
      description: 'Billing portal card with masked card number, plan renewal toggles, and status badges.',
      code: snippets.billing,
      component: (
        <Card className="w-full max-w-md mx-auto shadow-sm border border-border/80">
          <CardHeader className="pb-3">
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
                <Label htmlFor="demo-card-name" className="text-xs">Cardholder Name</Label>
                <Input id="demo-card-name" value={cardName} onChange={(e) => setCardName(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="demo-card-num" className="text-xs">Card Number</Label>
                <Input 
                  id="demo-card-num" 
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value)}
                  leftIcon={<CreditCard className="h-3.5 w-3.5" />} 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-card-exp" className="text-xs">Expiration</Label>
                  <Input id="demo-card-exp" defaultValue="12 / 28" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demo-card-cvc" className="text-xs">CVC Code</Label>
                  <Input id="demo-card-cvc" defaultValue="982" />
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
    },
    {
      id: 'team-invites',
      title: 'Team Access & Collaboration',
      category: 'team',
      description: 'Member invitation panel with role assignment, permission badges, and active member roster.',
      code: snippets.team,
      component: (
        <Card className="w-full max-w-lg mx-auto shadow-sm border border-border/80">
          <CardHeader className="pb-3">
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
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                leftIcon={<Mail className="h-3.5 w-3.5" />}
                className="text-xs"
              />
              <Button size="sm" className="text-xs shrink-0">Send Invite</Button>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/40">
              {[
                { name: 'Sarah Lin', email: 'sarah@enterprise.io', role: 'Owner', avatar: 'SL' },
                { name: 'Marcus Vance', email: 'marcus@enterprise.io', role: 'Engineer', avatar: 'MV' },
                { name: 'Elena Rostova', email: 'elena@enterprise.io', role: 'Designer', avatar: 'ER' },
              ].map((m, idx) => (
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
    },
    {
      id: 'ai-agent',
      title: 'Autonomous AI Agent & Conversational Assistant',
      category: 'ai',
      description: 'Production AI conversational workflow featuring PromptInput, reasoning disclosures, agent tool call cards, and responsive message bubbles.',
      code: `import { 
  PromptInput, 
  MessageBubble, 
  ReasoningDisclosure, 
  ToolCallCard 
} from 'oryn-ui'
import { useState } from 'react'

export function AIAssistantPattern() {
  const [prompt, setPrompt] = useState('')
  const [streaming, setStreaming] = useState(false)

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <MessageBubble
        role="user"
        content="Diagnose why cluster eu-west-1 had p99 latency spikes during the 14:00 deployment."
        timestamp="14:02"
      />

      <ReasoningDisclosure duration={3.4} defaultOpen>
        <div className="space-y-1 text-xs font-mono text-muted-foreground">
          <p>1. Ingesting telemetry traces from ingress-gateway pods.</p>
          <p>2. Cross-referencing connection pool metrics in Redis replica.</p>
          <p>3. Detected TCP socket exhaustion during rolling restart.</p>
        </div>
      </ReasoningDisclosure>

      <ToolCallCard
        toolName="query_cluster_telemetry"
        status="completed"
        duration="142ms"
        args={{ region: 'eu-west-1', metric: 'p99_latency_ms', window: '30m' }}
        result={{ peak_latency_ms: 184.2, baseline_ms: 12.1, anomalous_pods: 3 }}
      />

      <MessageBubble
        role="assistant"
        content="The p99 latency spike was caused by temporary TCP socket exhaustion during the rolling deployment. Three worker pods failed health checks due to Redis connection pool starvation. Recommended action: Increase connection pool limits from 50 to 150."
        timestamp="14:03"
        copyable
      />

      <PromptInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={(text) => {
          setStreaming(true)
          setTimeout(() => {
            setStreaming(false)
            setPrompt('')
          }, 1500)
        }}
        loading={streaming}
        onStop={() => setStreaming(false)}
        placeholder="Reply to AI assistant or ask a follow-up question..."
      />
    </div>
  )
}`,
      component: <AIAssistantDemo />
    }
  ]

  const filteredExamples = activeTab === 'all' 
    ? examples 
    : examples.filter(ex => ex.category === activeTab)

  return (
    <div className="space-y-12 w-full pb-16">
      {/* Header */}
      <div className="border-b border-border/40 pb-8">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Documentation</span>
          <span>•</span>
          <span>Application Patterns</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Real-World Application Patterns
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-3xl">
          Complete, production-grade interface patterns built directly with ORYN UI primitives. Copy, paste, and customize with zero setup friction.
        </p>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1.5 scrollbar-none sm:flex-wrap">
          {[
            { id: 'all', label: 'All Patterns' },
            { id: 'dashboard', label: 'Operations & Analytics' },
            { id: 'auth', label: 'Authentication' },
            { id: 'settings', label: 'Security & Preferences' },
            { id: 'billing', label: 'Billing & Payments' },
            { id: 'team', label: 'Team Collaboration' },
            { id: 'ai', label: 'AI Agent & Chat' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-foreground text-background font-semibold shadow-xs'
                  : 'bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Examples Showcase Stream */}
      <div className="space-y-12">
        {filteredExamples.map((ex) => {
          const currentMode = viewModes[ex.id] || 'preview'

          return (
            <div key={ex.id} className="rounded-2xl border border-border/70 bg-card/40 overflow-hidden shadow-xs">
              {/* Pattern Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-border/60 bg-muted/20">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base text-foreground">{ex.title}</h3>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono">{ex.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{ex.description}</p>
                </div>

                {/* Segmented Controls: Preview vs Code */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <div className="inline-flex rounded-lg border border-border/60 bg-muted/40 p-0.5 text-xs">
                    <button
                      onClick={() => toggleViewMode(ex.id, 'preview')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        currentMode === 'preview'
                          ? 'bg-background text-foreground font-semibold shadow-2xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => toggleViewMode(ex.id, 'code')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        currentMode === 'code'
                          ? 'bg-background text-foreground font-semibold shadow-2xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      <span>Code</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyCode(ex.id, ex.code)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/60 bg-background hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {copiedId === ex.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Pattern Body: Live Preview Canvas or Monaco Code Box */}
              <div className="p-4 sm:p-6 md:p-10 bg-zinc-50/50 dark:bg-[#0c0d12]/60 overflow-x-auto">
                {currentMode === 'preview' ? (
                  <div className="w-full flex items-center justify-center overflow-x-auto">
                    {ex.component}
                  </div>
                ) : (
                  <CodeBlock
                    code={ex.code}
                    language="tsx"
                    filename={`${ex.id}.tsx`}
                    showLineNumbers={true}
                  />
                )}
              </div>

            </div>
          )
        })}
      </div>

      {/* Footer Navigation CTA */}
      <section className="rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-muted/20 p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-foreground">Ready to Build Your Application?</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Explore all 75+ components or review framework-specific setup guides.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link href="/docs/components">
            <Button size="sm" className="px-5 font-semibold">
              <span>Component Catalog</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
          <Link href="/docs/installation">
            <Button variant="outline" size="sm" className="px-5">
              <span>Installation Guides</span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function AIAssistantDemo() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; time: string }>>([
    {
      role: 'user',
      content: 'Diagnose why cluster eu-west-1 had p99 latency spikes during the 14:00 deployment.',
      time: '14:02'
    },
    {
      role: 'assistant',
      content: 'The p99 latency spike was caused by temporary TCP socket exhaustion during the rolling deployment. Three worker pods failed health checks due to Redis connection pool starvation. Recommended action: Increase connection pool limits from 50 to 150.',
      time: '14:03'
    }
  ])

  const handleSend = (text: string) => {
    if (!text.trim()) return
    const userMsg = { role: 'user' as const, content: text, time: 'Just now' }
    setMessages(prev => [...prev, userMsg])
    setPrompt('')
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Analysis complete for: "${text}". All worker pods are now responding within baseline latency thresholds.`,
          time: 'Just now'
        }
      ])
    }, 1800)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <MessageBubble
        role={messages[0].role}
        content={messages[0].content}
        timestamp={messages[0].time}
      />

      <ReasoningDisclosure duration={3.4} defaultOpen>
        <div className="space-y-1 text-xs font-mono text-muted-foreground">
          <p>1. Ingesting telemetry traces from ingress-gateway pods.</p>
          <p>2. Cross-referencing connection pool metrics in Redis replica.</p>
          <p>3. Detected TCP socket exhaustion during rolling restart.</p>
        </div>
      </ReasoningDisclosure>

      <ToolCallCard
        toolName="query_cluster_telemetry"
        status="completed"
        duration="142ms"
        args={{ region: 'eu-west-1', metric: 'p99_latency_ms', window: '30m' }}
        result={{ peak_latency_ms: 184.2, baseline_ms: 12.1, anomalous_pods: 3 }}
      />

      {messages.slice(1).map((msg, i) => (
        <MessageBubble
          key={i}
          role={msg.role}
          content={msg.content}
          timestamp={msg.time}
          copyable={msg.role === 'assistant'}
        />
      ))}

      <PromptInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={handleSend}
        loading={loading}
        onStop={() => setLoading(false)}
        placeholder="Reply or ask the AI assistant a follow-up question..."
      />
    </div>
  )
}