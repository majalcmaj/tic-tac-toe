import { BoardModel } from "./model";
import { BoardView } from "./view";
import { Figure } from "../common/figure";
import GameEngine from "../game/game-engine";

export class BoardController {
    constructor(private gameEngine: GameEngine, private model: BoardModel, private view: BoardView) {
        this.clickCallback = this.clickCallback.bind(this)
        model.gameEngine = gameEngine
        model.controller = this
        model.fieldObservers = view.fields
    }

    clickCallback(idx: number): void {
        this.model.fieldClicked(idx)
    }

    gameFinished(winningFigure: Figure): void {
        this.view.gameWonCallback(winningFigure)
    }
    noftifyPlayerTurn(playerFigure: Figure): void {
        this.view.displayPlayerTurn(playerFigure)
    }
}