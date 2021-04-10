import {createCell} from "../grid";
import {wallPainter} from "../cellPainter";

describe("wallPainter", () => {

    test("paints opened walls to linked neighbors", () => {

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

    test("respects omitNorth and omitWest options", () => {

        const cell = createCell({x: 5, y: 4})
        const result = wallPainter(cell, { omitNorth: true, omitWest: true })

        expect(result).toEqual([
            "   |",
            "---+"
        ])
    })

    test("respects omitEast and omitSouth options", () => {

        const cell = createCell({x: 5, y: 4})
        const result = wallPainter(cell, { omitEast: true, omitSouth: true })

        expect(result).toEqual([
            "+---",
            "|   "
        ])
    })
})