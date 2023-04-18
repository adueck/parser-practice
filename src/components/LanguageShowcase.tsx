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
    handleCalculate(text);
  }
  function handleCalculate(text: string) {
    if (!text) return;
    try {
      const e = parsers[parser].parser(tokenizer(text));
      setTree(e);
      const ev = evaluator(e);
      setResult(typeof ev === "boolean" ? ev.toString() : ev);
    } catch(e) {
      // @ts-ignore
      setResult("syntax error: " + e.message as string);
      setTree(undefined)
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
  function loadExample(t: string) {
    handleClear();
    setText(t);
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
        {examples.map((ex) => <div key={ex.input} className="d-flex flex-row align-items-center">
          <button
            className="btn btn-sm btn-light me-2"
            onClick={() => loadExample(ex.input)}
          >try</button>
          <div>
            <pre style={{ margin: "0.5rem 0", padding: "0" }}>{`${ex.input}
${`>>`} ${JSON.stringify(ex.value)}`
}</pre>
          </div>
      </div>)}
      </details>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Input:</label>
          <textarea
            style={{ fontFamily: "monospace" }}
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
                <option value={i} key={i}>{p.label}</option>
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
        <samp>
          <pre>{typeof result === "string"
            ? result
            : JSON.stringify(result, null, "  ")}
          </pre>
        </samp>
      </div>}
      {tree && <div className="py-2">
        <details>
          <summary>Syntax Tree</summary>
          <pre className="mt-2">{JSON.stringify(tree, null, "  ")}</pre>
        </details>
      </div>}
    </div>
  );
}

export default LanguageShowCase;
