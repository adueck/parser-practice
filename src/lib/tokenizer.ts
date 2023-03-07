export function tokenizer<T extends number | string>(l: string): T[] {
    const chars = l.split("");
    let tokens: T[] = [];
    let currentDigs = "";
    function cleanOutDigs() {
        if (currentDigs) {
            // @ts-ignore
            tokens.push(parseInt(currentDigs) as number);
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
        tokens.push(char as T);
    }
    cleanOutDigs();
    return tokens;
}