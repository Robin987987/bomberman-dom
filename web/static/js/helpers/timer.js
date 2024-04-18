
export class Timer {
    constructor(callback, delay) {
        this.callback = callback
        this.remaining = delay
        this.resume()
    }
    resume = () => {
        this.start = new Date().getTime()
        this.clear()
        this.timerID = setTimeout(this.callback, this.remaining)
    }
    clear = () => {
        clearTimeout(this.timerID)
    }
    pause = () => {
        clearTimeout(this.timerID)
        this.remaining -= new Date().getTime() - this.start
    }
}

let seconds = 0;
let minutes = 0;
let lastTime = Date.now();
let timeValue = '00:00';

export function gameClock(timeHtmlElement, restart = false){
    if(restart){
        seconds = 0;
        minutes = 0
        timeValue = '00:00';
        lastTime = Date.now();
    }
    if (Date.now() - lastTime > 1000) {
        seconds++
        if (seconds == 60) {
          minutes++
          seconds = 0
        }
        lastTime = Date.now()
        timeValue = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    timeHtmlElement.innerText = timeValue
}