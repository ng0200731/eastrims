import { Container } from '@/components/layout/Container'

export default function HomePage() {
  return (
    <Container className="py-32 text-center">
      <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
        Eastrims
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
        Premium garment trims, labels, and packaging — crafted for global fashion
        brands. (Phase 0 foundation — full experience arrives in later phases.)
      </p>
    </Container>
  )
}
