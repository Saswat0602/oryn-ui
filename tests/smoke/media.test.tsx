import React, { StrictMode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { AspectRatio } from '../../src/components/media/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from '../../src/components/media/avatar'
import { Badge } from '../../src/components/media/badge'
import { Carousel, CarouselContent, CarouselItem } from '../../src/components/media/carousel'
import { Kbd } from '../../src/components/media/kbd'
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
  TypographyBlockquote,
  TypographyCode,
  TypographyMuted
} from '../../src/components/media/typography'

describe('Media Domain Smoke & Accessibility Suite', () => {
  it('renders AspectRatio container and passes a11y', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <AspectRatio ratio={16 / 9} className="bg-zinc-100">
          <div>16:9 Aspect Ratio Content</div>
        </AspectRatio>
      </StrictMode>
    )

    expect(getByText('16:9 Aspect Ratio Content')).toBeDefined()

    const ssr = renderToString(
      <AspectRatio ratio={4 / 3}>
        <div>SSR Aspect Ratio</div>
      </AspectRatio>
    )
    expect(ssr).toContain('SSR Aspect Ratio')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Avatar with fallback and AvatarGroup and passes a11y', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <AvatarGroup max={3}>
          <Avatar>
            <AvatarImage src="/avatar1.png" alt="Alice Smith" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <Avatar fallback="BJ" />
          <Avatar fallback="CD" />
        </AvatarGroup>
      </StrictMode>
    )

    expect(getByText('AS')).toBeDefined()
    expect(getByText('BJ')).toBeDefined()
    expect(getByText('CD')).toBeDefined()

    const ssr = renderToString(<Avatar fallback="SR" />)
    expect(ssr).toContain('SR')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Badge with variants and passes a11y', async () => {
    let clicked = false
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <div aria-label="Status badges">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="default" onClick={() => { clicked = true }}>Clickable Badge</Badge>
        </div>
      </StrictMode>
    )

    expect(getByText('Default')).toBeDefined()
    expect(getByText('Secondary')).toBeDefined()
    expect(getByText('Outline')).toBeDefined()
    expect(getByText('Destructive')).toBeDefined()
    expect(getByText('Success')).toBeDefined()
    expect(getByText('Warning')).toBeDefined()
    expect(getByText('Error')).toBeDefined()

    const clickBtn = getByRole('button', { name: 'Clickable Badge' })
    fireEvent.click(clickBtn)
    expect(clicked).toBe(true)

    const ssr = renderToString(<Badge variant="secondary">SSR Badge</Badge>)
    expect(ssr).toContain('SSR Badge')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Carousel with slides and controls and passes a11y', async () => {
    const { container, getByText, getByRole } = render(
      <StrictMode>
        <Carousel showArrows showDots>
          <CarouselContent>
            <CarouselItem>
              <div>Slide 1 Content</div>
            </CarouselItem>
            <CarouselItem>
              <div>Slide 2 Content</div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </StrictMode>
    )

    expect(getByText('Slide 1 Content')).toBeDefined()
    expect(getByText('Slide 2 Content')).toBeDefined()

    // Test carousel keyboard navigation
    const carouselRegion = getByRole('region', { name: '' })
    fireEvent.keyDown(carouselRegion, { key: 'ArrowRight' })
    fireEvent.mouseEnter(carouselRegion)
    fireEvent.mouseLeave(carouselRegion)
    fireEvent.focus(carouselRegion)
    fireEvent.blur(carouselRegion)

    const ssr = renderToString(
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div>SSR Slide Item</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    )
    expect(ssr).toContain('SSR Slide Item')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Kbd with formatted symbols and passes a11y', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <div aria-label="Keyboard shortcuts">
          <Kbd keys={['cmd', 'shift', 'k']} />
          <Kbd>Enter</Kbd>
        </div>
      </StrictMode>
    )

    expect(getByText('⌘')).toBeDefined()
    expect(getByText('⇧')).toBeDefined()
    expect(getByText('↵')).toBeDefined()

    const ssr = renderToString(<Kbd keys={['cmd', 's']} />)
    expect(ssr).toContain('⌘')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it('renders Typography elements and passes a11y', async () => {
    const { container, getByText } = render(
      <StrictMode>
        <div>
          <TypographyH1>Main Heading</TypographyH1>
          <TypographyH2>Secondary Section</TypographyH2>
          <TypographyP>Paragraph explaining architectural patterns.</TypographyP>
          <TypographyBlockquote>Quote on design systems</TypographyBlockquote>
          <TypographyCode>const value = true;</TypographyCode>
          <TypographyMuted>Last updated 2 hours ago</TypographyMuted>
        </div>
      </StrictMode>
    )

    expect(getByText('Main Heading')).toBeDefined()
    expect(getByText('Secondary Section')).toBeDefined()
    expect(getByText('Paragraph explaining architectural patterns.')).toBeDefined()
    expect(getByText('Quote on design systems')).toBeDefined()
    expect(getByText('const value = true;')).toBeDefined()
    expect(getByText('Last updated 2 hours ago')).toBeDefined()

    const ssr = renderToString(<TypographyH1>SSR Heading</TypographyH1>)
    expect(ssr).toContain('SSR Heading')

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})

