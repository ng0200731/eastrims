import { defineType } from 'sanity'

export const shippingRoute = defineType({
  name: 'shippingRoute',
  title: 'Shipping Route',
  type: 'object',
  fields: [
    { name: 'origin', title: 'Origin', type: 'string', validation: (r) => r.required() },
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
      validation: (r) => r.required(),
    },
    { name: 'leadTimeDays', title: 'Lead Time (days)', type: 'number' },
  ],
})
