import { tokenizer } from "../../lib/tokenizer";

export function expressionTokenizer(l: string): (string|number)[] {
    return tokenizer(l);
}