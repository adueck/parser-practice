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
            input: "(+ 3 (- 8 1))",
            value: [10],
        },
        {
            input: `(let
  (fibb (lambda (x) (if (< x 3)
                      x
                      (+ (fibb (- x 2)) (fibb (- x 1))))))
    (fibb 7))`,
            value: [21],
        },
        {
            input: `(- 5)
(- 10 1)
(let (x 2)
  (let (y 3)
    (+ x y)))`,
            value: [-5, 9, 5],            
        },
        {
            input: `(let (addMe (lambda (x y z) (+ x y z)))
  (addMe 3 7 2))`,
            value: [12],
        },
        {
            input:`(define lim 32)
(define (canPlay c total) (< (+ c total) lim))
(canPlay 5 10)
(canPlay 30 3)            
`,
            value: [true, false],
        },
        {
            input: `(local
    ((define x 1)
     (define y 5))
        (- x y))`,
            value: [-4],
        },
    ],
    errors: [
        "(+ 3 2",
        "3)",
    ],
    grammar: miniLispGrammar,
};