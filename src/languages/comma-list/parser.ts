// C -> n
// C -> n,C
// C -> epsilon

import {
    CList,
} from "./grammar";

export function parseCListImp(tokens: Readonly<(string|number)[]>): CList {
    let t = [...tokens];
    let clist: CList = [];
    while (t.length > 0) {
        const first = t.shift();
        const second = t.shift();
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

export function parseCListFunc(tokens: Readonly<(string|number)[]>): CList {
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

export default [
    {
        parser: parseCListImp,
        label: "parseCListImp",
    },
    {
        parser: parseCListFunc,
        label: "parseCListFunc",
    },
];