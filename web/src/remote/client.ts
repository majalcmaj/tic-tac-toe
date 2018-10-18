import { GameEvent, GameEventType, FieldChangeEvent } from "./types";

export class Client {
    ws: WebSocket;
    constructor() {
        this.ws = new WebSocket("ws://localhost:8080")

        this.ws.onmessage = (event) => {
            console.log(`Received: ${event.data}`)
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.sendFieldChanged = this.sendFieldChanged.bind(this);
    }

    sendMessage(event: GameEvent) {
        if (event.type == GameEventType.CLICK) {
            this.sendFieldChanged((event as FieldChangeEvent).fieldIdx);
        }
    }

    sendFieldChanged(idx: number) {
        this.ws.send(JSON.stringify({idx: idx}));
    }
}