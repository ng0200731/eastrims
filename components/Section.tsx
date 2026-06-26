import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/Container'

export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  className,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}) {
  return (
    <Container className={cn(center && 'text-center', className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-text-muted md:text-lg">{subtitle}</p>
      )}
    </Container>
  )
}
