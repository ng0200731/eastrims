import { fetchSanity } from '@/lib/sanity/fetch'
import {
  heroConfigQuery,
  featuredProductsQuery,
  categoriesQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries'
import type {
  HeroConfig,
  FeaturedProduct,
  Category,
  SiteSettings,
} from '@/lib/sanity/types'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { CategoryShowcase } from '@/components/home/CategoryShowcase'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { CraftsmanshipStory } from '@/components/home/CraftsmanshipStory'
import { CTASection } from '@/components/home/CTASection'
import { JsonLd } from '@/components/JsonLd'
import { BRAND_NAME } from '@/lib/site-defaults'

export const revalidate = 60

export default async function HomePage() {
  const [hero, featured, categories, settings] = await Promise.all([
    fetchSanity<HeroConfig | null>(heroConfigQuery).catch(() => null),
    fetchSanity<FeaturedProduct[]>(featuredProductsQuery).catch(() => []),
    fetchSanity<Category[]>(categoriesQuery).catch(() => []),
    fetchSanity<SiteSettings | null>(siteSettingsQuery).catch(() => null),
  ])

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eastrims.com',
    description: 'Premium garment trims, labels, and packaging for global fashion brands.',
  }

  return (
    <>
      <JsonLd data={orgLd} />
      <HeroSection hero={hero} />
      <StatsSection stats={settings?.stats ?? null} />
      <CategoryShowcase categories={categories} />
      <CraftsmanshipStory />
      <FeaturedProducts products={featured} />
      <CTASection />
    </>
  )
}
