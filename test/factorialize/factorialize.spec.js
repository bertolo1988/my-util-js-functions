const { factorialize, factorializeBigInt } = require('../../src')

describe('factorialize', () => {
  it('should return 24 as result of 4!', () => {
    const input = 4
    const result = factorialize(input)
    expect(result).toBe(24)
  })

  it('should return 3628800 as result of 10!', () => {
    const input = 10
    const result = factorialize(input)
    expect(result).toBe(3628800)
  })
})

describe('factorializeBigInt', () => {
  it('should return 24 as result of 4!', () => {
    const input = 4n
    const result = factorializeBigInt(input)
    expect(result).toBe(24n)
  })

  it('should return 3628800 as result of 10!', () => {
    const input = 10n
    const result = factorializeBigInt(input)
    expect(result).toBe(3628800n)
  })

  it('should return 2432902008176640000 as result of 20!', () => {
    const input = BigInt(20)
    const result = factorializeBigInt(input)
    expect(result).toBe(BigInt(2432902008176640000))
  })
})
