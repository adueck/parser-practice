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
    let t = [...tokens];
    return parseV();
    function parseV(): LogicV {
        const exp = parseExp();
        const lookahead = t[0];
        if (lookahead === "and") {
            t.shift();
            return {
                op: "and",
                left: exp,
                right: parseV(),
            };
        } else if (lookahead === "or") {
            t.shift();
            return {
                op: "or",
                left: exp,
                right: parseV(),
            }
        } else {
            return exp;
        }
    }
    function parseExp(): LogicE {
        const lookahead = t[0];
        if (lookahead === "not") {
            t.shift();
            return {
                op: "not",
                value: parseExp(),
            }
        } else {
            return parseB();
        }
    }
    function parseB(): LogicB {
        const lookahead = t[0];
        if (lookahead === "(") {
            match("(");
            const v = parseV();
            match(")");
            return [v];
        }
        const bToken = t.shift();
        if (!bToken || !["t", "f", "true", "false"].includes(bToken)) {
            throw new Error("expected boolean t/f/true/false");
        }
        return ["t", "true"].includes(bToken);
    }

    function match(m: string | number) {
        const x = t.shift();
        if (x !== m) {
            throw new Error("expected "+ m);
        }
    }
}

export default [
    {
        parser: logicParserHalfF,
        label: "logicParserHalfF",
    },
];