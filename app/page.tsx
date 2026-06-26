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
import { CTASection } from '@/components/home/CTASection'

export const revalidate = 60

export default async function HomePage() {
  const [hero, featured, categories, settings] = await Promise.all([
    fetchSanity<HeroConfig | null>(heroConfigQuery).catch(() => null),
    fetchSanity<FeaturedProduct[]>(featuredProductsQuery).catch(() => []),
    fetchSanity<Category[]>(categoriesQuery).catch(() => []),
    fetchSanity<SiteSettings | null>(siteSettingsQuery).catch(() => null),
  ])

  return (
    <>
      <HeroSection hero={hero} />
      <StatsSection stats={settings?.stats ?? null} />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={featured} />
      <CTASection />
    </>
  )
}
