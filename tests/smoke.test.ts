import { describe, it, expect } from 'vitest'

// Verifies Vitest + jsdom + globals are wired up.
// The `@/` alias is exercised by tests/lib/cn.test.ts (created in Task 5).
describe('vitest smoke test', () => {
  it('runs assertions', () => {
    expect(1 + 1).toBe(2)
  })
})
