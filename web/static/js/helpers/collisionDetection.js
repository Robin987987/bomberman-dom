import { collisionMap } from "../maps/map.js";
import { TILESIZE, PLAYERSIZE } from "../config.js";

export function collisionCheck(playerx, playery) {
    for (let tile of collisionMap) {
      //  X1-tile[0]  Y1-tile[1] X2-tile[2] Y-2tile[3]
      if (
        playerx < tile[0] + TILESIZE &&
        playerx + PLAYERSIZE > tile[0] &&
        playery < tile[1] + TILESIZE &&
        playery + PLAYERSIZE > tile[1]
      ) {
        return false
      }
    }
    return true
}

export function collisionMapRefresh(map){
    //remove old map to replace it with new one
    collisionMap.splice(0, collisionMap.length);
    
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            if (map[j][i] !== 0) {
                collisionMap.push([
                  i * TILESIZE,
                  j * TILESIZE,
                  i * TILESIZE + TILESIZE,
                  j * TILESIZE + TILESIZE,
                ])
              }
        }
    }
    console.log(collisionMap)
}
  