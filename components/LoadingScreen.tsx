'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LETTERS = ['E', 'A', 'S', 'T', 'R', 'I', 'M', 'S']

export function LoadingScreen() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { display: 'none' })
      return
    }

    // Animate, then hide via display:none (no React state needed).
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => gsap.set(el, { display: 'none' }),
      })
      tl.from('.ls-letter', {
        opacity: 0,
        y: 14,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
      })
        .to('.ls-thread', { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0)
        .to(el, { opacity: 0, duration: 0.5, ease: 'power2.inOut', delay: 0.25 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg-base"
    >
      <div className="flex items-end">
        {LETTERS.map((l, i) => (
          <span
            key={i}
            className="ls-letter font-display text-4xl font-semibold tracking-tight text-text-primary md:text-6xl"
          >
            {l}
          </span>
        ))}
      </div>
      <svg width="220" height="14" viewBox="0 0 220 14" className="mt-4" aria-hidden>
        <line
          className="ls-thread"
          x1="4"
          y1="7"
          x2="216"
          y2="7"
          stroke="var(--color-accent-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="220"
          strokeDashoffset="220"
        />
      </svg>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
        Weaving
      </p>
    </div>
  )
}
