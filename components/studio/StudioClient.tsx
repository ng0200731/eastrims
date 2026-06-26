'use client'

import dynamic from 'next/dynamic'
import config from '@/sanity/sanity.config'

// The Sanity Studio is a client-only app (uses React contexts that don't exist
// in the server runtime). Load it with `ssr: false` so the build never tries to
// server-render it, avoiding `createContext is not a function` at build time.
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          background: '#0a0a0b',
          color: '#f5f5f7',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Loading Studio…
      </div>
    ),
  }
)

export default function StudioClient() {
  return <NextStudio config={config} />
}
