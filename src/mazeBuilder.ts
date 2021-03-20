import {Cell, Grid} from "./grid";
import seedrandom  from "seedrandom";
import _ from 'lodash'
import {link} from "./linker";

// @TODO add IterableIterator
export interface MazeBuilder {
    build(): Grid;
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


export function createBinaryTreeMazeBuilder(grid: Grid, seed?: string): MazeBuilder {
    return new BinaryTreeMazeBuilder(grid, seed)
}

