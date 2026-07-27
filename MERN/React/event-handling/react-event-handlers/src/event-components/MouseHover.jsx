import React from "react";
import { useState } from "react";

const MouseHover = () => {
  const [isHover, setHover] = useState(false);

  const hoverEvent = () => {
    setHover(!isHover);
  };
  return (
    <>
      <h1>Mouse Hover Event</h1>
      <button onMouseOver={() => hoverEvent()}>Hover Over Here</button>
      {isHover && <p>Mouse Over Event Working!!!</p>}
    </>
  );
};

export default MouseHover;
