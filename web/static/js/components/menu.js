import { restartGame } from "../main.js"
import { bombGlobalArray } from "../classes/bomb.js"

const menu = document.querySelector("#menu")
let menuScreen
const header = document.createElement("h1")
// const tileEditor = document.createElement("button")
const continueButton = document.createElement("button")
const restartButton = document.createElement("button")
const startButton = document.createElement("button")

startButton.innerText = "Start Game"
// tileEditor.innerText = "Tile Editor"
continueButton.innerText = "Continue"
restartButton.innerText = "Restart"

function renderMenu() {
  // menu = document.querySelector("#menu");
  menuScreen = document.createElement("div")
  menuScreen.classList.add("menu")
  menuScreen.style.display = "flex"
  menu.appendChild(menuScreen)
  const img = document.createElement("img")
  img.src =
    "https://ssb.wiki.gallery/images/thumb/f/f4/Bomberman_logo.png/1200px-Bomberman_logo.png"
  img.alt = "logo"
  img.classList.add("logo")
  menuScreen.appendChild(img)
}

function startMenu(callback) {
  renderMenu()

  function remove() {
    callback(true)
    menuScreen.remove()
  }

  startButton.onclick = remove

  header.innerText = "Welcome"
  menuScreen.appendChild(header)
  menuScreen.appendChild(startButton)
  // menuScreen.appendChild(tileEditor)
}

function pauseMenu(callback) {
  callback(false)

  renderMenu()
  //Pause all the bombs
  for (let bomb of bombGlobalArray) {
    bomb.timeoutId.pause()
  }

  function remove() {
    callback(true)
    menuScreen.remove()
    //Unpause all the bombs
    for (let bomb of bombGlobalArray) {
      bomb.timeoutId.resume()
    }
  }

  continueButton.onclick = remove

  restartButton.onclick = () => {
    restartGame()
    // renderMenu();
    remove()
  }

  header.innerText = "Pause"
  menuScreen.appendChild(header)
  menuScreen.appendChild(continueButton)
  menuScreen.appendChild(restartButton)
}

function goMenu(callback, msg) {
  callback(false)
  renderMenu()

  function remove() {
    callback(true)
    menuScreen.remove()
  }

  restartButton.onclick = () => {
    restartGame()
    remove()
  }

  header.innerText = msg ? msg : "Game Over"
  menuScreen.appendChild(header)
  menuScreen.appendChild(restartButton)
}

export { menu, startMenu, pauseMenu, goMenu }
