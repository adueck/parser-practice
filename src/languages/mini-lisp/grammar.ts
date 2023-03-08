export const miniLispGrammar =
// TODO: better naming of non-terminals
`LP -> S | S LP
S -> number | "t" | "f" | var
S -> SL
SL -> (F LP)
F -> "+" | "-" | "*" | "/" | "<" | ">" | "=" | "d"
note:
 - "d" stands for define (for defining a variable)
 - variable names may only be one character
`;

export type LP = SExp[];

export type SExp = number | boolean | SL | string;

export type SL = [
    FExp,
    LP,
];

export type FExp = "+" | "-" | "*" | "/" | ">" | "<" | "=" | "d";

