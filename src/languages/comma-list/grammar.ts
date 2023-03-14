export const cListGrammar = `C -> [ES]
ES -> ε | E ESTail
ESTail -> ε | , E ESTail
E -> n | C`

// Alternate ES
// ES -> E | ε

// double lookahead
// E -> number | number , E
// single lookahead
// E -> ε | number ETail
// ETail -> ε | , number ETail

export type CList = Element[];
export type Element = number | CList;