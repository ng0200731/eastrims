import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchSanity } from '@/lib/sanity/fetch'
import { productBySlugQuery, allProductSlugsQuery } from '@/lib/sanity/queries'
import type { ProductDetail } from '@/lib/sanity/types'
import { Container } from '@/components/layout/Container'
import { ProductGallery } from '@/components/products/ProductGallery'
import { PortableText } from '@/components/PortableText'
import { ProductCard } from '@/components/ProductCard'
import { SectionHeading } from '@/components/Section'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await fetchSanity<string[]>(allProductSlugsQuery).catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchSanity<ProductDetail | null>(productBySlugQuery, { slug }).catch(
    () => null
  )
  if (!product) return {}
  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.shortDescription || undefined,
    openGraph: { images: product.heroImageUrl ? [product.heroImageUrl] : undefined },
  }
}

function Spec({ label, value }: { label: string; value?: string | number | null }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between border-b border-border-subtle py-2.5">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-medium text-text-primary">{value}</span>
    </div>
  )
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await fetchSanity<ProductDetail | null>(productBySlugQuery, { slug }).catch(
    () => null
  )
  if (!product) notFound()

  return (
    <Container className="py-12 pb-24">
      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/products" className="cursor-pointer hover:text-accent-gold">
          ← Back to catalog
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ProductGallery
          heroImageUrl={product.heroImageUrl}
          gallery={product.gallery}
          alt={product.title}
        />

        <div>
          {product.category && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold">
              {product.category.title}
            </p>
          )}
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {product.title}
          </h1>
          {product.sku && <p className="mt-1 font-mono text-sm text-text-muted">{product.sku}</p>}
          {product.shortDescription && (
            <p className="mt-4 text-lg text-text-muted">{product.shortDescription}</p>
          )}

          <div className="mt-6 space-y-0">
            <Spec label="Minimum order" value={product.minOrderQuantity ? `${product.minOrderQuantity} pcs` : null} />
            <Spec label="Lead time" value={product.leadTime} />
            <Spec label="Price range" value={product.priceRange} />
          </div>

          <Link
            href="/quote"
            className="mt-6 inline-block cursor-pointer rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright px-7 py-3 text-sm font-medium text-bg-base transition-transform duration-200 hover:scale-[1.03]"
          >
            Request a Quote
          </Link>

          {product.features && product.features.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 font-display text-lg font-medium">Features</h2>
              <ul className="ml-5 list-disc space-y-1 text-text-muted">
                {product.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {product.materials && product.materials.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 font-display text-lg font-medium">Available materials</h2>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/materials`}
                    className="cursor-pointer rounded-full border border-border-subtle px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-accent-gold hover:text-accent-gold"
                  >
                    {m.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {product.description && (
        <section className="mt-16 max-w-3xl">
          <SectionHeading title="Overview" />
          <div className="mt-6">
            <PortableText value={product.description as unknown[]} />
          </div>
        </section>
      )}

      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section className="mt-16">
          <SectionHeading title="You might also like" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.relatedProducts.map((rp, i) => (
              <ProductCard
                key={rp.slug}
                product={{
                  title: rp.title,
                  slug: rp.slug,
                  shortDescription: null,
                  heroImageUrl: rp.heroImageUrl,
                  model3dUrl: null,
                  leadTime: null,
                  minOrderQuantity: null,
                  category: null,
                }}
                index={i}
              />
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}
