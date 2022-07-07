const _ = require('lodash')
const {
  areArraysEqual,
  arrayExistsOnArrayOfArrays,
  countOccurrencesArrayOnArrayOfArrays,
  filterUniqueArraysOnArrayOfArrays,
  getLongestArrayOfArrayOfArrays,
  getShortestArrayOfArrayOfArrays,
  getMaximumOfArray,
  getMinimumOfArray,
  swapArrayElementsByIndex
} = require('../../src')

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

describe('filterUniqueArraysOnArrayOfArrays', () => {
  it('should return only the unique array elements and get rid of the repetitions', () => {
    const arrays = [
      [1, 2],
      [1, 2],
      [-1, 1]
    ]
    const expectedResult = [
      [1, 2],
      [-1, 1]
    ]
    const results = filterUniqueArraysOnArrayOfArrays(arrays)
    expect(_.isEqual(results, expectedResult)).toBe(true)
  })

  it('should return empty array if array of arrays is empty', () => {
    const arrays = []
    const expectedResult = []
    const results = filterUniqueArraysOnArrayOfArrays(arrays)
    expect(_.isEqual(results, expectedResult)).toBe(true)
  })
})

describe('getMaximumOfArray', () => {
  it('should return the biggest element in the array', () => {
    const input = [1, 2, 3]
    expect(getMaximumOfArray(input)).toBe(3)
  })

  it('should return the biggest element in the array even if they are bigger than 10^7', () => {
    const input = [0, 1000000000]
    expect(getMaximumOfArray(input)).toBe(1000000000)
  })
})

describe('getMinimumOfArray', () => {
  it('should return the lowest element in the array', () => {
    const input = [1, 2, 3]
    expect(getMinimumOfArray(input)).toBe(1)
  })

  it('should return the lowest element in the array even if they are bigger than 10^7', () => {
    const input = [0, 1000000000]
    expect(getMinimumOfArray(input)).toBe(0)
  })
})

describe('getLongestArrayOfArrayOfArrays', () => {
  it('should return the longest array in the array of arrays', () => {
    const input = [
      [1, 2],
      [1, 2, 3]
    ]
    const result = getLongestArrayOfArrayOfArrays(input)
    expect(_.isEqual(result, [1, 2, 3])).toBe(true)
  })
})

describe('getShortestArrayOfArrayOfArrays', () => {
  it('should return the shortest array in the array of arrays', () => {
    const input = [
      [1, 2],
      [1, 2, 3]
    ]
    const result = getShortestArrayOfArrayOfArrays(input)
    expect(_.isEqual(result, [1, 2])).toBe(true)
  })
})

describe('countOccurrencesArrayOnArrayOfArrays', () => {
  it('should return three occurrences of array [1, 2]', () => {
    const input = [
      [1, 2],
      [1, 2],
      [1, 2, 3],
      [1, 2],
      [-1, 0]
    ]
    const result = countOccurrencesArrayOnArrayOfArrays(input, [1, 2])
    expect(result).toBe(3)
  })

  it('should return 0 occurrences of array [1, 2]', () => {
    const input = []
    const result = countOccurrencesArrayOnArrayOfArrays(input, [1, 2])
    expect(result).toBe(0)
  })
})

describe('swapArrayElementsByIndex', () => {
  it('should swap 1 with null', () => {
    const input = [1, 'a', 'b', 'd', 2, null]
    const swappedResult = swapArrayElementsByIndex(input, 5, 0)
    expect(_.isEqual(swappedResult, [null, 'a', 'b', 'd', 2, 1])).toBe(true)
  })

  it('should swap a with b', () => {
    const input = ['a', 'b', 'c', 'd']
    const swappedResult = swapArrayElementsByIndex(input, 0, 1)
    expect(_.isEqual(swappedResult, ['b', 'a', 'c', 'd'])).toBe(true)
  })

  it('should not change original array', () => {
    const input = ['a', 'b', 'c', 'd']
    swapArrayElementsByIndex(input, 0, 1)
    expect(_.isEqual(input, ['a', 'b', 'c', 'd'])).toBe(true)
  })
})
