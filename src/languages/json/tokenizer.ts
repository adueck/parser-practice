import { tokenizer } from "../../lib/tokenizer";

export function jsonTokenizer(s: string): (string | number)[] {
    return tokenizer(s);
}