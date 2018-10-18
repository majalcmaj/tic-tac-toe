import EventProcessor from "../common/event-processor.interface";

export default interface GameEngine {
    resetGame(): boolean
    registerEventProcessor(eventProcessor: EventProcessor)
    makeMove(idx: number): void
}