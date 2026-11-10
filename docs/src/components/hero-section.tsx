"use client"

import React from 'react'
import { Button } from '@oryn/ui/button'
import { Card, CardContent } from '@oryn/ui/card'
import { Badge } from '@oryn/ui/badge'
import { 
  ArrowRight, 
  Package, 
  Code, 
  BookOpen
} from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  badge?: {
    text: string
    icon?: React.ComponentType<{ className?: string }>
  }
  primaryAction?: {
    text: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }
  secondaryAction?: {
    text: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }
  stats?: Array<{
    value: string
    label: string
  }>
  className?: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  badge,
  primaryAction,
  secondaryAction,
  stats,
  className = ""
}: HeroSectionProps) {
  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Card className="border-2 border-border/50 shadow-xl shadow-primary/5 bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center space-y-8">
              {/* Badge */}
              {badge && (
                <div className="flex justify-center">
                  <Badge 
                    variant="outline" 
                    className="px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5"
                  >
                    {badge.icon && <badge.icon className="w-4 h-4 mr-2" />}
                    {badge.text}
                  </Badge>
                </div>
              )}

              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {title}
                  {subtitle && (
                    <span className="block text-primary">
                      {subtitle}
                    </span>
                  )}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Actions */}
              {(primaryAction || secondaryAction) && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {primaryAction && (
                    <Link href={primaryAction.href}>
                      <Button 
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
                      >
                        <div className="flex items-center gap-3">
                          {primaryAction.icon && <primaryAction.icon className="w-5 h-5" />}
                          <span className="font-semibold">{primaryAction.text}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Button>
                    </Link>
                  )}
                  
                  {secondaryAction && (
                    <Link href={secondaryAction.href}>
                      <Button 
                        variant="outline"
                        size="lg"
                        className="border-2 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 px-8 py-4 bg-background/50"
                      >
                        <div className="flex items-center gap-3">
                          {secondaryAction.icon && <secondaryAction.icon className="w-5 h-5" />}
                          <span className="font-semibold">{secondaryAction.text}</span>
                        </div>
                      </Button>
                    </Link>
                  )}
                </div>
              )}

              {/* Stats */}
              {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border/50">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Predefined hero sections for common use cases
export function GettingStartedHero() {
  return (
    <HeroSection
      title="Getting Started with"
      subtitle="ORYN UI"
      description="Build beautiful interfaces in minutes. Install, import, and start creating with our comprehensive component library designed for modern web development."
      badge={{
        text: "Documentation",
        icon: BookOpen
      }}
      primaryAction={{
        text: "Install Now",
        href: "/docs/installation",
        icon: Package
      }}
      secondaryAction={{
        text: "View Components",
        href: "/docs/components",
        icon: Code
      }}
      stats={[
        { value: "50+", label: "Components" },
        { value: "10K+", label: "Active Users" },
        { value: "2.5K+", label: "GitHub Stars" }
      ]}
    />
  )
}

export function InstallationHero() {
  return (
    <HeroSection
      title="Installation Guide"
      description="Learn how to install and set up ORYN UI components in your project with our comprehensive installation guide."
      badge={{
        text: "Installation Guide",
        icon: Package
      }}
      primaryAction={{
        text: "Quick Install",
        href: "#package-installation",
        icon: Package
      }}
      secondaryAction={{
        text: "View Examples",
        href: "/docs/examples",
        icon: Code
      }}
    />
  )
}

export function ComponentsHero() {
  return (
    <HeroSection
      title="Component Library"
      description="Explore our comprehensive collection of 50+ production-ready components with live examples and detailed documentation."
      badge={{
        text: "Components",
        icon: Package
      }}
      primaryAction={{
        text: "Browse All",
        href: "#components",
        icon: Package
      }}
      secondaryAction={{
        text: "Get Started",
        href: "/docs/getting-started",
        icon: BookOpen
      }}
      stats={[
        { value: "50+", label: "Components" },
        { value: "8", label: "Categories" },
        { value: "100%", label: "Accessible" }
      ]}
    />
  )
}
