import { useTokens } from "../../lib/useTokens";
import {
    JsonData,
    Atom,
    Obj,
    Arr,
} from "./grammar";

export function jsonParser(tokens: (string | number)[]): JsonData {
    const t = useTokens(tokens);

    const j = parseJson();

    if (!t.isEmpty()) {
        throw new Error("trailing tokens");
    }

    return j;

    function parseJson(): JsonData {
        if (t.lookahead() === "[") {
            return parseArr();
        }
        if (t.lookahead() === "{") {
            return parseObj();
        }
        return parseAtom();
    }

    function parseObj(): Obj {
        t.match("{");
        const inside = parseObjCont(false);
        t.match("}");
        return inside;
    }

    function parseObjCont(tail: boolean): Obj {
        if (t.lookahead() === "}") {
            return {};
        }
        if (tail) {
            t.match(",");
        }
        const [key, val] = parseObjKeyVal();
        return {
            [key]: val,
            ...parseObjCont(true),
        };
    }

    function parseObjKeyVal(): [string, JsonData] {
        const key = parseString();
        t.match(":");
        const value = parseJson();
        return [key, value];
    }

    function parseArr(): Arr {
        t.match("[");
        const inside = parseArrCont(false);
        t.match("]");
        return inside;
    }

    function parseArrCont(tail: boolean): Arr {
        if (t.lookahead() === "]") {
            return [];
        }
        if (tail) {
            t.match(",");
        }
        return [parseJson(), ...parseArrCont(true)];
    }

    function parseAtom(): Atom {
        const l = t.lookahead();
        if (typeof l === "number") {
            t.consume();
            return l;
        }
        if (l === "true") {
            t.consume();
            return true;
        }
        if (l === "false") {
            t.consume();
            return false;
        }
        if (l === "null") {
            t.consume();
            return null;
        }
        return parseString();
    }

    function parseString(): string {
        t.match('"');
        const s = t.lookahead();
        if (s === undefined) {
            throw new Error("expected string content after \"");
        }
        t.consume();
        t.match('"');
        return s.toString();
    }
}

export default [
    {
        label: "jsonParser",
        parser: jsonParser,
    },
];