package main

import (
	api "bomberman/src/api"
)

const port = ":8080"

func main() {

	server := api.NewAPIServer(port)
	server.Run()

}
