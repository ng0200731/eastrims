import type { Stat } from '@/lib/sanity/types'

// Fallbacks used when Sanity content is absent, so the site looks complete
// during development / before content is entered. Sanity values always win.

export const BRAND_NAME = 'Eastrims'

export const FALLBACK_STATS: Stat[] = [
  { value: '20+', label: 'Years' },
  { value: '200+', label: 'Factories' },
  { value: '50+', label: 'Countries' },
  { value: '100M+', label: 'Labels Produced' },
]

export const FALLBACK_CONTACT = {
  email: 'sales@eastrims.com',
  phone: '+1 (000) 000-0000',
  address: 'Global garment-trim manufacturing',
  whatsapp: '',
}

export const FALLBACK_SOCIAL = {
  linkedin: 'https://www.linkedin.com',
  instagram: 'https://www.instagram.com',
  youtube: 'https://www.youtube.com',
}
