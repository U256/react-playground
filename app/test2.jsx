import { useState } from "react";
import styles from "./page.module.css";

export const TestPage = ({ children }) => {
  const [state, setState] = useState(0);

  return (
    <>
      {children}
      <h1>Test Page</h1>
      <p>state: {state}</p>
      <p>This is a test page</p>
      {[1, 2, 3].map((item) => (
        <p key={item}>{item}</p>
      ))}
      <button type="button">text</button>
      <button type="button" onClick={() => setState((p) => p + 1)}>
        increase
      </button>
    </>
  );
};
