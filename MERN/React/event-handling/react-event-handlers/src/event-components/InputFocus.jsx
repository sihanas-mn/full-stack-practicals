import React from "react";
import { useState } from "react";

const InputFocus = () => {
  const [isFocus, setFocus] = useState(false);
  const InputFocus = () => {
    setFocus(!isFocus);
  };
  return (
    <>
      <h1>InputFocus</h1>
      <input type="text" onFocus={() => InputFocus()}/>
      {isFocus && <p>you entered the typing mode!!!</p>}
    </>
  );
};

export default InputFocus;
