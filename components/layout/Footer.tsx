import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12">
      <Container>
        <p className="font-display text-sm text-text-muted">
          © {new Date().getFullYear()} Eastrims. Premium garment trims &amp; accessories.
        </p>
      </Container>
    </footer>
  )
}
