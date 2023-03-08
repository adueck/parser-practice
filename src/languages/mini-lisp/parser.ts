// S -> number
// S -> SL
// SL -> (F S S)
// F -> "+" | "-" | "*" | "/"

import {
    FExp,
    SExp,
    SL,
} from "./types";

function parseMiniLisp(tokens: Readonly<(string|number)[]>): SExp {
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

function parseMiniLispF(tokens: Readonly<(string|number)[]>): SExp {
    const { sexp, tokens: leftovers } = parseSExp(tokens);
    if (leftovers.length) {
        throw new Error("trailing tokens");
    }
    return sexp;
}

function parseSExp(tokens: Readonly<(string|number)[]>): {
    sexp: SExp,
    tokens: (string|number)[],
} {
    const [first, ...rest] = tokens;
    if (typeof first === "number") {
        return {
            sexp: first,
            tokens: rest,
        };
    } else {
        const { sl, tokens: leftovers } = parseSL(tokens);
        return {
            sexp: sl,
            tokens: leftovers,
        }
    }
}
function parseSL(tokens: Readonly<(string|number)[]>): {
    sl: SL,
    tokens: (string|number)[],
} {
    const [first, f, ...rest] = tokens;
    if (first !== "(") throw new Error("expected (");
    const { sexp: s1, tokens: l1 } = parseSExp(rest);
    const { sexp: s2, tokens: l2 } = parseSExp(l1);
    const sl: SL = [
        f as FExp,
        s1,
        s2,
    ];
    const [closing, ...rest2] = l2;
    if (closing !== ")") throw new Error("expected )");
    return {
        sl,
        tokens: rest2,
    };
}

export default [
    {
        parser: parseMiniLisp,
        label: "parseMiniLisp",
    },
    {
        parser: parseMiniLispF,
        label: "parseMiniLispF",
    },
];