import {Cell} from "./grid";

export interface Painter {
    (cell: Cell): string[];
}

export function coordinatePainer(cell: Cell): string[] {
    return [` ${cell.x}${cell.y} `]
}

export function wallPainter(cell: Cell): string[] {
    const north = isLinked(cell, "north") ? `+   +` : `+---+`;
    const east = isLinked(cell, "east") ? ` ` : `|`;
    const south = isLinked(cell, "south") ? `+   +` : `+---+`;
    const west = isLinked(cell, "west") ? ` ` : `|`;

    return [
        north,
        `${west}   ${east}`,
        south
    ]

    function isLinked(cell: Cell, direction: "north"| "east" | "south" | "west"): boolean {
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
}
