import * as faker from 'faker'
import {Cell, Dimensions} from "../grid";



export function aCell(customs: Partial<Cell> = {}): Cell {
    const defaults = {
        x: faker.random.number(100),
        y: faker.random.number(100),
        links: []}

    return { ...defaults, ...customs }
}