import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/Reveal'

const CHAPTERS = [
  { n: '01', title: 'Into the fabric', body: 'It starts at the weave — the density of the thread, the catch of the light. Every detail a buyer feels before they read a word.' },
  { n: '02', title: 'The label, woven live', body: 'Logos rendered thread by thread, color-separated and locked to spec. A label that survives the wash and the seasons.' },
  { n: '03', title: 'The hang tag', body: 'Stock chosen for hand and weight. Print calibrated so your brand reads exactly the same, tag after tag.' },
  { n: '04', title: 'Paper, transformed', body: 'Foil, emboss, deboss, spot UV — the tactile finishes that signal quality at the point of sale.' },
  { n: '05', title: 'The patch, stitched', body: 'Leather, silicone, PVC, embroidered. Backed and bordered to hold their shape for the life of the garment.' },
  { n: '06', title: 'Embroidery', body: 'Metallic threads, precise fills, and clean edges — the finishing mark that ties a trim program together.' },
]

export function CraftsmanshipStory() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-gold">
            Craftsmanship
          </p>
          <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            The journey from thread to finished trim.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-px">
          {CHAPTERS.map((c) => (
            <Reveal key={c.n} delay={0}>
              <div className="grid grid-cols-1 items-center gap-6 border-t border-border-subtle py-10 md:grid-cols-[auto_1fr] md:gap-12">
                <p className="font-display text-6xl font-semibold text-accent-gold/30 md:text-8xl">
                  {c.n}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-medium text-text-primary md:text-4xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-text-muted">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
