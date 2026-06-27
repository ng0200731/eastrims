// Studio env. Sanity Studio reads vars prefixed with SANITY_STUDIO_.
// Copy .env.example -> .env and fill in your project id.
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? ''
export const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION ?? '2024-01-01'
