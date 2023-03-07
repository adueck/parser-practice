import { logicTokenize } from "./logic-tokenizer"

test("logic tokenizer works", () => {
    expect(logicTokenize("t and not f ")).toEqual(["t", "and", "not", "f"]);
    expect(logicTokenize(`
f and t
    or not f
`)).toEqual(["f", "and", "t", "or", "not", "f"]);
});