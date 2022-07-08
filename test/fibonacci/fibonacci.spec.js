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

  it('fibonacciBigInt(3000n)', () => {
    const input = 3000n
    const result = fibonacciBigInt(input)

    // bottom up approach takes advantage of memoization
    for (let i = 0n; i < input; i++) {
      fibonacciBigInt(i)
    }

    fibonacciBigInt(input)

    expect(result).toBe(
      410615886307971260333568378719267105220125108637369252408885430926905584274113403731330491660850044560830036835706942274588569362145476502674373045446852160486606292497360503469773453733196887405847255290082049086907512622059054542195889758031109222670849274793859539133318371244795543147611073276240066737934085191731810993201706776838934766764778739502174470268627820918553842225858306408301661862900358266857238210235802504351951472997919676524004784236376453347268364152648346245840573214241419937917242918602639810097866942392015404620153818671425739835074851396421139982713640679581178458198658692285968043243656709796000n
    )
  })
})
