const logicTokens: LogicToken[] = ["t", "f", "and", "or", "not"];

export function logicTokenize(l: string): LogicToken[] {
    const tokens = l.toLowerCase().split(/\s+/).filter(x => x);
    if (tokens.some(t => !logicTokens.includes(t as LogicToken))) {
        throw new Error("illegal token");
    }
    return tokens as LogicToken[];
} 