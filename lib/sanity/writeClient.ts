import 'server-only'
import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from './env'

/** Write client — only mutates when SANITY_API_WRITE_TOKEN is set. */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: 'published',
})

export const canWriteToSanity = () => Boolean(process.env.SANITY_API_WRITE_TOKEN)
