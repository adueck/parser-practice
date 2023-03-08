import { ternaryTokenizer } from "./tokenizer";
import ternaryParsers from "./parser";
import { evaluateTernary } from "./evaluator";
import { ternaryGrammar } from "./grammar";

export default {
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
    grammar: ternaryGrammar,
};