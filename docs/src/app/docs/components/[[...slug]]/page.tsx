import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ComponentDocumentation } from '@/components/ComponentDocumentation'
import { ComponentsCatalogClient } from '@/components/ComponentsCatalogClient'
import { getComponentBySlug, getAllComponents } from '@/lib/component-registry'

interface ComponentPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.[0]
  
  if (!slug) {
    const allComponents = getAllComponents()
    return <ComponentsCatalogClient components={allComponents} />
  }

  const component = getComponentBySlug(slug)
  
  if (!component) {
    notFound()
  }

  return <ComponentDocumentation slug={slug} component={component} />
}

export async function generateStaticParams() {
  const components = getAllComponents()
  
  return components.map((component) => ({
    slug: [component.slug],
  }))
}

export async function generateMetadata({ 
  params 
}: ComponentPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.[0]
  
  if (!slug) {
    return {
      title: 'Components - ORYN UI',
      description: 'Explore all 75+ production-ready React components in the ORYN UI library.',
    }
  }

  const component = getComponentBySlug(slug)
  
  if (!component) {
    return {
      title: 'Component Not Found - ORYN UI'
    }
  }

  return {
    title: `${component.title} - ORYN UI Component Library`,
    description: component.description,
    keywords: [...component.tags],
    openGraph: {
      title: `${component.title} - ORYN UI`,
      description: component.description,
      type: 'article',
    },
  }
}
