import React from "react";
import { useState } from "react";

const EnterKeyDetection = () => {
    const [isEnter, setIsEnter] = useState(false)
    const toggleEnter = () => {
        setIsEnter(!isEnter)
    }
  return (
    <>
      <h1>EnterKeyDetection</h1>
      <input type="text" onKeyPress={() => toggleEnter()}/>
      {isEnter && <p>You pressed enter</p>}
    </>
  );
};

export default EnterKeyDetection;
