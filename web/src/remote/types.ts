export class GameEvent {
    constructor(readonly type: GameEventType) { }
}

export class FieldChangeEvent extends GameEvent {
    constructor(readonly fieldIdx: number) {
        super(GameEventType.CLICK)
    }
}

export enum GameEventType {
    CLICK
}

