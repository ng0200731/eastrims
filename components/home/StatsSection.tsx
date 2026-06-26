import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/Reveal'
import { FALLBACK_STATS } from '@/lib/site-defaults'
import type { Stat } from '@/lib/sanity/types'

export function StatsSection({ stats }: { stats: Stat[] | null }) {
  const data = stats && stats.length > 0 ? stats : FALLBACK_STATS
  return (
    <section className="border-y border-border-subtle bg-bg-elevated py-16">
      <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {data.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="text-center">
              <p className="font-display text-4xl font-semibold text-accent-gold md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}
