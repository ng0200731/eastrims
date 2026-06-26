'use client'

import { useState } from 'react'
import { Player } from '@remotion/player'
import { ProductReveal } from '@/remotion/compositions/ProductReveal'
import { PLATFORMS } from '@/lib/remotion/platforms'
import { cn } from '@/lib/utils'

interface MarketingPreviewProps {
  productName: string
  subtitle?: string
}

export function MarketingPreview({ productName, subtitle }: MarketingPreviewProps) {
  const [platform, setPlatform] = useState(PLATFORMS[0])
  const isPortrait = platform.height > platform.width

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlatform(p)}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors',
              p.id === platform.id
                ? 'border-accent-gold bg-accent-gold/10 text-accent-gold'
                : 'border-border-subtle text-text-muted hover:text-text-primary'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          'mx-auto mt-6 overflow-hidden rounded-2xl border border-border-subtle bg-white',
          isPortrait ? 'max-w-[340px]' : 'max-w-3xl'
        )}
      >
        <Player
          component={ProductReveal}
          inputProps={{ productName, subtitle }}
          durationInFrames={platform.durationInFrames}
          fps={platform.fps}
          compositionWidth={platform.width}
          compositionHeight={platform.height}
          style={{ width: '100%', aspectRatio: `${platform.width} / ${platform.height}` }}
          controls
          autoPlay
          loop
          acknowledgeRemotionLicense
        />
      </div>
      <p className="mt-3 text-center text-xs text-text-muted">
        {platform.width}×{platform.height} · {(platform.durationInFrames / platform.fps).toFixed(0)}s · {platform.fps}fps
      </p>
    </div>
  )
}
