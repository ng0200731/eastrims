import { describe, it, expect, afterEach, vi } from 'vitest'

describe('sanity env', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('reads projectId/dataset from public env and is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', 'abc123')
    vi.stubEnv('NEXT_PUBLIC_SANITY_DATASET', 'staging')
    vi.stubEnv('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01')
    const env = await import('@/lib/sanity/env')
    expect(env.projectId).toBe('abc123')
    expect(env.dataset).toBe('staging')
    expect(env.apiVersion).toBe('2024-01-01')
    expect(env.useCdn).toBe(true)
    expect(env.isSanityConfigured).toBe(true)
  })

  it('is unconfigured when projectId is empty', async () => {
    vi.stubEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', '')
    vi.stubEnv('NEXT_PUBLIC_SANITY_DATASET', 'production')
    vi.stubEnv('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01')
    const env = await import('@/lib/sanity/env')
    expect(env.isSanityConfigured).toBe(false)
  })

  it('is unconfigured for the placeholder id', async () => {
    vi.stubEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', 'your_project_id')
    vi.stubEnv('NEXT_PUBLIC_SANITY_DATASET', 'production')
    vi.stubEnv('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01')
    const env = await import('@/lib/sanity/env')
    expect(env.isSanityConfigured).toBe(false)
  })
})
