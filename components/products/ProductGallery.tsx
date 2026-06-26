'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  heroImageUrl: string | null
  gallery: Array<{ asset: { _ref: string } }> | null
  alt: string
}

export function ProductGallery({ heroImageUrl, gallery, alt }: ProductGalleryProps) {
  const items = [heroImageUrl, ...(gallery ?? []).map((g) => sanityRefToUrl(g.asset?._ref))].filter(
    (u): u is string => Boolean(u)
  )
  const [active, setActive] = useState(0)

  if (items.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-border-subtle bg-surface font-display text-6xl text-text-muted/30">
        {alt.charAt(0)}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border-subtle bg-surface">
        <Image
          key={active}
          src={items[active]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {items.length > 1 && (
        <div className="flex gap-3">
          {items.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-square w-20 cursor-pointer overflow-hidden rounded-lg border transition-colors',
                i === active ? 'border-accent-gold' : 'border-border-subtle hover:border-text-muted'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Sanity image ref "image-<id>-<dims>-<ext>" → CDN url. Best-effort; the raw
// asset URL is preferred when available, this covers bare refs in the gallery.
function sanityRefToUrl(ref?: string): string | null {
  if (!ref) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string) ?? ''
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
  const decoded = ref.replace('image-', '').replace(/-(png|jpg|jpeg|gif|webp)$/, '.$1')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${decoded}`
}
