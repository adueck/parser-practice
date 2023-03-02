import { tokenizer } from "./tokenizer";

export function parseListString(l: string): List {
    const tokens = tokenizer(l);
    const { list, tokens: leftovers } = parseList(tokens);
    return list;
}

function parseList(tokens: ExpToken[]): {
    list: List,
    tokens: ExpToken[],
} {
    const [first, ...rest] = tokens;
    return parseListRest(rest, first as number);
}

function parseListRest(tokens: ExpToken[], left: List): {
    list: List,
    tokens: ExpToken[],
} {
    if (!tokens.length) {
        return {
            list: left,
            tokens: [],
        };
    }
    return parseListRest(tokens.slice(2), {
        op: "+",
        left,
        right: tokens[1] as number,
    });
}

export function parseListStringImp(l: string): List {
    const tokens = tokenizer(l);
    const num = tokens.shift() as number;
    return parseListRest(num);
    function parseListRest(left: List): List {
        if (!tokens.length) {
            return left;
        }
        return parseListRest({
            op: tokens.shift() as "+",
            left,
            right: tokens.shift() as number,
        });
    }
}



