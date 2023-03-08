import { useState } from 'react';

function LanguageShowCase<T>({ tokenizer, parsers, evaluator, title, grammar, examples }: {
    tokenizer: (l: string) => (string | number)[],
    parsers: { parser: ((t: (string | number)[]) => T), label: string }[],
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
      const e = parsers[parser].parser(tokenizer(text));
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
    <div className="mb-4" style={{ maxWidth: "40rem" }}>
      <h2>{title}</h2>
      <h6>Grammar</h6>
      <pre>
        <code>
          {grammar}
        </code>
      </pre>
      <details className="mb-3">
        <summary>Examples</summary>
        {examples.map((ex) => <pre key={ex.input}>{`
${ex.input}
${`>>`} ${JSON.stringify(ex.value)}`
}</pre>)}
      </details>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Input:</label>
          <textarea
            className="form-control"
            rows={5}
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <select
              className="form-select"
              value={parser}
              onChange={e => setParser(parseInt(e.target.value))}
            >
              {parsers.map((p, i) => (
                <option value={i}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <button className="btn btn-primary me-2" type="submit">Evaluate</button>
            <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </form>
      {result !== "" && <div>
        <div className="py-2">Result:</div>
        <samp>{JSON.stringify(result)}</samp>
      </div>}
      {tree && <div className="py-2">
        <details>
          <summary>AST</summary>
          <pre className="mt-2">{JSON.stringify(tree, null, "  ")}</pre>
        </details>
      </div>}
    </div>
  );
}

export default LanguageShowCase;
