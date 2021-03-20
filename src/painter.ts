import {Cell} from "./grid";

export interface PaintOpions {
    omitNorth?: boolean;
    omitEast?: boolean;
    omitSouth?: boolean;
    omitWest?: boolean;
}

export interface Painter {
    (cell: Cell, options?: PaintOpions): string[];
}

export type Direction = "north" | "east" | "south" | "west";

export const coordinatePainer: Painter = cell => {
    return [` ${cell.x}${cell.y} `]
}
export const wallPainter: Painter = (cell, {
    omitNorth,
    omitEast,
    omitSouth,
    omitWest
} = {}) => {

    const north = isLinked(cell, "north") ? `+   +` : `+---+`;
    const east = isLinked(cell, "east") ? ` ` : `|`;
    const south = isLinked(cell, "south") ? `+   +` : `+---+`;
    const west = isLinked(cell, "west") ? ` ` : `|`;

    const start = omitWest ? 1 : 0
    const end = omitEast ? 4 : 5

    return [
        ...(omitNorth ? [] : [north.substring(start, end)]),
        `${west}   ${east}`.substring(start, end),
        ...(omitSouth ? [] : [south.substring(start, end)])
    ]
}


function isLinked(cell: Cell, direction: Direction): boolean {
    switch(direction) {
        case "north":
            return !!cell.links.find(({y}) => y === cell.y - 1 )
        case "east":
            return !!cell.links.find(({x}) => x === cell.x + 1 )
        case "south":
            return !!cell.links.find(({y}) => y === cell.y + 1 )
        case "west":
            return !!cell.links.find(({x}) => x === cell.x - 1 )
        default:
            const checkExhaustive: never = direction
            return checkExhaustive
    }
}