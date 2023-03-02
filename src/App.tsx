import './App.css'
import { evaluateExpr, evaluateList } from './lib/evaluater';
import { parseExprString } from './lib/exp-parser';
import CompilerShowCase from './components/CompilerShowcase';
import { parseListString, parseListStringImp } from './lib/list-parser';

function App() {
  return <div>
    <CompilerShowCase
      parser={parseListStringImp}
      evaluator={evaluateList}
      title="List"
    />
    <CompilerShowCase
      parser={parseExprString}
      evaluator={evaluateExpr}
      title="Expression"
    />
  </div>;
}

export default App
