export const miniLispGrammar =
// TODO: better naming of non-terminals
`SP -> SE | SE SP
SE -> A | SL
SL -> ( SP )
A -> number | boolean | string

Semantic rules:
 - The first SE in a SL must be a function or reference to a function
 - inbuilt functions are + - * / = < >
 - LISP like
   - variable defs: (let (string SE) SE)
   - lambda functions: (lambda string SE)
`;

export type SP = SE[];

export type SE = A | SL;

export type SL = {
  content: SP,
};

export type Lambda = {
  arg: string,
  body: SE,
};

export type A = boolean | string | number;
