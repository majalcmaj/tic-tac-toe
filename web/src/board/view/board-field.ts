import { Figure } from "../../common/figure";
import tac_img from "../../../images/tac.svg";
import tic_img from "../../../images/tic.svg";

export default class BoardField {
    constructor(private clickCallback: () => void) {
        this._htmlElement = document.createElement("div");
        this._htmlElement.onclick = this.handleClick.bind(this);
    }

    get htmlElement() {
        return this._htmlElement
    }

    update(figure: Figure) {
        switch (figure) {
            case Figure.TIC: this.drawTic(); break
            case Figure.TAC: this.drawTac(); break
        }
    }

    private handleClick(event: Event) {
        event.stopPropagation()
        this.clickCallback()
    }

    private drawTic() {
        this._htmlElement.style.background = `url(${tic_img})`
    }

    private drawTac() {
        this._htmlElement.style.background = `url(${tac_img})`
    }

    private _htmlElement: HTMLElement
}