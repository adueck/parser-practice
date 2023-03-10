const inbuiltFunctions: Record<string, any> = {
    "+": (...args: any[]) => {
        return args.reduce((acc, x) => acc + x, 0);
    },
    "-": (...args: any[]) => {
        const [first, ...rest] = args;
        return rest.reduce((acc, x) => acc - x, first);
    },
    "*": (...args: any[]) => {
        const [first, ...rest] = args;
        return rest.reduce((acc, x) => acc * x, first);
    },
    "/": (...args: any[]) => {
        const [first, ...rest] = args;
        return rest.reduce((acc, x) => acc / x, first);
    },
    "=": (...args: any[]) => {
        const [first, ...rest] = args;
        return rest.every(x => x === first);
    },
    ">": (...args: any[]) => {
        function greaterThan(a: any[]): boolean {
            const [first, second, ...rest] = a;
            if (second === undefined) {
                return true;
            }
            return (first > second) && greaterThan([second, ...rest]);
        }
        return greaterThan(args);
    },
    "<": (...args: any[]) => {
        function lessThan(a: any[]): boolean {
            const [first, second, ...rest] = a;
            if (second === undefined) {
                return true;
            }
            return (first < second) && lessThan([second, ...rest]);
        }
        return lessThan(args);
    },
    "if": (...args: any[]) => {
        if (args.length < 3) {
            throw new Error("if requires 3 arguments");
        }
        return args[0] ? args[1] : args[2];
    },
}

export default inbuiltFunctions;