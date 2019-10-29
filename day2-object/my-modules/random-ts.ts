'use strict'

let getRandom = function() {
  return Math.random()
}
let getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}
let getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
let getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { getRandomIntInclusive, getRandomInt }
