
import { expressionsGrammar } from "./types";
import { expressionTokenizer } from "./tokenizer";
import { evaluateExpr } from "./evaluator";
import expressionParsers from "./parser";

export default {
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
    grammar: expressionsGrammar,
};