import 'server-only'
import { Resend } from 'resend'
import type { QuoteLeadInput } from './types'

function summarize(data: QuoteLeadInput & { summary?: string }): string {
  const lines = [
    `Name: ${data.name ?? '-'}`,
    `Email: ${data.email ?? '-'}`,
    `Company: ${data.company ?? '-'}`,
    `Phone: ${data.phone ?? '-'}`,
    `Trim type: ${data.trimType ?? '-'}`,
    `Garment: ${data.garmentType ?? '-'}`,
    `Wash-care required: ${data.washCareRequired ?? '-'}`,
    `Quantity: ${data.quantity ?? '-'}`,
    `Material: ${data.material ?? '-'}`,
    `Target delivery: ${data.deliveryDate ?? '-'}`,
  ]
  if (data.message) lines.push(`Message: ${data.message}`)
  if (data.summary) lines.push(`AI summary: ${data.summary}`)
  return lines.join('\n')
}

/**
 * Email the lead to sales via Resend when RESEND_API_KEY is configured.
 * No-op (returns sent:false) otherwise.
 */
export async function sendLeadEmail(data: QuoteLeadInput & { summary?: string }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { sent: false as const }

  const resend = new Resend(key)
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? 'leads@eastrims.com',
    to: process.env.SALES_EMAIL ?? 'ice@eastrims.com',
    subject: `New quote request — ${data.name ?? 'Unknown'} (${data.company ?? '-'})`,
    text: summarize(data),
  })
  return { sent: true as const }
}
