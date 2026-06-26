import 'server-only'
import { unstable_cache } from 'next/cache'
import { serverClient } from './client'
import { isSanityConfigured } from './env'

/** Cached GROQ read for Server Components. Throws when Sanity isn't configured;
 *  callers use `.catch()` to fall back to empty content. */
export const fetchSanity = unstable_cache(
  async <T>(query: string, params: Record<string, unknown> = {}): Promise<T> => {
    if (!isSanityConfigured || !serverClient) {
      throw new Error('Sanity is not configured')
    }
    return serverClient.fetch<T>(query, params)
  },
  ['sanity'],
  { revalidate: 60 }
)

/** Uncached read for draft preview. */
export async function fetchSanityDraft<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  if (!isSanityConfigured || !serverClient) {
    throw new Error('Sanity is not configured')
  }
  return serverClient.fetch<T>(query, params, { perspective: 'previewDrafts' })
}
