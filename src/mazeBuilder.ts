import {Cell, Grid} from "./grid";
import seedrandom from "seedrandom";

import {link} from "./linker";

export interface MazeBuilder extends IterableIterator<Grid> {
    build(): Grid;
}

export interface MazeBuilderOps {
    grid: Grid,
    seed?: string
}

export type CreateMazeBuilder = {
    (options: MazeBuilderOps): MazeBuilder
}

class BinaryTreeMazeBuilder implements MazeBuilder {
    private rng: () => number;
    private cells: IterableIterator<Cell> | undefined;


    constructor(public readonly grid: Grid, seed?: string) {
        this.rng = seedrandom(seed)
    }

    [Symbol.iterator](): IterableIterator<Grid> {
        return this
    }

    next(_value: any): IteratorResult<Grid> {

        if (this.cells === undefined) {
            this.cells = this.grid.cells()
            // Return unmodified grid as step 0
            return {done: false, value: this.grid}
        }

        const { done, value } = this.cells.next()

        if (done) {
            return {done: true, value: undefined}
        }
        return {done: false, value: this.step(value)}
    }

    build(): Grid {

        // Run to completion
        for (let grid of this) {}

        return this.grid;
    }

    private step(cell: Cell) {
        let neighbors: Cell[] = [ this.grid.south(cell), this.grid.east(cell)].filter((c): c is Cell => !!c)

        let index = Math.floor(this.rng() * neighbors.length);
        let neighbor: Cell | undefined = neighbors[index]
        if (neighbor) link(cell, neighbor)

        return this.grid
    }
}


export const createBinaryTreeMazeBuilder: CreateMazeBuilder = function createBinaryTreeMazeBuilder({grid, seed}) {
    return new BinaryTreeMazeBuilder(grid, seed)
}

