import React from "react";
import { useState } from "react";

const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Counter App</h1>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
};

export default CounterApp;
