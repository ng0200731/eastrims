import { describe, it, expect, afterEach, vi } from 'vitest'

describe('sanity env', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('reads projectId/dataset from public env', async () => {
    vi.stubEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', 'abc123')
    vi.stubEnv('NEXT_PUBLIC_SANITY_DATASET', 'staging')
    vi.stubEnv('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01')
    const env = await import('@/lib/sanity/env')
    expect(env.projectId).toBe('abc123')
    expect(env.dataset).toBe('staging')
    expect(env.apiVersion).toBe('2024-01-01')
    expect(env.useCdn).toBe(true)
  })

  it('throws when projectId is missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', '')
    vi.stubEnv('NEXT_PUBLIC_SANITY_DATASET', 'production')
    vi.stubEnv('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01')
    await expect(import('@/lib/sanity/env')).rejects.toThrow(/project|missing/i)
  })
})
