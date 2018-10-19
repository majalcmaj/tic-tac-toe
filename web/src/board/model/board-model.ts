import EventProcessor from '../../common/event-processor.interface';
import { GameEvent, GameEventType, GameFinishedEvent, PlayerMoveEvent, PlayerTurnEvent } from '../../common/game-event';
import GameEngine from '../../game/game-engine';
import BoardController from '../controller/board-controller';

export default class BoardModel implements EventProcessor {

    set controller(controller: BoardController) {
        this._controller = controller
    }

    set gameEngine(gameEngine: GameEngine) {
        this._gameEngine = gameEngine
        this._gameEngine.registerEventProcessor(this)
    }

    fieldClicked(idx) {
        this._gameEngine.makeMove(idx)
    }

    processEvent(event: GameEvent): void {
        switch (event.type) {
            case GameEventType.MOVE_MADE: this.processPlayerMove(event as PlayerMoveEvent)
                break
            case GameEventType.PLAYER_TURN: this.processPlayerTurn(event as PlayerTurnEvent)
                break
            case GameEventType.GAME_FINISHED: this.processGameFinished(event as GameFinishedEvent)
                break
        }
    }

    processPlayerMove(event: PlayerMoveEvent) {
        this._controller.fieldHasChanged(event.fieldIdx, event.playerFigure)
    }
    processPlayerTurn(event: PlayerTurnEvent) {
        this._controller.noftifyPlayerTurn(event.playerFigure)
    }
    processGameFinished(event: GameFinishedEvent) {
        this._controller.gameFinished(event.playerFigure)
    }

    private _controller: BoardController;
    private _gameEngine: GameEngine;
}