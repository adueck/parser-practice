import {
    LogicV,
    LogicE,
    LogicB,
} from "./types";

export function logicEvaluator(v: LogicV): boolean {
    if (typeof v === "object" && "op" in v) {
        if (v.op === "and") {
            return logicEvaluator(v.left) && logicEvaluator(v.right);
        } else if (v.op === "or") {
            return logicEvaluator(v.left) || logicEvaluator(v.right);
        }
    }
    return evalE(v);
}

function evalE(e: LogicE): boolean {
    if (typeof e === "object" && "op" in e) {
        return !evalE(e.value);
    }
    return evalB(e);
}

function evalB(e: LogicB): boolean {
    if (Array.isArray(e)) {
        return logicEvaluator(e[0]);
    }
    return e;
}