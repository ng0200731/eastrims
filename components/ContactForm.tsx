'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-text-muted">
        {label}
        {required && <span className="text-accent-gold"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
      />
    </label>
  )
}

export function ContactForm({ ctaLabel = 'Send message' }: { ctaLabel?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(body.error || 'Submission failed')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-accent-gold/40 bg-surface p-8 text-center">
        <h3 className="font-display text-2xl font-medium">Thank you</h3>
        <p className="mt-2 text-text-muted">
          We&apos;ve received your message and will reply within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required placeholder="Jane Doe" />
        <Field label="Email" name="email" type="email" required placeholder="jane@brand.com" />
        <Field label="Company" name="company" placeholder="Brand Co." />
        <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm text-text-muted">
          Message<span className="text-accent-gold"> *</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your garment, quantities, materials, and timeline."
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="cursor-pointer rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright px-7 py-3 text-sm font-medium text-bg-base transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : ctaLabel}
      </button>
      {error && <p className="text-sm text-error">{error}</p>}
    </form>
  )
}
