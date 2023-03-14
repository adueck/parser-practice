import { cListTokenizer } from "./tokenizer";
import cListParsers from "./parser";
import { evaluateCList } from "./evaluator";
import { cListGrammar } from "./grammar";

export default {
    name: "comma separated lists",
    tokenizer: cListTokenizer,
    parsers: cListParsers,
    evaluator: evaluateCList,
    tests: [
        {
            input: "[4]",
            value: 4,
        },
        {
            input: "[2,1,10]",
            value: 13,
        },
        {
            input: "[2,1,[1],10,2]",
            value: 16,
        },
        {
            input: "[2, 3, [1, 2, [[], 10], 2], 5]",
            value: 25,
        },
    ],
    errors: [
        "4]",
        "[5",
        "[2,10 12]",
        "[2,10,]",
        "[1,[2,3]",
        ",",
    ],
    grammar: cListGrammar,
};