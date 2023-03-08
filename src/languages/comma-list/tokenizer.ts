import { tokenizer } from "../../lib/tokenizer";

export function cListTokenizer(l: string): (string|number)[] {
    return tokenizer(l);
}