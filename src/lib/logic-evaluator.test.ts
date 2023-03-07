import { logicEvaluator } from "./logic-evaluator"

test("logic evaluator works", () => {
    expect(logicEvaluator({
        op: "and",
        left: true,
        right: true,
    })).toEqual(true);
    expect(logicEvaluator({
        op: "and",
        left: {
            op: "not",
            value: false,
        },
        right: true,
    })).toEqual(true);
    expect(logicEvaluator({
        op: "and",
        left: {
            op: "not",
            value: { op: "not", value: true },
        },
        right: true,
    })).toEqual(true);
});