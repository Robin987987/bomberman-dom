import { map, entities, generateMap, mapToRestart } from "./maps/map.js"
import { Player } from "./classes/player.js"
import { collisionCheck } from "./helpers/collisionDetection.js"
import { TILESIZE, SPRITES } from "./config.js"
import { animate, stopAnimate } from "./helpers/animate.js"
import { Enemy } from "./classes/enemy.js"
import { bombGlobalArray } from "./classes/bomb.js"
import { pauseMenu, startMenu } from "./components/menu.js"
import {
  instructionsBoard,
  removeInstructionsBoard,
} from "./components/instructions.js"
import { gameClock } from "./helpers/timer.js"
//gameScreen 680 x 680px
const gameScreen = document.getElementById("gameScreen")

const time = document.getElementById("time")
const playerLives = document.querySelector("#heart")

const playerDisplayScore = document.querySelector("#score")

gameScreen.style.width = map.length * TILESIZE
gameScreen.style.height = map.length * TILESIZE

let player, enemy, enemy2, enemy3;

let gameRunning = false

let keys = {}

//player animation
let animations = {
  right: false,
  left: false,
  up: false,
  down: false,
}
let rightAnimId, leftAnimId, upAnimId, downAnimId

//Runs before game loop --> initializes everything
function initGame() {
  player = new Player(TILESIZE, TILESIZE)
  playerLives.innerHTML = player.lives
  playerDisplayScore.textContent = player.score
  enemy = new Enemy(480, 480)
  enemy2 = new Enemy(480, 32);
  enemy3 = new Enemy(480, 64);
  entities.push(player)
  entities.push(enemy)
  entities.push(enemy2);
  entities.push(enemy3);
  startMenu(gameRunner)
  generateMap(mapToRestart)
  instructionsBoard()
  renderEntities()
  addPathingToEnemy();
}

initGame()

//animation stuff

document.addEventListener("keydown", (e) => {
  if (!gameRunning) {
    return
  }
  keys[e.key] = true
  if (e.key == "d" && !animations.right) {
    rightAnimId = animate(
      player.playerModel,
      SPRITES.player.right.startPosX,
      SPRITES.player.right.endPosX,
      SPRITES.player.right.Y,
      200
    )
    animations.right = true
  } else if (e.key === "a" && !animations.left) {
    leftAnimId = animate(
      player.playerModel,
      SPRITES.player.left.startPosX,
      SPRITES.player.left.endPosX,
      SPRITES.player.left.Y,
      200
    )
    animations.left = true
  } else if (e.key === "w" && !animations.up) {
    upAnimId = animate(
      player.playerModel,
      SPRITES.player.up.startPosX,
      SPRITES.player.up.endPosX,
      SPRITES.player.up.Y,
      200
    )
    animations.up = true
  } else if (e.key === "s" && !animations.down) {
    downAnimId = animate(
      player.playerModel,
      SPRITES.player.down.startPosX,
      SPRITES.player.down.endPosX,
      SPRITES.player.down.Y,
      200
    )
    animations.down = true
  }

  if (e.key === "p") {
    pauseMenu(gameRunner)
  }
})

document.addEventListener("keyup", (e) => {
  if (!gameRunning) {
    return
  }
  keys[e.key] = false
  if (e.key == "d") {
    stopAnimate(rightAnimId)
    animations.right = false
  } else if (e.key == "a") {
    stopAnimate(leftAnimId)
    animations.left = false
  } else if (e.key == "w") {
    stopAnimate(upAnimId)
    animations.up = false
  } else if (e.key == "s") {
    stopAnimate(downAnimId)
    animations.down = false
  }
  //check for idle status;
  for (let item of Reflect.ownKeys(keys)) {
    if (!keys[item]) {
      player.direction = "idle"
    }
  }
})

//Main game loop

function main() {
  if (player.lives == 0) {
    gameRunning = false
  }
  if (!gameRunning) {
    return
  }

  //handle timer
  gameClock(time)

  //ENEMY MOVEMENT PART
  for(let entity of entities){
    if(entity.playerModelName == "enemy"){
      entity.enemyAI(player);
    }
  }
  //remove enemy debugging shit
  // removeEnemyDebuggingPathing();

  //Printout the enemy movement thing
  // enemyPathDebugging();

  //PLAYER MOVEMENT
  handlePlayerMovement()

  //Handle bombs
  if (keys[" "]) {
    player.placeBomb()
  }

  requestAnimationFrame(main)
}

function gameRunner(param) {
  gameRunning = param
  requestAnimationFrame(main)
}

function restartGame() {
  entities.splice(0, entities.length)
  //remove the map and old players from the screen
  const divToRemove = gameScreen.querySelectorAll("div")
  divToRemove.forEach((div) => {
    if (div.id != "menu") {
      div.remove()
    }
  })
  //clear bombs
  for (let bomb of bombGlobalArray) {
    bomb.timeoutId.clear()
  }
  bombGlobalArray.splice(0, bombGlobalArray.length)
  //restart the map
  for (let i = 0; i < mapToRestart.length; i++) {
    for (let j = 0; j < mapToRestart[i].length; j++) {
      map[i][j] = mapToRestart[i][j]
    }
  }
  removeInstructionsBoard()
  gameClock(time, true)
  initGame()
}

function removeEnemyDebuggingPathing() {
  const deleteRedPath = document.getElementsByClassName("red")
  for (let element of deleteRedPath) {
    element.classList.remove("red")
    element.style.backgroundColor = ""
  }
  const colorToRemove = document.getElementsByClassName("currentTarget")[0]
  if (colorToRemove) {
    colorToRemove.style.backgroundColor = ""
    colorToRemove.classList.remove("currentTarget")
  }
}

function enemyPathDebugging() {
  for (let tile of enemy.pathToCoordinates) {
    const tileToColor = document.getElementsByClassName(
      `${tile[1]}-${tile[0]}`
    )[0]
    tileToColor.style.backgroundColor = "red"
    tileToColor.classList.add("red")
  }
  const currentTargetToColor = document.getElementsByClassName(
    `${enemy.currentTarget[1]}-${enemy.currentTarget[0]}`
  )[0]
  currentTargetToColor.classList.add("currentTarget")
  currentTargetToColor.style.backgroundColor = "purple"
}

function renderEntities() {
  for (let entity of entities) {
    entity.renderPlayer(gameScreen)
  }
}

function handlePlayerMovement() {
  if (keys["d"]) {
    if (collisionCheck(player.x + player.speed, player.y)) {
      player.x += player.speed
      player.direction = "right"
      //animate
    } else {
      //has to check where to calc to go up or down
      //and only move if its like 60% already there and there is no full block in front of the character

      //down
      if (
        player.y - player.getTile().y * TILESIZE >
        Math.floor(TILESIZE * 0.6)
      ) {
        if (
          collisionCheck(player.x, player.y + player.speed) &&
          map[player.getTile().y + 1][player.getTile().x + 1] == 0
        ) {
          player.y += player.speed
        }
        //up
      } else if (
        player.y - player.getTile().y * TILESIZE <
        Math.round(TILESIZE * 0.4)
      ) {
        if (
          collisionCheck(player.x, player.y - player.speed) &&
          map[player.getTile().y][player.getTile().x + 1] == 0
        ) {
          player.y -= player.speed
        }
      }
    }
  } else if (keys["a"]) {
    if (collisionCheck(player.x - player.speed, player.y)) {
      player.x -= player.speed
      player.direction = "left"
    } else {
      //CUT CORNERS MOVEMENT COMMENTED ON THE D LETTER ALREADY
      //down
      if (
        player.y - player.getTile().y * TILESIZE >
        Math.floor(TILESIZE * 0.6)
      ) {
        if (
          collisionCheck(player.x, player.y + player.speed) &&
          map[player.getTile().y - 1][player.getTile().x - 1] == 0
        ) {
          player.y += player.speed
        }
        //up
      } else if (
        player.y - player.getTile().y * TILESIZE <
        Math.round(TILESIZE * 0.4)
      ) {
        if (
          collisionCheck(player.x, player.y - player.speed) &&
          map[player.getTile().y][player.getTile().x - 1] == 0
        ) {
          player.y -= player.speed
        }
      }
    }
  } else if (keys["s"]) {
    if (collisionCheck(player.x, player.y + player.speed)) {
      player.y += player.speed
      player.direction = "down"
    } else {
      //HAVE TO FLIP THE LOGIC FROM DOWN TO RIGHT AND UP TO LEFT
      //right
      if (
        player.x - player.getTile().x * TILESIZE >
        Math.floor(TILESIZE * 0.6)
      ) {
        if (
          collisionCheck(player.x + player.speed, player.y) &&
          map[player.getTile().y + 1][player.getTile().x + 1] == 0
        ) {
          player.x += player.speed
        }
        //left
      } else if (
        player.y - player.getTile().y * TILESIZE <
        Math.round(TILESIZE * 0.4)
      ) {
        if (
          collisionCheck(player.x - player.speed, player.y) &&
          map[player.getTile().y + 1][player.getTile().x] == 0
        ) {
          player.x -= player.speed
        }
      }
    }
  } else if (keys["w"]) {
    if (collisionCheck(player.x, player.y - player.speed)) {
      player.y -= player.speed
      player.direction = "up"
    } else {
      //right
      if (
        player.x - player.getTile().x * TILESIZE >
        Math.floor(TILESIZE * 0.6)
      ) {
        if (
          collisionCheck(player.x + player.speed, player.y) &&
          map[player.getTile().y - 1][player.getTile().x + 1] == 0
        ) {
          player.x += player.speed
        }
        //left
      } else if (
        player.y - player.getTile().y * TILESIZE <
        Math.round(TILESIZE * 0.4)
      ) {
        if (
          collisionCheck(player.x - player.speed, player.y) &&
          map[player.getTile().y - 1][player.getTile().x] == 0
        ) {
          player.x -= player.speed
        }
      }
    }
  }

  //Actually move the player
  player.playerModel.style.left = player.x + "px"
  player.playerModel.style.top = player.y + "px"
}

function addPathingToEnemy(){
  for(let entity of entities){
    if (entity.playerModelName == "enemy"){
      entity
      .findPath(
        map,
        entity.getTile().y,
        entity.getTile().x,
        player.getTile().y,
        player.getTile().x
      )
      .forEach((val) => entity.pathToCoordinates.push([val.col, val.row]))
    }
  }
}

export { gameRunner, restartGame }
