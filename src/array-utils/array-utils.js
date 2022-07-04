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

module.exports = { areArraysEqual, arrayExistsOnArrayOfArrays }
