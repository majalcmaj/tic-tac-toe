import { Figure } from "./figure";

export enum GameEventType {
    PLAYER_TURN,
    MOVE_MADE,
    GAME_FINISHED
}

export class GameEvent {
    constructor(public readonly type: GameEventType) { }
}

export class PlayerTurnEvent extends GameEvent{
    constructor(public readonly playerFigure: Figure) {
        super(GameEventType.PLAYER_TURN)
    }
}

export class PlayerMoveEvent extends GameEvent{
    constructor(public readonly playerFigure: Figure, public readonly fieldIdx: number) {
        super(GameEventType.MOVE_MADE)
    }
}

export class GameFinishedEvent extends GameEvent{
    constructor(public readonly playerFigure: Figure) {
        super(GameEventType.GAME_FINISHED)
    }
}