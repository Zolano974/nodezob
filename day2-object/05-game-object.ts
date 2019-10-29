'use strict'
//abstraction, several implementations
import * as readline from 'readline'
// const readline = require('readline')
const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

//random custom library
const random = {
  getRand: (max: number) => {
    return Math.floor(Math.random() * Math.floor(max))
    // return 51
  },
  getRandom: () => {
    return Math.random()
  },
  getRandomArbitrary: (min: number, max: number) => {
    return Math.random() * (max - min) + min
  },
  getRandomInt: (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },
  getRandomIntInclusive: (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
}

//static check on object input structure
interface gameParams {
  min: number
  max: number
}
//main class
class Game {
  target: number
  min: number
  max:number
  givenAnswers: number[]
  /** constructor */
  constructor(params: gameParams) {
    this.target = random.getRandomIntInclusive(params.min, params.max)
    this.min = params.min || 0
    this.max = params.max || 100
    this.givenAnswers = []
  }
  //play() function
  play(){
    //set message
    const questionString = this.getQuestionMessage()

    //launch play turn
    cli.question(questionString, (answer) => {
      let typedNumber = parseInt(answer)
      //if won : we brak the loop and exit
      if (typedNumber === this.target) {
        console.log(
          '<--------------------0°o%^%o°0 !!! YOU WIN  !!! 0°o%^%o°0-------------------->'
        )
        cli.close()
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
  //generate hint message in case of error
  getHint(value: number, target: number) {
    //case of non-numeric value
    if (isNaN(value)) {
      return 'value must be a number !'
    }
    //cas of out-of-range value
    if (value < this.min || value > this.max) {
      return 'Value must be in ['+this.min+'-'+this.max+'] interval'
    }
    //hint on value compared to target
    if (value > target) {
      return 'Too High !'
    } else {
      return 'Too Low !'
    }
  }
  //generate question message
  getQuestionMessage() {
    const areadyTriedPart =
      this.givenAnswers.length > 0
        ? '(already tried : ' + this.givenAnswers.join(',') + ') \n '
        : ''
    const questionString = 'Type an INT between '+this.min+' & '+this.max+' : \n ' + areadyTriedPart
    return questionString
  }
}

const game = new Game({
  min: 0,
  max: 50,
})

game.play()
