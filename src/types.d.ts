type ExpOpToken = "+" | "-" | "*" | "/";
type ExpToken = number | ExpOpToken | "(" | ")";
type CListToken = number | ",";
type TernaryToken = "t" | "f" | "?" | ":" | "(" | ")";

type Ternary = {
    value: Ternary,
    if: Ternary,
    else: Ternary,
} | boolean;

type CList = number[];

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
