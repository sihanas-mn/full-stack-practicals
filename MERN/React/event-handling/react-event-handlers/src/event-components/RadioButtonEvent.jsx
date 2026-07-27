import React from "react";
import { useState } from "react";

const RadioButtonEvent = () => {
  const [gender, setGender] = useState("");
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  return (
    <>
      <h1>RadioButtonEvent</h1>
      <label htmlFor="male">Male</label>
      <input name="gender" id="male" type="radio" value="male" onChange={handleGender}/>
      <label htmlFor="female">Female</label>
      <input name="gender" id="female" type="radio" value='female' onChange={handleGender} />
      <p>selected gender: {gender}</p>
    </>
  );
};

export default RadioButtonEvent;
