// TypeScript projections matching lib/sanity/queries.ts GROQ selections.

export interface CategoryRef {
  title: string
  slug: string
}

export interface MaterialRef {
  title: string
  slug: string
  texturePreviewUrl: string | null
  shaderConfig: {
    baseColor?: string
    roughness?: number
    metallic?: number
    anisotropicStrength?: number
  } | null
}

export interface RelatedProductRef {
  title: string
  slug: string
  heroImageUrl: string | null
}

export interface FeaturedProduct {
  title: string
  slug: string
  shortDescription: string | null
  heroImageUrl: string | null
  model3dUrl: string | null
  leadTime: string | null
  minOrderQuantity: number | null
  category: CategoryRef | null
}

export interface ProductSeo {
  title?: string
  description?: string
  keywords?: string[]
}

export interface ProductDetail {
  title: string
  slug: string
  sku: string | null
  description: unknown[] | null // portable text blocks
  shortDescription: string | null
  heroImageUrl: string | null
  gallery: Array<{ asset: { _ref: string } }> | null
  model3dUrl: string | null
  materials: MaterialRef[] | null
  variants: unknown[] | null
  specifications: unknown[] | null
  features: string[] | null
  applications: string[] | null
  minOrderQuantity: number | null
  leadTime: string | null
  priceRange: string | null
  relatedProducts: RelatedProductRef[] | null
  revealVideoUrl: string | null
  hotspots: unknown[] | null
  seo: ProductSeo | null
  featured: boolean | null
  category: CategoryRef | null
}

export interface Category {
  title: string
  slug: { current: string }
  description: unknown[] | null
  heroImageUrl: string | null
}

export interface Stat {
  value: string
  label: string
}

export interface SiteSettings {
  title: string | null
  description: string | null
  logoUrl: string | null
  brandColors: Record<string, string> | null
  socialLinks: Record<string, string> | null
  contactInfo: Record<string, string> | null
  stats: Stat[] | null
  shippingRoutes: Array<{
    origin: string
    destination: string
    leadTimeDays: number | null
  }> | null
}

export interface HeroConfig {
  title: string | null
  subtitle: string | null
  ctaText: string | null
  ctaLink: string | null
  heroModelUrl: string | null
  heroVideo: { cdnUrl: string } | null
  particleConfig: { count?: number; color?: string; size?: number } | null
  lightingPreset: string | null
  backgroundGradient: string | null
}
