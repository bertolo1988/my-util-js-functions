const { fibonacci, fibonacciBigInt } = require('../../src')

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

describe('fibonacciBigInt', () => {
  it('fibonacciBigInt(53n)', () => {
    const result = fibonacciBigInt(53n)
    expect(result).toBe(53316291173n)
  })

  it('fibonacciBigInt(0n)', () => {
    const result = fibonacciBigInt(0n)
    expect(result).toBe(0n)
  })

  it('fibonacciBigInt(1n)', () => {
    const result = fibonacciBigInt(1n)
    expect(result).toBe(1n)
  })

  it('fibonacciBigInt(2)', () => {
    const result = fibonacciBigInt(2n)
    expect(result).toBe(1n)
  })

  it('fibonacciBigInt(125n)', () => {
    const result = fibonacciBigInt(125n)
    expect(result).toBe(59425114757512643212875125n)
  })
})
