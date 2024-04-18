//YOU CAN CHANGE TO GIVE YOURSELF ADVANTAGE
const PLAYERSPEED = 1
const MAXBOMBS = 2
const BOMBDELAY = 1000 // 3s
const BOMBPOWER = 10
const PLAYERLIVES = 3
const ENEMYLIVES = 1

///DO NOT CHANGE
const TILESIZE = 32
const PLAYERSIZE = 32
const BOMBSPEED = 200 //Milliseconds
const EXPLOSION = 400

//HERE: DETERMINATED SPRITES POSITIONS
const SPRITES = {
  player: {
    left: {
      startPosX: 0,
      endPosX: 64,
      Y: 0,
    },
    right: {
      startPosX: 0,
      endPosX: 64,
      Y: 32,
    },
    down: {
      startPosX: 96,
      endPosX: 160,
      Y: 0,
    },
    up: {
      startPosX: 96,
      endPosX: 160,
      Y: 32,
    },
    dead: {
      startPosX: 0,
      endPosX: 192,
      Y: 64,
    },
  },
  bomb: {
    startPosX: 0,
    endPosX: 64,
    Y: 96,
  },
  breakableWall: {
    startPosX: 160,
    endPosX: 320,
    Y: 96,
  },
}

export {
  TILESIZE,
  PLAYERSIZE,
  SPRITES,
  BOMBSPEED,
  EXPLOSION,
  PLAYERSPEED,
  BOMBDELAY,
  BOMBPOWER,
  MAXBOMBS,
  PLAYERLIVES,
  ENEMYLIVES,
}
