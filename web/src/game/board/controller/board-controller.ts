import GameEngine from "../../game/game-engine";
import BoardModel from "../model/board-model";
import { BoardView } from "../view/board-view";
import { Figure } from "../../common/figure";

export default class BoardController {
    constructor(private gameEngine: GameEngine, private model: BoardModel, private view: BoardView) {
        model.gameEngine = gameEngine
        model.controller = this
        view.controller = this
    }

    fieldClicked(idx: number): void {
        this.model.fieldClicked(idx)
    }

    fieldHasChanged(fieldIdx: number, player: Figure) {
        this.view.showMove(fieldIdx, player)
    }

    gameFinished(winningFigure: Figure): void {
        this.view.showGameWon(winningFigure)
    }

    noftifyPlayerTurn(playerFigure: Figure): void {
        this.view.displayPlayerTurn(playerFigure)
    }
}