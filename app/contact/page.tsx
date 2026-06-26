import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { ContactForm } from '@/components/ContactForm'
import { FALLBACK_CONTACT } from '@/lib/site-defaults'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Eastrims team.',
}

export default function ContactPage() {
  return (
    <>
      <div className="py-16">
        <SectionHeading
          center
          eyebrow="Contact"
          title="Let's talk"
          subtitle="Questions, samples, or a full trim program — we're here to help."
        />
      </div>
      <Container className="mx-auto max-w-4xl pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Email</p>
              <p className="text-text-primary">{FALLBACK_CONTACT.email}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Phone</p>
              <p className="text-text-primary">{FALLBACK_CONTACT.phone}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Coverage</p>
              <p className="text-text-primary">{FALLBACK_CONTACT.address}</p>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="rounded-3xl border border-border-subtle bg-bg-elevated p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
