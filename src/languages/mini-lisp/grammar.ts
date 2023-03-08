export const miniLispGrammar =
// TODO: better naming of non-terminals
`LP -> S | S LP
S -> number | "t" | "f"
S -> SL
SL -> (F LP)
F -> "+" | "-" | "*" | "/" | "<" | ">" | "="`;

export type LP = SExp[];

export type SExp = number | boolean | SL;

export type SL = [
    FExp,
    LP,
];

export type FExp = "+" | "-" | "*" | "/" | ">" | "<" | "=";

