import './App.css'
import { evaluateCList, evaluateExpr, evaluateTernary } from './lib/evaluator';
import { parseExprString } from './lib/exp-parser';
import CompilerShowCase from './components/CompilerShowcase';
import { parseCListF } from './lib/clist-parser';
import { parseTernary } from './lib/ternary-parser';

// TODO: need existential data types to be able to type an array like this?
const compilers: any = [
  {
    title: "Expression",
    parser: parseExprString,
    evaluator: evaluateExpr,
    grammar: `E -> E + T | E - T | T
T -> T * F | T / F | F
F -> (E) | number  
`,
  },
  {
    title: "Comma Separated List",
    parser: parseCListF,
    evaluator: evaluateCList,
    grammar: `C -> n
C -> n,C
C -> ε`,
  },
  {
    title: "Ternary",
    parser: parseTernary,
    evaluator: evaluateTernary,
    grammar: `T -> B
T -> ( T ) ? T : T
B -> "t" | "f"    
`,
  }
]

function App() {
  return <div>
    <h1>Parser Practice</h1>
    {compilers.map((c: any) => (
      <CompilerShowCase
        title={c.title}
        evaluator={c.evaluator}
        parser={c.parser}
        grammar={c.grammar}
      />
    ))}
  </div>;
}

export default App
