type ExpOpToken = "+" | "-" | "*" | "/";
type ExpToken = number | ExpOpToken | "(" | ")";
type CListToken = number | ",";
type TernaryToken = "t" | "f" | "?" | ":" | "(" | ")";
type LogicToken = "f" | "t" | "and" | "or" | "not" | "(" | ")";

type LogicV = {
    op: "and",
    left: LogicE,
    right: LogicV,
} | {
    op: "or",
    left: LogicE,
    right: LogicV,
} | LogicE;

type LogicE = {
    op: "not",
    value: LogicE,
} | LogicB;

type LogicB = true | false | [LogicV];

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
