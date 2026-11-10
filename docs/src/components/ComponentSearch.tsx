'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@oryn/ui'
import { getAllComponents } from '@/lib/component-registry'

interface ComponentSearchProps {
  onClose?: () => void
}

export function ComponentSearch({ onClose }: ComponentSearchProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const components = getAllComponents()

  const filteredComponents = useMemo(() => {
    if (!query) return components.slice(0, 12)

    return components.filter((component) =>
      component.title.toLowerCase().includes(query.toLowerCase()) ||
      component.description.toLowerCase().includes(query.toLowerCase()) ||
      component.category.toLowerCase().includes(query.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
  }, [query, components])

  // Group filtered components by category
  const grouped = useMemo(() => {
    return filteredComponents.reduce((acc, comp) => {
      if (!acc[comp.category]) acc[comp.category] = []
      acc[comp.category].push(comp)
      return acc
    }, {} as Record<string, typeof components>)
  }, [filteredComponents])

  const handleSelect = (slug: string) => {
    router.push(`/docs/components/${slug}`)
    onClose?.()
  }

  return (
    <CommandDialog open={true} onOpenChange={(open) => !open && onClose?.()}>
      <CommandInput
        placeholder="Type a command or search components (⌘K)..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[350px]">
        <CommandEmpty>No components or actions found for &quot;{query}&quot;.</CommandEmpty>
        {Object.entries(grouped).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map((component) => (
              <CommandItem
                key={component.slug}
                onSelect={() => handleSelect(component.slug)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{component.title}</span>
                  <span className="text-[11px] text-muted-foreground line-clamp-1">{component.description}</span>
                </div>
                <CommandShortcut>{component.category}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
