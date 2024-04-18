import { TILESIZE } from "../config.js"

function animate(obj, start, end, y, cycle, turningBack = true) {
  let currentPosition = start
  const interval = cycle / ((end - start) / TILESIZE)
  let reverse = 1

  return setInterval(() => {
    if (obj && obj.style) {
      obj.style.backgroundPosition = `-${currentPosition}px -${y}px`
    }

    currentPosition += TILESIZE * reverse
    if (currentPosition < end) {
      if (turningBack) {
        reverse *= -1
      }
    }
  }, interval)
}

function stopAnimate(animid) {
  clearInterval(animid)
}

export { animate, stopAnimate }
