import {
    SE,
} from "./grammar";

export function letMacro(sl: SE): SE {
    if (!Array.isArray(sl)) {
        throw new Error("need an SExpr for define function macro");
    }
    if (sl[0] !== "let") {
        throw new Error("invalid macro");
    }
    if (!Array.isArray(sl[1]) || typeof sl[1][0] !== "string") {
        throw new Error("invalid let syntax");
    }
    if (sl[2] === undefined) {
        throw new Error("body missing in let statement");
    }
    const [letLabel, [varName, varVal], body] = sl;
    return [
        "local",
        [["define", varName, varVal]],
        body,
    ];
} 

export function funMacro(sl: SE): SE {
    if (!Array.isArray(sl)) {
        throw new Error("need an SExpr for define function macro");
    }
    if (sl[0] !== "define") {
        throw new Error("invalid macro");
    }
    if (!Array.isArray(sl[1]) || typeof sl[1][0] !== "string" || sl[1].slice(1).some(v => typeof v !== "string")) {
        throw new Error("invalid define function syntax");
    }
    if (sl[2] === undefined) {
        throw new Error("body missing in function definition");
    }
    const [defLabel, [funName, ...args], body] = sl;
    return [
        "define",
        funName,
        ["lambda", args, body],
    ];
}

export function strictIfMacro(sl: SE): SE {
    if (!Array.isArray(sl)) {
        throw new Error("need an SExpr for strictIf macro");
    }
    if (sl[0] !== "strictIf") {
        throw new Error("invalid macro");
    }
    if (sl.length < 4) {
        throw new Error("strictlyIf requires 3 arguments");
    }
    const [label, cond, thenBranch, elseBranch] = sl;
    return [
        "if",
        ["boolean?", cond],
        ["if", cond, thenBranch, elseBranch],
        ["error", { s: "expected a boolean for strictIf" }],
    ];
}