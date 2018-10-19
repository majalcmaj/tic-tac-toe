package main
import (
	"github.com/gorilla/websocket"
)
type Player struct {
	nick string
	websocket *websocket.Conn
}