import { useState } from 'react';

function CompilerShowCase<T>({ parser, evaluator, title }: {
    parser: (l: string) => T,
    evaluator: (x: T) => (string | number),
    title: string,
}) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<number | string>("");
  const [tree, setTree] = useState<T | undefined>(undefined);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCalculate();
  }
  function handleCalculate() {
    if (!text) return;
    try {
      const e = parser(text);
      setTree(e);
      setResult(evaluator(e));
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
      <h4>{title}</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          cols={20}
          rows={5}
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit">Calculate</button>
        <button onClick={handleClear}>Clear</button>
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

export default CompilerShowCase;
