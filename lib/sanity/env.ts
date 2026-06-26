import { z } from 'zod'

const schema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().default(''),
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

// Sanity project IDs allow a-z, 0-9, dashes only. An empty or placeholder value
// means the CMS isn't wired up yet — the app renders with fallback content.
const PROJECT_ID_RE = /^[a-z0-9-]+$/
export const isSanityConfigured =
  projectId.length > 0 &&
  PROJECT_ID_RE.test(projectId) &&
  projectId !== 'your_project_id'
