import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import type { Category } from '@/lib/sanity/types'

const FALLBACK_CATEGORIES: Category[] = [
  { title: 'Woven Labels', slug: { current: 'woven-labels' }, description: null, heroImageUrl: null },
  { title: 'Hang Tags', slug: { current: 'hang-tags' }, description: null, heroImageUrl: null },
  { title: 'Patches', slug: { current: 'patches' }, description: null, heroImageUrl: null },
  { title: 'Packaging', slug: { current: 'packaging' }, description: null, heroImageUrl: null },
  { title: 'Accessories', slug: { current: 'accessories' }, description: null, heroImageUrl: null },
]

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const data = categories.length > 0 ? categories : FALLBACK_CATEGORIES
  return (
    <section className="py-20 md:py-28">
      <SectionHeading
        center
        eyebrow="Capabilities"
        title="Everything your garment needs"
        subtitle="From the label at the neckline to the box on the shelf — one partner, full coverage."
      />
      <Container className="mt-12 flex flex-wrap justify-center gap-3">
        {data.map((c, i) => (
          <Reveal key={c.slug.current} delay={i * 0.05}>
            <Link
              href={`/products?category=${c.slug.current}`}
              className="cursor-pointer rounded-full border border-border-subtle px-5 py-2.5 text-sm text-text-muted transition-colors duration-200 hover:border-accent-gold hover:text-accent-gold"
            >
              {c.title}
            </Link>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}
