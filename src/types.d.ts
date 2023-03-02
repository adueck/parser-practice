type ExpOpToken = "+" | "-" | "*" | "/";
type ExpToken = number | ExpOpToken | "(" | ")";

type List = {
    op: "+"
    left: List,
    right: number,
} | number;

type Expr = {
    op: "+",
    left: Expr,
    right: Term,
} | {
    op: "-",
    left: Expr,
    right: Term,
} | Term;

type Term = {
    op: "*",
    left: Term,
    right: Factor,
} | {
    op: "/",
    left: Term,
    right: Factor,
} | Factor;

type Factor = number | [Expr];
