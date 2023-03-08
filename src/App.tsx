import './App.css'
import LanguageShowCase from './components/LanguageShowcase';
import { languages } from './languages/languages';

function App() {
  return <div>
    <h1>Parser Practice</h1>
    {languages.map((l) => (
      <LanguageShowCase
        title={l.name}
        tokenizer={l.tokenizer}
        evaluator={l.evaluator}
        parsers={l.parsers}
        grammar={l.grammar}
        examples={l.tests}
      />
    ))}
  </div>;
}

export default App
