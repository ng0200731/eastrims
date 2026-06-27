import { defineType, defineField } from 'sanity'

export const quoteLead = defineType({
  name: 'quoteLead',
  title: 'Quote Lead',
  type: 'document',
  fields: [
    defineField({ name: 'createdAt', type: 'datetime' }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['new', 'in_review', 'quoted', 'closed', 'spam'] },
      initialValue: 'new',
    }),
    defineField({ name: 'contactName', type: 'string' }),
    defineField({ name: 'contactEmail', type: 'string' }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'productInterest', type: 'reference', to: [{ type: 'product' }] }),
    defineField({ name: 'trimType', type: 'string' }),
    defineField({ name: 'garmentType', type: 'string' }),
    defineField({ name: 'washCareRequired', type: 'boolean' }),
    defineField({ name: 'estimatedQuantity', type: 'number' }),
    defineField({ name: 'preferredMaterial', type: 'string' }),
    defineField({ name: 'targetDeliveryDate', type: 'date' }),
    defineField({ name: 'additionalNotes', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'aiSummary', type: 'string' }),
    defineField({
      name: 'suggestedProducts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
  ],
})
