import 'server-only'
import { unstable_cache } from 'next/cache'
import { serverClient } from './client'

/** Cached GROQ read for Server Components. */
export const fetchSanity = unstable_cache(
  async <T>(query: string, params: Record<string, unknown> = {}): Promise<T> => {
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
  return serverClient.fetch<T>(query, params, { perspective: 'previewDrafts' })
}
