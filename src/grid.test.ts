import {createGrid} from "./grid";

describe("Grid", () => {

    describe('cell()', () => {

        test.each([
            [0, 0],
            [0, 4],
            [2, 2],
            [9, 0],
            [9, 4]
        ])("returns the cell with (%d, %d) coordinate", (x, y) => {

            let grid = createGrid({width: 10, height: 5});

            expect(grid.cell(x, y)).toMatchObject({x: x, y: y})
        })

        test.each([
            [10, 5],
            [10, 0],
            [0, 5],
            [20, 20]
        ])("throws because (%d, %d) coordinates are off grid", (x, y) => {

            let grid = createGrid({width: 10, height: 5});

            expect(() => grid.cell(x, y)).toThrow("Coordinates are off grid")
        })
    })

    describe("cells()", () => {

        test("returns a cell iterator", () => {

            const grid = createGrid({width: 3, height: 2});
            const cells = grid.cells();

            expect(cells.next()).toMatchObject({value: {x: 0, y: 0}})
            expect(cells.next()).toMatchObject({value: {x: 1, y: 0}})
            expect(cells.next()).toMatchObject({value: {x: 2, y: 0}})
            expect(cells.next()).toMatchObject({value: {x: 0, y: 1}})
            expect(cells.next()).toMatchObject({value: {x: 1, y: 1}})
            expect(cells.next()).toMatchObject({value: {x: 2, y: 1}})
            expect(cells.next()).toMatchObject({done: true})
        })

        test("returns a cell iterable", () => {

            const grid = createGrid({width: 3, height: 2});
            let count  = 0

            // iterable allows for for of loops
            for (let row of grid.cells()) count++

            expect(count).toBe(6)
        })
    })

    describe("rows()", () => {

        test("returns a row iterator", () => {
            const grid = createGrid({width: 3, height: 2});
            const rows = grid.rows();

            expect(rows.next()).toMatchObject({done: false})
            expect(rows.next()).toMatchObject({done: false})
            expect(rows.next()).toMatchObject({done: true})
        });

        test("returns a row iterable", () => {
            const grid = createGrid({width: 3, height: 2});
            let count  = 0

            // iterable allows for for of loops
            for (let row of grid.rows()) count++

            expect(count).toBe(2)
        })

        test("allows to iterate over rows then cells in row", () => {
            const grid = createGrid({width: 3, height: 2});
            let count  = 0

            // iterable allows for for of loops
            for (let row of grid.rows())
                for (let cell of row) count++

            expect(count).toBe(6)
        })
    })

    describe("noth()", () => {

        test("returns the cell north from the given cell", () => {
            const grid = createGrid({width: 3, height: 3});
            const cell = grid.cell(1, 1);

            expect(grid.north(cell)).toMatchObject({x: 1, y: 0})
        })

        test("returns undefined if out of grid", () => {
            const grid = createGrid({width: 3, height: 3});
            const cell = grid.cell(1, 0);

            expect(grid.north(cell)).toBeUndefined()
        })
    })

    describe("east()", () => {

        test("returns the cell east from the given cell", () => {
            const grid = createGrid({width: 3, height: 3});
            const cell = grid.cell(1, 1);

            expect(grid.east(cell)).toMatchObject({x: 2, y: 1})
        })

        test("returns undefined if out of grid", () => {
            const grid = createGrid({width: 3, height: 3});
            const cell = grid.cell(2, 1);

            expect(grid.east(cell)).toBeUndefined()
        })
    })

    describe("south()", () => {

        test("returns the cell south from the given cell", () => {
            const grid = createGrid({width: 3, height: 3});
            const cell = grid.cell(1, 1);

            expect(grid.south(cell)).toMatchObject({x: 1, y: 2})
        })

        test("returns undefined if out of grid", () => {
            const grid = createGrid({width: 3, height: 3});
            const cell = grid.cell(1, 2);

            expect(grid.south(cell)).toBeUndefined()
        })
    })

    describe("west()", () => {

        test("returns the cell west from the given cell", () => {
            const grid = createGrid({width: 3, height: 3});
            const cell = grid.cell(1, 1);

            expect(grid.west(cell)).toMatchObject({x: 0, y: 1})
        })

        test("returns undefined if out of grid", () => {
            const grid = createGrid({width: 3, height: 3});
            const cell = grid.cell(0, 1);

            expect(grid.west(cell)).toBeUndefined()
        })
    })
});