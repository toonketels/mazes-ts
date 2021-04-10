import {run} from "../run";

describe("cli", () => {

    let spy: jest.SpyInstance

    beforeAll(() => {
        spy = jest.spyOn(process.stdout, 'write').mockImplementation(function () { return true; });
    });

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test("animate the maze building to std out", async () => {

        await run({dimensions: {width: 3, height: 3}, seed: "stabilize the input", delayMs: 0})

        expect(process.stdout.write).toHaveBeenCalledTimes(11)
        for (let [arg] of spy.mock.calls) expect(arg).toMatchSnapshot()
    })

})