import {Cell, Grid} from "./grid";
import seedrandom from "seedrandom";

import {link} from "./linker";

// @TODO add IterableIterator
export interface MazeBuilder {
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

    constructor(public readonly grid: Grid, seed?: string) {
        this.rng = seedrandom(seed)
    }

    build(): Grid {

        for (let cell of this.grid.cells()) {
            let neighbors: Cell[] = [ this.grid.south(cell), this.grid.east(cell)].filter((c): c is Cell => !!c)

            let index = Math.floor(this.rng() * neighbors.length);
            let neighbor: Cell | undefined = neighbors[index]
            if (neighbor) link(cell, neighbor)
        }

        return this.grid;
    }

}


export const createBinaryTreeMazeBuilder: CreateMazeBuilder = function createBinaryTreeMazeBuilder({grid, seed}) {
    return new BinaryTreeMazeBuilder(grid, seed)
}

