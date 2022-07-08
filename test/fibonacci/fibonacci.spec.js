const { fibonacci, fibonacciBigInt } = require('../../src')

describe('fibonacci', () => {
  it('fibonacci(53)', () => {
    const result = fibonacci(53)
    expect(result).toBe(53316291173)
  })

  it('fibonacci(0)', () => {
    const result = fibonacci(0)
    expect(result).toBe(0)
  })

  it('fibonacci(1)', () => {
    const result = fibonacci(1)
    expect(result).toBe(1)
  })

  it('fibonacci(2)', () => {
    const result = fibonacci(2)
    expect(result).toBe(1)
  })
})

describe('fibonacciBigInt', () => {
  it('fibonacciBigInt(53n)', () => {
    const result = fibonacciBigInt(53n)
    expect(result).toBe(53316291173n)
  })

  it('fibonacciBigInt(0n)', () => {
    const result = fibonacciBigInt(0n)
    expect(result).toBe(0n)
  })

  it('fibonacciBigInt(1n)', () => {
    const result = fibonacciBigInt(1n)
    expect(result).toBe(1n)
  })

  it('fibonacciBigInt(2)', () => {
    const result = fibonacciBigInt(2n)
    expect(result).toBe(1n)
  })

  it('fibonacciBigInt(2000n)', () => {
    const input = 2000n
    const result = fibonacciBigInt(input)

    // bottom up approach takes advantage of memoization
    for (let i = 0n; i < input; i++) {
      fibonacciBigInt(i)
    }

    fibonacciBigInt(input)
    
    // this result is taken from http://www.fullbooks.com/The-first-1001-Fibonacci-Numbers.html
    expect(result).toBe(
      4224696333392304878706725602341482782579852840250681098010280137314308584370130707224123599639141511088446087538909603607640194711643596029271983312598737326253555802606991585915229492453904998722256795316982874482472992263901833716778060607011615497886719879858311468870876264597369086722884023654422295243347964480139515349562972087652656069529806499841977448720155612802665404554171717881930324025204312082516817125n
    )
  })
})
