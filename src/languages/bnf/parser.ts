import { useTokens } from "../../lib/useTokens";
import {
    NonTerminal,
    Terminal,
    Production,
} from "./grammar";

function parseBnf(tokens: string[]): Production[] {
    const t = useTokens(tokens);
    const productions: Production[] = [];
    while (!t.isEmpty()) {
        productions.push(parseProduction());
        while (t.lookahead() === "NEWLINE") {
            t.consume();
        }
    }
    if (!t.isEmpty()) {
        throw new Error("trailing tokens");
    }
    return productions;
    function parseProduction(): Production {
        const left = parseNonTerminal();
        t.match(":");
        t.match(":");
        t.match("=");
        const right = parseRightSide();
        return {
            left,
            right,
        };
    }
    function parseNonTerminal(): NonTerminal {
        t.match("<");
        const val = t.lookahead();
        if (typeof val !== "string") {
            throw new Error("expected non-terminal string value");
        }
        t.consume();
        t.match(">");
        return {
            type: "non-terminal",
            val,
        };
    }
    function parseTerminal(): Terminal {
        const val = t.lookahead();
        if (typeof val !== "string") {
            throw new Error("expected terminal string value");
        }
        t.consume();
        return {
            type: "terminal",
            val,
        };
    }
    function parseRightSide(): (NonTerminal | Terminal)[] {
        const arr: (NonTerminal | Terminal)[] = [];
        while (t.lookahead() && t.lookahead() !== "NEWLINE") {
            arr.push(
                t.lookahead() === "<" ? parseNonTerminal() : parseTerminal()
            );
        }
        if (t.lookahead() === "NEWLINE") {
            t.consume();
        }
        return arr;
    }
}

export default [
    {
        parser: parseBnf,
        label: "bnfParser",
    },
];