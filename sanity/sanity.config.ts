import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureResolver } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { apiVersion, dataset, projectId } from './env'

const structure: StructureResolver = (S) =>
  S.list()
    .title('Eastrims')
    .items([
      S.listItem().title('Products').child(S.documentTypeList('product').title('All Products')),
      S.listItem().title('Categories').child(S.documentTypeList('category')),
      S.listItem().title('Materials').child(S.documentTypeList('material')),
      S.listItem().title('Marketing Videos').child(S.documentTypeList('marketingVideo')),
      S.listItem().title('Blog Posts').child(S.documentTypeList('blogPost')),
      S.listItem().title('Quote Leads').child(S.documentTypeList('quoteLead')),
      S.divider(),
      S.listItem()
        .title('Hero Configuration')
        .child(S.document().id('hero-config-main').schemaType('heroConfig')),
      S.listItem()
        .title('Site Settings')
        .child(S.document().id('site-settings-main').schemaType('siteSettings')),
    ])

export default defineConfig({
  name: 'eastrims',
  title: 'Eastrims CMS',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion, defaultDataset: dataset }),
  ],
  schema: { types: schemaTypes },
})
