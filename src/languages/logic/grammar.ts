export const logicGrammar =
`V -> E and V | E or V | E
E -> not E | B
B -> "t" | "f" | ( V )`;

export const logicTokens = ["f", "t", "and", "or", "not", "(", ")", "true", "false"] as const;
export type LogicToken = typeof logicTokens[number];

export type LogicV = {
    op: "and",
    left: LogicE,
    right: LogicV,
} | {
    op: "or",
    left: LogicE,
    right: LogicV,
} | LogicE;

export type LogicE = {
    op: "not",
    value: LogicE,
} | LogicB;

export type LogicB = true | false | [LogicV];