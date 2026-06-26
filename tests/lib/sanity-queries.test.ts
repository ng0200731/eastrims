import { describe, it, expect } from 'vitest'
import {
  heroConfigQuery,
  siteSettingsQuery,
  categoriesQuery,
  featuredProductsQuery,
  productBySlugQuery,
  marketingVideosByPlatformQuery,
} from '@/lib/sanity/queries'

describe('GROQ queries', () => {
  it('heroConfig targets the singleton id', () => {
    expect(heroConfigQuery).toContain('_id == "hero-config-main"')
  })
  it('siteSettings targets the singleton id', () => {
    expect(siteSettingsQuery).toContain('_id == "site-settings-main"')
  })
  it('productBySlug takes a $slug param', () => {
    expect(productBySlugQuery).toContain('$slug')
    expect(productBySlugQuery).toContain('slug.current == $slug')
  })
  it('featuredProducts filters featured==true', () => {
    expect(featuredProductsQuery).toContain('featured == true')
  })
  it('all queries are strings starting with a GROQ projection', () => {
    for (const q of [
      heroConfigQuery,
      siteSettingsQuery,
      categoriesQuery,
      featuredProductsQuery,
      productBySlugQuery,
      marketingVideosByPlatformQuery,
    ]) {
      expect(typeof q).toBe('string')
      expect(q.startsWith('*[')).toBe(true)
    }
  })
})
