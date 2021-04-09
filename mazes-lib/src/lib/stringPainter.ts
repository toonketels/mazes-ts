import {Cell, Grid} from "./grid";
import {coordinatePainer, CellPainter} from "./cellPainter";
import {Painter} from "../index";

export type StringPainter = Painter<string>

export interface StringPainterFactoryOptions {
    cellPainter?: CellPainter
}

export function createStringPainter({cellPainter = coordinatePainer}: StringPainterFactoryOptions = {}): StringPainter {
    return (grid) => stringPainter(grid, cellPainter)
}

function stringPainter(grid: Grid, painter: CellPainter): string {
    let result = ""

    for (let [y, row] of grid.rowsIndexed()) {
        let jobs = []
        for (let [x, cell] of row) {

            const isLastRow = y === grid.dimensions.height - 1
            const isLastColumn = x === grid.dimensions.width - 1

            const ops = {
                omitSouth: !isLastRow,
                omitEast: !isLastColumn
            }

            jobs.push(painter(cell, ops))
        }

        if (jobs[0] === undefined) return "\n"
        const linesPerJob = jobs[0].length


        for (let line = 0; line < linesPerJob; line++) {
            for (let job = 0; job < jobs.length; job++) {
                result += jobs[job][line]
            }
            result += "\n"
        }
    }

    return result
}