import './App.css'
import { evaluateCList, evaluateExpr, evaluateList } from './lib/evaluater';
import { parseExprString } from './lib/exp-parser';
import CompilerShowCase from './components/CompilerShowcase';
import { parseListString, parseListStringImp } from './lib/list-parser';
import { parseCList, parseCListF } from './lib/clist-parser';

type CompilerData<T> = {
  parser: (l: string) => T,
  evaluator: (e: T) => number | string,
  title: string,
};

const compilers: any = [
  {
    title: "List",
    parser: parseListStringImp,
    evaluator: evaluateList,
  },
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
