import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { QuoteWizard } from '@/components/quote/QuoteWizard'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Answer a few questions or describe your needs — we will match you to the right materials and lead times.',
}

export default function QuotePage() {
  return (
    <>
      <div className="py-16">
        <SectionHeading
          center
          eyebrow="Get started"
          title="Request a quote"
          subtitle="Answer a few questions or describe your needs in plain language — we'll match you to the right materials and lead times."
        />
      </div>
      <Container className="mx-auto max-w-2xl pb-24">
        <div className="rounded-3xl border border-border-subtle bg-bg-elevated p-6 md:p-10">
          <QuoteWizard />
        </div>
      </Container>
    </>
  )
}
