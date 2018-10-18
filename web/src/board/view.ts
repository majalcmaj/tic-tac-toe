import Observer from "../common/observer";
import { FieldModel } from "./model";
import Observable from "../common/observable";
import { FIELDS_COUNT } from "../common/const";

import tic_img from "../../images/tic.svg"
import tac_img from "../../images/tac.svg"
import { Figure } from "../common/figure";

class BoardField implements Observer<FieldModel>{
    constructor(idx: number) {
        this.element = document.createElement("div");
        this.element.onclick = this.handleClick.bind(this);
        this.idx = idx
    }

    set clickCallback(clickCallback: (idx: number) => void) {
        this._clickCallback = clickCallback
    }

    handleClick() {
        this._clickCallback(this.idx)
    }

    update(field: FieldModel) {
        switch (field.figure) {
            case Figure.TIC: this.drawTic(); break
            case Figure.TAC: this.drawTac(); break
        }
    }

    private drawTic() {
        this.element.style.background = `url(${tic_img})`
    }

    private drawTac() {
        this.element.style.background = `url(${tac_img})`
    }

    element: HTMLElement
    idx: number
    _clickCallback: (idx: number) => void
}

export class BoardView {
    constructor() {
        const container = document.getElementById("board-placeholder")
        const playerTurnInfo = this.createPlayerTurnInfo(container);
        this.playerTurnInfo = playerTurnInfo
        this.drawBoard(container);
    }

    private createPlayerTurnInfo(container: HTMLElement) {
        const playerTurnInfo = document.createElement("p");
        playerTurnInfo.className = "turn-info";
        container.appendChild(playerTurnInfo);
        return playerTurnInfo;
    }

    private drawBoard(container: HTMLElement) {
        for (let i = 0; i < 9; i++) {
            const field = new BoardField(i);
            this._fields[i] = field;
            container.appendChild(field.element);
        }
    }

    set clickCallback(clickCallback: (idx: number) => void) {
        this._fields.forEach(f => f.clickCallback = clickCallback)
    }

    get fields(): Array<BoardField> {
        return this._fields
    }

    gameWonCallback(figure: Figure): any {
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
    private _fields = new Array<BoardField>(FIELDS_COUNT);
    playerTurnInfo: HTMLParagraphElement;

}