import { useTokens } from "../../lib/useTokens";
import {
    LogicV,
    LogicE,
    LogicB,
    LogicToken,
} from "./grammar";

// V -> E and V | E or V | E
// E -> not E | B
// B -> "t" | "f" | ( V )`;

function logicParserHalfF(tokens: LogicToken[]): LogicV {
    const t = useTokens(tokens);
    const v = parseV(t);
    if (t.lookahead() !== undefined) {
        throw new Error("trailing tokens");
    }
    return v;
}

function parseV(t: ReturnType<typeof useTokens>): LogicV {
    const exp = parseExp(t);
    if (t.lookahead() === "and") {
        t.consume();
        return {
            op: "and",
            left: exp,
            right: parseV(t),
        };
    } else if (t.lookahead() === "or") {
        t.consume();
        return {
            op: "or",
            left: exp,
            right: parseV(t),
        }
    } else {
        return exp;
    }
}
function parseExp(t: ReturnType<typeof useTokens>): LogicE {
    if (t.lookahead() === "not") {
        t.consume();
        return {
            op: "not",
            value: parseExp(t),
        }
    } else {
        return parseB(t);
    }
}
function parseB(t: ReturnType<typeof useTokens>): LogicB {
    if (t.lookahead() === "(") {
        t.match("(");
        const v = parseV(t);
        t.match(")");
        return [v];
    }
    const bToken = t.lookahead();
    if (typeof bToken !== "string" || !["t", "f", "true", "false"].includes(bToken)) {
        throw new Error("expected boolean t/f/true/false");
    }
    t.consume();
    return ["t", "true"].includes(bToken);
}


export default [
    {
        parser: logicParserHalfF,
        label: "logicParserHalfF",
    },
];