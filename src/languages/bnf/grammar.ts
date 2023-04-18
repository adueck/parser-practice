export const bnfGrammar = `G -> G P | P
P -> NT ::= RS
NT -> <string>
RS -> RS | NT | T
T -> string
`;

// G -> P G'
// G' -> P G' | epsilon
// P -> NT ::= RS
// RS -> NT | T | RS'
// RS' -> NT | T | epsilon
// NT -> <string>
// T -> string

export type NonTerminal = {
    type: "non-terminal",
    val: string,
};

export type Terminal = {
    type: "terminal",
    val: string,
}

export type Production = {
    left: NonTerminal,
    right: (NonTerminal | Terminal)[],
}