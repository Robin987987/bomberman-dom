const game = document.querySelector(".game")

let instructions

const gameGoal = "OBJECTIVE: Kill the enemy before he reaches you"

function instructionsBoard() {
  instructions = document.createElement("div")
  instructions.classList.add("instructions")

  const div1 = document.createElement("div")
  const div2 = document.createElement("div")
  div2.style = "display: flex ;flex-direction: column; "

  const div3 = document.createElement("div")

  const img1 = document.createElement("img")
  const img2 = document.createElement("img")
  const img3 = document.createElement("img")

  const p1 = document.createElement("p")
  p1.innerText = "move"
  const p2 = document.createElement("p")
  p2.innerText = "bomb"

  const p4 = document.createElement("p")
  p4.innerText = "pause"

  const p3 = document.createElement("p")
  p3.innerText = gameGoal

  img1.src = "./static/assets/wasd.png"
  img1.alt = "wasd"
  img2.src = "./static/assets/space.png"
  img2.alt = "space"

  img3.src = "./static/assets/p.png"
  img3.alt = "p"
  img3.style.width = "20px"

  div1.appendChild(img1)
  div1.appendChild(p1)

  div2.appendChild(img2)
  div2.appendChild(p2)
  div2.appendChild(img3)
  div2.appendChild(p4)

  div3.appendChild(p3)

  instructions.appendChild(div1)
  instructions.appendChild(div2)
  instructions.appendChild(div3)

  game.appendChild(instructions)
}

function removeInstructionsBoard() {
  instructions.remove()
}

export { instructionsBoard, removeInstructionsBoard }
