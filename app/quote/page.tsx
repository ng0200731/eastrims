import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Tell us about your garment, quantities, and timeline.',
}

export default function QuotePage() {
  return (
    <>
      <div className="py-16">
        <SectionHeading
          center
          eyebrow="Get started"
          title="Request a quote"
          subtitle="Share your requirements and we'll match you to the right materials and lead times. (An AI-guided assistant arrives in Phase 4.)"
        />
      </div>
      <Container className="mx-auto max-w-2xl pb-24">
        <div className="rounded-3xl border border-border-subtle bg-bg-elevated p-6 md:p-10">
          <ContactForm ctaLabel="Request Quote" />
        </div>
      </Container>
    </>
  )
}
