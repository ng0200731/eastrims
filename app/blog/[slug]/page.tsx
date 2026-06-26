import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchSanity } from '@/lib/sanity/fetch'
import { blogPostBySlugQuery, allBlogSlugsQuery } from '@/lib/sanity/queries'
import type { BlogPost } from '@/lib/sanity/types'
import { Container } from '@/components/layout/Container'
import { PortableText } from '@/components/PortableText'
import { ResponsiveImage } from '@/components/ResponsiveImage'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await fetchSanity<string[]>(allBlogSlugsQuery).catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchSanity<BlogPost | null>(blogPostBySlugQuery, { slug }).catch(() => null)
  if (!post) return {}
  return { title: post.title, description: post.excerpt ?? undefined }
}

function formatDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await fetchSanity<BlogPost | null>(blogPostBySlugQuery, { slug }).catch(() => null)
  if (!post) notFound()

  return (
    <Container className="py-12 pb-24">
      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/blog" className="cursor-pointer hover:text-accent-gold">
          ← Back to journal
        </Link>
      </nav>
      <article className="mx-auto max-w-3xl">
        {post.publishedAt && (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold">
            {formatDate(post.publishedAt)}
          </p>
        )}
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {post.author && <p className="mt-3 text-sm text-text-muted">By {post.author}</p>}
        {post.coverImageUrl && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border-subtle">
            <ResponsiveImage
              src={post.coverImageUrl}
              alt={post.title}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}
        <div className="mt-10">
          <PortableText value={post.body as unknown[]} />
        </div>
      </article>
    </Container>
  )
}
