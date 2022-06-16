import { CellColor } from "./TYPES";

type ElementColors = {
    apple: CellColor;
    empty: CellColor;
    head: CellColor;
    tail: CellColor;
    mine: CellColor;
}

export const BOARD_SIZE = {
    x: 20,
    y: 20
}
export const STARTING_MOVE_REFRESH = 600;

export const SNAKE_SPEED_MULTIPLIER = 1.25;

export const ELEMENTS_COLORS: ElementColors = {
    apple: 'green',
    empty: 'darkgray',
    head: 'red',
    tail: 'blue',
    mine: 'black'
}

export const APPLES_TO_SPEED_UP = 5

export const FORBIDDEN_DIRECTIONS = {
    "ArrowLeft": "ArrowRight",
    "ArrowRight": "ArrowLeft",
    "ArrowUp": "ArrowDown",
    "ArrowDown": "ArrowUp"
}

export const APPLE_CHANGES_POSITION_TIME = 10000

export const STARTING_DIRECTION = "ArrowLeft"