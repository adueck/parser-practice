import {
    LogicV,
    LogicE,
    LogicB,
    LogicToken,
} from "./grammar";

function logicParserHalfF(tokens: LogicToken[]): LogicV {
    let t = [...tokens];
    const exp = parseExp();
    if (t[0] === "and") {
        t.shift();
        return {
            op: "and",
            left: exp,
            right: logicParserHalfF(t),
        };
    } else if (t[0] === "or") {
        t.shift();
        return {
            op: "or",
            left: exp,
            right: logicParserHalfF(t),
        }
    } else {
        return exp;
    }
    function parseExp(): LogicE {
        if (t[0] === "not") {
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
        const first = t.shift();
        if (first === "(") {
            const v = logicParserHalfF(t.slice(0, -1));
            return [v];
        }
        return first === "t";
    }
}

export default [
    {
        parser: logicParserHalfF,
        label: "logicParserHalfF",
    },
];