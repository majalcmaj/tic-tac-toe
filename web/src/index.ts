import { Client } from "./remote/client";
import { BoardView } from "./board/view";
import { BoardModel } from "./board/model";
import { BoardController } from "./board/controller";
import GameEngine from "./game/game-engine";
import LocalGameEngine from "./game/local-game/local-game-engine";

window.onload = () => {
    const gameEngine: GameEngine = new LocalGameEngine()
    const boardView = new BoardView()
    const boardModel = new BoardModel()
    const boardController = new BoardController(gameEngine, boardModel, boardView)
    boardView.clickCallback = boardController.clickCallback
    // const comm = new Client()
}
