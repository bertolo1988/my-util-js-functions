function areArraysEqual(array1, array2) {
  return Boolean(
    array1 &&
      array2 &&
      array1.length === array2.length &&
      array1.every(function (value, index) {
        return value === array2[index]
      })
  )
}

function arrayExistsOnArrayOfArrays(arrayOfArrays, targetArray) {
  for (let arr of arrayOfArrays) {
    if (areArraysEqual(arr, targetArray)) return true
  }
  return false
}

function filterUniqueArraysOnArrayOfArrays(arrays) {
  let uniques = []
  for (let arr of arrays) {
    if (!arrayExistsOnArrayOfArrays(uniques, arr)) {
      uniques.push(arr)
    }
  }
  return uniques
}

function getMaximumOfArray(arr) {
  return arr.reduce(function (p, v) {
    return p > v ? p : v
  })
}

function getMinimumOfArray(arr) {
  return arr.reduce(function (p, v) {
    return p < v ? p : v
  })
}

module.exports = {
  areArraysEqual,
  arrayExistsOnArrayOfArrays,
  filterUniqueArraysOnArrayOfArrays,
  getMaximumOfArray,
  getMinimumOfArray
}
