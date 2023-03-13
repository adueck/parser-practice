// The grammar

// E -> E + T | E - T | T
// T -> T * F | T / F | F
// F -> (E) | digit

// is translated to

// E -> T E'
// E' -> + T E' | - T E' | epsilon
// T -> F E'
// T' -> * F T' | / F T' | epsilon
// F -> (E) | digit

// to remove left recursion

import { useTokens } from "../../lib/useTokens";
import {
    Expr,
    Factor,
    Term,
} from "./grammar";

export function parseExprF(tokens: (string|number)[]): Expr {
    const t = useTokens(tokens);
    const e = parseExpr();
    if (!t.isEmpty()) {
        throw new Error("trailing tokens");
    }
    return e;

    function parseExpr(): Expr {
        const term = parseTerm();
        return parseEComma(term);
    }
    function parseEComma(left: Expr): Expr {
        const op = t.lookahead();
        if (op === "+" || op === "-") {
            t.consume();
            return parseEComma({
                op,
                left,
                right: parseTerm(), 
            });
        }
        return left;
    }
    function parseTerm(): Term {
        return parseTermComma(parseFactor());
    }

    function parseTermComma(left: Term): Term {
        const op = t.lookahead();
        if (op === "*" || op === "/") {
            t.consume();
            return parseTermComma({
                op,
                left,
                right: parseFactor(),
            });
        }
        return left;
    }

    function parseFactor(): Factor {
        const l = t.lookahead();
        if (l === "(") {
            t.match("(");
            const expr = parseExpr();
            t.match(")");
            return [expr];
        }
        if (typeof l !== "number") {
            throw new Error("expected number");
        }
        t.consume();
        return l;
    }
}

export default [
    {
        parser: parseExprF,
        label: "parseExpr",
    },
];