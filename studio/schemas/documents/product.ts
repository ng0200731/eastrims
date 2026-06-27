import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'sku', type: 'string' }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'shortDescription', type: 'string' }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'model3d', type: 'file', options: { accept: '.glb,.gltf' } }),
    defineField({
      name: 'materials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'material' }] }],
    }),
    defineField({ name: 'variants', type: 'array', of: [{ type: 'productVariant' }] }),
    defineField({ name: 'specifications', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'applications', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'minOrderQuantity', type: 'number' }),
    defineField({ name: 'leadTime', type: 'string' }),
    defineField({ name: 'priceRange', type: 'string' }),
    defineField({
      name: 'relatedProducts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({ name: 'revealVideo', type: 'reference', to: [{ type: 'marketingVideo' }] }),
    defineField({ name: 'hotspots', type: 'array', of: [{ type: 'hotspot' }] }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'keywords', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
  ],
  preview: { select: { title: 'title', subtitle: 'sku', media: 'heroImage' } },
})
