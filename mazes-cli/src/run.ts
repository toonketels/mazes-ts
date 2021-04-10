import {createStringPainter, paintMazeCreation, wallPainter} from "mazes-lib";
import {clearScreen} from "ansi-escapes";
import {Dimensions} from "mazes-lib/dist/lib/grid";

export interface RunOptions {
    dimensions: Dimensions,
    delayMs?: number,
    seed?: string
}

export async function run({dimensions, delayMs = 250, seed}: RunOptions): Promise<void> {

    return new Promise(resolve => {

        const frames = paintMazeCreation(withOptions(dimensions, seed));

        const interval = setInterval(() => {

            let {done, value: frame} = frames.next()

            if (done) {
                clearInterval(interval)
                resolve()
            }

            process.stdout.write(`${clearScreen}${frame}`)

        }, delayMs);
    });
}

function withOptions(dimensions: Dimensions, seed: string | undefined) {
    let creationOptions = {
        dimensions,
        painter: createStringPainter({cellPainter: wallPainter})
    };
    return {...creationOptions, ...(seed && {seed})}
}
