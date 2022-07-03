const _ = require('lodash')

const fib = (n) => {
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
const fibonacci = _.memoize(fib)

module.exports = { fibonacci }
