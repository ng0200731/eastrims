import type { SchemaTypeDefinition } from 'sanity'

// Objects
import { productVariant } from './objects/productVariant'
import { hotspot } from './objects/hotspot'
import { shippingRoute } from './objects/shippingRoute'
import { stat } from './objects/stat'

// Documents
import { product } from './documents/product'
import { category } from './documents/category'
import { material } from './documents/material'
import { heroConfig } from './documents/heroConfig'
import { siteSettings } from './documents/siteSettings'
import { marketingVideo } from './documents/marketingVideo'
import { quoteLead } from './documents/quoteLead'
import { blogPost } from './documents/blogPost'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects first
  productVariant,
  hotspot,
  shippingRoute,
  stat,
  // Documents
  product,
  category,
  material,
  marketingVideo,
  blogPost,
  quoteLead,
  // Singletons last (configured with fixed _id in structure)
  heroConfig,
  siteSettings,
]
