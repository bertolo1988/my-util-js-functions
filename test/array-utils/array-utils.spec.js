const { areArraysEqual, arrayExistsOnArrayOfArrays } = require('../../src')

describe('areArraysEqual', () => {
  it('should return true if arrays are both empty', () => {
    const input1 = []
    const input2 = []
    expect(areArraysEqual(input1, input2)).toBe(true)
  })

  it('should return false if one array is empty and the other is null', () => {
    const input1 = []
    const input2 = null
    expect(areArraysEqual(input1, input2)).toBe(false)
  })

  describe('strings', () => {
    it('should return true if arrays of strings are the same', () => {
      const input1 = ['d', 'b', 'e', 'a', 'c']
      const input2 = ['d', 'b', 'e', 'a', 'c']
      expect(areArraysEqual(input1, input2)).toBe(true)
    })

    it('should return false if arrays of strings are not the same', () => {
      const input1 = ['d', 'b', 'e', 'a', 'ca']
      const input2 = ['d', 'b', 'e', 'a', 'c']
      expect(areArraysEqual(input1, input2)).toBe(false)
    })

    it('should return false if arrays of strings have the same elements but are sorted in a different way', () => {
      const input1 = ['d', 'b', 'a', 'e', 'c']
      const input2 = ['d', 'b', 'e', 'a', 'c']
      expect(areArraysEqual(input1, input2)).toBe(false)
    })
  })
  describe('numbers', () => {
    it('should return true if arrays of numbers are the same', () => {
      const input1 = [1, 2, 0, 1000, -1]
      const input2 = [1, 2, 0, 1000, -1]
      expect(areArraysEqual(input1, input2)).toBe(true)
    })

    it('should return false if arrays of numbers are not the same', () => {
      const input1 = [1, 2, 0, 5, -1]
      const input2 = [1, 2, 0, 1000, -1]
      expect(areArraysEqual(input1, input2)).toBe(false)
    })

    it('should return false if arrays of numbers have the same elements but are sorted in a different way', () => {
      const input1 = [1, 2, 3]
      const input2 = [2, 1, 3]
      expect(areArraysEqual(input1, input2)).toBe(false)
    })
  })

  describe('BigInt', () => {
    it('should return true if arrays of numbers are the same', () => {
      const input1 = [1n, 2n, 3n]
      const input2 = [1n, 2n, 3n]
      expect(areArraysEqual(input1, input2)).toBe(true)
    })

    it('should return false if arrays of numbers are not the same', () => {
      const input1 = [1n, 2n, 3n]
      const input2 = [5n, 2n, 3n]
      expect(areArraysEqual(input1, input2)).toBe(false)
    })

    it('should return false if arrays of numbers have the same elements but are sorted in a different way', () => {
      const input1 = [1n, 2n, 3n]
      const input2 = [2n, 1n, 3n]
      expect(areArraysEqual(input1, input2)).toBe(false)
    })
  })
})

describe('arrayExistsOnArrayOfArrays', () => {
  it('should return true if array exists in array of arrays', () => {
    const arrays = [[1, 2, 3]]
    const targetArray = [1, 2, 3]
    expect(arrayExistsOnArrayOfArrays(arrays, targetArray)).toBe(true)
  })

  it('should return false targetArray is null', () => {
    const arrays = [[1, 2, 3]]
    const targetArray = null
    expect(arrayExistsOnArrayOfArrays(arrays, targetArray)).toBe(false)
  })

  it('should return true if array of BigInts exists in array of arrays', () => {
    const arrays = [
      ['a', 'b', 'c'],
      [-1, 0 - 2],
      [2n, 1n, 3n]
    ]
    const targetArray = [2n, 1n, 3n]
    expect(arrayExistsOnArrayOfArrays(arrays, targetArray)).toBe(true)
  })

  it('should return false if array does not exist in empty array', () => {
    const arrays = []
    const targetArray = [1, 2, 3]
    expect(arrayExistsOnArrayOfArrays(arrays, targetArray)).toBe(false)
  })

  it('should return false if empty array does not exist in empty array of arrays', () => {
    const arrays = []
    const targetArray = []
    expect(arrayExistsOnArrayOfArrays(arrays, targetArray)).toBe(false)
  })

  it('should return true if empty array does exist in array of arrays', () => {
    const arrays = [[]]
    const targetArray = []
    expect(arrayExistsOnArrayOfArrays(arrays, targetArray)).toBe(true)
  })
})
