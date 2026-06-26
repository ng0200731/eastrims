import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import { isSanityConfigured } from './env'

const builder = isSanityConfigured && client ? createImageUrlBuilder(client) : null

export type SanityImageSource =
  | { _ref: string }
  | { _id: string }
  | { asset: { _ref: string } }

/** Build an optimized CDN URL for a Sanity image reference. Returns '' when
 *  Sanity isn't configured. */
export function imageUrlBuilder(source: SanityImageSource, width = 1280): string {
  if (!builder) return ''
  return builder.image(source).width(width).auto('format').url()
}
