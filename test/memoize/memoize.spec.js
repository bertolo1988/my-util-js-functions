const { memoize } = require('../../src')

function bottomUp(n, func) {
  for (let i = 0; i <= n; i++) {
    func(i)
  }
}

describe('memoize', () => {
  it('recursive function should only be called n times after being initialized using a bottom up approach', () => {
    const n = 5
    let calls = 0

    function recursiveFunction(n) {
      calls++
      if (n === 0) return 1
      return memoizedRecursiveFunction(n - 1) + n * n
    }

    const memoizedRecursiveFunction = memoize(recursiveFunction)

    bottomUp(n, memoizedRecursiveFunction)

    for (let k = 0; k < n; k++) {
      memoizedRecursiveFunction(k)
    }

    expect(calls).toBe(n + 1)
  })
})
