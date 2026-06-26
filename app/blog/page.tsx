import Link from 'next/link'
import { fetchSanity } from '@/lib/sanity/fetch'
import { allBlogPostsQuery } from '@/lib/sanity/queries'
import type { BlogPostSummary } from '@/lib/sanity/types'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { ResponsiveImage } from '@/components/ResponsiveImage'

export const revalidate = 60

function formatDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage() {
  const posts = await fetchSanity<BlogPostSummary[]>(allBlogPostsQuery).catch(() => [])

  return (
    <>
      <SectionHeading
        center
        eyebrow="Journal"
        title="Insights"
        subtitle="Notes on materials, manufacturing, and brand detail."
        className="mt-8"
      />
      {posts.length > 0 ? (
        <Container className="mt-10 grid grid-cols-1 gap-8 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={`/blog/${p.slug}`} className="group block cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border-subtle bg-surface">
                  {p.coverImageUrl ? (
                    <ResponsiveImage
                      src={p.coverImageUrl}
                      alt={p.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  {p.publishedAt && (
                    <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                      {formatDate(p.publishedAt)}
                    </p>
                  )}
                  <h3 className="mt-1 font-display text-xl font-medium transition-colors group-hover:text-accent-gold">
                    {p.title}
                  </h3>
                  {p.excerpt && <p className="mt-1 line-clamp-2 text-sm text-text-muted">{p.excerpt}</p>}
                </div>
              </Link>
            </Reveal>
          ))}
        </Container>
      ) : (
        <Container className="mt-10 rounded-2xl border border-dashed border-border-subtle p-12 text-center text-text-muted pb-24">
          No articles published yet.
        </Container>
      )}
    </>
  )
}
