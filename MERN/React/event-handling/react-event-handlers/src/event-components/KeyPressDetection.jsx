import React from "react";
import { useState } from "react";

const KeyPressDetection = () => {
    const [key, setKey] = useState('')
    const setTheKey = () => {
        setKey(event.target.value)
    }
  return (
    <>
      <h1>KeyPressDetection</h1>
      <input type="text" onKeyDown={() => setTheKey()}/>
      <p>you pressed: {key}</p>
    </>
  );
};

export default KeyPressDetection;
