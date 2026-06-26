export interface Locale {
  code: string
  label: string
  enabled: boolean
}

// English-first. Additional locales are scaffolded; enabling a locale requires
// localized Sanity content + Next.js middleware routing (see docs).
export const LOCALES: Locale[] = [
  { code: 'en', label: 'English', enabled: true },
  { code: 'zh', label: '中文', enabled: false },
  { code: 'vi', label: 'Tiếng Việt', enabled: false },
  { code: 'bn', label: 'বাংলা', enabled: false },
  { code: 'tr', label: 'Türkçe', enabled: false },
  { code: 'es', label: 'Español', enabled: false },
]

export const DEFAULT_LOCALE = 'en'
