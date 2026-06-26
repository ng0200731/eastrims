import '@testing-library/jest-dom/vitest'

// Sanity env defaults so modules that read env at import time (lib/sanity/env.ts)
// parse successfully in the test environment. Individual tests override via vi.stubEnv.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??= 'test-project'
process.env.NEXT_PUBLIC_SANITY_DATASET ??= 'test'
process.env.NEXT_PUBLIC_SANITY_API_VERSION ??= '2024-01-01'
