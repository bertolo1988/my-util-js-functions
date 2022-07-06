const _ = require('lodash')
const { cloneObject } = require('../../src')

class Vehicle {
  constructor(age) {
    this.age = age
  }

  increaseAge() {
    this.age++
  }
}

class Car extends Vehicle {
  constructor(plate) {
    super()
    this.plate = plate
  }

  toString() {
    return `plate:${plate} age:${this.age}`
  }
}

describe('cloneObject', () => {
  it('should be able to clone an object', () => {
    const input = { myProp: [1, 2, 3], b: 5 }
    const clonedInput = cloneObject(input)
    expect(_.isEqual(input, clonedInput)).toBe(true)
  })

  it('should be able to clone an object with nested properties', () => {
    const nestedObject = { a: 'js' }
    const input = { myProp: [1, 2, 3], b: nestedObject }
    const clonedInput = cloneObject(input)
    expect(_.isEqual(nestedObject, clonedInput.b)).toBe(true)
  })

  it('should be able to clone a class instance with all its properties', () => {
    const car = new Car('10-CC-90')
    const clonedCar = cloneObject(car)
    expect(car.age).toBe(clonedCar.age)
    expect(car.plate).toBe(clonedCar.plate)
    expect(clonedCar.toString).toBeDefined()
    expect(clonedCar.increaseAge).toBeDefined()
  })
})
