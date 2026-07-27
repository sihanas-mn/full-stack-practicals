import React from "react";
import { useState } from "react";

const ButtonClick = () => {
  const [isClicked, setClick] = useState(false);
  const afterShow = () => {
    setClick(!isClicked);
  };
  return (
    <>
      <h1>ButtonClick</h1>
      <button onClick={() => afterShow()}>Click Me</button>
      {isClicked && <p>Button Clicked!!! --- This paragraph appeared just because you clicked the button... (for the sake to show the onclick function)</p>}
    </>
  );
};

export default ButtonClick;
