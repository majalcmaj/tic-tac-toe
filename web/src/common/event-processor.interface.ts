import { GameEvent } from "./game-event";

export default interface EventProcessor {
    processEvent(gameEvent: GameEvent): void
}