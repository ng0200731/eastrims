import Link from 'next/link'
import { LocaleSwitcher } from './LocaleSwitcher'

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/materials', label: 'Materials' },
  { href: '/factory', label: 'Factory' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  return (
    <header className="fixed left-4 right-4 top-4 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-border-subtle bg-bg-elevated/80 px-6 py-3 backdrop-blur-xl">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-text-primary"
        >
          Eastrims
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="cursor-pointer text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <Link
            href="/quote"
            className="cursor-pointer rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-bright px-5 py-2 text-sm font-medium text-bg-base transition-transform duration-200 hover:scale-[1.02]"
          >
            Request Quote
          </Link>
        </div>
      </nav>
    </header>
  )
}
