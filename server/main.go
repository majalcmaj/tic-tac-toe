package main

import (
	"encoding/json" // "flag"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

type Message struct {
	Idx int `json:"idx"`
}

type RegistrationMessage struct {
	Nick string `json:"nick"`
}

type JoinMessage struct {
	Nick string `json:"nick"`
}

type Connection struct {
	w http.ResponseWriter
	r *http.Request
}

func runWs(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{}
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade: ", err)
		return
	}

	defer c.Close()

	var msg Message
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("Read: ", err)
			break
		}

		json.Unmarshal([]byte(message), &msg)

		log.Printf("Index: %d", msg.Idx)
		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("Write: ", err)
			break
		}
	}

}

// func main() {
// 	var addr = flag.String("addr", "0.0.0.0:8080", "http service address")
// 	http.HandleFunc("/", runWs)
// 	log.Fatal(http.ListenAndServe(*addr, nil))
// }


type GameInfo struct {
	Index int
}

type Server struct {
	wsUpgrader   websocket.Upgrader
	router       *mux.Router
	gameRegister IGameRegister
}

func NewServer(gameRegister IGameRegister) *Server {
	router := mux.NewRouter()
	result := &Server{
		wsUpgrader:   websocket.Upgrader{},
		router:       router,
		gameRegister: gameRegister,
	}
	result.wsUpgrader.CheckOrigin = func(r *http.Request) bool { return true }
	result.SetupRouter()
	return result
}

func (this *Server) createGame(w http.ResponseWriter, r *http.Request) {
	var registrationMessage RegistrationMessage
	if err := json.NewDecoder(r.Body).Decode(&registrationMessage); err == nil {
		if gameInfo, err := this.gameRegister.registerGame(registrationMessage.Nick, &Connection{w, r}); err != nil {
			w.WriteHeader(http.StatusCreated)
		} else {
			// TODO: Handle creation error?
			log.Println("Failure: ", err)
			w.WriteHeader(http.StatusInternalServerError)
		}
	} else {
		log.Println("Got malformed JSON: ", err)
		w.WriteHeader(http.StatusBadRequest)
	}
}

func (this *Server) joinGame(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var registrationMessage RegistrationMessage
	if err := json.NewDecoder(r.Body).Decode(&registrationMessage); err == nil {
		if idx, err := strconv.Atoi(params["game_id"]); err == nil {
			if err := this.gameRegister.joinGame(idx, registrationMessage.Nick, &Connection{w, r}); err != nil {
				w.WriteHeader(http.StatusCreated)
			} else {
				// TODO: Handle joining error?
				log.Println("Failure: ", err)
				w.WriteHeader(http.StatusInternalServerError)
			}
		} else {
			log.Println("Failure: ", err)
			w.WriteHeader(http.StatusBadRequest)
		}
	} else {
		log.Println("Got malformed JSON: ", err)
		w.WriteHeader(http.StatusBadRequest)
	}
}

func (this *Server) SetupRouter() {
	this.router.HandleFunc("/game", this.createGame).Methods("POST")
	this.router.HandleFunc("/game/{game_id}/players", this.joinGame).Methods("POST")
}

func (this *Server) ServeForever(listenOn string) error {
	return http.ListenAndServe(listenOn, this.router)
}

func main() {
	server := NewServer()
	log.Fatal(server.ServeForever(":8080"))
}
