import { testFs } from './main'

describe('test-fs', () => {
  test('is object with all helper exports', () =>
    expect(Object.keys(testFs).length).toBe(12)
  )
})
