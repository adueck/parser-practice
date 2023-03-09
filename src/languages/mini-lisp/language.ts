import { miniLispTokenizer } from "./tokenizer";
import miniLispParsers from "./parser";
import { evaluateMiniLisp } from "./evaluator";
import { miniLispGrammar } from "./grammar";

export default {
    name: "mini-lisp",
    tokenizer: miniLispTokenizer,
    parsers: miniLispParsers,
    evaluator: evaluateMiniLisp,
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
            input: "(- (* 2 (/ 10 2)) 5)",
            value: [5],
        },
        {
            input: `(define a (+ 4 6))
(define b (* a 2))
(* b 5)`,
            value: [100],
        },
        {
            input: `(define add1 (lambda (x) (+ x 1)))
(add1 6)`,
            value: [7],
        },
        {
            input: `(define add (lambda (x y) (+ x y)))
(add 2 4)`,
            value: [6],
        },
        {
            input: `(= (< 10 (+ 10 3)) t (= t t))
(* 2 4)
f
`,
            value: [true, 8, false],
        },
        {
            input: `(local
    ((define internalV1 10)
     (define internalV2 20))
(+ internalV1 internalV2))`,
            value: [30],
        },
        {
            input: `(define (average x y) (/ (+ x y) 2))
(average 10 20)`,
            value: [15],
        },
    ],
    grammar: miniLispGrammar,
};