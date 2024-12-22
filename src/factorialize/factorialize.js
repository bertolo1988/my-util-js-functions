const _ = require('lodash')
const { isBigInt } = require('../big-int-utils/big-int-utils')

const factorialize = _.memoize((num) => {
  if (num < 0 || !Number.isInteger(num))
    throw new Error('Requires a non-negative integer')
  if (num == 0) return 1
  return num * factorialize(num - 1)
})

const factorializeBigInt = _.memoize((num) => {
  if (num < BigInt(0) || !isBigInt(num))
    throw new Error('Requires a non-negative BigInt')
  else if (num == BigInt(0)) return BigInt(1)
  else {
    return num * factorializeBigInt(num - BigInt(1))
  }
})

module.exports = { factorialize, factorializeBigInt }
