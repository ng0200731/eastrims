import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { Reveal } from '@/components/Reveal'
import type { FeaturedProduct } from '@/lib/sanity/types'

export function ProductCard({ product, index = 0 }: { product: FeaturedProduct; index?: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <Link
        href={`/products/${product.slug}`}
        className="group block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-2xl"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border-subtle bg-surface">
          {product.heroImageUrl ? (
            <ResponsiveImage
              src={product.heroImageUrl}
              alt={product.title}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-5xl text-text-muted/40">
              {product.title.charAt(0)}
            </div>
          )}
          {product.category && (
            <span className="absolute left-3 top-3 rounded-full bg-bg-base/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted backdrop-blur">
              {product.category.title}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-medium text-text-primary transition-colors group-hover:text-accent-gold">
              {product.title}
            </h3>
            {product.shortDescription && (
              <p className="mt-1 line-clamp-1 text-sm text-text-muted">{product.shortDescription}</p>
            )}
          </div>
          {product.leadTime && (
            <span className={cn('shrink-0 rounded-full border border-border-subtle px-3 py-1 text-xs text-text-muted')}>
              {product.leadTime}
            </span>
          )}
        </div>
      </Link>
    </Reveal>
  )
}
