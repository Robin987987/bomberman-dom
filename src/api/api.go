package api

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
)

type APIServer struct {
	listenAddr string
}

type Error struct {
	Error string `json:"error"`
}

type Users struct {
	Users []User `json:"users"`
}

type User struct {
	Name  string `json:"name"`
	Time  string `json:"time"`
	Score int    `json:"score"`
}

func NewAPIServer(listenAddr string) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
	}
}

var game = template.Must(template.ParseFiles("./web/index.html"))

func gameHandler(w http.ResponseWriter, r *http.Request) {
	game.Execute(w, nil)
}

func (s *APIServer) Run() {
	router := http.NewServeMux()

	fs := http.FileServer(http.Dir("./web/static"))
	router.Handle("/static/", http.StripPrefix("/static", fs))
	router.HandleFunc("/", gameHandler)

	router.HandleFunc("/api/scoreboard", s.makeHTTPHandleFunc(s.handleData))

	fmt.Println("API service started on port: ", s.listenAddr)

	http.ListenAndServe(s.listenAddr, router)
}

func (s *APIServer) handleData(w http.ResponseWriter) error {
	return s.handleGetData(w)
}

func (s *APIServer) handleGetData(w http.ResponseWriter) error {
	jsonFile, err := os.Open("./backend/database/scoreboard.json")
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, Error{Error: "Bad request"})
	}
	defer jsonFile.Close()

	byteValue, err := io.ReadAll(jsonFile)
	if err != nil {
		return fmt.Errorf("Error reading JSON file: %v", err)
	}

	var users Users
	err = json.Unmarshal(byteValue, &users)
	if err != nil {
		return fmt.Errorf("Error unmarshalling JSON data: %v", err)
	}

	return WriteJSON(w, http.StatusOK, users)
}

func (s *APIServer) makeHTTPHandleFunc(f func(http.ResponseWriter) error) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(w); err != nil {
			WriteJSON(w, http.StatusBadRequest, Error{Error: err.Error()})
		}
	}
}

type ApiError struct {
	Error string `json:"error"`
}

func WriteJSON(w http.ResponseWriter, status int, v interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}
