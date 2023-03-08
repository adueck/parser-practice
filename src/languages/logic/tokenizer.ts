import {
    LogicToken,
    logicTokens,
} from "./grammar";

export function logicTokenizer(l: string): LogicToken[] {
    const tokens = l.toLowerCase()
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .split(/\s+/).filter(x => x);
    if (tokens.some(t => !logicTokens.includes(t as LogicToken))) {
        throw new Error("illegal token");
    }
    return tokens as LogicToken[];
} 