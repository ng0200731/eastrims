import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { fetchSanity } from '@/lib/sanity/fetch'
import { allProductsQuery } from '@/lib/sanity/queries'
import type { FeaturedProduct } from '@/lib/sanity/types'
import type { QuoteLeadInput } from '@/lib/quote/types'

/**
 * Natural-language quote assistant.
 * - With ANTHROPIC_API_KEY: uses Claude tool-use to extract order details and
 *   recommend products from the catalog.
 * - Without a key: returns a guided-mode prompt (the wizard drives the steps).
 */
export async function POST(req: Request) {
  const { text } = (await req.json().catch(() => ({}))) as { text?: string }
  if (!text || !text.trim()) {
    return NextResponse.json({ error: 'text required' }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({
      extracted: {},
      suggestedProducts: [],
      reply:
        "Guided mode is on. Answer the quick questions below and I'll match you to the right products.",
      llm: false,
    })
  }

  const products = await fetchSanity<FeaturedProduct[]>(allProductsQuery).catch(() => [])
  const catalog = products.map((p) => p.title)

  const client = new Anthropic({ apiKey })
  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    system: `You help buyers specify garment-trim orders for Eastrims. From the user's message, extract the order details and recommend suitable products from this catalog: ${
      catalog.join(', ') || '(catalog currently empty)'
    }. You MUST call the recordLead tool.`,
    tools: [
      {
        name: 'recordLead',
        description: 'Record the extracted quote details and product recommendations.',
        input_schema: {
          type: 'object',
          properties: {
            trimType: { type: 'string', description: 'e.g. woven label, hang tag, patch' },
            garmentType: { type: 'string' },
            washCareRequired: { type: 'boolean' },
            quantity: { type: 'string' },
            material: { type: 'string' },
            deliveryDate: { type: 'string' },
            recommendedProducts: {
              type: 'array',
              items: { type: 'string' },
              description: 'product titles from the catalog',
            },
            reply: {
              type: 'string',
              description:
                'Friendly confirmation of what you understood and a follow-up question for anything missing.',
            },
          },
          required: ['reply'],
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'recordLead' },
    messages: [{ role: 'user', content: text }],
  })

  const toolBlock = response.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
  )
  const input = (toolBlock?.input ?? {}) as Record<string, unknown>
  const reply = (input.reply as string) ?? "Got it — let's nail down a few details below."
  const recommended = Array.isArray(input.recommendedProducts)
    ? (input.recommendedProducts as string[])
    : []
  const suggestedProducts = products.filter((p) =>
    recommended.some((r) => r.toLowerCase() === p.title.toLowerCase())
  )
  const extracted: Partial<QuoteLeadInput> = {
    trimType: input.trimType as string | undefined,
    garmentType: input.garmentType as string | undefined,
    washCareRequired: input.washCareRequired as boolean | undefined,
    quantity: input.quantity as string | undefined,
    material: input.material as string | undefined,
    deliveryDate: input.deliveryDate as string | undefined,
  }

  return NextResponse.json({ extracted, suggestedProducts, reply, llm: true })
}
