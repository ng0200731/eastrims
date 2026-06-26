'use client'

import { Player } from '@remotion/player'
import { ProductReveal } from '@/remotion/compositions/ProductReveal'

interface ProductRevealPlayerProps {
  productName: string
  subtitle?: string
}

/** Plays the Remotion ProductReveal composition in-browser (no server render). */
export function ProductRevealPlayer({ productName, subtitle }: ProductRevealPlayerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-black">
      <Player
        component={ProductReveal}
        inputProps={{ productName, subtitle }}
        durationInFrames={150}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        style={{ width: '100%' }}
        controls
        autoPlay
        loop
        acknowledgeRemotionLicense
      />
    </div>
  )
}
