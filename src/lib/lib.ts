import {CreateGrid, createGrid as createAGrid, Dimensions} from "./grid";
import {coordinatePainer, Painter} from "./painter";
import {createBinaryTreeMazeBuilder, CreateMazeBuilder} from "./mazeBuilder";
import {paintGrid} from "./paintGrid";

interface PaintMazeOptions {
    dimensions: Dimensions,
    seed?: string,
    createGrid?: CreateGrid,
    createMazeBuilder?: CreateMazeBuilder,
    painter?: Painter
}

type CreateMazeOptions = Pick<PaintMazeOptions, "dimensions" | "seed" | "createGrid" | "createMazeBuilder">


export function paintMaze({
                               dimensions,
                               seed,
                               createGrid,
                               createMazeBuilder,
                               painter = coordinatePainer
}: PaintMazeOptions): string {

    let {grid, mazeBuilder} = initMaze({createGrid, dimensions, createMazeBuilder, seed});

    mazeBuilder.build()

    return paintGrid(grid, painter)
}

export function* paintMazeCreation({
                                      dimensions,
                                      seed,
                                      createGrid = createAGrid,
                                      createMazeBuilder = createBinaryTreeMazeBuilder,
                                      painter = coordinatePainer
                                  }: PaintMazeOptions): Generator<string> {

    let grid = createGrid({dimensions});
    let mazeBuilder = createMazeBuilder({grid, seed});


    for (let grid of mazeBuilder) {
        yield paintGrid(grid, painter)
    }
}

function initMaze({
                      dimensions,
                      seed,
                      createGrid = createAGrid,
                      createMazeBuilder = createBinaryTreeMazeBuilder
                  }: CreateMazeOptions) {
    let grid = createGrid({dimensions});
    let mazeBuilder = createMazeBuilder({grid, seed});
    return {grid, mazeBuilder};
}
