import jsonParsers from "./parser";
import { jsonTokenizer } from "./tokenizer";
import { JsonData, jsonGrammar } from "./grammar";

export default {
    name: "json",
    tokenizer: jsonTokenizer,
    parsers: jsonParsers,
    evaluator: (e: JsonData) => e,
    tests: [
        {
            input: "23",
            value: 23,
        },
        {
            input: '"foo"',
            value: "foo",
        },
        {
            input: `{
    "name": "Bill",
    "age": 23
}`,
            value: { name: "Bill", age: 23 },
        },
        {
            input: `{ "nums": [2,3,4] }`,
            value: { nums: [2,3,4] },
        },
    ],
    errors: [
        "23}",
        '{ "nums": [2,3,4,] }',
    ],
    grammar: jsonGrammar,
};