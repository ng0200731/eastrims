import { z } from 'zod'

const schema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z
    .string()
    .min(1, 'Missing NEXT_PUBLIC_SANITY_PROJECT_ID'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2024-01-01'),
  SANITY_API_READ_TOKEN: z.string().optional(),
})

const parsed = schema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
})

export const apiVersion = parsed.NEXT_PUBLIC_SANITY_API_VERSION
export const projectId = parsed.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = parsed.NEXT_PUBLIC_SANITY_DATASET
export const useCdn = true
export const token = parsed.SANITY_API_READ_TOKEN
