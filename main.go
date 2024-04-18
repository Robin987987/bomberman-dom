package main

import (
	api "bomberman/src"
)

const port = ":8080"

func main() {

	server := api.NewAPIServer(port)
	server.Run()

}
