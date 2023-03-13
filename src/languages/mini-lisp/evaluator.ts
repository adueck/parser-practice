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
        // SL is a define statement
        if (op === "define") {
            evaluateDefine(sl, localVars);
            return null;
        }
        if (op === "local") {
            return evaluateLocal(args[0], args[1], localVars);
        }
        // SL is a regular SL, look for function
        if (typeof op === "string") {
            const inBuiltF = inbuiltFunctions[op];
            if (inBuiltF) {
                return inBuiltF(...args.map(a => evaluateSE(a, localVars)));
            }
        }
        const opF = typeof op === "string"
            ? localVars[op]
            : op;
        if (typeof opF === "object" && opF.content[0] === "lambda") {
            return evaluateLambda(opF, args, localVars);
        }
        throw new Error("first argument of SE must be a function")
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

    function evaluateLocal(defines: SE, body: SE, localVars: VarTable): number | boolean | null {
        if (typeof defines !== "object") {
            throw new Error("defines section in local must be a list of define statements");
        }
        defines.content.forEach((line) => {
            if (typeof line !== "object" || line.content[0] !== "define") {
                throw new Error("each statement in defines section of local must be a define statement");
            }
            evaluateDefine(line, localVars);
        });
        return evaluateSE(body, localVars);
    }

    function evaluateDefine(sl: SL, localVars: VarTable) {
        const [op, ...args] = sl.content;
        const firstArg = args[0];
        if (typeof firstArg === "object") {
            // (define (x) ...) shorthand
            const [fName, ...paramArgs] = firstArg.content;
            if (typeof fName !== "string") {
                throw new Error("function variable name must be a string");
            }
            localVars[fName] = {
                content: [
                    "lambda",
                    { content: paramArgs },
                    args[1]
                ],
            };
        } else {
            // regular define statement
            if (typeof firstArg !== "string") {
                throw new Error("variable name must be a string");
            }
            localVars[firstArg] = args[1];
        }
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

