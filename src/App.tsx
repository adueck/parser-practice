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
  },
  {
    title: "Comma Seperated List",
    parser: parseCListF,
    evaluator: evaluateCList,
  },
  {
    title: "Ternary",
    parser: parseTernary,
    evaluator: evaluateTernary,
  }
]

function App() {
  return <div>
    {compilers.map((c: any) => (
      <CompilerShowCase
        title={c.title}
        evaluator={c.evaluator}
        parser={c.parser}
      />
    ))}
  </div>;
}

export default App
