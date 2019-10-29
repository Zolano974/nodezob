'use strict'
import {Game as Jeu} from './my-modules/game-ts'

const game = new Jeu({
  min: 0,
  max: 10,
})

game.play()
