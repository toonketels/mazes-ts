import {clearScreen} from 'ansi-escapes'


import {paintMazeCreation} from "mazes-lib";
import {createStringPainter} from "mazes-lib";
import {wallPainter} from "mazes-lib";


function run() {

    const frames = paintMazeCreation({dimensions: {width: 10, height: 10}, painter: createStringPainter({cellPainter: wallPainter})});

    const interval = setInterval(() => {

        let { done, value: frame } = frames.next()

        if (done) {
            clearInterval(interval)
            process.exit()
        }

        process.stdout.write(`${clearScreen}${frame}`)

    }, 250);
}

run()