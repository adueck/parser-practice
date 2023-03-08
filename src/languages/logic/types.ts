export const logicTokens = ["f", "t", "and", "or", "not", "(", ")"] as const;
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