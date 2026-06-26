import { NextResponse } from 'next/server'
import { fetchSanity } from '@/lib/sanity/fetch'
import { allProductsQuery } from '@/lib/sanity/queries'
import type { FeaturedProduct } from '@/lib/sanity/types'

/** Return up to 3 products matching the given material / trim-type keyword. */
export async function POST(req: Request) {
  const { material, trimType } = (await req.json().catch(() => ({}))) as {
    material?: string
    trimType?: string
  }

  const products = await fetchSanity<FeaturedProduct[]>(allProductsQuery).catch(() => [])
  const term = (material ?? trimType ?? '').toLowerCase().trim()

  const matches = term
    ? products
        .filter(
          (p) =>
            (p.category?.title ?? '').toLowerCase().includes(term) ||
            (p.shortDescription ?? '').toLowerCase().includes(term) ||
            (p.title ?? '').toLowerCase().includes(term)
        )
        .slice(0, 3)
    : products.slice(0, 3)

  return NextResponse.json({ products: matches })
}
