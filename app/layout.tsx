import type { Metadata } from 'next'
import { displayFont, bodyFont, monoFont } from '@/lib/fonts'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'Eastrims — Premium Garment Trims & Accessories',
    template: '%s | Eastrims',
  },
  description:
    'Eastrims manufactures premium woven labels, hang tags, patches, and packaging for global fashion brands.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(displayFont.variable, bodyFont.variable, monoFont.variable, "font-sans", geist.variable)}
    >
      <body className="bg-bg-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
