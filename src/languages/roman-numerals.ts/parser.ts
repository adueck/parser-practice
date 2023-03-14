// import {
//     SmallDigit,
//     SmallTen,
//     RomanToken,
//     Digit,
// } from "./grammar";

// export function romanParser(tokens: Readonly<RomanToken[]>): SmallTen {
//     const t = [...tokens];

//     const d = parseD();

//     if (t.length) {
//         throw new Error("trailing numerals");
//     }

//     return d;

//     function parseSmallTen(): SmallTen {
//         if (t[0] === "X") {
//             if (t[1] === "X") {
//                 if (t[2] === "X") {
//                     t.shift();
//                     t.shift();
//                     t.shift();
//                     return 30;
//                 }
//                 t.shift();
//                 t.shift();
//                 return 20;
//             }
//             t.shift();
//             return 10;
//         }
//         return 0;
//     }

//     function parseD(): Digit {
//         const sing = "I";
//         const half = "V";
//         const full = "X";
//         if (t[0] === sing && t[1] === half) {
//             t.shift();
//             t.shift();
//             return 4;
//         }
//         if (t[0] === sing && t[1] === full) {
//             t.shift();
//             t.shift();
//             return 9;
//         }
//         if (t[0] === half) {
//             t.shift();
//             return {
//                 type: 5,
//                 plus: parseSD(),
//             };
//         }
//         return parseSD();
//     }

//     function parseSD(): SmallDigit {
//         if (t[0] === "I") {
//             if (t[1] === "I") {
//                 if (t[2] === "I") {
//                     t.shift();
//                     t.shift();
//                     t.shift();
//                     return 3;
//                 }
//                 t.shift();
//                 t.shift();
//                 return 2;
//             }
//             t.shift();
//             return 1;
//         }
//         return 0;
//     }
// }

// export default [
//     {
//         parser: romanParser,
//         label: "romanParser",
//     },
// ];

export default 1;