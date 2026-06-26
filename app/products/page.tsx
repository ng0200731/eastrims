import Link from 'next/link'
import { fetchSanity } from '@/lib/sanity/fetch'
import { allProductsQuery, productsByCategoryQuery, categoriesQuery } from '@/lib/sanity/queries'
import type { FeaturedProduct, Category } from '@/lib/sanity/types'
import { Container } from '@/components/layout/Container'
import { ProductCard } from '@/components/ProductCard'
import { SectionHeading } from '@/components/Section'
import { cn } from '@/lib/utils'

export const revalidate = 60

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200',
        active
          ? 'border-accent-gold text-accent-gold'
          : 'border-border-subtle text-text-muted hover:text-text-primary'
      )}
    >
      {children}
    </Link>
  )
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const category = sp.category ?? null

  const [products, categories] = await Promise.all([
    category
      ? fetchSanity<FeaturedProduct[]>(productsByCategoryQuery, { category }).catch(() => [])
      : fetchSanity<FeaturedProduct[]>(allProductsQuery).catch(() => []),
    fetchSanity<Category[]>(categoriesQuery).catch(() => []),
  ])

  const activeCategory = categories.find((c) => c.slug.current === category) ?? null

  return (
    <>
      <SectionHeading
        center
        eyebrow="Catalog"
        title={activeCategory ? activeCategory.title : 'All products'}
        subtitle="Browse our full range of garment trims, labels, and packaging."
        className="mt-8"
      />
      <Container className="mt-8 flex flex-wrap justify-center gap-2">
        <FilterChip href="/products" active={!category}>
          All
        </FilterChip>
        {categories.map((c) => (
          <FilterChip
            key={c.slug.current}
            href={`/products?category=${c.slug.current}`}
            active={category === c.slug.current}
          >
            {c.title}
          </FilterChip>
        ))}
      </Container>
      {products.length > 0 ? (
        <Container className="mt-10 grid grid-cols-1 gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </Container>
      ) : (
        <Container className="mt-10 rounded-2xl border border-dashed border-border-subtle p-12 text-center text-text-muted">
          No products published yet. Add products in the Sanity Studio to populate the catalog.
        </Container>
      )}
    </>
  )
}
