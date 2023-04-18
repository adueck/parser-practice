import {
    NonTerminal,
    Terminal,
    Production,
} from "./grammar";

export function bnfEvaluator(productions: Production[]): string {

    checkFormation(productions);

    return productions.reduce<string>((text, production) => {
        return `${text}${evalProduction(production)}\n`;
    }, "");

    function evalProduction(p: Production): string {
        return `${evalNonTerminal(p.left)} → ${evalRightSide(p.right)}`;
    }
    
    function evalRightSide(vals: (Terminal | NonTerminal)[]): string {
        return vals.reduce<string>((text, v) => {
            return `${text}${v.type === "terminal" ? evalTerminal(v) : evalNonTerminal(v)} `;
        }, "");
    }

    function evalTerminal(t: Terminal): string {
        return t.val;
    }
    function evalNonTerminal(nt: NonTerminal): string {
        return `<${nt.val}>`;
    }
}

function checkFormation(productions: Production[]) {
    const wellFormed = productions.every((production) => {
        const nonTerms = production.right.filter(x => x.type === "non-terminal");
        return nonTerms.every((nt) => productions.find(p => p.left.val === nt.val));
    });
    if (!wellFormed) {
        throw new Error("right side non-terminal(s) present without productions");
    }
}