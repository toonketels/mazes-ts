import {CreateGrid, createGrid as createAGrid, Dimensions, Grid} from "./grid";
import {coordinatePainer, CellPainter} from "./cellPainter";
import {createBinaryTreeMazeBuilder, CreateMazeBuilder} from "./mazeBuilder";
import {createStringPainter, StringPainter} from "./stringPainter";

export type CreateMazeOptions = {
    dimensions: Dimensions,
    seed?: string,
    createGrid?: CreateGrid,
    createMazeBuilder?: CreateMazeBuilder,
}

export type PaintMazeOptions<T> = CreateMazeOptions & {
    painter: Painter<T>
}

export interface Painter<Type> {
    (grid: Grid): Type
}

export function paintMaze<T>({
                               dimensions,
                                 painter: paintGrid,
                                 seed,
                                 createGrid,
                                 createMazeBuilder
}: PaintMazeOptions<T>): T {

    let {grid, mazeBuilder} = initMaze({createGrid, dimensions, createMazeBuilder, seed});

    mazeBuilder.build()

    return paintGrid(grid)
}

export function* paintMazeCreation<T>({
                                      dimensions,
                                          painter: paintGrid,
                                          seed,
                                          createGrid = createAGrid,
                                          createMazeBuilder = createBinaryTreeMazeBuilder
                                  }: PaintMazeOptions<T>): Generator<T> {

    let grid = createGrid({dimensions});
    let mazeBuilder = createMazeBuilder({grid, seed});


    for (let grid of mazeBuilder) {
        yield paintGrid(grid)
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
