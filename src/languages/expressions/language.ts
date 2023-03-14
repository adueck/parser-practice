
import { expressionsGrammar } from "./grammar";
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
        {
            input: "((100 + 2) / (10 / 5) - (((1))))",
            value: 50,
        },
    ],
    errors: [
        "44 11",
        "(2+3",
    ],
    grammar: expressionsGrammar,
};