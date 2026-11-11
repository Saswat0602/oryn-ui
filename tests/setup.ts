import './polyfill.cjs'
import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)

const originalConsoleError = console.error
console.error = (...args: any[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : (args[0]?.message || String(args[0]))
  if (msg.includes('Not implemented:') || msg.includes('HTMLCanvasElement')) return
  originalConsoleError(...args)
}

if (typeof window !== 'undefined') {
  const originalGetComputedStyle = window.getComputedStyle.bind(window)
  window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
    // JSDOM's getComputedStyle emits a virtual console error whenever pseudoElt is passed.
    // Calling it without pseudoElt avoids this while returning a valid CSSStyleDeclaration for axe-core.
    return originalGetComputedStyle(elt)
  }

  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }
  if (!window.matchMedia) {
    window.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })
  }
  if (typeof HTMLCanvasElement !== 'undefined') {
    // @ts-expect-error mock getContext for axe-core in jsdom
    HTMLCanvasElement.prototype.getContext = () => ({
      fillRect: () => {},
      clearRect: () => {},
      getImageData: () => ({ data: new Uint8ClampedArray(4) }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 0 }),
      transform: () => {},
      resetTransform: () => {},
      rect: () => {},
      clip: () => {},
    })
  }
}

afterEach(() => {
  cleanup()
})

