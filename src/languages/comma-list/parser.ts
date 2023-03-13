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
    const t = useTokens(tokens);
    
    const c = parseC();
    if (t.lookahead() !== undefined) {
        throw new Error("trailing tokens");
    }
    return c;

    function parseC(): CList {
        t.match("[");
        const c = parseES();
        t.match("]");
        return c;
    }
    function parseES(): Element[] {
        return [parseE(), ...parseESComma()];
    }
    function parseESComma(): Element[] {
        if (t.lookahead() === ",") {
            t.match(",");
            return parseES();
        }
        return [];
    }
    function parseE(): Element {
        const l = t.lookahead();
        if (typeof l === "number") {
            t.consume();
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