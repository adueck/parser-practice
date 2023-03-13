import {
    CList,
    Element,
} from "./grammar";

// C -> [ES]
// ES -> E ES'
// ES' -> , ES | ε
// E -> n | C`

export function parseCList(tokens: Readonly<(string|number)[]>): CList {
    let [l, ...t] = tokens;
    let lookahead: string | number | undefined = l;

    function match(t: string | number) {
        if (lookahead !== t) {
            throw new Error("expected "+t);
        }
        consume();
    }

    function consume() {
        lookahead = t.shift();
    }

    const c = parseC();
    if (t.length > 1) {
        throw new Error("trailing tokens");
    }
    return c;

    function parseC(): CList {
        console.log(lookahead);
        match("[");
        const c = parseES();
        match("]");
        return c;
    }
    function parseES(): Element[] {
        return [parseE(), ...parseESComma()];
    }
    function parseESComma(): Element[] {
        if (lookahead === ",") {
            match(",");
            return parseES();
        }
        return [];
    }
    function parseE(): Element {
        if (typeof lookahead === "number") {
            const e = lookahead;
            consume();
            return e;
        }
        return parseC();
    }
}

export default [
    {
        parser: parseCList,
        label: "parseCList",
    },
];