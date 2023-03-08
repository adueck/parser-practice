import LanguageShowCase from './components/LanguageShowcase';
import { languages } from './languages/languages';
const repo = "https://github.com/adueck/parser-practice";

function App() {
  return <div className="container py-4">
    <h1>Parser Practice</h1>
    <p className="lead">An exercise in writing parsers in TypeScript (<a href={repo}>source code</a>)</p>
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
    <p className="text-muted small mt-4">Made by <a href="https://adueck.github.io/">Adam Dueck</a> - <a href={repo}>source code</a></p>
  </div>;
}

export default App
