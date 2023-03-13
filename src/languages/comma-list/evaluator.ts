import {
    CList,
} from "./grammar";

export function evaluateCList(clist: CList): number {
    return clist.reduce<number>((acc, curr) => {
        const val = typeof curr === "number"
            ? curr
            : evaluateCList(curr as CList);
        return acc + val;
    }, 0);
}