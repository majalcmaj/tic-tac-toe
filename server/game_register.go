package main

const MAX_CONNECTIONS = 20

type IGameRegister interface {
	registerGame(creatorNick string, conn *Connection) (GameInfo, error)
	canJoinGame(idx int) bool
	joinGame(idx int, nick string, conn *Connection) error
	removeGame(idx int) error
}

type GameRegister struct {
}
