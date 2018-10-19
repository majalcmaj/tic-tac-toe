import { Client } from "./remote/client";
import GameEngine from "./game/game-engine";
import LocalGameEngine from "./game/local-game/local-game-engine";
import { BoardView } from "./board/view/board-view";
import BoardModel from "./board/model/board-model";
import BoardController from "./board/controller/board-controller";

window.onload = () => {
    const gameEngine: GameEngine = new LocalGameEngine()
    const boardView = new BoardView()
    const boardModel = new BoardModel()
    const boardController = new BoardController(gameEngine, boardModel, boardView)
}
