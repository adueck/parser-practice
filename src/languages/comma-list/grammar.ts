export const cListGrammar = `
C -> [ES]
ES -> E ES'
ES' -> , ES | ε
E -> n | C`

// if using double lookahead
// ES -> n
// ES -> n,C
// ES -> ε`;

export type CList = Element[];
export type Element = number | CList;