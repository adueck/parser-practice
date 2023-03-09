import {
    SP, SE, SL, A,
} from "./grammar";
import inbuiltFunctions from "./inbuilt-functions";

// SP -> SE | SE SP
// SE -> A | SL
// SL -> ( SP )
// A -> number | boolean | string

type VarTable = Record<string, any>;

export function evaluateMiniLisp(sp: SP): (number | boolean)[] {
    const varTable: VarTable = {};

    // evaluate root SP
    return sp.reduce((arr, s) => {
        const v = evaluateSE(s, varTable);
        return v === null
            ? arr
            : [...arr, v];
    }, [] as (number | boolean)[]);
    
    function evaluateSE(se: SE, localVars: VarTable): number | boolean | null {
        if (typeof se === "object") {
            return evaluateSL(se, localVars)
        } else {
            return evaluateA(se, localVars);
        }
    }
    
    function evaluateSL(sl: SL, localVars: VarTable): number | boolean | null {
        const { content } = sl;
        const [op, ...args] = content;
        if (op === "define") {
            const varName = args[0];
            // TODO: allow lambda shorthand
            if (typeof varName !== "string") {
                throw new Error("variable name must be a string");
            }
            localVars[varName] = args[1];
            return null;
        }
        if (typeof op === "string") {
            // TODO: nicer handling of this
            const f = localVars[op];
            if (typeof f === "object" && f.content[0] === "lambda") {
                return evaluateLambda(f, args, localVars);
            }
            if (f !== undefined) {
                throw new Error("first argument of SE must be a function");
            }
            const g = inbuiltFunctions[op];
            if (!g) {
                throw new Error("unknown operator/function");
            }
            // TODO: provide away to to do lazy evaluation of the arguments
            // going into a function
            return g(...args.map(a => evaluateSE(a, localVars)));
        }
        if (typeof op === "object" && op.content[0] === "lambda") {
            return evaluateLambda(op, args, localVars);
        }
        throw new Error("first argument of SE must be a function");
    }

    function evaluateA(a: A, localVars: VarTable): number | boolean | null {
        if (typeof a === "number" || typeof a === "boolean") {
            return a;
        }
        if (localVars[a] === undefined) {
            throw new Error(`undefined variable ${a}`);
        }
        return evaluateSE(localVars[a], localVars);
    }

    function evaluateLambda(l: SE, args: SE[], localVars: VarTable): number | boolean | null {
        const lambdaVars = {
            ...localVars,
        };
        if (typeof l !== "object" || l.content[0] !== "lambda") {
            throw new Error("not a lambda function");
        }
        const lArgs = l.content[1]
        const lBody = l.content[2];
        if (typeof lArgs !== "object" || lArgs.content.some(x => typeof x !== "string")) {
            throw new Error("arguments of lambda expression must be all strings inside ( )");
        }
        const varNames = lArgs.content as string[];
        varNames.forEach((varName, i) => {
            lambdaVars[varName] = args[i];
        });
        return evaluateSE(lBody, lambdaVars);
    }
}

