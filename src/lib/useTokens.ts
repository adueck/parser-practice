/**
 * Provides a list of tokens after a single lookahead with methods
 * for matching and consuming them
 */
export function useTokens(tokens: Readonly<(string|number)[]>): {
    lookahead: () => string | number | undefined,
    match: (t: string | number) => void,
    consume: () => void,
    isEmpty: () => boolean,
} {
    let [l, ...tt] = tokens;
    console.log({ tokens });
    let ll: string | number | undefined = l;
    function match(t: string | number) {
        if (ll !== t) {
            throw new Error("expected "+t);
        }
        consume();
    }
    function consume() {
        ll = tt.shift();
    }
    function lookahead() {
        return ll;
    }
    function isEmpty() {
        return ll === undefined;
    }
    return {
        lookahead,
        match,
        consume,
        isEmpty,
    };
}