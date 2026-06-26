import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { Reveal } from '@/components/Reveal'

const STEPS = [
  { title: 'Artwork', body: 'Design files reviewed, color-separated, and prepped for production.' },
  { title: 'Sampling', body: 'Physical samples produced and approved before bulk.' },
  { title: 'Printing / Weaving', body: 'Labels woven or printed to spec on the chosen substrate.' },
  { title: 'Cutting', body: 'Laser or ultrasonic cutting for clean, consistent edges.' },
  { title: 'Quality Control', body: 'Every batch inspected against tolerances and artwork.' },
  { title: 'Packing', body: 'Folded, counted, and packed to your merchandising needs.' },
  { title: 'Shipping', body: 'Routed from the nearest facility to your supply chain.' },
]

export default function FactoryPage() {
  return (
    <>
      <SectionHeading
        center
        eyebrow="Factory Process"
        title="From artwork to shipment"
        subtitle="A controlled, seven-stage process behind every order. (The cinematic animated timeline arrives in Phase 3.)"
        className="mt-8"
      />
      <Container className="mt-12 pb-24">
        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <li className="h-full rounded-2xl border border-border-subtle bg-surface p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright font-display text-sm font-semibold text-bg-base">
                  {i + 1}
                </div>
                <h3 className="font-display text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Link
            href="/quote"
            className="cursor-pointer rounded-full border border-border-subtle px-7 py-3 text-sm font-medium text-text-primary transition-colors duration-200 hover:border-accent-gold hover:text-accent-gold"
          >
            Start an order
          </Link>
        </div>
      </Container>
    </>
  )
}
