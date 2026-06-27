import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Product Category',
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
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', type: 'number', description: 'Nav sort order' }),
    defineField({ name: 'parent', type: 'reference', to: [{ type: 'category' }] }),
  ],
})
