import type { MetadataRoute } from 'next'
import { fetchSanity } from '@/lib/sanity/fetch'
import { allProductSlugsQuery, allBlogSlugsQuery } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eastrims.com'
  const staticRoutes = ['', '/products', '/materials', '/factory', '/about', '/blog', '/quote', '/contact'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })
  )

  const [productSlugs, blogSlugs] = await Promise.all([
    fetchSanity<string[]>(allProductSlugsQuery).catch(() => []),
    fetchSanity<string[]>(allBlogSlugsQuery).catch(() => []),
  ])

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((s) => ({
    url: `${base}/products/${s}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((s) => ({
    url: `${base}/blog/${s}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...blogRoutes]
}
