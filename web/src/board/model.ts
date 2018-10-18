import { Figure } from '../common/figure';
import Observable from "../common/observable";
import { BoardView } from "./view";
import * as Const from "../common/const";
import GameEngine from '../game/game-engine';
import Observer from '../common/observer';
import EventProcessor from '../common/event-processor.interface';
import { GameEvent, GameEventType, PlayerMoveEvent, PlayerTurnEvent, GameFinishedEvent } from '../common/game-event';
import { BoardController } from './controller';

export class FieldModel {
    constructor(private idx: number) { }
    private _figure: Figure = Figure.NONE;

    set figure(figure: Figure) {
        this._figure = figure
    }

    get figure() {
        return this._figure
    }

    get filled() {
        return this._figure != Figure.NONE
    }
}

export class BoardModel implements EventProcessor {

    constructor() {
        this.observableFields = new Array<Observable<FieldModel>>(Const.FIELDS_COUNT);
        for (let i = 0; i < Const.FIELDS_COUNT; i++) {
            const obsField = new Observable(new FieldModel(i));
            this.observableFields[i] = obsField;
        }
    }

    set controller(controller: BoardController) {
        this._controller = controller
    }

    set gameEngine(gameEngine: GameEngine) {
        this._gameEngine = gameEngine
        this._gameEngine.registerEventProcessor(this)
    }

    set fieldObservers(observers: Array<Observer<FieldModel>>) {
        observers.forEach((observer, idx) => {
            this.observableFields[idx].registerObserver(observer)
        });
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
        const field = this.observableFields[event.fieldIdx]
        field.obj.figure = event.playerFigure
        field.notifyAll()
    }
    processPlayerTurn(event: PlayerTurnEvent) {
        this._controller.noftifyPlayerTurn(event.playerFigure)
    }
    processGameFinished(event: GameFinishedEvent) {
        this._controller.gameFinished(event.playerFigure)
    }

    private observableFields: Array<Observable<FieldModel>>;
    private playerTic = true
    private _gameWonCallback: () => void;
    private _controller: BoardController;
    private _gameEngine: GameEngine;
}