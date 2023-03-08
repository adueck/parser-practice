// S -> number
// S -> SL
// SL -> (F S S)
// F -> "+" | "-" | "*" | "/"

import {
    FExp,
    SExp,
    SL,
} from "./types";

export function parseMiniLisp(tokens: Readonly<(string|number)[]>): SExp {
    const t = [...tokens];
    return parseSExp();
    function parseSExp(): SExp {
        if (typeof t[0] === "number") {
            return t.shift() as number;
        } else {
            return parseSL();
        }
    }
    function parseSL(): SL {
        const opening = t.shift();
        if (opening !== "(") throw new Error("expected (");
        const f = t.shift() as FExp;
        const sl: SL = [
            f,
            parseSExp(),
            parseSExp(),
        ];
        const closing = t.shift();
        if (closing !== ")") throw new Error("expected )");
        return sl;
    }
}

export default [
    {
        parser: parseMiniLisp,
        label: "parseMiniLisp",
    },
];