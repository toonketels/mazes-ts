import {Painter, wallPainter} from "../painter";
import {paintMaze} from "../lib";

describe("paintMaze()", () => {

    test("creates a maze", () => {

        const result = paintMaze( {dimensions: {width: 2, height: 2}});

        expect(result).toMatchSnapshot()
    })

    test("creates a bigger maze", () => {

        const result = paintMaze({dimensions: {width: 5, height: 4}});

        expect(result).toMatchSnapshot()
    })

    test("accepts custom printer", () => {
        const painter: Painter = ({x, y}) => {
            return [
                `+----+`,
                `| ${x}${y} |`,
                '+----+'
            ]
        }
        const result = paintMaze({dimensions: {width: 2, height: 2}, painter});

        expect(result).toMatchSnapshot()
    })

    test("prints the walls with appropriate printer", () => {
        const result = paintMaze({dimensions: {width: 10, height: 10}, seed: "a seed value", painter: wallPainter});

        expect(result).toMatchSnapshot()
    })
})
