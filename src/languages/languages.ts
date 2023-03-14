import logicLanguage from "./logic/language";
import miniLispLanguage from "./mini-lisp/language";
import ternaryLanguage from "./ternary/language";
import expressionLanguage from "./expressions/language";
import cListLanguage from "./comma-list/language";
import jsonLanguage from "./json/language";
// import romanNumeralsLanguage from "./roman-numerals.ts/language";

export const languages: {
    name: string,
    tokenizer: any,
    parsers: any[],
    evaluator: any,
    tests: {
        input: string,
        value: any,
    }[],
    errors: string[],
    grammar: string,
}[] = [
    miniLispLanguage,
    logicLanguage,
    expressionLanguage,
    cListLanguage,
    ternaryLanguage,
    jsonLanguage,
    // romanNumeralsLanguage,
];