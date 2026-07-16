import React from "react";

function Button({ text, style }) {
  return (
    <>
      <button style={style}>{text}</button>
    </>
  );
}

export default Button;
