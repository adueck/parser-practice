import {
    CList,
} from "./types";

export function evaluateCList(clist: CList): number {
    return clist.reduce((acc, curr) => acc+curr, 0);
}