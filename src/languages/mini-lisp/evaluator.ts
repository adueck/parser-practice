import {
    SExp,
    SL,
} from "./types";

export function evaluateSExp(l: SExp): number {
    if (typeof l === "number") {
        return l;
    }
    return evaluateSL(l);
}

export function evaluateSL(sl: SL): number {
    const [op, arg1, arg2] = sl;
    const v1 = evaluateSExp(arg1);
    const v2 = evaluateSExp(arg2);
    if (op === "*") {
        return v1 * v2;
    }
    if (op === "/") {
        return v1 / v2;
    }
    if (op === "+") {
        return v1 + v2;
    }
    if (op === "-") {
        return v1 - v2;
    }
    throw new Error("unknown operator");
}