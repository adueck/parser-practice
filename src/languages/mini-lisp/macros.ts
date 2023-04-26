import {
    SE, SL,
} from "./grammar";

export function letMacro(sl: any): SL {
    const [letLabel, { content: [varName, varVal] }, body] = sl.content;
    return {
        content: [
            "local",
            {
                content: [
                    {
                        content: ["define", varName, varVal],
                    },
                ],
            },
            body,
        ],
    };
} 

export function funMacro(sl: any): SL {
    const [defLabel, { content: [funName, ...args] }, body] = sl.content;
    return {
        content: [
            "define",
            funName,
            {
                content: [
                    "lambda",
                    {
                        content: args,
                    },
                    body,
                ],
            },
        ],
    };
}