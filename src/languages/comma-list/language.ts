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
    grammar: cListGrammar,
};