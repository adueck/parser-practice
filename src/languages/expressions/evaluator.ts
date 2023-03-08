import {
    Expr,
    Term,
    Factor,
} from "./grammar";

export function evaluateExpr(expr: Expr): number {
    if (typeof expr === "object" && !Array.isArray(expr) && (expr.op === "+" || expr.op === "-")) {
        const left = evaluateExpr(expr.left);
        const right = evaluateTerm(expr.right);
        if (expr.op === "+") {
            return left + right;
        }
        if (expr.op === "-") {
            return left - right;
        }
    }
    return evaluateTerm(expr);
}

function evaluateTerm(term: Term): number {
    if (typeof term === "object" && !Array.isArray(term)) {
        const left = evaluateTerm(term.left);
        const right = evaluateFactor(term.right);
        if (term.op === "*") {
            return left * right;
        }
        // if (term.op === "/") {
            return left / right;
        // }
    }
    return evaluateFactor(term);
}

function evaluateFactor(factor: Factor): number {
    if (typeof factor === "number") {
        return factor;
    }
    return evaluateExpr(factor[0]);
}
