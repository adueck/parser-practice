export function tokenizer(l: string): ExpToken[] {
    const chars = l.split("");
    let tokens: ExpToken[] = [];
    let currentDigs = "";
    function cleanOutDigs() {
        if (currentDigs) {
            tokens.push(parseInt(currentDigs));
            currentDigs = "";
        }
    }
    for (let char of chars) {
        if (char === " ") {
            cleanOutDigs();
            continue;
        }
        if (char >= '0' && char <= '9') {
            currentDigs += char;
            continue;
        }
        cleanOutDigs();
        tokens.push(char as ExpToken);
    }
    cleanOutDigs();
    return tokens;
}