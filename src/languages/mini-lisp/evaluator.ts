import {
    SExp,
    SL,
} from "./types";

export function evaluateSExp(l: SExp): number | boolean {
    if (typeof l === "number" || typeof l === "boolean") {
        return l;
    }
    return evaluateSL(l);
}

export function evaluateSL(sl: SL): number | boolean {
    const [op, arg1, arg2] = sl;
    const v1 = evaluateSExp(arg1);
    const v2 = evaluateSExp(arg2);
    if (op === "<") {
        return v1 < v2;
    }
    if (op === ">") {
        return v1 > v2;
    }
    if (op === "=") {
        return v1 === v2;
    }
    if (typeof v1 !== "number" || typeof v2 !== "number") {
        throw new Error("cannot do mathematical operation on non-number value");
    }
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