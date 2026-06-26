import { defineType, defineField } from 'sanity'

export const heroConfig = defineType({
  name: 'heroConfig',
  title: 'Hero Configuration',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({ name: 'ctaText', type: 'string' }),
    defineField({ name: 'ctaLink', type: 'string' }),
    defineField({ name: 'heroModel', type: 'file', options: { accept: '.glb,.gltf' } }),
    defineField({ name: 'heroVideo', type: 'reference', to: [{ type: 'marketingVideo' }] }),
    defineField({
      name: 'particleConfig',
      type: 'object',
      fields: [
        { name: 'count', type: 'number' },
        { name: 'color', type: 'string' },
        { name: 'size', type: 'number' },
      ],
    }),
    defineField({
      name: 'lightingPreset',
      type: 'string',
      options: { list: ['studio', 'daylight', 'dramatic', 'dark'] },
    }),
    defineField({ name: 'backgroundGradient', type: 'string' }),
  ],
})
