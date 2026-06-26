import type { Metadata, Viewport } from 'next'
import { displayFont, bodyFont, monoFont } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Eastrims — Premium Garment Trims & Accessories',
    template: '%s | Eastrims',
  },
  description:
    'Eastrims manufactures premium woven labels, hang tags, patches, and packaging for global fashion brands.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eastrims.com'),
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="bg-bg-base text-text-primary antialiased">
        <LoadingScreen />
        <SmoothScroll>
          <SkipLink />
          <Navbar />
          <main id="main" className="pt-24">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
