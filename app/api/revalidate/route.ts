import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Sanity webhook → revalidate Next.js cache.
// Configure in Sanity with a POST to /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as {
    _type?: string
    slug?: { current?: string }
    fields?: { slug?: { current?: string } }
  }

  const slug = body.slug?.current ?? body.fields?.slug?.current
  const type = body._type

  revalidatePath('/', 'layout')
  revalidateTag('sanity', 'default')

  if (type === 'product' && slug) revalidatePath(`/products/${slug}`)
  if (type === 'product' || type === 'category') revalidatePath('/products')
  if (type === 'blogPost' && slug) revalidatePath(`/blog/${slug}`)
  if (type === 'blogPost') revalidatePath('/blog')

  return NextResponse.json({ revalidated: true, now: Date.now(), slug, type })
}
