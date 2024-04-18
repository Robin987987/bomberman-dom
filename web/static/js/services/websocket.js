let socket = new WebSocket("ws://localhost:8080")

console.log("WTF")

console.log("Attempting Websocket Connection")

socket.onopen = () => {
  console.log("Succesful comnected ")
  socket.send("Hi From Client")
}

socket.onclose = (e) => {
  console.log("socket closed connection: ", e)
}

socket.onerror = (err) => {
  console.log("Socket error: ", err)
}

export { socket }
