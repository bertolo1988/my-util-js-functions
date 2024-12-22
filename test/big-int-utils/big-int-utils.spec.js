const { isBigInt } = require('../../src')

describe('big-int-utils', () => {
  describe('should return true', () => {
    it('if input is BigInt(1)', () => {
      const input = BigInt(1)
      const result = isBigInt(input)
      expect(result).toBe(true)
    })

    it('if input is BigInt(-1000)', () => {
      const input = BigInt(-1000)
      const result = isBigInt(input)
      expect(result).toBe(true)
    })
  })

  describe('should return false', () => {
    it('if input is undefined', () => {
      const input = undefined
      const result = isBigInt(input)
      expect(result).toBe(false)
    })

    it('if input is null', () => {
      const input = null
      const result = isBigInt(input)
      expect(result).toBe(false)
    })

    it('if input is -1', () => {
      const input = -1
      const result = isBigInt(input)
      expect(result).toBe(false)
    })
    it('if input is 5', () => {
      const input = 5
      const result = isBigInt(input)
      expect(result).toBe(false)
    })

    it('if input is "2"', () => {
      const input = '2'
      const result = isBigInt(input)
      expect(result).toBe(false)
    })
  })
})
