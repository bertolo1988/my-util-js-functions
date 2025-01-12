const { isNumber } = require('../../src')

describe('isNumber', () => {
  describe('should return false', () => {
    it('when value is a string', () => {
      expect(isNumber('1')).toBe(false)
    })

    it('when value is a boolean', () => {
      expect(isNumber(true)).toBe(false)
    })

    it('when value is an array', () => {
      expect(isNumber([])).toBe(false)
    })

    it('when value is an object', () => {
      expect(isNumber({})).toBe(false)
    })

    it('when value is a function', () => {
      expect(isNumber(() => {})).toBe(false)
    })

    it('when value is a symbol', () => {
      expect(isNumber(Symbol('1'))).toBe(false)
    })

    it('when value is null', () => {
      expect(isNumber(null)).toBe(false)
    })

    it('when value is undefined', () => {
      expect(isNumber(undefined)).toBe(false)
    })
  })

  describe('should return true', () => {
    it('when value is a number', () => {
      expect(isNumber(1)).toBe(true)
    })

    it('when value is a float', () => {
      expect(isNumber(1.2)).toBe(true)
    })
  })
})
