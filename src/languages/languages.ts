import { expressionTokenizer } from "./expressions/tokenizer";
import { evaluateExpr } from "./expressions/evaluator";
import expressionParsers from "./expressions/parser";
import { logicEvaluator } from "./logic/evaluator";
import logicParsers from "./logic/parser";
import { logicTokenizer } from "./logic/tokenizer";
import { cListTokenizer } from "./comma-list/tokenizer";
import cListParsers from "./comma-list/parser";
import { evaluateCList } from "./comma-list/evaluator";
import { ternaryTokenizer } from "./ternary/tokenizer";
import ternaryParsers from "./ternary/parser";
import { evaluateTernary } from "./ternary/evaluator";
import { miniLispTokenizer } from "./mini-lisp/tokenizer";
import miniLispParsers from "./mini-lisp/parser";
import { evaluateSExp } from "./mini-lisp/evaluator";

export const languages: {
    name: string,
    tokenizer: any,
    parsers: any[],
    evaluator: any,
    tests: {
        input: string,
        value: any,
    }[],
    grammar: string,
}[] = [
    {
        name: "comma separated lists",
        tokenizer: cListTokenizer,
        parsers: cListParsers,
        evaluator: evaluateCList,
        tests: [
            {
                input: "4",
                value: 4,
            },
            {
                input: "2,1,10",
                value: 13,
            },
            {
                input: "2,1,10,",
                value: 13,
            },
        ],
        grammar: `C -> n
C -> n,C
C -> ε`,
    },
    {
        name: "logic",
        tokenizer: logicTokenizer,
        parsers: logicParsers,
        evaluator: logicEvaluator,
        tests: [
            {
                input: "not t",
                value: false,
            },
            {
                input: "not (t or f)",
                value: false,
            },
            {
                input: "(t and t) or (t and f)",
                value: true,
            },
            {
                input: "not f and t",
                value: true,
            },
            {
                input: "t and t and t and t and f",
                value: false,
            },
        ],
        grammar: `V -> E and V | E or V | E
E -> not E | B
B -> "t" | "f" | ( V )`,
    },
    {
        name: "expressions",
        tokenizer: expressionTokenizer,
        parsers: expressionParsers,
        evaluator: evaluateExpr,
        tests: [
            {
                input: "4 + 1",
                value: 5,
            },
            {
                input: "2 + 3 * 10 - 2",
                value: 30,
            },
            {
                input: "(2 + 3) * 10 - 2",
                value: 48,
            },
            {
                input: "123",
                value: 123,
            },
        ],
        grammar: `E -> E + T | E - T | T
T -> T * F | T / F | F
F -> (E) | number`,
    },
    {
        name: "ternary",
        tokenizer: ternaryTokenizer,
        parsers: ternaryParsers,
        evaluator: evaluateTernary,
        tests: [
            {
                input: "t",
                value: true,
            },
            {
                input: "(t) ? t : f",
                value: true,
            },
            {
                input: `(t)
    ? ((t) ? f : t) ? t : f
    : f`,
                value: false,
            },
        ],
        grammar: `T -> ( T ) ? T : T
T -> "t" | "f"`,
    },
    {
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
        ],
        grammar: `S -> number
S -> SL
SL -> (F S S)
F -> "+" | "-" | "*" | "/"`,
    },
];