export enum Figure {
    NONE = 0,
    TIC = 1,
    TAC = 2
}

export namespace Figure {
    export function toString(figure: Figure): string {
        switch(figure) {
            case Figure.NONE: return "None"
            case Figure.TIC: return "TIC"
            case Figure.TAC: return "TAC"
        }
    }
}