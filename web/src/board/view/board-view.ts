import BoardController from "../controller/board-controller";
import BoardField from "./board-field";
import { Figure } from "../../common/figure";
import { FIELDS_COUNT } from "../../common/const";

export class BoardView {


    constructor() {
        const container = document.getElementById("board-placeholder")
        const playerTurnInfo = this.createPlayerTurnInfo(container);
        this.playerTurnInfo = playerTurnInfo
        this.drawBoard(container);
    }

    set controller(controller: BoardController) {
        this._controller = controller
    }

    get fields(): Array<BoardField> {
        return this._fields
    }

    showMove(fieldIdx: number, player: Figure) {
        this.fields[fieldIdx].update(player)
    }

    showGameWon(figure: Figure): any {
        switch (figure) {
            case Figure.NONE:
                alert("Game finished with no winners!")
                break
            case Figure.TIC:
            case Figure.TAC:
                alert(`Game finished - ${Figure.toString(figure)} won!`)
                break
        }
    }

    displayPlayerTurn(playerFigure: Figure): void {
        this.playerTurnInfo.innerText = `Current player is ${Figure.toString(playerFigure)}`;
    }

    private createPlayerTurnInfo(container: HTMLElement) {
        const playerTurnInfo = document.createElement("p");
        playerTurnInfo.className = "turn-info";
        container.appendChild(playerTurnInfo);
        return playerTurnInfo;
    }

    private drawBoard(container: HTMLElement) {
        for (let i = 0; i < 9; i++) {
            const field = new BoardField(this.clickCallbackForIndex(i));
            this._fields[i] = field;
            container.appendChild(field.htmlElement);
        }
    }

    private clickCallbackForIndex(fieldIdx: number): () => void {
        const that = this;
        return () => {
            that._controller.fieldClicked(fieldIdx)
        }
    }

    private _fields = new Array<BoardField>(FIELDS_COUNT);
    private _controller: BoardController;
    private playerTurnInfo: HTMLParagraphElement;
}