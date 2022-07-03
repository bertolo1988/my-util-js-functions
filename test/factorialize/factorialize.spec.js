const { factorialize } = require('../../src')

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
