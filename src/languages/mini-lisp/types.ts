export const miniLispGrammar =
`S -> number | "t" | "f"
S -> SL
SL -> (F S S)
F -> "+" | "-" | "*" | "/" | "<" | ">" | "="`;


export type SExp = number | boolean | SL;

export type SL = [
    FExp,
    SExp,
    SExp,
];

export type FExp = "+" | "-" | "*" | "/" | ">" | "<" | "=";

