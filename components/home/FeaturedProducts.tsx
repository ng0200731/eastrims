import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { ProductCard } from '@/components/ProductCard'
import type { FeaturedProduct } from '@/lib/sanity/types'

export function FeaturedProducts({ products }: { products: FeaturedProduct[] }) {
  return (
    <section className="py-20 md:py-28">
      <SectionHeading
        center
        eyebrow="Catalog"
        title="Featured products"
        subtitle="A selection of signature trims and finishes, produced to exacting standards."
      />
      {products.length > 0 ? (
        <Container className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </Container>
      ) : (
        <Container className="mt-12 rounded-2xl border border-dashed border-border-subtle p-12 text-center text-text-muted">
          Product catalog loads here once published via the Sanity Studio.
        </Container>
      )}
      {products.length > 0 && (
        <Container className="mt-10 text-center">
          <Link
            href="/products"
            className="cursor-pointer text-sm font-medium text-accent-gold transition-opacity hover:opacity-80"
          >
            View all products →
          </Link>
        </Container>
      )}
    </section>
  )
}
