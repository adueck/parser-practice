export const expressionsGrammar =
`E -> E + T | E - T | T
T -> T * F | T / F | F
F -> (E) | number`;

export type Expr = {
    op: "+",
    left: Expr,
    right: Term,
} | {
    op: "-",
    left: Expr,
    right: Term,
} | Term;

export type Term = {
    op: "*",
    left: Term,
    right: Factor,
} | {
    op: "/",
    left: Term,
    right: Factor,
} | Factor;

export type Factor = number | [Expr];