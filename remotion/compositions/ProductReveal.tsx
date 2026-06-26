import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

interface ProductRevealProps {
  productName: string
  subtitle?: string
}

const GOLD = '#c9a961'
const GOLD_BRIGHT = '#d4af37'
const TEXT = '#f5f5f7'
const MUTED = '#a1a1aa'

/**
 * Cinematic product reveal (MPC-style): black → gold light streak → wordmark →
 * product name → spec chips → CTA. 5s @ 30fps.
 * Played in-browser via @remotion/player (no server render needed).
 */
export const ProductReveal: React.FC<ProductRevealProps> = ({ productName, subtitle }) => {
  const frame = useCurrentFrame()

  const fadeIn = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const rise = (start: number, end: number, distance = 40) =>
    interpolate(frame, [start, end], [distance, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })

  const streakX = interpolate(frame, [10, 45], [-120, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0b', justifyContent: 'center', alignItems: 'center', fontFamily: 'Inter, sans-serif' }}>
      {/* Light streak */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${streakX}%`,
          width: '40%',
          background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
          filter: 'blur(8px)',
        }}
      />

      <div style={{ position: 'relative', textAlign: 'center', padding: '0 8%' }}>
        {/* Wordmark */}
        <div style={{ opacity: fadeIn(15, 30), color: GOLD, letterSpacing: '0.3em', fontSize: 28, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
          EASTRIMS
        </div>

        {/* Product name */}
        <div
          style={{
            opacity: fadeIn(35, 55),
            transform: `translateY(${rise(35, 55)}px)`,
            color: TEXT,
            fontSize: 72,
            fontWeight: 600,
            marginTop: 16,
            fontFamily: 'Space Grotesk, sans-serif',
            lineHeight: 1.05,
          }}
        >
          {productName}
        </div>

        {subtitle && (
          <div style={{ opacity: fadeIn(50, 70), color: MUTED, fontSize: 22, marginTop: 12 }}>
            {subtitle}
          </div>
        )}

        {/* Spec chips */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40 }}>
          {['Wash-durable', 'Premium materials', 'Global lead times'].map((s, i) => (
            <div
              key={s}
              style={{
                opacity: fadeIn(70 + i * 10, 80 + i * 10),
                border: `1px solid ${GOLD}44`,
                borderRadius: 999,
                padding: '8px 20px',
                color: MUTED,
                fontSize: 16,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: fadeIn(110, 130),
            marginTop: 48,
            display: 'inline-block',
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_BRIGHT})`,
            color: '#0a0a0b',
            fontWeight: 600,
            fontSize: 18,
            padding: '14px 32px',
            borderRadius: 999,
          }}
        >
          Request a Quote
        </div>
      </div>
    </AbsoluteFill>
  )
}
