import {Painter, wallPainter} from "../painter";
import {createMaze, paintGrid} from "../index";

describe("createMaze", () => {

    test("should create a maze", () => {

        const grid = createMaze({width: 2, height: 2});
        const result = paintGrid(grid)

        const expected = " 00  10 \n" +
                         " 01  11 \n"

        expect(result).toBe(expected)
    })


    test("should create a bigger maze", () => {

        const grid = createMaze({width: 5, height: 4});
        const result = paintGrid(grid)

        const expected =
            " 00  10  20  30  40 \n" +
            " 01  11  21  31  41 \n" +
            " 02  12  22  32  42 \n" +
            " 03  13  23  33  43 \n"

        expect(result).toBe(expected)
    })

    test("should accept custom printer", () => {
        const grid = createMaze({width: 2, height: 2});
        const painter: Painter = ({x, y}) => {
            return [
                `+----+`,
                `| ${x}${y} |`,
                '+----+'
            ]
        }
        const result = paintGrid(grid, painter)

        const expected =
            "+----++----+\n" +
            "| 00 || 10 |\n" +
            "+----++----+\n" +
            "+----++----+\n" +
            "| 01 || 11 |\n" +
            "+----++----+\n"

        expect(result).toBe(expected)
    })

    test("should print the walls with appropriate printer", () => {
        const grid = createMaze({width: 10, height: 10}, "a seed value");
        const result = paintGrid(grid, wallPainter)

        const expected =
            "+---+---+---+---+---+---+---+---+---+---+\n" +
            "|   |       |       |   |               |\n" +
            "+   +---+   +---+   +   +---+---+---+   +\n" +
            "|   |   |   |               |       |   |\n" +
            "+   +   +   +---+---+---+   +---+   +   +\n" +
            "|       |   |               |   |       |\n" +
            "+---+   +   +---+---+---+   +   +---+   +\n" +
            "|       |   |               |   |       |\n" +
            "+---+   +   +---+---+---+   +   +---+   +\n" +
            "|           |       |                   |\n" +
            "+---+---+   +---+   +---+---+---+---+   +\n" +
            "|   |   |   |       |       |   |       |\n" +
            "+   +   +   +---+   +---+   +   +---+   +\n" +
            "|           |   |   |       |       |   |\n" +
            "+---+---+   +   +   +---+   +---+   +   +\n" +
            "|           |       |   |       |       |\n" +
            "+---+---+   +---+   +   +---+   +---+   +\n" +
            "|       |   |   |           |   |       |\n" +
            "+---+   +   +   +---+---+   +   +---+   +\n" +
            "|                                       |\n" +
            "+---+---+---+---+---+---+---+---+---+---+\n"


        expect(result).toBe(expected)
    })
})
