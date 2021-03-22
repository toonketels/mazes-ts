import {wallPainter} from "../painter";
import {paintMazeCreation} from "../lib";

describe("paintMazeCreation()", () => {

    test("paints every step of maze creation", () => {

        const frames = paintMazeCreation({
            dimensions: {width: 3, height: 3},
            seed: "a seed for predictable randomness",
            painter: wallPainter});

        for(let frame of frames) {
            expect(frame).toMatchSnapshot()
        }
    })
})