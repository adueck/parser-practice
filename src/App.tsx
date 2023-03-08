import LanguageShowCase from './components/LanguageShowcase';
import { languages } from './languages/languages';

function App() {
  return <div className="container pt-2 pb-4">
    <h1>Parser Practice</h1>
    <div className="mb-2">
      <a href="https://github.com/adueck/parser-practice">Source Code</a>
    </div>
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
