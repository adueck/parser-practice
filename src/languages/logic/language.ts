import { logicEvaluator } from "./evaluator";
import logicParsers from "./parser";
import { logicTokenizer } from "./tokenizer";
import { logicGrammar } from "./grammar";

export default {
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
        {
            input: "not ((t and t) and (t and f)) and t",
            value: true,
        },
    ],
    errors: [
        "not (t or f f",
    ],
    grammar: logicGrammar,
};