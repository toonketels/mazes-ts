export interface Dimensions {
    width: number;
    height: number;
}

export interface Cell {
    x: number;
    y: number;
    links: Cell[];
}

export function createCell(options: Partial<Cell> = {}): Cell {
    const defaults = {x: 0, y: 0, links: []};

    return {...defaults, ...options};
}

export interface Grid {

    dimensions: Dimensions;

    north(cell: Cell): Cell | undefined;
    east(cell: Cell): Cell | undefined;
    south(cell: Cell): Cell | undefined;
    west(cell: Cell): Cell | undefined;

    cell(x: number, y: number): Cell;

    cells(): IterableIterator<Cell>;

    rows(): IterableIterator<IterableIterator<Cell>>;

    rowsIndexed(): IterableIterator<[number, IterableIterator<[number, Cell]>]>
}


class SimpleGrid implements Grid {

    dimensions: Dimensions;
    private _cells: Array<Array<Cell>>

    constructor(dimensions: Dimensions) {
        this.dimensions = dimensions;
        this._cells = this.initCells(dimensions);
    }

    private initCells(dimensions: Dimensions): Cell[][] {
        const cells = new Array(dimensions.width)
        for (let x = 0; x < dimensions.width; x++) {
            cells[x] = new Array(dimensions.height)
            for (let y = 0; y < dimensions.width; y++) {
                cells[x][y] = createCell({x, y})
            }
        }
        return cells;
    }

    cell(x: number, y: number): Cell {

        if (x >= this.dimensions.width) throw Error("Coordinates are off grid")
        if (y >= this.dimensions.height) throw Error("Coordinates are off grid")

        return this._cells[x][y]
    }

    cells(): IterableIterator<Cell> {
        return genCells(this._cells, this.dimensions)
    }

    rows(): IterableIterator<IterableIterator<Cell>> {
        return genRows(this._cells, this.dimensions)
    }

    rowsIndexed(): IterableIterator<[number, IterableIterator<[number, Cell]>]> {
        return genRowsIndexed(this._cells, this.dimensions)
    }

    north({x, y}: Cell): Cell | undefined {
        return this.cellWithCoordinates(x, y - 1);
    }

    east({x, y}: Cell): Cell | undefined {
        return this.cellWithCoordinates(x + 1, y);
    }

    south({x, y}: Cell): Cell | undefined {
        return this.cellWithCoordinates(x, y + 1);
    }

    west({x, y}: Cell): Cell | undefined {
        return this.cellWithCoordinates(x - 1, y);
    }

    private cellWithCoordinates( x: number, y: number): Cell | undefined {
        return this.isValid(x, y) ? this.cell(x, y) : undefined
    }

    private isValid(x: number, y: number) {
        const validX = x >= 0 && x < this.dimensions.width
        const validY = y >= 0 && y < this.dimensions.height

        return validX && validY
    }
}

// Prevents SimpleGrid from needing to be exported
export function createGrid(dimensions: Dimensions): Grid {
    return new SimpleGrid(dimensions);
}

// Helper generator functions
function* genRows(grid: Array<Array<Cell>>, dimensions: Dimensions): IterableIterator<IterableIterator<Cell>> {
    for (let y = 0; y < dimensions.height; y++) {
        yield genCellsInRow(grid, dimensions, y)
    }
}

function* genRowsIndexed(grid: Array<Array<Cell>>, dimensions: Dimensions): IterableIterator<[number, IterableIterator<[number, Cell]>]> {
    for (let y = 0; y < dimensions.height; y++) {
        yield [y, genCellsInRowIndexed(grid, dimensions, y)]
    }
}

function* genCellsInRow(grid: Array<Array<Cell>>, { width } :Dimensions, y: number): IterableIterator<Cell> {
    for (let x = 0; x < width; x++) {
        yield grid[x][y]
    }
}

function* genCellsInRowIndexed(grid: Array<Array<Cell>>, { width } :Dimensions, y: number): IterableIterator<[number, Cell]> {
    for (let x = 0; x < width; x++) {
        yield [x, grid[x][y]]
    }
}

function* genCells(grid: Array<Array<Cell>>, { width, height }: Dimensions): IterableIterator<Cell> {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            yield grid[x][y]
        }
    }
}