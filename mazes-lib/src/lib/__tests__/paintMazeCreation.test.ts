import {wallPainter} from "../cellPainter";
import {paintMazeCreation} from "../../index";
import {createStringPainter} from "../stringPainter";
import {createImagePainter} from "../imagePainter";
import fs from "fs/promises";
import { toMatchImageSnapshot } from 'jest-image-snapshot'


expect.extend({ toMatchImageSnapshot });

describe("paintMazeCreation()", () => {

    describe("with stringPainter", () => {

        test("ASCI paints every step of maze creation", () => {

            const frames = paintMazeCreation({
                dimensions: {width: 3, height: 3},
                seed: "a seed for predictable randomness",
                painter: createStringPainter({cellPainter: wallPainter})
            });

            for(let frame of frames) {
                expect(frame).toMatchSnapshot()
            }
        })
    })

    describe("with imagePainter", () => {

        test("create a picture of all the steps in grid creation", async () => {

            const paths = paintMazeCreation({
                dimensions: {width: 3, height: 3},
                seed: "seed it",
                painter: createImagePainter({
                    directory: __dirname + "/__files__",
                    fileName: 'png-paint-maze-creation'
                })
            })

            for (let {filePath} of paths) {
                const buffer = await fs.readFile(filePath)
                expect(buffer).toMatchImageSnapshot()
            }
        }, 10000)
    })

})