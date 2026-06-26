import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion, useCdn, token } from './env'

/** Public client (CDN, read-only, no token) */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
})

/** Server client supports draft preview when a token is present */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'published',
})
