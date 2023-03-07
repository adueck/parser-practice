const logicTokens: LogicToken[] = ["t", "f", "and", "or", "not", "(", ")"];

export function logicTokenize(l: string): LogicToken[] {
    const tokens = l.toLowerCase()
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .split(/\s+/).filter(x => x);
    console.log(tokens);
    if (tokens.some(t => !logicTokens.includes(t as LogicToken))) {
        throw new Error("illegal token");
    }
    return tokens as LogicToken[];
} 