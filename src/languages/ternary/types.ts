export const ternaryGrammar =
`T -> ( T ) ? T : T
T -> "t" | "f"`;

export type Ternary = {
    value: Ternary,
    if: Ternary,
    else: Ternary,
} | boolean;