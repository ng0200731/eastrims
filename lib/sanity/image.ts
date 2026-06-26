import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export type SanityImageSource =
  | { _ref: string }
  | { _id: string }
  | { asset: { _ref: string } }

/** Build an optimized CDN URL for a Sanity image reference. */
export function imageUrlBuilder(source: SanityImageSource, width = 1280): string {
  return builder.image(source).width(width).auto('format').url()
}
