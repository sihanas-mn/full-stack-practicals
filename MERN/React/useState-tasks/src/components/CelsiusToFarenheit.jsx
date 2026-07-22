import React from "react";
import { useState } from "react";

const CelsiusToFarenheit = () => {
  const [celsius, setCelsius] = useState(0);
  const [farenheit, setFarenheit] = useState(0);

  const setCelValue = (event) => {
    setCelsius(event.target.value);
  };

  const celToFare = () => {
    setFarenheit((celsius * 9 / 5) + 32);
  };

  return (
    <>
      <h1>Celcius To Farenheit</h1>
      <input type="text" onChange={setCelValue} />
      <button onClick={celToFare}>Convert</button>
      <p>{farenheit} Farenheit</p>
    </>
  );
};

export default CelsiusToFarenheit;
