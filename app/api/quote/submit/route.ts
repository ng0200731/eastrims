import { NextResponse } from 'next/server'
import { z } from 'zod'
import { persistLead } from '@/lib/quote/persist'
import { sendLeadEmail } from '@/lib/quote/email'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('A valid email is required'),
  company: z.string().optional(),
  phone: z.string().optional(),
  trimType: z.string().optional(),
  garmentType: z.string().optional(),
  washCareRequired: z.boolean().optional(),
  quantity: z.string().optional(),
  material: z.string().optional(),
  deliveryDate: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(req: Request) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    )
  }

  const summary = `Lead via AI assistant: ${parsed.data.trimType ?? 'trim'} for ${
    parsed.data.garmentType ?? 'garment'
  }, qty ${parsed.data.quantity ?? 'unspecified'}.`

  const persisted = await persistLead({ ...parsed.data, summary })
  await sendLeadEmail({ ...parsed.data, summary }).catch(() => ({ sent: false }))

  return NextResponse.json({
    ok: true,
    leadId: persisted.id,
    persisted: persisted.persisted,
  })
}
