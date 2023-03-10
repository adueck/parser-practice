export const miniLispGrammar =
// TODO: better naming of non-terminals
`SP -> SE | SE SP
SE -> A | SL
SL -> ( SP )
A -> number | boolean | string

Semantic rules:
 - The first SE in a SL must be a function or reference to a function
 - inbuilt functions are + - * / = < >
 - Racket/Scheme like:
   - variable defs: (define varName SE)
   - lambda functions: (lambda (a b c ...) SE)
   - function def shorthand: (define (myF x ...) SE)
   - local var definitions: (local ((define ...) ...) SE)
`;

export type SP = SE[];

export type SE = A | SL;

export type SL = {
    content: SP,
};

export type A = boolean | string | number;
