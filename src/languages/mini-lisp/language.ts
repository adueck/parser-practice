import { miniLispTokenizer } from "./tokenizer";
import miniLispParsers from "./parser";
import { evaluateLP } from "./evaluator";
import { miniLispGrammar } from "./grammar";

export default {
    name: "mini-lisp",
    tokenizer: miniLispTokenizer,
    parsers: miniLispParsers,
    evaluator: evaluateLP,
    tests: [
        {
            input: "5",
            value: [5],
        },
        {
            input: "(+ 1 5 4)",
            value: [10],
        },
        {
            input: "(< 1 2 3 4 5)",
            value: [true],
        },
        {
            input: "(< 1 2 4 3 5)",
            value: [false],
        },
        {
            input: "(* 2 (/ 10 2))",
            value: [10],
        },
        {
            input: "(- (* 2 (/ 10 2)) 5)",
            value: [5],
        },
        {
            input: `(= (< 10 (+ 10 3)) t (= t t))
(* 2 4)
f
`,
            value: [true, 8, false],
        },
    ],
    grammar: miniLispGrammar,
};