import {CellPainter, wallPainter} from "../cellPainter";
import {paintMaze} from "../lib";
import {createStringPainter} from "../stringPainter";
import {createImagePainter} from "../imagePainter";
import fs from "fs/promises";
import { toMatchImageSnapshot } from 'jest-image-snapshot'


expect.extend({ toMatchImageSnapshot });

describe("paintMaze()", () => {

    describe("with stringPainter", () => {

        test("creates a maze", () => {

            const result = paintMaze( {
                dimensions: {width: 2, height: 2},
                painter: createStringPainter()
            });

            expect(result).toMatchSnapshot()
        })

        test("creates a bigger maze", () => {

            const result = paintMaze({
                dimensions: {width: 5, height: 4},
                painter: createStringPainter()
            });

            expect(result).toMatchSnapshot()
        })

        test("accepts custom printer", () => {
            const cellPainter: CellPainter = ({x, y}) => {
                return [
                    `+----+`,
                    `| ${x}${y} |`,
                    '+----+'
                ]
            }
            const result = paintMaze({
                dimensions: {width: 2, height: 2},
                painter: createStringPainter({cellPainter})
            });

            expect(result).toMatchSnapshot()
        })

        test("prints the walls with appropriate printer", () => {
            const result = paintMaze({dimensions: {width: 10, height: 10}, seed: "a seed value", painter: createStringPainter({cellPainter: wallPainter})});

            expect(result).toMatchSnapshot()
        })
    })

    describe("with imagePainter", () => {

        test("create a picture of the grid instantiated by paintMaze", async () => {

            const {filePath} = paintMaze({
                dimensions: {width: 30, height: 20},
                seed: "seed value",
                painter: createImagePainter({
                    directory:  __dirname + "/__files__",

                    fileName: 'png-paint-maze'
                })
            })

            const buffer = await fs.readFile(filePath)
            expect(buffer).toMatchImageSnapshot()

        })
    })

})
