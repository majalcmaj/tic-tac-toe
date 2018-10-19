import GameEngine from "../game-engine";
import { Figure } from "../../common/figure";
import { FIELDS_COUNT } from "../../common/const";
import { FieldChangeEvent } from "../../remote/types";
import EventProcessor from "../../common/event-processor.interface";
import { PlayerTurnEvent, GameEvent, GameFinishedEvent, PlayerMoveEvent } from "../../common/game-event";
import { TicTacToeLogic } from "./tictactoe-logic";

export default class LocalGameEngine implements GameEngine {
    logic: TicTacToeLogic;
    constructor() {
        this.resetGame()
    }

    resetGame(): boolean {
        this.logic = new TicTacToeLogic();
        return true
    }

    makeMove(idx: number): void {
        if (this.logic.isMoveAvailable(idx)) {
            this.logic.move(idx)
            this.notifyMoveMade(this.logic.currentPlayer, idx)
            const gameFinished = this.logic.isGameFinished()
            if (gameFinished) {
                this.notifyGameFinished(this.logic.gameResult);
            } else {
                this.notifyPlayerTurn()
            }
        }
    }

    registerEventProcessor(eventProcessor: EventProcessor) {
        this.eventProcessor = eventProcessor
        this.notifyPlayerTurn();
    }

    private notifyMoveMade(player: Figure, idx: number) {
        this.triggerEvent(new PlayerMoveEvent(player, idx))
    }

    private notifyPlayerTurn() {
        this.triggerEvent(new PlayerTurnEvent(this.logic.playerTurn));
    }

    private notifyGameFinished(figure: Figure) {
        this.triggerEvent(new GameFinishedEvent(figure))
    }

    triggerEvent(event: GameEvent): void {
        setTimeout(() => this.eventProcessor.processEvent(event), 0);
    }

    private eventProcessor: EventProcessor;
}