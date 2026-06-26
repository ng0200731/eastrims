import 'server-only'
import { writeClient, canWriteToSanity } from '@/lib/sanity/writeClient'
import type { QuoteLeadInput } from './types'

/**
 * Persist a quote lead. Writes a `quoteLead` document to Sanity when a write
 * token is configured; otherwise returns a local id (graceful no-op).
 */
export async function persistLead(data: QuoteLeadInput & { summary?: string }) {
  if (!canWriteToSanity()) {
    return { id: `local-${Date.now()}`, persisted: false as const }
  }

  const doc = await writeClient.create({
    _type: 'quoteLead',
    createdAt: new Date().toISOString(),
    status: 'new',
    contactName: data.name,
    contactEmail: data.email,
    company: data.company,
    phone: data.phone,
    trimType: data.trimType,
    garmentType: data.garmentType,
    washCareRequired: data.washCareRequired,
    estimatedQuantity: data.quantity ? Number(data.quantity) : undefined,
    preferredMaterial: data.material,
    targetDeliveryDate: data.deliveryDate,
    aiSummary: data.summary,
    additionalNotes: data.message ? [{ _type: 'block', children: [{ _type: 'span', text: data.message }] }] : undefined,
  })

  return { id: doc._id, persisted: true as const }
}
