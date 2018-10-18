import { Figure } from "../../common/figure";
import { FIELDS_COUNT } from "../../common/const";

export class TicTacToeLogic {
    constructor() {
        this.gameState = new Array<Figure>(FIELDS_COUNT)
        this.gameState.fill(Figure.NONE)
    }

    isMoveAvailable(idx: number) {
        return !this.gameFinished && this.gameState[idx] == Figure.NONE
    }

    move(idx: number): void {
        this.setPlayerAndTurn()
        this.gameState[idx] = this._currentPlayer
        this.movesCounter++
        this.playerIsTic = !this.playerIsTic
    }
    isGameFinished(): boolean {
        if (this.movesCounter >= FIELDS_COUNT) {
            this._gameResult = Figure.NONE
            return true
        } else {
            return this.checkForWin()
        }
    }

    get playerTurn() {
        return this._playerTurn
    }

    get currentPlayer() {
        return this._currentPlayer
    }

    get gameResult(): Figure {
        return this._gameResult
    }

    private setPlayerAndTurn() {
        [this._playerTurn, this._currentPlayer] = this.playerIsTic ?
            [Figure.TAC, Figure.TIC] : [Figure.TIC, Figure.TAC]
    }

    private checkForWin(): boolean {
        const figuresMap = this.gameState.map(fig => fig === this._currentPlayer)
        for (let move of this.winningMoves) {
            if (this.winningMovePresent(move, figuresMap)) {
                this._gameResult = this._currentPlayer
                return true
            }
        }
        return false
    }

    private winningMovePresent(move: Array<number>, figuresMap): any {
        return figuresMap[move[0]] &&
            figuresMap[move[1]] &&
            figuresMap[move[2]]
    }

    private winningMoves: Array<Array<number>> = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    private movesCounter = 0
    private gameFinished = false
    private gameState: Array<Figure>
    private playerIsTic = true
    private _gameResult: Figure = null
    private _currentPlayer: Figure;
    private _playerTurn = Figure.TIC;
}