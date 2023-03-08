import {
    Ternary,
} from "./types";

export function evaluateTernary(t: Ternary): boolean {
    if (typeof t === "boolean") {
        return t;
    }
    return evaluateTernary(t.value)
        ? evaluateTernary(t.if)
        : evaluateTernary(t.else);
}