import { defineType, defineField } from 'sanity'

export const marketingVideo = defineType({
  name: 'marketingVideo',
  title: 'Marketing Video (Remotion)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'composition',
      type: 'string',
      options: {
        list: ['productReveal', 'heroLoop', 'scrollStory', 'factoryTimeline', 'marketingShort'],
      },
    }),
    defineField({ name: 'product', type: 'reference', to: [{ type: 'product' }] }),
    defineField({
      name: 'platform',
      type: 'string',
      options: {
        list: ['web-hero', 'instagram-reel', 'tiktok', 'youtube-short', 'linkedin', 'tradeshow'],
      },
    }),
    defineField({ name: 'aspectRatio', type: 'string', options: { list: ['16:9', '9:16', '1:1', '4:3'] } }),
    defineField({ name: 'durationSeconds', type: 'number' }),
    defineField({ name: 'resolution', type: 'string', options: { list: ['4K', '1080p', '720p'] } }),
    defineField({
      name: 'renderStatus',
      type: 'string',
      options: { list: ['pending', 'rendering', 'complete', 'failed'] },
      initialValue: 'pending',
    }),
    defineField({ name: 'cdnUrl', type: 'url' }),
    defineField({ name: 'thumbnailUrl', type: 'url' }),
    defineField({ name: 'lastRenderedAt', type: 'datetime' }),
  ],
})
