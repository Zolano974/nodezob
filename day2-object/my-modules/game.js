'use strict'
const readline = require('readline')
const random = require('./random')

module.exports = class Game {
  constructor(params = {min:0, max:10}) {

    let {min, max} = params

    //set random target
    this.target = random.getIntInclusive(min, max)
    this.min = min || 0
    this.max = max !== undefined ? max : 100 //default value: if not falsy, then we MUST code wit a ternary

    this.givenAnswers = []
    this.cli = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    console.log(this)
  }
  play() {
    //set message
    const areadyTriedPart =
      this.givenAnswers.length > 0
        ? '(already tried : ' + this.givenAnswers.join(',') + ') \n '
        : ''
    const questionString =
      'Type an INT between ' +
      this.min +
      ' & ' +
      this.max +
      ' : \n ' +
      areadyTriedPart

    //launch play turn
    this.cli.question(questionString, (answer) => {
      let typedNumber = parseInt(answer)
      //if won : we brak the loop and exit
      if (typedNumber === this.target) {
        console.log(
          '<--------------------0°o%^%o°0 !!! YOU WIN  !!! 0°o%^%o°0-------------------->',
        )
        this.cli.close()
      }
      //if failed:
      else {
        this.givenAnswers.push(typedNumber)
        console.log(this.getHint(typedNumber, this.target))
        //we call the parent function, to continue the loop
        this.play()
      }
    })
  }
  getHint(value, target) {
    //case of non-numeric value
    if (isNaN(value)) {
      return 'value must be a number !'
    }
    if (isNaN(target)) {
      return 'target is not a number ! '
    }
    //cas of out-of-range value
    if (value < this.min || value > this.max) {
      return 'Value must be in [' + this.min + '-' + this.max + '] interval'
    }
    //hint on value compared to target
    if (value > target) {
      return 'Too High !'
    } else {
      return 'Too Low !'
    }
  }
}

