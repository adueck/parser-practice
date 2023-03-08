export type Ternary = {
    value: Ternary,
    if: Ternary,
    else: Ternary,
} | boolean;