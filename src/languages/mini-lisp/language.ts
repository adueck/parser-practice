import { miniLispTokenizer } from "./tokenizer";
import miniLispParsers from "./parser";
import { evaluateSExp } from "./evaluator";
import { miniLispGrammar } from "./types";

export default {
    name: "mini-lisp",
    tokenizer: miniLispTokenizer,
    parsers: miniLispParsers,
    evaluator: evaluateSExp,
    tests: [
        {
            input: "5",
            value: 5,
        },
        {
            input: "(+ 1 5)",
            value: 6,
        },
        {
            input: "(* 2 (/ 10 2))",
            value: 10,
        },
        {
            input: "(- (* 2 (/ 10 2)) 5)",
            value: 5,
        },
        {
            input: "(= (< 10 (+ 10 3)) t)",
            value: true,
        },
    ],
    grammar: miniLispGrammar,
};