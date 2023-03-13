import { useTokens } from "../../lib/useTokens";
import {
    SE, A, SP, SL,
} from "./grammar";

// SP -> SE | SE SP
// SE -> A | SL
// SL -> ( SP )
// A -> number | boolean | string

function parseMiniLisp(tokens: Readonly<(string|number)[]>): SP {
    const t = useTokens(tokens);
    return parseSP();
    function parseSP(): SP {
        const first = parseSE();
        if (t.lookahead() === undefined || t.lookahead() === ")") {
            return [first];
        }
        return [first, ...parseSP()];
    }
    function parseSE(): SE {
        if (t.lookahead() !== "(") {
            return parseA();
        } else {
            return parseSL();
        }
    }
    function parseSL(): SL {
        t.match("(");
        const sl: SL = {
            content: parseSP(),
        };
        t.match(")");
        return sl;
    }
    function parseA(): A {
        const a = t.lookahead();
        if (a === undefined) {
            return "expected atom";
        }
        t.consume();
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