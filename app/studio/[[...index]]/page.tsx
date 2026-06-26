import StudioClient from '@/components/studio/StudioClient'

export const dynamic = 'force-static'

// NOTE: In production, gate this route behind auth (e.g. middleware checking a
// session). For local dev it is open. See spec §7.6 for security hardening.

export default function StudioPage() {
  return <StudioClient />
}
