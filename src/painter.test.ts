import {createCell} from "./grid";
import {wallPainter} from "./painter";

describe("wallPainter", () => {

    test("it should dont paint walls to linked neighbors", () => {

        const north = createCell({x: 5, y: 4})
        const east = createCell({x: 6, y: 5})
        const cell = createCell({x:5, y: 5, links: [north, east]})

        const result = wallPainter(cell)

        expect(result).toEqual([
            "+   +",
            "|    ",
            "+---+"
        ])

    })

})