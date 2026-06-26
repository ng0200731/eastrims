'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { FeaturedProduct } from '@/lib/sanity/types'
import type { QuoteLeadInput } from '@/lib/quote/types'
import { cn } from '@/lib/utils'

interface Step {
  key: keyof QuoteLeadInput
  label: string
  prompt: string
  options?: string[]
  kind?: 'chips' | 'date' | 'contact'
}

const STEPS: Step[] = [
  { key: 'trimType', label: 'Trim type', prompt: 'What kind of trim are you looking for?', kind: 'chips', options: ['Woven label', 'Hang tag', 'Patch', 'Printed label', 'Button / zipper', 'Packaging', 'Other'] },
  { key: 'garmentType', label: 'Garment', prompt: 'What garment will it go on?', kind: 'chips', options: ['Denim', 'Sportswear', 'Outerwear', 'T-shirt / knitwear', 'Formalwear', 'Underwear / swim', 'Other'] },
  { key: 'washCareRequired', label: 'Wash-care', prompt: 'Do you need wash-care compliance?', kind: 'chips', options: ['Yes', 'No'] },
  { key: 'quantity', label: 'Quantity', prompt: 'Estimated order quantity?', kind: 'chips', options: ['< 1,000', '1,000–10,000', '10,000–100,000', '100,000+'] },
  { key: 'material', label: 'Material', prompt: 'Preferred material?', kind: 'chips', options: ['Cotton', 'Satin', 'Damask', 'Taffeta', 'RPET', 'Leather', 'PVC', 'Silicone'] },
  { key: 'deliveryDate', label: 'Delivery', prompt: 'Target delivery date?', kind: 'date' },
]

const TOTAL_STEPS = STEPS.length + 1 // + contact

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function QuoteWizard() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<QuoteLeadInput>({})
  const [suggestions, setSuggestions] = useState<FeaturedProduct[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [nlText, setNlText] = useState('')
  const [nlNote, setNlNote] = useState<string | null>(null)

  const isContactStep = step === STEPS.length
  const current = STEPS[step]

  // Fetch suggestions once we know trim type / material.
  useEffect(() => {
    const term = data.material ?? data.trimType
    if (!term) return
    let cancelled = false
    fetch('/api/quote/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ material: data.material, trimType: data.trimType }),
    })
      .then((r) => r.json())
      .then((res: { products: FeaturedProduct[] }) => {
        if (!cancelled) setSuggestions(res.products ?? [])
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [data.material, data.trimType])

  function setField(key: keyof QuoteLeadInput, value: unknown) {
    setData((d) => ({ ...d, [key]: value }))
  }

  function next() {
    setError(null)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }
  function back() {
    setError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  async function describeNeeds() {
    if (!nlText.trim()) return
    setNlNote('Thinking…')
    try {
      const res = await fetch('/api/quote-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: nlText }),
      })
      const json = (await res.json()) as {
        extracted?: Partial<QuoteLeadInput>
        reply?: string
        suggestedProducts?: FeaturedProduct[]
        llm?: boolean
      }
      setData((d) => ({ ...d, ...json.extracted }))
      if (json.suggestedProducts && json.suggestedProducts.length > 0) setSuggestions(json.suggestedProducts)
      setNlNote(json.reply ?? null)
    } catch {
      setNlNote('Something went wrong — please use the steps below.')
    }
  }

  async function submit() {
    if (!data.name || !data.email) {
      setError('Please provide your name and email.')
      return
    }
    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch('/api/quote/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(body.error || 'Submission failed')
      }
      setStatus('success')
    } catch (e) {
      setStatus('error')
      setError(e instanceof Error ? e.message : 'Submission failed')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-accent-gold/40 bg-surface p-8 text-center">
        <h3 className="font-display text-2xl font-medium">Thank you{data.name ? `, ${data.name.split(' ')[0]}` : ''}.</h3>
        <p className="mt-2 text-text-muted">
          We&apos;ve received your request and will follow up within one business day with tailored options.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Natural-language describe */}
      <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-5">
        <p className="font-mono text-xs uppercase tracking-wider text-accent-gold">Describe your needs</p>
        <textarea
          value={nlText}
          onChange={(e) => setNlText(e.target.value)}
          rows={2}
          placeholder="e.g. We need wash-durable woven labels for a denim line, around 20k units, shipping to LA by Q4."
          className="mt-3 w-full resize-y rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent-gold focus:outline-none"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          {nlNote ? <p className="text-sm text-text-muted">{nlNote}</p> : <p className="text-xs text-text-muted">Optional — let AI pre-fill the steps below.</p>}
          <button
            type="button"
            onClick={describeNeeds}
            disabled={!nlText.trim()}
            className="cursor-pointer shrink-0 rounded-full border border-border-subtle px-4 py-2 text-xs font-medium text-text-primary transition-colors hover:border-accent-gold hover:text-accent-gold disabled:opacity-50"
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className={cn('h-1.5 flex-1 rounded-full transition-colors', i <= step ? 'bg-accent-gold' : 'bg-border-subtle')}
          />
        ))}
      </div>

      {/* Step */}
      {!isContactStep && current && (
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-text-muted">
            Step {step + 1} of {TOTAL_STEPS} · {current.label}
          </p>
          <h3 className="font-display text-2xl font-medium">{current.prompt}</h3>

          {current.kind === 'chips' && (
            <div className="mt-5 flex flex-wrap gap-2">
              {current.options?.map((opt) => {
                const selected = String(data[current.key] ?? '') === opt
                const value = current.key === 'washCareRequired' ? opt === 'Yes' : opt
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setField(current.key, value)
                      setTimeout(next, 120)
                    }}
                    className={cn(
                      'cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors',
                      selected
                        ? 'border-accent-gold bg-accent-gold/10 text-accent-gold'
                        : 'border-border-subtle text-text-muted hover:text-text-primary'
                    )}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {current.kind === 'date' && (
            <div className="mt-5">
              <input
                type="date"
                value={String(data.deliveryDate ?? '')}
                onChange={(e) => setField('deliveryDate', e.target.value)}
                className="rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary focus:border-accent-gold focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {isContactStep && (
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-text-muted">Contact details</p>
          <h3 className="font-display text-2xl font-medium">Where should we send your quote?</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input placeholder="Name *" value={data.name ?? ''} onChange={(e) => setField('name', e.target.value)} className="rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent-gold focus:outline-none" />
            <input placeholder="Email *" type="email" value={data.email ?? ''} onChange={(e) => setField('email', e.target.value)} className="rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent-gold focus:outline-none" />
            <input placeholder="Company" value={data.company ?? ''} onChange={(e) => setField('company', e.target.value)} className="rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent-gold focus:outline-none" />
            <input placeholder="Phone" value={data.phone ?? ''} onChange={(e) => setField('phone', e.target.value)} className="rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent-gold focus:outline-none" />
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-gold">Suggested products</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {suggestions.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="cursor-pointer rounded-xl border border-border-subtle bg-surface p-4 transition-colors hover:border-accent-gold"
              >
                <p className="font-display text-sm font-medium text-text-primary">{p.title}</p>
                {p.leadTime && <p className="mt-1 text-xs text-text-muted">{p.leadTime}</p>}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="cursor-pointer rounded-full border border-border-subtle px-5 py-2.5 text-sm text-text-muted transition-colors hover:text-text-primary disabled:opacity-40"
        >
          Back
        </button>
        {isContactStep ? (
          <button
            type="button"
            onClick={submit}
            disabled={status === 'submitting'}
            className="cursor-pointer rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright px-7 py-3 text-sm font-medium text-bg-base transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Submit request'}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="cursor-pointer rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright px-7 py-3 text-sm font-medium text-bg-base transition-transform hover:scale-[1.02]"
          >
            Next
          </button>
        )}
      </div>

      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  )
}
