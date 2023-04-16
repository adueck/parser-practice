import {
    SP, SE, SL, A, Lambda
} from "./grammar";

// SP -> SE | SE SP
// SE -> A | SL
// SL -> ( SP )
// A -> number | boolean | string

type VarTable = Record<string, Value>;

type Value = number | boolean | Lambda;

export function evaluateMiniLisp(sp: SP): Value[] {
    const varTable: VarTable = {};

    // evaluate root SP
    return sp.reduce((arr, s) => {
        const v = evaluateSE(s, varTable);
        return v === null
            ? arr
            : [...arr, v];
    }, [] as Value[]);
    
    function evaluateSE(se: SE, localVars: VarTable): Value {
        if (typeof se === "object") {
            return evaluateSL(se, localVars)
        } else {
            return evaluateA(se, localVars);
        }
    }
    
    function evaluateSL(sl: SL, localVars: VarTable): Value {
        const [f, ...elems] = sl.content;
        if (typeof f !== "string") {
            throw new Error("first element of S-Expr must be function name");
        }
        if (["+", "-", "*", "/", "=", "<", ">"].includes(f as string)) {
            const a = evaluateSE(elems[0], localVars);
            const b = evaluateSE(elems[1], localVars);
            if (f === "=") {
                return a === b;
            }
            if (typeof a !== "number" || typeof b !== "number") {
                throw new Error("arguments must be numbers");
            }
            if (f === "+") {
                return a + b;
            }
            if (f === "-") {
                return a - b;
            }
            if (f === "*") {
                return a * b;
            }
            if (f === "/") {
                return a / b;
            }
            if (f === ">") {
                return a > b;
            }
            if (f === "<") {
                return a < b;
            }
        }
        if (f === "if") {
            return evaluateSE(elems[0], localVars)
                ? evaluateSE(elems[1], localVars)
                : evaluateSE(elems[2], localVars);
        }
        if (f === "let") {
            const decl = elems[0];
            if (typeof decl !== "object") {
                throw new Error("illegal let format");
            }
            const varName = decl.content[0];
            const varVal = decl.content[1];
            if (typeof varName !== "string") {
                throw new Error("variable name must be string");
            }
            const newVars = {
                ...localVars,
                [varName]: evaluateSE(varVal, localVars),
            }
            const body = elems[1];
            return evaluateSE(body, newVars);
        }
        if (f === "lambda") {
            const args = elems[0];
            if (typeof args !== "object") {
                throw new Error("args for lambda must be s-expr of strings");
            }
            const body = elems[1];
            return {
                args: args.content as string[],
                body,
            };
        }
        const fv = localVars[f];
        if (typeof fv !== "object") {
            throw new Error(`function '${f}' not defined`);
        }
        return applyLambda(fv, elems, localVars);
    }

    function applyLambda(l: Lambda, v: SP, localVars: VarTable): Value {
        const newVars: VarTable = {
            ...localVars,
        };
        l.args.forEach((param, i) => {
            newVars[param] = evaluateSE(v[i], localVars);
        });
        return evaluateSE(l.body, newVars);
    }

    function evaluateA(a: A, localVars: VarTable): Value {
        if (typeof a === "number" || typeof a === "boolean") {
            return a;
        }
        const val = localVars[a];
        if (localVars[a] === undefined) {
            throw new Error(`undefined variable ${a}`);
        }
        return val;
    }

}

