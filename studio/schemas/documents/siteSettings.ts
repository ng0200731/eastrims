import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'string' }),
    defineField({ name: 'logo', type: 'image' }),
    defineField({ name: 'favicon', type: 'image' }),
    defineField({
      name: 'brandColors',
      type: 'object',
      fields: [
        { name: 'primary', type: 'string' },
        { name: 'secondary', type: 'string' },
        { name: 'accent', type: 'string' },
        { name: 'background', type: 'string' },
        { name: 'text', type: 'string' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url' },
        { name: 'instagram', type: 'url' },
        { name: 'youtube', type: 'url' },
        { name: 'facebook', type: 'url' },
      ],
    }),
    defineField({
      name: 'contactInfo',
      type: 'object',
      fields: [
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'whatsapp', type: 'string' },
      ],
    }),
    defineField({ name: 'shippingRoutes', type: 'array', of: [{ type: 'shippingRoute' }] }),
  ],
})
