const _ = require('lodash')

const fib = (n) => {
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
const fibonacci = _.memoize(fib)

const fibBigInt = (n) => {
  if (n <= BigInt(1)) {
    return n
  }
  return fibonacciBigInt(n - BigInt(1)) + fibonacciBigInt(n - BigInt(2))
}
const fibonacciBigInt = _.memoize(fibBigInt)

module.exports = { fibonacci, fibonacciBigInt }
