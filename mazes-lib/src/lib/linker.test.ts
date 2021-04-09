import {aCell} from "./__tests__/data";
import {link, unlink} from "./linker";

describe("link", () => {

    test("links 2 cells together", () => {

        const a = aCell({links: []});
        const b = aCell({links: []});

        link(a, b)

        expect(a.links).toContain(b);
        expect(b.links).toContain(a);
    })

    test("links even when partially linked before", () => {

        const a = aCell({links: []});
        const b = aCell({links: [a]})

        link(a, b)

        expect(a.links).toContain(b)
        expect(b.links).toContain(a)
    })

    test("throws when passed the same currentCell twice", () => {

        const a = aCell();

        expect(() => link(a,a)).toThrow("Cannot link a currentCell to itself")
    })
})

describe("unlink", () => {

    test("removes the link between two cells", () => {

        const a = aCell();
        const b = aCell();

        link(a, b)

        unlink(a, b)

        expect(a.links).not.toContain(b)
        expect(b.links).not.toContain(a)
    })

    test("removes the link when partially linked", () => {

        const a = aCell();
        const b = aCell({links: [a]});

        unlink(a, b)

        expect(a.links).not.toContain(b)
        expect(b.links).not.toContain(a)

    })

    test("does not nothing when not already linked", () => {
        const a = aCell();
        const b = aCell();

        unlink(a, b)

        expect(a.links).not.toContain(b)
        expect(b.links).not.toContain(a)
    })
});