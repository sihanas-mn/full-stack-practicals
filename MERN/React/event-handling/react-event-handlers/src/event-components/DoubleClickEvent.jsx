import React from "react";
import { useState } from "react";

const DoubleClickEvent = () => {
  const [isClicked, setClick] = useState(false);

  const dblClickEvent = () => {
    setClick(!isClicked);
  };
  return (
    <>
      <h1>DoubleClickEvent</h1>
      <button onDoubleClick={() => dblClickEvent()}>Click Twice</button>
      {isClicked && <p>Double Clicked!!!</p>}
    </>
  );
};

export default DoubleClickEvent;
