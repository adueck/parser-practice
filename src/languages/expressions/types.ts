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