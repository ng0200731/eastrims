import { Composition } from 'remotion'
import type { ComponentType } from 'react'
import { ProductReveal } from './compositions/ProductReveal'
import { PLATFORMS } from '@/lib/remotion/platforms'

/**
 * Remotion entrypoint. Registers the ProductReveal composition for every
 * marketing platform (aspect/duration differ; the component is shared).
 *
 * Used by the render pipeline (`remotion render` / Remotion Lambda) to produce
 * MP4s. The in-browser Player does not require this Root — it's for server-side
 * rendering and the Remotion Studio.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {PLATFORMS.map((p) => (
        <Composition
          key={p.id}
          id={`product-reveal-${p.id}`}
          component={ProductReveal as unknown as ComponentType<Record<string, unknown>>}
          durationInFrames={p.durationInFrames}
          fps={p.fps}
          width={p.width}
          height={p.height}
          defaultProps={{ productName: 'Eastrims', subtitle: 'Premium garment trims' }}
        />
      ))}
    </>
  )
}
