import type { SchemaTypeDefinition } from 'sanity'
import { productVariant } from './objects/productVariant'
import { hotspot } from './objects/hotspot'
import { shippingRoute } from './objects/shippingRoute'
import { stat } from './objects/stat'

// Documents are added in Task 10.
export const schemaTypes: SchemaTypeDefinition[] = [
  productVariant,
  hotspot,
  shippingRoute,
  stat,
]
