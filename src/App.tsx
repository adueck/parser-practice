import LanguageShowCase from './components/LanguageShowcase';
import { languages } from './languages/languages';

function App() {
  return <div className="container py-4">
    <h1>Parser Practice</h1>
    <p className="lead">An exercise in writing parsers in TypeScript (<a href="https://github.com/adueck/parser-practice">source code</a>)</p>
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
