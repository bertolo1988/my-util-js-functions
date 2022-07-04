const _ = require('lodash')

const factorialize = _.memoize((num) => {
  if (num < 0) return -1
  else if (num == 0) return 1
  else {
    return num * factorialize(num - 1)
  }
})

const factorializeBigInt = _.memoize((num) => {
  if (num < 0) return BigInt(-1)
  else if (num == 0) return BigInt(1)
  else {
    return num * factorializeBigInt(num - BigInt(1))
  }
})

module.exports = { factorialize, factorializeBigInt }
