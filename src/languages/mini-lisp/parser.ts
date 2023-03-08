import {
    FExp,
    SExp,
    SL,
} from "./types";

function parseMiniLisp(tokens: Readonly<(string|number)[]>): SExp {
    const t = [...tokens];
    return parseSExp();
    function parseSExp(): SExp {
        if (["t", "f"].includes(t[0] as string)) {
            return t.shift() === "t";
        } else if (typeof t[0] === "number") {
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