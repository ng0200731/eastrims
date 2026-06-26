import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import type { HeroConfig } from '@/lib/sanity/types'

export function HeroSection({ hero }: { hero: HeroConfig | null }) {
  const title = hero?.title ?? 'Premium garment trims, crafted to spec.'
  const subtitle =
    hero?.subtitle ??
    'Woven labels, hang tags, patches, and packaging — engineered for global fashion brands that refuse to compromise on the details.'
  const ctaText = hero?.ctaText ?? 'Request a Quote'
  const ctaLink = hero?.ctaLink ?? '/quote'

  return (
    <section className="relative overflow-hidden">
      {/* Ambient gradient backdrop (Phase 2 layers the 3D canvas here) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 20%, rgba(201,169,97,0.18), transparent 60%), radial-gradient(40% 40% at 20% 80%, rgba(139,115,85,0.12), transparent 60%)',
        }}
      />
      <Container className="grid min-h-[88vh] grid-cols-1 items-center gap-12 py-28 md:grid-cols-2">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
            Eastrims · Est. Craftsmanship
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-text-muted">{subtitle}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={ctaLink}
              className="cursor-pointer rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright px-7 py-3 text-sm font-medium text-bg-base transition-transform duration-200 hover:scale-[1.03]"
            >
              {ctaText}
            </Link>
            <Link
              href="/products"
              className="cursor-pointer rounded-full border border-border-subtle px-7 py-3 text-sm font-medium text-text-primary transition-colors duration-200 hover:border-accent-gold hover:text-accent-gold"
            >
              Explore Products
            </Link>
          </div>
        </div>

        {/* Decorative woven-label mockup (replaced by 3D canvas in Phase 2) */}
        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[2rem] opacity-60 blur-2xl"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,169,97,0.35), transparent 70%)' }}
          />
          <div className="relative aspect-[3/4] w-64 rotate-[-6deg] rounded-xl border border-accent-gold/40 bg-gradient-to-br from-bg-elevated to-surface p-6 shadow-2xl transition-transform duration-700 hover:rotate-0 md:w-72">
            <div className="flex h-full flex-col justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-gold">
                Woven Label
              </p>
              <p className="font-display text-3xl font-semibold tracking-tight text-text-primary">
                Eastrims
              </p>
              <div className="space-y-1.5">
                <div className="h-px w-full bg-accent-gold/30" />
                <div className="h-px w-2/3 bg-accent-gold/20" />
                <div className="h-px w-1/2 bg-accent-gold/10" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
