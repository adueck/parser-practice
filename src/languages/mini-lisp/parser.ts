import {
    SE, A, SP, SL,
} from "./grammar";

// SP -> SE | SE SP
// SE -> A | SL
// SL -> ( SP )
// A -> number | boolean | string

function parseMiniLisp(tokens: Readonly<(string|number)[]>): SP {
    const t = [...tokens];
    return parseSP();
    function parseSP(): SP {
        const first = parseSE();
        if (t[0] === undefined || t[0] === ")") {
            return [first];
        }
        return [first, ...parseSP()];
    }
    function parseSE(): SE {
        if (t[0] !== "(") {
            return parseA();
        } else {
            return parseSL();
        }
    }
    function parseSL(): SL {
        const opening = t.shift();
        if (opening !== "(") throw new Error("expected (");
        const sl: SL = {
            type: "s-exp",
            content: parseSP(),
        };
        const closing = t.shift();
        if (closing !== ")") throw new Error("expected )");
        return sl;
    }
    function parseA(): A {
        const a = t.shift();
        if (a === undefined) {
            return "expected atom";
        }
        return ["t", "f", "true", "false"].includes(a as string)
            ? (a === "t" || a === "true")
            : a;
    }
}


export default [
    {
        parser: parseMiniLisp,
        label: "parseMiniLisp",
    },
];