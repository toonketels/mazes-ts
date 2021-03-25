import { PNG } from 'pngjs'
import * as fs from 'fs'
import {Cell, Grid} from "./grid";
import {isLinked} from "./cellPainter";
import {Painter} from "./lib";

export interface ImagePaintResult {
    filePath: string
}

export type ImagePainter = Painter<ImagePaintResult>

export interface ImagePainterFactoryOptions {
    directory: string,
    fileName: string
}

export function createImagePainter({directory, fileName}: ImagePainterFactoryOptions): ImagePainter {

    // maybe a bit strange to make the filename part of the factory
    let counter = 0;

    return function paintGridToImage(grid: Grid): ImagePaintResult {


        const cellDimension = 20
        const wallWidth = 4
        const alpha = 255;
        const numberOfChannels = 4;

        const newfile = new PNG({
            height: getTotalImageDimension(grid.dimensions.height),
            width: getTotalImageDimension(grid.dimensions.width),
            fill: true,
            bgColor: { red: 255, green: 255, blue: 255}
        })

        function getTotalImageDimension(cellCount: number) {
            return (cellCount * (cellDimension + wallWidth)) + wallWidth;

        }
        function pixelInScanline(coordinate: ImageCoordinate): number {
            const scanline = coordinate.y
            const pixel = coordinate.x
            return (newfile.width * scanline + pixel) * numberOfChannels;
        }

        function scaleToImg(cellCoordinate: number) {
            const imageCoordinate = cellCoordinate * (wallWidth + cellDimension)
            return imageCoordinate
        }

        function scaleToImageCoordinate(x: number, y: number, fn: (c: ImageCoordinate) => ImageCoordinate = (i) => i): ImageCoordinate {
            const coordinate = new ImageCoordinate(scaleToImg(x), scaleToImg(y))
            return fn(coordinate)
        }

        function paint(coordinate: ImageCoordinate, r: number, g: number, b: number, a: number) {
            const refImageIndex = pixelInScanline(coordinate)
            newfile.data[refImageIndex] = r
            newfile.data[refImageIndex + 1] = g
            newfile.data[refImageIndex + 2] = b

            newfile.data[refImageIndex + 3] = a
        }
        function paintWithColor(coordinate: ImageCoordinate, color: "black" | "white") {
            switch (color) {
                case "black": paint(coordinate, 0, 0, 0, alpha)
                    break;
                case "white": paint(coordinate, 255, 255, 255, alpha)
                    break;
                default:
                    const checkExhaustive: never = color
                    break;
            }
        }

        function paintRectangle({x: x1, y: y1}: ImageCoordinate, {x: x2, y: y2}: ImageCoordinate, color: "black" | "white" = "black") {

            if (x1 > x2) throw Error("first coordinate x cannot be bigger")
            if (y1 > y2) throw Error("first coordinate y cannot be bigger")

            for (let y = y1; y <= y2; y++) {
                for (let x = x1; x <= x2; x++) {
                    paintWithColor(new ImageCoordinate(x, y), color)
                }
            }



        }

        function paintCell(cell: Cell) {
            const { x, y } = cell

            paintRectangle(scaleToImageCoordinate(x, y),
                scaleToImageCoordinate(x, y, c => {
                    c.x = c.x + wallWidth + cellDimension - 1
                    c.y = c.y + wallWidth + cellDimension - 1
                    return c
                }), "white")

            if (!isLinked(cell, "north")) {
                paintRectangle(scaleToImageCoordinate(x, y), scaleToImageCoordinate(x, y, c => {
                    c.x = c.x + wallWidth + wallWidth + cellDimension - 1
                    c.y = c.y + wallWidth - 1
                    return c
                }))

            }
            if (!isLinked(cell, "west")) {
                paintRectangle(
                    scaleToImageCoordinate(x, y),
                    scaleToImageCoordinate(x, y, c => {
                        c.x = c.x + wallWidth - 1
                        c.y = c.y + wallWidth + wallWidth + cellDimension - 1
                        return c
                    }))

            }
        }

        for (let row of grid.rows()) {
            for (let cell of row) {
                paintCell(cell)
            }
        }

        // Paint east wall
        paintRectangle(scaleToImageCoordinate(grid.dimensions.width, 0), scaleToImageCoordinate(grid.dimensions.width, grid.dimensions.height, c => {
            c.x = c.x + wallWidth - 1
            c.y = c.y + wallWidth - 1
            return c
        }))

        // Paing south wall
        paintRectangle(scaleToImageCoordinate(0, grid.dimensions.height), scaleToImageCoordinate(grid.dimensions.width, grid.dimensions.height, c => {
            c.x = c.x + wallWidth - 1
            c.y = c.y + wallWidth - 1
            return c
        }))

        const name = counter === 0 ? fileName : `${fileName}-${counter}`
        counter++
        let filePath = directory + `/${name}.png`;
        //
        // newfile
        //     .pack()
        //     .pipe(fs.createWriteStream(filePath))
        //     .on("finish", (...args) => { console.log("done", ...args) })

        var buffer = PNG.sync.write(newfile);
        fs.writeFileSync(filePath, buffer);

        return { filePath }

    }
}



class ImageCoordinate { constructor (public x: number, public y: number) {} }