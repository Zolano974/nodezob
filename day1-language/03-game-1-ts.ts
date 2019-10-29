'use strict'
//abstraction, several implementations
// const readline = require('readline')
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const rand100 = function() {
  return randInt(100)
}
const randInt = function(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}

const displayHint = function(value: number, target: number) {
  //case of non-numeric value
  if (isNaN(value)) {
    return 'value must be a number !'
  }
  //cas of out-of-range value
  if (value < 0 || value > 100) {
    return 'Value must be in [0-100] interval'
  }
  //hint on value compared to target
  if (value > target) {
    return 'Too High !'
  } else {
    return 'Too Low !'
  }
}

const mainLoop = function() {
  const areadyTriedPart =
    givenAnswers.length > 0
      ? '(already tried : ' + givenAnswers.join(',') + ') \n '
      : ''

  const question = 'Type an INT between 0 & 100 : \n ' + areadyTriedPart

  rl.question(question, (answer) => {
    let typedNumber = parseInt(answer)
    //if won : we brak the loop
    if (typedNumber === target) {
      console.log('0°o%^%o°0 YOU WIN 0°o%^%o°0')
      rl.close()
    }
    //if failed:
    else {
      givenAnswers.push(typedNumber)
      console.log(displayHint(typedNumber, target))
      //we call the parent function, to continue the loop
      mainLoop()
    }
  })
}

let givenAnswers: number[] = []
const target = rand100()
mainLoop()
