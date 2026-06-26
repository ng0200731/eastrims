'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { MarketingPreview } from '@/components/remotion/MarketingPreview'

export default function MarketingPage() {
  const [name, setName] = useState('Eastrims')
  const [subtitle, setSubtitle] = useState('Premium garment trims')

  return (
    <Container className="py-16 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold">
        Marketing studio
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Marketing video preview
      </h1>
      <p className="mt-3 max-w-2xl text-text-muted">
        One composition, every platform. Adjust the product details and switch formats to preview
        homepage hero, Reels, TikTok, Shorts, LinkedIn, and trade-show outputs.
      </p>

      <div className="mt-8 grid max-w-md grid-cols-1 gap-4">
        <label className="block">
          <span className="mb-1.5 block text-sm text-text-muted">Product name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary focus:border-accent-gold focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-text-muted">Subtitle</span>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary focus:border-accent-gold focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-10">
        <MarketingPreview productName={name || 'Eastrims'} subtitle={subtitle || undefined} />
      </div>
    </Container>
  )
}
