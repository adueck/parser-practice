const symbols = [":", "<", ">", "="];

export function bnfTokenizer(l: string): string[] {
    const chars = l.split("");
    let tokens: string[] = [];
    let currentChars = "";
    function cleanOutChars() {
        if (currentChars) {
            tokens.push(currentChars);
            currentChars = "";
        }
    }
    for (let char of chars) {
        if (char === "\n") {
            cleanOutChars();
            tokens.push("NEWLINE");
            continue;
        }
        if (char === " " || char === "\t") {
            cleanOutChars();
            continue;
        }
        if (symbols.includes(char)) {
            cleanOutChars();
            tokens.push(char);
            continue;
        }
        currentChars += char;
    }
    cleanOutChars();
    return tokens;
}