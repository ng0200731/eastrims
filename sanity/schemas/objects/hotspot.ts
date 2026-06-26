import { defineType } from 'sanity'

export const hotspot = defineType({
  name: 'hotspot',
  title: '3D Viewer Hotspot',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() },
    {
      name: 'position',
      title: 'Position (x, y, z)',
      type: 'object',
      fields: [
        { name: 'x', type: 'number' },
        { name: 'y', type: 'number' },
        { name: 'z', type: 'number' },
      ],
    },
    { name: 'description', title: 'Description', type: 'string' },
  ],
})
