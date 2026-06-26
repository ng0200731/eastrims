import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

/** next/image with `fill`; parent must be `relative` and sized. */
export function ResponsiveImage({
  src,
  alt,
  className,
  priority,
  sizes = '(max-width: 768px) 100vw, 33vw',
}: ResponsiveImageProps) {
  if (!src) return null
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover transition-transform duration-500', className)}
    />
  )
}
