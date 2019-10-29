'use strict'
const Game = require('./my-modules/game')

const game = new Game({
  min: 0,
  max: 10,
})

game.play()
