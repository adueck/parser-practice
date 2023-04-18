import { bnfEvaluator } from "./evaluator";
import { bnfGrammar } from "./grammar";
import bnfParsers from "./parser";
import { bnfTokenizer } from "./tokenizer";

export default {
    name: "BNF Grammar",
    tokenizer: bnfTokenizer,
    parsers: bnfParsers,
    evaluator: bnfEvaluator,
    tests: [
        {
            input: `<long> ::= long <long>
<long> ::= stop 
`,
            value: `<long> → long <long> 
<long> → stop 
`
        },
        {
            input: `<s> ::= a <s> b 
<s> ::= a b 
`,
            value: `<s> → a <s> b 
<s> → a b 
`
        }
    ],
    errors: [
        `<S> ::= <SUBJ> <OBJ> <V> .
<SUBJ> ::= <NOUN>
<OBJ> ::= <NOUN>`
    ],
    grammar: bnfGrammar,
};