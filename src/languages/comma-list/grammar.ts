export const cListGrammar = `C -> [ES]
ES -> ε | E ESTail
ESTail -> ε | , E ESTail
E -> number | C`;

// Alternate with double lookahead
// C -> [ES]
// ES -> ε | E
// E -> I | I , E
// I -> number | C

// Alternate with double lookahead - non empty
// C -> [ES]
// ES -> I | I , E
// I -> number | C

export type CList = Element[];
export type Element = number | CList;