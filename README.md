[![CircleCI](https://dl.circleci.com/status-badge/img/gh/bertolo1988/my-util-js-functions/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/bertolo1988/my-util-js-functions/tree/main)

# my-util-js-functions

Javascript implementation of widely known algorithms, functions and data structures.

## Install

`npm i --save my-util-js-functions`

## How to use?

### Example1 - quicksort


```javascript
const { quicksort } = require('my-util-js-functions')

const unsortedArray = [3, 2, 1, 10, -5]
const sortedArray = quicksort(unsortedArray)
console.log(sortedArray)
```

### Example2 - fibonacciBigInt


```javascript
const { fibonacciBigInt } = require('my-util-js-functions')

console.log(fibonacciBigInt(BigInt(125)))
```

## Functions available

Check [here](src/index.js).
