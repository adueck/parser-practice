import {
    SE, A,
} from "./grammar";
import { funMacro, macros } from "./macros";

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

type Value = number | boolean | Function | string;

export function evaluateMiniLisp(sp: SE[]): Value[] {
    const varTable: VarTable = {};

    // evaluate root SP
    return sp.reduce((arr, s) => {
        // check for top-level defines here
        if (Array.isArray(s) && s[0] === "define") {
            Object.assign(varTable, handleDefine(s, varTable));
            return arr;
        }
        const v = evaluateSE(s, varTable);
        return v === null
            ? arr
            : [...arr, v];
    }, [] as Value[]);

    function handleDefine(s: SE, localVars: VarTable): VarTable {
        if (!Array.isArray(s) || s[0] !== "define") {
            throw new Error("expected define statement");
        }
        const varName = s[1];
        const value = s[2];
        if (value === undefined) {
            throw new Error("value for variable definition required");
        }
        if (Array.isArray(varName)) {
            return handleDefine(funMacro(s), localVars);
        }
        if (typeof varName !== "string") {
            throw new Error("variable name for define statement must be a string");
        }
        return {
            ...structuredClone(localVars),
            [varName]: evaluateSE(value, localVars),
        };
    }
    
    function evaluateSE(se: SE, localVars: VarTable): Value {
        if (Array.isArray(se)) {
            return evaluateSL(se, localVars)
        } else {
            return evaluateA(se, localVars);
        }
    }
    
    function evaluateSL(sl: SE[], localVars: VarTable): Value {
        const [fS, ...elems] = sl;
        const f = typeof fS === "string"
            ? fS
            // this means I can use "strings" as function names! Is this a good idea??
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
        if (f === "boolean?") {
            return typeof evaluateSE(elems[0], localVars) === "boolean";
        }
        if (f === "string?") {
            return typeof evaluateSE(elems[0], localVars) === "string";
        }
        if (f === "number?") {
            return typeof evaluateSE(elems[0], localVars) === "number";
        }
        if (f === "local") {
            const defines = elems[0];
            const body = elems[1];
            if (!Array.isArray(defines)) {
                throw new Error("defines section of local statement must be list of defiine statemens");
            }
            if (body === undefined) {
                throw new Error("body of local statement missing");
            }
            const newVars = defines.reduce((vars, x) => ({
                ...vars,
                ...handleDefine(x, vars),
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
        if (f === "lambda") {
            const args = elems[0];
            if (!Array.isArray(args) || args.some(x => typeof x !== "string")) {
                throw new Error("args for lambda must be s-expr of strings");
            }
            const body = elems[1];
            return {
                args: args as string[],
                body,
                env: localVars,
            };
        }
        if (f === "define") {
            throw new Error("found a definition that is not at the top level");
        }
        if (f === "error") {
            const msg = evaluateSE(elems[0], localVars);
            throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
        }
        const fv = typeof f === "object" ? f : localVars[f];
        if (typeof fv !== "object") {
            if (typeof f === "string") {
                const macro = macros[f];
                if (macro) {
                    return evaluateSE(macro(sl), localVars);
                }
            }
            throw new Error(`function '${f}' not defined`);
        }
        return applyFunction(fv, elems, localVars);
    }

    function applyFunction(l: Function, v: SE[], localVars: VarTable): Value {
         const newVars: VarTable = {
            ...structuredClone(localVars),
            ...l.args.reduce((vars, param, i) => {
                return {
                    ...vars,
                    [param]: evaluateSE(v[i], localVars),
                };
            }, {}),
            ...structuredClone(l.env),
        };
        return evaluateSE(l.body, newVars);
    }
    
    function evaluateA(a: A, localVars: VarTable): Value {
        if (typeof a === "number" || typeof a === "boolean") {
            return a;
        }
        if (typeof a === "object") {
            return a.s;
        }
        const val = localVars[a];
        if (localVars[a] === undefined) {
            throw new Error(`undefined variable ${a}`);
        }
        return val;
    }

}
