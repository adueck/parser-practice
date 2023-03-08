import {
    LP,
    SExp,
    SL,
} from "./grammar";
import inbuiltFunctions from "./inbuilt-functions";

export function evaluateMiniLisp(lp: LP): (number | boolean)[] {
    const varTable: Record<string, any> = {};
    return evaluateLP(lp);
    function evaluateLP(lp: LP): (number | boolean)[] {
        return lp.reduce((arr, s) => {
            const v = evaluateSExp(s);
            return v === null
                ? arr
                : [...arr, v];
        }, [] as (number | boolean)[]);
    }
    
    function evaluateSExp(l: SExp): number | boolean | null {
        if (typeof l === "number" || typeof l === "boolean") {
            return l;
        }
        if (typeof l === "string") {
            if (varTable[l] === undefined) {
                throw new Error(`undefined variable ${l}`);
            }
            return evaluateSExp(varTable[l]);
        }
        return evaluateSL(l);
    }
    
    function evaluateSL(sl: SL): number | boolean | null {
        const [op, args] = sl;
        if (op === "d") {
            // @ts-ignore
            varTable[args[0]] = evaluateSExp(args[1]);
            return null;
        }
        const f = inbuiltFunctions[op];
        if (!f) {
            throw new Error("unknown operator/function");
        }
        return f(...args.map(evaluateSExp));
    }
}

