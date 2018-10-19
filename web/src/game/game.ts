import { BoardView } from "./board/view/board-view";
import BoardModel from "./board/model/board-model";
import BoardController from "./board/controller/board-controller";
import GameEngine from "./engine/game-engine";
import LocalGameEngine from "./engine/local/local-game-engine";

window.onload = () => {
    const gameEngine: GameEngine = new LocalGameEngine()
    const boardView = new BoardView()
    const boardModel = new BoardModel()
    const boardController = new BoardController(gameEngine, boardModel, boardView)
}
