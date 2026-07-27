import React from "react";
import { useState } from "react";

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState(0)
    const [preValue, setPreValue] = useState(0)

    const transferCurrentToPreValue = (currentValue) => {
        const numVal = Number(currentValue)
        setPreValue(numVal)
        setCurrentValue(0)
    }

  return (
    <>
      <h1>Calculator</h1>
      <input type="number" value={currentValue} onChange={(event) => {setCurrentValue(event.target.value)}} />
      <button onClick={() => {transferCurrentToPreValue(currentValue)}}>+</button>
      <button>-</button>
      <button>*</button>
      <button>/</button>
      <p>Result: {currentValue} || {preValue}</p>
    </>
  );
};

export default Calculator;
