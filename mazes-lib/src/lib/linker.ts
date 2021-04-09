/**
 * Link two cells together
 */
import * as _ from 'lodash';
import {Cell} from "./grid";

export function link(a: Cell, b: Cell) {

    // @TODO: maybe a currentCell is defined by its position in the grid
    //        so it has some kind of identity
    //        maybe it should know if its being linked to itself
    if (_.isEqual(a, b)) throw new Error("Cannot link a currentCell to itself")

    if (!a.links.includes(b)) a.links = [...a.links, b]
    if (!b.links.includes(a)) b.links = [...b.links, a]
}

export function unlink(a: Cell, b: Cell) {
    if (a.links.includes(b)) a.links = _.without(a.links, b)
    if (b.links.includes(a)) b.links = _.without(b.links, a)
}