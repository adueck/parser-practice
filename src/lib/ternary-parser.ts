// T -> boolean
// T -> ( T ) ? T : T

import { tokenizer } from "./tokenizer";

export function parseTernary(l: string): Ternary {
    const tokens = tokenizer<TernaryToken>(l);
    const t = [...tokens];
    function ptf(): Ternary {
        const first = t.shift();
        // T -> boolean
        if (first && ["t", "f"].includes(first)) {
            if (![undefined, ")", ":"].includes(t[0])) {
                throw new Error("unexpected token after boolean");
            }
            return first === "t";
        }
        // T -> ( T ) ? T : T
        if (first !== "(") {
            throw new Error("expected (");
        }
        const value = ptf();
        const closingB = t.shift();
        if (closingB !== ")") {
            throw new Error("expected )");
        }
        const qMark = t.shift();
        if (qMark !== "?") {
            throw new Error("expected ?");
        }
        const ifT = ptf();
        const colMark = t.shift();
        if (colMark !== ":") {
            throw new Error("expected :");
        }
        const elseT = ptf();
        return {
            value,
            if: ifT,
            else: elseT,
        };
    }
    return ptf();
}