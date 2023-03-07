// C -> n
// C -> n,C
// C -> epsilon

import { tokenizer } from "./tokenizer";

export function parseCList(l: string): CList {
    let tokens = tokenizer<CListToken>(l);
    let clist: CList = [];
    while (tokens.length > 0) {
        const first = tokens.shift();
        const second = tokens.shift();
        if (typeof first !== "number") {
            throw new Error("expected number");
        }
        if (second !== undefined && second !== ",") {
            throw new Error("unexpected token");
        }
        clist.push(first as number);
    }
    return clist;
}

export function parseCListF(l: string): CList {
    return parseCTokens(tokenizer<CListToken>(l));
}

function parseCTokens(tokens: CListToken[]): CList {
    if (tokens.length === 0) {
        return [];
    }
    let t = [...tokens];
    function pclf(c: CList): CList {
        const first = t.shift();
        const second = t.shift();
        if (first === undefined) {
            return c;
        }
        if (typeof first !== "number") {
            throw new Error("expected number");
        }
        if (second !== undefined && second !== ",") {
            throw new Error("unexpected token");
        }
        return pclf([...c, first]);
    }
    const clist = pclf([]);
    if (t.length > 0) {
        throw new Error("trailing tokens");
    }
    return clist;
}