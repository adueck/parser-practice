export const romanNumeralsGrammer = `
SmallTen -> "X" | "XX" | "XXX" | ε
Digit -> SD | "IV" | "V" SD | "IX"
SmallDigit -> "I" | "II" | "III" | ε`;

export const romanTokens = ["I", "V", "X"] as const;

export type RomanToken = typeof romanTokens[number];

export type SmallDigit = 0 | 1 | 2 | 3;

export type Digit = SmallDigit | 4 | {
    type: 5,
    plus: SmallDigit,
} | 9;

export type SmallTen = 0 | 10 | 20 | 30;
