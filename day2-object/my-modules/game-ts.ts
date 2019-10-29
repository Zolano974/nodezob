'use strict'
import * as readline from 'readline'
import {getRandomInt, getRandomIntInclusive} from './random-ts'

//static check on object input structure
interface gameParams {
  min: number
  max: number
}

//main class
export class Game {
  target: number
  min: number
  max:number
  givenAnswers: number[]
  cli: readline.Interface
  /** constructor */
  constructor(params: gameParams = {min:0, max:25}) {
    this.target = getRandomIntInclusive(params.min, params.max)
    this.min = params.min || 0
    this.max = params.max || 100
    this.givenAnswers = []
    this.cli = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }
  play(){
    //set message
    const questionString = this.getQuestionMessage()

    //launch play turn
    this.cli.question(questionString, (answer: string) => {
      let typedNumber = parseInt(answer)
      //if won : we brak the loop and exit
      if (typedNumber === this.target) {
        console.log(
          '<--------------------0°o%^%o°0 !!! YOU WIN  !!! 0°o%^%o°0-------------------->'
        )
        this.cli.close()
      }
      //if failed:
      else {
        this.givenAnswers.push(typedNumber)
        console.log(this.getHint(typedNumber, this.target))
        //relaunch loop
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
    if(isNaN(target)){
      return 'target is not a number ! '
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



