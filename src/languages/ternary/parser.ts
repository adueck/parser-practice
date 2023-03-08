import {
    Ternary
} from "./types";

// T -> boolean
// T -> ( T ) ? T : T

export function parseTernaryF(tokens: Readonly<(string|number)[]>): Ternary {
    const t = [...tokens];
    function ptf(): Ternary {
        const first = t.shift();
        // T -> boolean
        if (first && ["t", "f"].includes(first as string)) {
            if (![undefined, ")", ":"].includes(t[0] as string)) {
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

export default [parseTernaryF];