// S -> number
// S -> SL
// SL -> (F S S)
// F -> "+" | "-" | "*" | "/"

export type SExp = number | SL;

export type SL = [
    FExp,
    SExp,
    SExp,
];

export type FExp = "+" | "-" | "*" | "/";

