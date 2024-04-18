import {
  TILESIZE,
  PLAYERSIZE,
  PLAYERSPEED,
  MAXBOMBS,
  BOMBDELAY,
  PLAYERLIVES,
} from "../config.js"
import { Bomb } from "./bomb.js"
import { bombGlobalArray } from "./bomb.js"
import {
  generateUniqId,
  removeItemFromArray,
} from "../helpers/animateExplotion.js"
import { entities } from "../maps/map.js"
import { Timer } from "../helpers/timer.js"
export class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.id = generateUniqId(entities)
    this.speed = PLAYERSPEED
    this.bombs = []
    this.maxBomb = MAXBOMBS
    this.direction = "idle"
    this.bombPlacementDelay = BOMBDELAY //In milliseconds
    this.lastBombPlace = Date.now() - this.bombPlacementDelay
    this.lives = PLAYERLIVES
    this.isVulnerableToDmg = true
    this.playerModel = document.createElement("div")
    this.playerModelName = "player"
    this.isDead = false
    this.score = 0
  }

  renderPlayer(gameScreen) {
    this.playerModel.className = this.playerModelName
    this.playerModel.id = this.playerModelName
    this.playerModel.style.width = PLAYERSIZE + "px"
    this.playerModel.style.height = PLAYERSIZE + "px"
    this.playerModel.style.left = this.x + "px"
    this.playerModel.style.top = this.y + "px"

    gameScreen.appendChild(this.playerModel)
  }

  getTile() {
    return {
      x: Math.floor(this.x / TILESIZE),
      y: Math.floor(this.y / TILESIZE),
    }
  }

  placeBomb() {
    //add delay between placing multiple bombs
    if (Date.now() - this.lastBombPlace > this.bombPlacementDelay) {
      //Check if bomb exists in that tile
      for (let bomb of this.bombs) {
        if (bomb.x == this.getTile().x && bomb.y == this.getTile().y) {
          return false
        }
      }
      //check if bomb max is exceeded
      if (this.bombs.length < this.maxBomb) {
        //calculate bomb id
        let bomb_id = generateUniqId(this.bombs)
        //create html element for bomb
        let bomb = document.createElement("div")
        for (let entity of entities) {
          if (entity.playerModelName == "enemy") {
            entity.newCoordsAssigned = false
          }
        }
        const bombObj = new Bomb(
          this.getTile().x,
          this.getTile().y,
          bomb_id,
          bomb,
          0,
          this
        )
        //add bomb to gamescreen
        gameScreen.appendChild(bomb)
        this.lastBombPlace = Date.now()
        this.bombs.push(bombObj)
        
        // Set a timeout for the bomb to explode after 3 seconds
        //first animate bomb after 3 seconds explode
        let animationId = bombObj.animateBomb()
        
        bombObj.timeoutId = new Timer(() => {
          clearInterval(animationId)
          bombObj.explode(this.bombs) // Call the explode function after 3 seconds

          // remove the bomb from the array
          removeItemFromArray(this.bombs, bombObj)

          removeItemFromArray(bombGlobalArray, bombObj)
        }, 3000)
        //add bombs to global table
        bombGlobalArray.push(bombObj)
        return true
      } else {
        console.log("Bomb max limit exceeded!")
        return false
      }
    } else {
      return false
    }
  }
}
