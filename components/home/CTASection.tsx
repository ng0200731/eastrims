import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/Reveal'

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-br from-bg-elevated to-surface p-10 text-center md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  'radial-gradient(50% 60% at 50% 0%, rgba(201,169,97,0.18), transparent 60%)',
              }}
            />
            <h2 className="relative font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Let&apos;s build your trim program.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-text-muted">
              Tell us about your garment, your quantities, and your timeline. We&apos;ll
              match you to the right materials and lead times.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/quote"
                className="cursor-pointer rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright px-7 py-3 text-sm font-medium text-bg-base transition-transform duration-200 hover:scale-[1.03]"
              >
                Start a Quote
              </Link>
              <Link
                href="/contact"
                className="cursor-pointer rounded-full border border-border-subtle px-7 py-3 text-sm font-medium text-text-primary transition-colors duration-200 hover:border-accent-gold hover:text-accent-gold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
