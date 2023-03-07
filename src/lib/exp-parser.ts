import { tokenizer } from "./tokenizer";

export function parseExprString(l: string): Expr {
    const tokens = tokenizer<ExpToken>(l);
    const { expr, tokens: tokensLeft } = parseExpr(tokens);
    return expr;
}

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

function parseExpr(tokens: ExpToken[]): {
    expr: Expr,
    tokens: ExpToken[],
} {
    // T E'
    const { term: startingTerm, tokens: tokensRest } = parseTerm(tokens);
    return parseExpRest(tokensRest, startingTerm);
}

function parseExpRest(tokens: ExpToken[], left: Expr): {
    expr: Expr,
    tokens: ExpToken[],
} {
    // + T E' | - T E'
    if (tokens[0] === "+" || tokens[0] === "-") {
        const { term, tokens: tokensRest } = parseTerm(tokens.slice(1));
        return parseExpRest(tokensRest, {
            op: tokens[0],
            left,
            right: term, 
        });
    }
    // epsilon
    return {
        expr: left,
        tokens,
    };
}

function parseTerm(tokens: ExpToken[]): {
    term: Term,
    tokens: ExpToken[],
} {
    // F T'
    const { factor: startingFactor, tokens: tokensRest } = parseFactor(tokens);
    return parseTermRest(tokensRest, startingFactor);
}

function parseTermRest(tokens: ExpToken[], left: Term): {
    term: Term,
    tokens: ExpToken[],
} {
    // * F T' | * / F T'
    if (tokens[0] === "*" || tokens[0] === "/") {
        const { factor, tokens: tokensRest } = parseFactor(tokens.slice(1));
        return parseTermRest(tokensRest, {
            op: tokens[0],
            left,
            right: factor,
        });
    }
    // epsilon
    return {
        term: left,
        tokens: tokens.slice(0),
    };
}

function parseFactor(tokens: ExpToken[]): {
    factor: Factor,
    tokens: ExpToken[],
} {
    // ( Expr )
    if (tokens[0] === "(") {
        const { expr, tokens: tokensRest } = parseExpr(tokens.slice(1));
        return {
            factor: [expr],
            tokens: tokensRest.slice(1),
        };
    }
    // Digit
    return {
        factor: tokens[0] as number,
        tokens: tokens.slice(1),
    };
}

