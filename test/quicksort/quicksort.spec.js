const _ = require('lodash')
const { quicksort } = require('../../src')

describe('quicksort', () => {
  it('should sort an array of letters', () => {
    const input = ['d', 'b', 'e', 'a', 'c']
    const result = quicksort(input)
    expect(_.isEqual(result, ['a', 'b', 'c', 'd', 'e'])).toBeTruthy()
  })

  it('should keep an array sorted', () => {
    const input = [-1, 0]
    const result = quicksort(input)
    expect(_.isEqual(result, [-1, 0])).toBeTruthy()
  })

  it('should sort an array of numbers', () => {
    const input = [33, 103, 3, 726, 200, 984, 198, 764, 9, 0, -2]
    const result = quicksort(input)
    expect(
      _.isEqual(result, [-2, 0, 3, 9, 33, 103, 198, 200, 726, 764, 984])
    ).toBeTruthy()
  })
})
