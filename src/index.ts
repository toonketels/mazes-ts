import {paintMazeCreation} from "./lib/lib";
import {wallPainter} from "./lib/cellPainter";
import {clearScreen} from 'ansi-escapes'


function run() {

    const frames = paintMazeCreation({dimensions: {width: 10, height: 10}, painter: wallPainter});

    const interval = setInterval(() => {

        let { done, value: frame } = frames.next()

        if (done) {
            clearInterval(interval)
            process.exit()
        }

        process.stdout.write(`${clearScreen}${frame}`)

    }, 250);
}

// @TODO inject process and interval to make run easily testible
run()