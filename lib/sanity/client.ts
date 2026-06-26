import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion, useCdn, token, isSanityConfigured } from './env'

/**
 * Clients are only created when Sanity is configured with a valid project ID.
 * When unconfigured they are `null` and reads throw (caught by callers) so the
 * app renders fallback content instead of crashing at import time.
 */
export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn, perspective: 'published' })
  : null

export const serverClient = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, token, perspective: 'published' })
  : null
