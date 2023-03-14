import {
    RomanToken,
    romanTokens,
} from "./grammar";

export function romanTokenizer(s: string): RomanToken[] {
    const tokens = s.split("").filter(x => x);
    if (tokens.some(x => !romanTokens.includes(x as RomanToken))) {
        throw new Error("invalid token");
    }
    return tokens as RomanToken[];
}