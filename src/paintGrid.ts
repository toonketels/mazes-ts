import {Grid} from "./grid";
import {coordinatePainer, Painter} from "./painter";

export function paintGrid(grid: Grid, painter: Painter): string {
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