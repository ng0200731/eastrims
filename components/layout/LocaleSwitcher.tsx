'use client'

import { useEffect, useRef, useState } from 'react'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { cn } from '@/lib/utils'

export function LocaleSwitcher() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer rounded-full border border-border-subtle px-3 py-1.5 text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {DEFAULT_LOCALE} ▾
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated p-1 shadow-xl"
        >
          {LOCALES.map((l) => (
            <li
              key={l.code}
              className={cn(
                'flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm',
                l.enabled ? 'text-text-primary hover:bg-surface' : 'cursor-not-allowed text-text-muted opacity-50'
              )}
              onClick={() => l.enabled && setOpen(false)}
            >
              <span>{l.label}</span>
              {!l.enabled && <span className="text-[10px]">soon</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
