const _ = require('lodash')
const { permutator } = require('../../src')

describe('permutator', () => {
  it('should return 2 possible combinations of "a" and "b"', () => {
    const input = ['a', 'b']
    const results = permutator(input)
    expect(results.length).toBe(2)
  })

  it('should return 24 possible combinations of 4 distinct numbers', () => {
    const input = [1, 2, 3, 4]
    const results = permutator(input)
    expect(results.length).toBe(24)
  })

  it('should return the 6 possible combinations of 3 diferent letters', () => {
    const input = ['a', 'b', 'c']
    const results = permutator(input)
    const expectedResults = [
      ['a', 'b', 'c'],
      ['a', 'c', 'b'],
      ['b', 'a', 'c'],
      ['b', 'c', 'a'],
      ['c', 'a', 'b'],
      ['c', 'b', 'a']
    ]
    for (let result of results) {
      expect(
        expectedResults.some((expectedResult) =>
          _.isEqual(expectedResult, result)
        )
      ).toBeTruthy()
    }
  })
})
