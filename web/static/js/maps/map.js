import { collisionMapRefresh } from "../helpers/collisionDetection.js"
import { TILESIZE } from "../config.js"

const map = [
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 3, 0, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 3, 0, 3],
  [3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
  [3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3],
  [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
  [3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3],
  [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
  [3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3],
  [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
  [3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3],
  [3, 0, 3, 0, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 3, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 3, 0, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 3, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
]

const mapToRestart = JSON.parse(JSON.stringify(map));

const collisionMap = []
const entities = []

function generateMap(map) {
  for (let i = 0; i < map.length; i++) {
    //Create columns
    let column = document.createElement("div")
    for (let j = 0; j < map[i].length; j++) {
      //Create tiles in columns
      let tile = document.createElement("div")
      //Class for styling in css
      tile.className = "tile"
      tile.style.width = TILESIZE + "px"
      tile.style.height = TILESIZE + "px"

      switch (map[j][i]) {
        case 3:
          tile.classList.add("wall")
          tile.classList.add(`${j}-${i}`)
          break
        case 0:
          tile.classList.add("space")
          tile.classList.add(`${j}-${i}`)
          break
        case 2:
          tile.classList.add("breakable-wall")
          tile.classList.add(`${j}-${i}`)
          break
        default:
          break
      }

      //create collisionMap aswell
      collisionMapRefresh(map)
      column.appendChild(tile)
    }
    gameScreen.appendChild(column)
  }
}

export { map, collisionMap, entities, mapToRestart, generateMap }
