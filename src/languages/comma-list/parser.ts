import { useTokens } from "../../lib/useTokens";
import {
    CList,
    Element,
} from "./grammar";

// C -> [ES]
// ES -> E ES'
// ES' -> , ES | ε
// E -> n | C`

export function parseCList(tokens: Readonly<(string|number)[]>): CList {
    const { t, lookahead, match, consume } = useTokens(tokens);
    
    const c = parseC();
    if (t().length > 1) {
        throw new Error("trailing tokens");
    }
    return c;

    function parseC(): CList {
        match("[");
        const c = parseES();
        match("]");
        return c;
    }
    function parseES(): Element[] {
        return [parseE(), ...parseESComma()];
    }
    function parseESComma(): Element[] {
        if (lookahead() === ",") {
            match(",");
            return parseES();
        }
        return [];
    }
    function parseE(): Element {
        const l = lookahead();
        if (typeof l === "number") {
            consume();
            return l;
        }
        return parseC();
    }
}

export default [
    {
        parser: parseCList,
        label: "parseCList",
    },
];