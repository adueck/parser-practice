import {
    LP,
    SExp,
    SL,
} from "./grammar";

const inbuiltFunctions = {
    "+": (...args: any[]) => {
        return args.reduce((acc, x) => acc + x, 0);
    },
    "-": (...args: any[]) => {
        const [first, ...rest] = args;
        return rest.reduce((acc, x) => acc - x, first);
    },
    "*": (...args: any[]) => {
        const [first, ...rest] = args;
        return rest.reduce((acc, x) => acc * x, first);
    },
    "/": (...args: any[]) => {
        const [first, ...rest] = args;
        return rest.reduce((acc, x) => acc / x, first);
    },
    "=": (...args: any[]) => {
        const [first, ...rest] = args;
        return rest.every(x => x === first);
    },
    ">": (...args: any[]) => {
        function greaterThan(a: any[]): boolean {
            const [first, second, ...rest] = a;
            if (second === undefined) {
                return true;
            }
            return (first > second) && greaterThan([second, ...rest]);
        }
        return greaterThan(args);
    },
    "<": (...args: any[]) => {
        function lessThan(a: any[]): boolean {
            const [first, second, ...rest] = a;
            if (second === undefined) {
                return true;
            }
            return (first < second) && lessThan([second, ...rest]);
        }
        return lessThan(args);
    },
}

export function evaluateLP(lp: LP): (number | boolean)[] {
    return lp.map(evaluateSExp);
}

function evaluateSExp(l: SExp): number | boolean {
    if (typeof l === "number" || typeof l === "boolean") {
        return l;
    }
    return evaluateSL(l);
}

function evaluateSL(sl: SL): number | boolean {
    const [op, args] = sl;
    const f = inbuiltFunctions[op];
    if (!f) {
        throw new Error("unknown operator/function");
    }
    return f(...args.map(evaluateSExp));
}