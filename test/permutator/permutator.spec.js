const { permutator } = require('../../src')

describe('permutator', () => {
  it('should return 2 possible combinations of "a" and "b"', () => {
    const input = ['a', 'b']
    const result = permutator(input)
    expect(result.length).toBe(2)
  })

  it('should return 24 possible combinations of 4 distinct numbers', () => {
    const input = [1, 2, 3, 4]
    const result = permutator(input)
    expect(result.length).toBe(24)
  })
})
