import LanguageShowCase from './components/LanguageShowcase';
import { languages } from './languages/languages';
const repo = "https://github.com/adueck/parser-practice";

function App() {
  return <div className="container py-4">
    <h1>Parser Practice</h1>
    <p className="lead">An exercise in writing parsers in TypeScript (<a href={repo}>source code</a>)</p>
    <p>Each language takes a string and puts it through:</p>
    <ol>
      <li>tokenizer: (string → list of tokens)</li>
      <li>parser: (list of tokens → syntax tree)</li>
      <li>evaluator: (syntax tree → value)</li>
    </ol>
    {languages.map((l) => (
      <LanguageShowCase
        key={l.name}
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
