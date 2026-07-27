import React from "react";
import { useState } from "react";

const InputBlur = () => {
  const [isFocusBlur, setFocusBlur] = useState(true);
  const InputBlur = () => {
    setFocusBlur(!isFocusBlur);
  };
  return (
    <>
      <h1>InputBlur</h1>
      <input type="text" onBlur={InputBlur}/>
    {isFocusBlur && <p>You're out of the typing mode!!!</p>}
    </>
  );
};

export default InputBlur;
