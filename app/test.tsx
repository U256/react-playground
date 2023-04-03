import { FC, ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
}

export const TestPage: FC<Props> = ({ children }) => {
  const [state, setState] = useState(0);

  return (
    <>
      {children}
      <h1>Test Page</h1>
      <p>state: {state}</p>
      <p>This is a test page</p>
      <button type="button" onClick={() => setState((p) => p + 1)}>
        increase
      </button>
    </>
  );
};
