import { logicTokenize } from "./logic-tokenizer";

export function logicParser(l: string): LogicV {
    const tokens = logicTokenize(l);
    return parseValue(tokens);
}

function parseValue(tokens: LogicToken[]): LogicV {
    let t = [...tokens];
    const exp = parseExp();
    console.log({ exp });
    if (t[0] === "and") {
        t.shift();
        return {
            op: "and",
            left: exp,
            right: parseValue(t),
        };
    } else if (t[0] === "or") {
        t.shift();
        return {
            op: "or",
            left: exp,
            right: parseValue(t),
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
            const v = parseValue(t.slice(0, -1));
            console.log({ v });
            return [v];
        }
        return first === "t";
    }
}