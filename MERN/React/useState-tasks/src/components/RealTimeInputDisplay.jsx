import React from "react";
import { useState } from "react";

const RealTimeInputDisplay = () => {

  const [display, setDisplay] = useState("");

  const handleChange = (event) => {
    setDisplay(event.target.value)
  }

  return (
    <>
      <h1>RealTimeInputDisplay</h1>
      <input onChange={handleChange}></input>
      <p>You Typed: {display}</p>
    </>
  );
};

export default RealTimeInputDisplay;
