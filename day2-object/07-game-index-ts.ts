'use strict'
import {Game as Jeu} from './my-modules/game-ts'

const game1 = new Jeu({
  min: 0,
  max: 100,
})

game1.play()
