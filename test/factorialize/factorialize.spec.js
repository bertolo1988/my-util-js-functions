const { factorialize, factorializeBigInt } = require('../../src')

describe('factorialize', () => {
  it('should throw error if input is null', () => {
    const input = null
    try {
      factorialize(input)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe('Requires a non-negative integer')
    }
  })

  it('should throw error if input is undefined', () => {
    const input = undefined
    try {
      factorialize(input)
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe('Requires a non-negative integer')
    }
  })

  it('should throw error if input is -1', () => {
    const input = -1
    try {
      factorialize(input)
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe('Requires a non-negative integer')
    }
  })

  it('should throw error if input is a positive float', () => {
    const input = 1.1
    try {
      factorialize(input)
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe('Requires a non-negative integer')
    }
  })

  it('should return 1 as result of 1!', () => {
    const input = 1
    const result = factorialize(input)
    expect(result).toBe(1)
  })

  it('should return 1 as result of 0!', () => {
    const input = 0
    const result = factorialize(input)
    expect(result).toBe(1)
  })

  it('should return 24 as result of 4!', () => {
    const input = 4
    const result = factorialize(input)
    expect(result).toBe(24)
  })

  it('should return 40320 as result of 8!', () => {
    const input = 8
    const result = factorialize(input)
    expect(result).toBe(40320)
  })

  it('should return 3628800 as result of 10!', () => {
    const input = 10
    const result = factorialize(input)
    expect(result).toBe(3628800)
  })

  it('should return 39916800 as result of 11!', () => {
    const input = 11
    const result = factorialize(input)
    expect(result).toBe(39916800)
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
