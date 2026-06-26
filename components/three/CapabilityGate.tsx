'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { detectCapabilityTier, type CapabilityTier } from '@/lib/capability'

interface CapabilityGateProps {
  /** Full 3D experience (tier 1). */
  full?: ReactNode
  /** Simplified 3D (tier 2). Falls back to `full` if omitted. */
  simplified?: ReactNode
  /** 2D / video / static fallback (tier 3, SSR, and pre-mount). */
  fallback: ReactNode
}

/**
 * Renders the 3D experience only on capable devices, after mount (avoids SSR
 * hydration mismatches). SSR and low-tier devices see `fallback`.
 */
export function CapabilityGate({ full, simplified, fallback }: CapabilityGateProps) {
  const [tier, setTier] = useState<CapabilityTier | null>(null)

  useEffect(() => {
    setTier(detectCapabilityTier())
  }, [])

  // null = SSR / pre-mount → render fallback to match server output.
  if (tier === null || tier === 3) return <>{fallback}</>
  if (tier === 1 && full) return <>{full}</>
  if (tier === 2) return <>{simplified ?? full ?? fallback}</>
  return <>{fallback}</>
}
