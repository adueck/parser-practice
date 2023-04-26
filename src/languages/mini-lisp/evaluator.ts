import {
    SP, SE, SL, A,
} from "./grammar";
import { funMacro, letMacro } from "./macros";

// SP -> SE | SE SP
// SE -> A | SL
// SL -> ( SP )
// A -> number | boolean | string

type VarTable = Record<string, Value>;

export type Function = {
    args: string[],
    body: SE,
    env: VarTable,
};

type Value = number | boolean | Function;

export function evaluateMiniLisp(sp: SP): Value[] {
    const varTable: VarTable = {};

    // evaluate root SP
    return sp.reduce((arr, s) => {
        // check for top-level defines here
        if (typeof s === "object" && s.content[0] === "define") {
            Object.assign(varTable, handleDefine(s, varTable));
            return arr;
        }
        const v = evaluateSE(s, varTable);
        return v === null
            ? arr
            : [...arr, v];
    }, [] as Value[]);

    function handleDefine(s: SE, localVars: VarTable): VarTable {
        if (typeof s !== "object" || s.content[0] !== "define") {
            throw new Error("expected define statement");
        }
        const varName = s.content[1];
        const value = s.content[2];
        if (value === undefined) {
            throw new Error("value for variable definition required");
        }
        if (typeof varName === "object") {
            return handleDefine(funMacro(s), localVars);
        }
        if (typeof varName !== "string") {
            throw new Error("variable name for define statement must be a string");
        }
        const newVars = structuredClone(localVars);
        newVars[varName] = evaluateSE(value, newVars);
        return newVars;
    }
    
    function evaluateSE(se: SE, localVars: VarTable): Value {
        if (typeof se === "object") {
            return evaluateSL(se, localVars)
        } else {
            return evaluateA(se, localVars);
        }
    }
    
    function evaluateSL(sl: SL, localVars: VarTable): Value {
        const [fS, ...elems] = sl.content;
        const f = typeof fS === "string"
            ? fS
            : evaluateSE(fS, localVars);
        if (typeof f === "boolean") {
            throw new Error("boolean found instead of function at beginning of S-expr");
        }
        if (["+", "-", "*", "/", "=", "<", ">"].includes(f as string)) {
            if (f === "+") {
                return elems.reduce<number>((val, e) => {
                    return val + getNum(e, f);
                }, 0);
            }
            if (f === "-") {
                if (elems.length === 1) {
                    return - getNum(elems[0], f);
                }
                return elems.slice(1).reduce<number>((val, e) => {
                    return val - getNum(e, f);
                }, getNum(elems[0], f));
            }
            if (f === "*") {
                return elems.reduce<number>((val, e) => {
                    return val * getNum(e, f);
                }, 1);
            }
            if (f === "/") {
                if (elems.length < 1) {
                    throw new Error("/ expects at least one argument");
                }
                return elems.slice(1).reduce<number>((val, e) => {
                    return val * getNum(e, f);
                }, getNum(elems[0], f));
            }
            if (f === "=") {
                return dist(elems, (a, b) => a === b);
            }
            if (f === ">") {
                return dist(elems, (a, b) => a > b);
            }
            if (f === "<") {
                return dist(elems, (a, b) => a < b);
            }
            function dist(args: SE[], f: (a: Value, b: Value) => boolean): boolean {
                const [x, y, ...rest] = args;
                if (x === undefined || y === undefined) {
                    return true;
                }
                const xv = evaluateSE(x, localVars);
                const yv = evaluateSE(y, localVars);
                return f(xv, yv) && dist([y, ...rest], f);
            }
            function getNum(se: SE, fn: string): number {
                const n = evaluateSE(se, localVars);
                if (typeof n !== "number") {
                    throw new Error(`each argument for ${fn} must be a number`);
                }
                return n;
            }
        }
        if (f === "local") {
            const defines = elems[0];
            const body = elems[1];
            if (typeof defines !== "object") {
                throw new Error("defines section of local statement must be list of defiine statemens");
            }
            if (body === undefined) {
                throw new Error("body of local statement missing");
            }
            const newVars = defines.content.reduce((vars, x) => ({
                ...vars,
                ...handleDefine(x, localVars),
            }), localVars);
            return evaluateSE(body, newVars);
        }
        if (f === "if") {
            if (elems.length !== 3) {
                throw new Error("if statement requires three arguments");
            }
            return evaluateSE(elems[0], localVars)
                ? evaluateSE(elems[1], localVars)
                : evaluateSE(elems[2], localVars);
        }
        if (f === "let") {
            return evaluateSL(letMacro(sl), localVars);
        }
        if (f === "lambda") {
            const args = elems[0];
            if (typeof args !== "object" || args.content.some(x => typeof x !== "string")) {
                throw new Error("args for lambda must be s-expr of strings");
            }
            const body = elems[1];
            return {
                args: args.content as string[],
                body,
                env: localVars,
            };
        }
        if (f === "define") {
            throw new Error("found a definition that is not at the top level");
        }
        const fv = typeof f === "object" ? f : localVars[f];
        if (typeof fv !== "object") {
            throw new Error(`function '${f}' not defined`);
        }
        return applyLambda(fv, elems, localVars);
    }

    function applyLambda(l: Function, v: SP, localVars: VarTable): Value {
        const newVars: VarTable = {
            ...localVars,
            ...l.args.reduce((vars, param, i) => {
                return {
                    ...vars,
                    [param]: evaluateSE(v[i], localVars),
                };
            }, {}),
            ...l.env,
        };
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
