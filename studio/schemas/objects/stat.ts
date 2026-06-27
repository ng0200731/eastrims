import { defineType } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  fields: [
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (r) => r.required(),
      description: 'e.g. "20+"',
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (r) => r.required(),
      description: 'e.g. "Years"',
    },
  ],
})
