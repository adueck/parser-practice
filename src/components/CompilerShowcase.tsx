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
  return (
    <div className="App">
      <h4>{title}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Calculate</button>
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
