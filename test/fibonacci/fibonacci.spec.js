const { fibonacci } = require('../../src')

describe('fibonacci', () => {
  it('fibonacci(53)', () => {
    const result = fibonacci(53)
    expect(result).toBe(53316291173)
  })

  it('fibonacci(0)', () => {
    const result = fibonacci(0)
    expect(result).toBe(0)
  })

  it('fibonacci(1)', () => {
    const result = fibonacci(1)
    expect(result).toBe(1)
  })

  it('fibonacci(2)', () => {
    const result = fibonacci(2)
    expect(result).toBe(1)
  })
})
