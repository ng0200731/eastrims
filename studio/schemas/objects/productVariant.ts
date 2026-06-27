import { defineType } from 'sanity'

export const productVariant = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() },
    { name: 'size', title: 'Size', type: 'string' },
    {
      name: 'finish',
      title: 'Finish',
      type: 'string',
      options: { list: ['flat', 'emboss', 'deboss'] },
    },
    {
      name: 'threadType',
      title: 'Thread Type',
      type: 'string',
      options: { list: ['standard', 'metallic'] },
    },
    { name: 'priceModifier', title: 'Price Modifier (per unit)', type: 'number' },
  ],
})
