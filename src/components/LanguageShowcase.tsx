import { useState } from 'react';

function LanguageShowCase<T>({ tokenizer, parsers, evaluator, title, grammar, examples }: {
    tokenizer: (l: string) => (string | number)[],
    parsers: ((t: (string | number)[]) => T)[],
    evaluator: (x: T) => (string | number | boolean),
    title: string,
    grammar: string,
    examples: { input: string, value: any }[],
}) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<number | string>("");
  const [tree, setTree] = useState<T | undefined>(undefined);
  const [parser, setParser] = useState<number>(0);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCalculate();
  }
  function handleCalculate() {
    if (!text) return;
    try {
      const e = parsers[parser](tokenizer(text));
      setTree(e);
      const ev = evaluator(e);
      setResult(typeof ev === "boolean" ? ev.toString() : ev);
    } catch(e) {
      // @ts-ignore
      setResult(e.message as string);
    }
  }
  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }
  function handleClear() {
    setText("");
    setResult("");
    setTree(undefined);
  }
  return (
    <div className="App">
      <h3>{title}</h3>
      <pre>
        <code>
          {grammar}
        </code>
      </pre>
      <details>
        <summary>Examples</summary>
        {examples.map((ex) => <pre key={ex.input}>{`
${ex.input}
${`>>`} ${ex.value}`
}</pre>)}
      </details>
      <form onSubmit={handleSubmit}>
        <textarea
          cols={20}
          rows={5}
          value={text}
          onChange={handleTextChange}
        />
        <div>
        <select value={parser} onChange={e => setParser(parseInt(e.target.value))}>
          {parsers.map((p, i) => (
            <option value={i}>{p.name}</option>
          ))}
        </select>
        </div>
        <div>
          <button type="submit">Calculate</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </form>
      <div>
        {result !== undefined && <pre>{result}</pre>}
      </div>
      {tree && <div style={{ textAlign: "left" }}>
        {/* <pre>{toBrackets(expr)}</pre> */}
        <pre>{JSON.stringify(tree, null, "  ")}</pre>
      </div>}
    </div>
  );
}

export default LanguageShowCase;
