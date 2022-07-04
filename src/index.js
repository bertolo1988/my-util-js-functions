const {
  areArraysEqual,
  arrayExistsOnArrayOfArrays,
  filterUniqueArraysOnArrayOfArrays,
  getMaximumOfArray,
  getMinimumOfArray
} = require('./array-utils/array-utils')
const { bubblesort } = require('./bubblesort/bubblesort')
const {
  factorialize,
  factorializeBigInt
} = require('./factorialize/factorialize')
const { fibonacci, fibonacciBigInt } = require('./fibonacci/fibonacci')
const { permutator } = require('./permutator/permutator')
const { quicksort } = require('./quicksort/quicksort')

module.exports = {
  areArraysEqual,
  arrayExistsOnArrayOfArrays,
  filterUniqueArraysOnArrayOfArrays,
  bubblesort,
  factorialize,
  factorializeBigInt,
  fibonacci,
  fibonacciBigInt,
  getMaximumOfArray,
  getMinimumOfArray,
  permutator,
  quicksort
}
