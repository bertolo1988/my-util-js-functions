const _ = require('lodash')
const { bubblesort } = require('../../src')

describe('bubblesort', () => {
  it('should sort an array of letters', () => {
    const input = ['d', 'b', 'e', 'a', 'c']
    const result = bubblesort(input)
    expect(_.isEqual(result, ['a', 'b', 'c', 'd', 'e'])).toBeTruthy()
  })

  it('should keep an array sorted', () => {
    const input = [-1, 0]
    const result = bubblesort(input)
    expect(_.isEqual(result, [-1, 0])).toBeTruthy()
  })
})
