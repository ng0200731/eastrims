import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eastrims.com'
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/', '/marketing'] },
    sitemap: `${base}/sitemap.xml`,
  }
}
