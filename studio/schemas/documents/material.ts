import { defineType, defineField } from 'sanity'

export const material = defineType({
  name: 'material',
  title: 'Material',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'texturePreview', type: 'image' }),
    defineField({
      name: 'shaderConfig',
      type: 'object',
      fields: [
        { name: 'baseColor', type: 'string', description: 'hex' },
        { name: 'roughness', type: 'number' },
        { name: 'metallic', type: 'number' },
        { name: 'anisotropicStrength', type: 'number' },
      ],
    }),
    defineField({ name: 'properties', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'applications', type: 'array', of: [{ type: 'string' }] }),
  ],
})
