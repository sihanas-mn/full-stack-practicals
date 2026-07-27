import React from "react";
import { useState } from "react";

const DropdownChange = () => {
    const [dropValue, setValue] = useState('')
    const assignValue = (event) => {
        setValue(event.target.value)
    }
  return (
    <>
      <h1>DropdownChange</h1>
      <select name="" id="dropDown" onChange={() => assignValue(event)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <p>you selected: {dropValue}</p>
    </>
  );
};

export default DropdownChange;
