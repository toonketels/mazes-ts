import {Painter, wallPainter} from "../painter";
import {paintMaze} from "../index";

describe("paintMaze()", () => {

    test("should create a maze", () => {

        const result = paintMaze( {dimensions: {width: 2, height: 2}});

        const expected = " 00  10 \n" +
                         " 01  11 \n"

        expect(result).toBe(expected)
    })

    test("should create a bigger maze", () => {

        const result = paintMaze({dimensions: {width: 5, height: 4}});

        const expected =
            " 00  10  20  30  40 \n" +
            " 01  11  21  31  41 \n" +
            " 02  12  22  32  42 \n" +
            " 03  13  23  33  43 \n"

        expect(result).toBe(expected)
    })

    test("should accept custom printer", () => {
        const painter: Painter = ({x, y}) => {
            return [
                `+----+`,
                `| ${x}${y} |`,
                '+----+'
            ]
        }
        const result = paintMaze({dimensions: {width: 2, height: 2}, painter});

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
        const result = paintMaze({dimensions: {width: 10, height: 10}, seed: "a seed value", painter: wallPainter});

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
