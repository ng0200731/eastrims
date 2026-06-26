import 'server-only'
import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion, isSanityConfigured } from './env'

/** Write client — only created when Sanity is configured. `null` otherwise. */
export const writeClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN,
      perspective: 'published',
    })
  : null

export const canWriteToSanity = () =>
  isSanityConfigured && Boolean(process.env.SANITY_API_WRITE_TOKEN)
