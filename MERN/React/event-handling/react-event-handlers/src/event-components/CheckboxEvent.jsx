import React from "react";
import { useState } from "react";

const CheckboxEvent = () => {
    const [isChecked, setIsChecked] = useState(false)

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
    }
  return (
    <>
      <h1>CheckboxEvent</h1>
      <input type="checkbox" onChange={toggleCheckbox}/>
      {isChecked && <p>checkbox checked!!!</p>}
    </>
  );
};

export default CheckboxEvent;
