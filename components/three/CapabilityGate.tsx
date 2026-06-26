'use client'

import { useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { detectCapabilityTier, type CapabilityTier } from '@/lib/capability'

// Client-only tier (computed once, after mount). useSyncExternalStore reads it
// on the client while the server snapshot stays at 3 (fallback) — no hydration
// mismatch, no setState-in-effect.
let clientTier: CapabilityTier | null = null
function readTier(): CapabilityTier {
  if (clientTier === null) clientTier = detectCapabilityTier()
  return clientTier
}
const emptySubscribe = () => () => {}
const serverSnapshot = (): CapabilityTier => 3

interface CapabilityGateProps {
  /** Full 3D experience (tier 1). */
  full?: ReactNode
  /** Simplified 3D (tier 2). Falls back to `full` if omitted. */
  simplified?: ReactNode
  /** 2D / video / static fallback (tier 3 and SSR). */
  fallback: ReactNode
}

export function CapabilityGate({ full, simplified, fallback }: CapabilityGateProps) {
  const tier = useSyncExternalStore(emptySubscribe, readTier, serverSnapshot)

  if (tier === 3) return <>{fallback}</>
  if (tier === 1 && full) return <>{full}</>
  if (tier === 2) return <>{simplified ?? full ?? fallback}</>
  return <>{fallback}</>
}
