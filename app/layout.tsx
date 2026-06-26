import type { Metadata } from 'next'
import { displayFont, bodyFont, monoFont } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Eastrims — Premium Garment Trims & Accessories',
    template: '%s | Eastrims',
  },
  description:
    'Eastrims manufactures premium woven labels, hang tags, patches, and packaging for global fashion brands.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="bg-bg-base text-text-primary antialiased">
        <SkipLink />
        <Navbar />
        <main id="main" className="pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
