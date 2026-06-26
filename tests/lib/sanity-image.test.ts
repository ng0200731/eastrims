import { describe, it, expect } from 'vitest'
import { imageUrlBuilder } from '@/lib/sanity/image'

describe('imageUrlBuilder', () => {
  it('returns a Sanity CDN URL for an image reference', () => {
    const url = imageUrlBuilder({ _ref: 'image-abc123def-640x480-jpg' } as never, 320)
    expect(typeof url).toBe('string')
    expect(url).toContain('sanity')
    expect(url).toContain('abc123def')
  })
})
