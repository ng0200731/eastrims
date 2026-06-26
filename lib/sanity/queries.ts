import groq from 'groq'

export const heroConfigQuery = groq`*[_id == "hero-config-main"][0] {
  title, subtitle, ctaText, ctaLink,
  "heroModelUrl": heroModel.asset->url,
  heroVideo->{ cdnUrl },
  particleConfig,
  lightingPreset,
  backgroundGradient
}`

export const siteSettingsQuery = groq`*[_id == "site-settings-main"][0] {
  title, description,
  "logoUrl": logo.asset->url,
  favicon,
  brandColors,
  socialLinks,
  contactInfo,
  stats,
  shippingRoutes
}`

export const categoriesQuery = groq`*[_type == "category"] | order(order asc) {
  title, slug, description, "heroImageUrl": heroImage.asset->url
}`

export const featuredProductsQuery = groq`*[_type == "product" && featured == true] | order(publishedAt desc) {
  title, "slug": slug.current, shortDescription,
  "heroImageUrl": heroImage.asset->url,
  "model3dUrl": model3d.asset->url,
  leadTime, minOrderQuantity,
  category->{ title, "slug": slug.current }
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  title, "slug": slug.current, sku, description, shortDescription,
  "heroImageUrl": heroImage.asset->url,
  gallery,
  "model3dUrl": model3d.asset->url,
  materials[]->{ title, "slug": slug.current, "texturePreviewUrl": texturePreview.asset->url, shaderConfig },
  variants, specifications, features, applications,
  minOrderQuantity, leadTime, priceRange,
  relatedProducts[]->{ title, "slug": slug.current, "heroImageUrl": heroImage.asset->url },
  "revealVideoUrl": revealVideo->cdnUrl,
  hotspots, seo, featured,
  category->{ title, "slug": slug.current }
}`

export const marketingVideosByPlatformQuery = groq`*[_type == "marketingVideo" && platform == $platform && renderStatus == "complete"] {
  title, composition,
  product->{ title, "slug": slug.current },
  cdnUrl, thumbnailUrl, durationSeconds
}`

export const allProductsQuery = groq`*[_type == "product"] | order(publishedAt desc) {
  title, "slug": slug.current, shortDescription,
  "heroImageUrl": heroImage.asset->url,
  "model3dUrl": model3d.asset->url,
  leadTime, minOrderQuantity,
  category->{ title, "slug": slug.current }
}`

export const productsByCategoryQuery = groq`*[_type == "product" && category->slug.current == $category] | order(publishedAt desc) {
  title, "slug": slug.current, shortDescription,
  "heroImageUrl": heroImage.asset->url,
  "model3dUrl": model3d.asset->url,
  leadTime, minOrderQuantity,
  category->{ title, "slug": slug.current }
}`

export const allProductSlugsQuery = groq`*[_type == "product" && defined(slug.current)].slug.current`
