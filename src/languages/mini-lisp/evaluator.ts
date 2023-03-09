import {
    SP, SE, SL, A,
} from "./grammar";
import inbuiltFunctions from "./inbuilt-functions";

// SP -> SE | SE SP
// SE -> A | SL
// SL -> ( SP )
// A -> number | boolean | string

export function evaluateMiniLisp(sp: SP): (number | boolean)[] {
    const varTable: Record<string, any> = {};

    // evaluate root SP
    return sp.reduce((arr, s) => {
        const v = evaluateSE(s);
        return v === null
            ? arr
            : [...arr, v];
    }, [] as (number | boolean)[]);
    
    function evaluateSE(se: SE): number | boolean | null {
        if (typeof se === "object") {
            return evaluateSL(se)
        } else {
            return evaluateA(se);
        }
    }
    
    function evaluateSL(sl: SL): number | boolean | null {
        const { content } = sl;
        const [op, ...args] = content;
        if (typeof op !== "string") {
            throw new Error("first element of s-expr must be a function");
        }
        if (op === "define") {
            const varName = args[0];
            if (typeof varName !== "string") {
                throw new Error("variable name must be a string");
            }
            varTable[varName] = args[1];
            return null;
        }
        const f = inbuiltFunctions[op];
        if (!f) {
            throw new Error("unknown operator/function");
        }
        return f(...args.map(evaluateSE));
    }

    function evaluateA(a: A): number | boolean | null {
        if (typeof a === "number" || typeof a === "boolean") {
            return a;
        }
        if (varTable[a] === undefined) {
            throw new Error(`undefined variable ${a}`);
        }
        return evaluateSE(varTable[a]);
    }
}

