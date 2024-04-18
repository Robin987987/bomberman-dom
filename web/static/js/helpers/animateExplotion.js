import { TILESIZE, EXPLOSION } from "../config.js"

function explodeAnimation(objIn) {
  const { obj, piece, isLast } = objIn
  const center = [
    [64, 192],
    [224, 192],
    [64, 352],
    [224, 352],
  ]
  const vertical = [
    [64, 192 - TILESIZE],
    [224, 192 - TILESIZE],
    [64, 352 - TILESIZE],
    [224, 352 - TILESIZE],
  ]
  const horizontal = [
    [64 - TILESIZE, 192],
    [224 - TILESIZE, 192],
    [64 - TILESIZE, 352],
    [224 - TILESIZE, 352],
  ]
  const upLast = [
    [64, 192 - TILESIZE * 2],
    [224, 192 - TILESIZE * 2],
    [64, 352 - TILESIZE * 2],
    [224, 352 - TILESIZE * 2],
  ]
  const downLast = [
    [64, 192 + TILESIZE * 2],
    [224, 192 + TILESIZE * 2],
    [64, 352 + TILESIZE * 2],
    [224, 352 + TILESIZE * 2],
  ]
  const leftLast = [
    [64 - TILESIZE * 2, 192],
    [224 - TILESIZE * 2, 192],
    [64 - TILESIZE * 2, 352],
    [224 - TILESIZE * 2, 352],
  ]
  const rightLast = [
    [64 + TILESIZE * 2, 192],
    [224 + TILESIZE * 2, 192],
    [64 + TILESIZE * 2, 352],
    [224 + TILESIZE * 2, 352],
  ]

  let id
  if (piece === "up" && isLast) {
    id = animate(obj, upLast, EXPLOSION)
  } else if (piece === "down" && isLast) {
    id = animate(obj, downLast, EXPLOSION)
  } else if (piece === "left" && isLast) {
    id = animate(obj, leftLast, EXPLOSION)
  } else if (piece === "right" && isLast) {
    id = animate(obj, rightLast, EXPLOSION)
  } else if (piece === "up" || piece === "down") {
    id = animate(obj, vertical, EXPLOSION)
  } else if (piece === "left" || piece === "right") {
    id = animate(obj, horizontal, EXPLOSION)
  } else if (piece === "center") {
    id = animate(obj, center, EXPLOSION)
  }

  setTimeout(() => {
    stop(id)
    obj.style.backgroundPosition = ""
  }, EXPLOSION)
}

function animate(obj, arr, time) {
  let num = 1

  const interval = time / arr.length / 2

  let iterations = arr.length - 1
  let current = 0

  return setInterval(() => {
    let currentArr = arr[current]

    if (current <= iterations) {
      if (currentArr) {
        obj.style.backgroundPosition = `-${currentArr[0]}px -${currentArr[1]}px`
      }
    }

    if (current === iterations) {
      num = -1
    }

    if (current >= 0) {
      current += num
    }
  }, interval)
}

function stop(id) {
  clearTimeout(id)
}

function removeItemFromArray(bombArr, bomb){
  for(let i = 0; i < bombArr.length; i++){
    if (bombArr[i].id === bomb.id){
      bombArr.splice(i, 1)
      i--;
    }
  }
}

function generateUniqId(arr){
  let id = Math.floor(Math.random() * 100);
  while(true){
    if(!arr.includes(id)){
      return id;
    } else {
      id = Math.floor(Math.random() * 100)
    }
  }
}

export { explodeAnimation, removeItemFromArray, generateUniqId }
