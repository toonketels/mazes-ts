import {wallPainter} from "../painter";
import {paintMazeCreation} from "../index";

describe("paintMazeCreation()", () => {

    test("should paint every step of maze creation", () => {

        const frames = paintMazeCreation({
            dimensions: {width: 3, height: 3},
            seed: "a seed for predictable randomness",
            painter: wallPainter});

        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+   +---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |       |\n" +
            "+   +---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |       |\n" +
            "+   +---+   +\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |       |\n" +
            "+   +---+   +\n" +
            "|       |   |\n" +
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |       |\n" +
            "+   +---+   +\n" +
            "|           |\n" +
            "+---+---+---+\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |       |\n" +
            "+   +---+   +\n" +
            "|           |\n" +
            "+---+---+   +\n" +
            "|   |   |   |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |       |\n" +
            "+   +---+   +\n" +
            "|           |\n" +
            "+---+---+   +\n" +
            "|       |   |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |       |\n" +
            "+   +---+   +\n" +
            "|           |\n" +
            "+---+---+   +\n" +
            "|           |\n" +
            "+---+---+---+\n")
        expect(frames.next().value).toEqual(
            "+---+---+---+\n" +
            "|   |       |\n" +
            "+   +---+   +\n" +
            "|           |\n" +
            "+---+---+   +\n" +
            "|           |\n" +
            "+---+---+---+\n")
        expect(frames.next().done).toBeTruthy()
    })

})