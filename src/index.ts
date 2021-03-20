import {createGrid, Dimensions, Grid} from "./grid";
import {coordinatePainer, Painter} from "./painter";
import {createBinaryTreeMazeBuilder} from "./mazeBuilder";


export function createMaze(dimensions: Dimensions, seed?: string): Grid {
    let grid = createGrid(dimensions);
    let mazeBuilder = createBinaryTreeMazeBuilder(grid, seed);
    return mazeBuilder.build()
}

export function paintGrid(grid: Grid, painter: Painter = coordinatePainer): string {
    let result = ""
    for (let row of grid.rows()) {
        let jobs = []
        for (let cell of row) {
            jobs.push(painter(cell))
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
