import {
    FExp,
    SExp,
    SL,
    LP,
} from "./grammar";

function parseMiniLisp(tokens: Readonly<(string|number)[]>): LP {
    const t = [...tokens];
    return parseLP();
    function parseLP(): LP {
        let sexps: SExp[] = [];
        while (t[0] !== undefined && t[0] !== ")") {
            sexps.push(parseSExp());
        }
        return sexps;
    }
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
            parseLP(),
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