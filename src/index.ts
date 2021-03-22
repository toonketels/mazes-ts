import {CreateGrid, createGrid as createAGrid, Dimensions, Grid} from "./grid";
import {coordinatePainer, Direction, Painter} from "./painter";
import {createBinaryTreeMazeBuilder, CreateMazeBuilder} from "./mazeBuilder";


interface CreateMazeOptions {
    dimensions: Dimensions,
    seed?: string,
    createGrid?: CreateGrid,
    createMazeBuilder?: CreateMazeBuilder,
    painter?: Painter
}

export function paintMaze({
                               dimensions,
                               seed,
                               createGrid = createAGrid,
                               createMazeBuilder = createBinaryTreeMazeBuilder,
                               painter = coordinatePainer
}: CreateMazeOptions): string {

    let grid = createGrid({dimensions});
    let mazeBuilder = createMazeBuilder({grid, seed});

    mazeBuilder.build()

    return paintGrid(grid, painter)
}

export function paintGrid(grid: Grid, painter: Painter = coordinatePainer): string {
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
