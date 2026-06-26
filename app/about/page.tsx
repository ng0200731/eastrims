import Link from 'next/link'
import { fetchSanity } from '@/lib/sanity/fetch'
import { siteSettingsQuery } from '@/lib/sanity/queries'
import type { SiteSettings } from '@/lib/sanity/types'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { StatsSection } from '@/components/home/StatsSection'
import { Reveal } from '@/components/Reveal'

export const revalidate = 60

const NARRATIVE = [
  {
    title: 'Precision at the micro scale',
    body: 'Every woven label is engineered to thread count, every hang tag to the millimeter. The details buyers feel before they read a word.',
  },
  {
    title: 'Materials chosen for the garment',
    body: 'From wash-durable damask to recycled RPET and full-grain leather — the right substrate for every application and compliance requirement.',
  },
  {
    title: 'A global manufacturing network',
    body: 'Production across China, Vietnam, Bangladesh, Indonesia, and Turkey — routed for lead time, capacity, and proximity to your supply chain.',
  },
]

export default async function AboutPage() {
  const settings = await fetchSanity<SiteSettings | null>(siteSettingsQuery).catch(() => null)

  return (
    <>
      <Container className="py-16 text-center">
        <SectionHeading
          center
          eyebrow="About Eastrims"
          title="Two decades of craftsmanship, at garment scale"
          subtitle="We make the small things that signal quality — the labels, tags, and packaging that turn a garment into a brand."
        />
      </Container>

      <StatsSection stats={settings?.stats ?? null} />

      <Container className="py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {NARRATIVE.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-border-subtle bg-surface p-7">
                <p className="mb-3 font-mono text-xs text-accent-gold">0{i + 1}</p>
                <h3 className="font-display text-xl font-medium">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="pb-24 text-center">
        <Link
          href="/quote"
          className="cursor-pointer rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright px-7 py-3 text-sm font-medium text-bg-base transition-transform duration-200 hover:scale-[1.03]"
        >
          Work with us
        </Link>
      </Container>
    </>
  )
}
